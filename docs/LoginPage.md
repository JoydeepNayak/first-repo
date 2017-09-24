  ## Login Page Component
 ![Alt text](LoginPageScreenshot.png?raw=true "Login Page")
  
  
  ### LoginPage props
 
  LoginPage accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | login | Function | Yes | LoginPage calls this function on clicking 'Sign In' button. login function takes 2 arguments: username and password |
  | redirect | Function | Yes | Function is called when isAuthenticated is true |
  | isAuthenticated | Boolean | No |  If isAuthenticated is true , then LoginPage calls redirect function |
  | errorMessage | String | No | Error message to be displayed |
  | isFetching | Boolean | No | if isFetching is true, then spinning wheel is displayed |
  | messages | Object | No | Allows to override default messages |

#### Default Messages:

  - productName: 'IBM Product Name'
  - panelTitle: 'Sign In'
  - username: 'Username'
  - password: 'Password'
  - signInButton: 'Sign In'


### LoginService

  LoginService uses basic authentication to login user at service specified by the provided URL.
  It dispatches the following actions during login process:
  - REQUEST_TOKEN - dispatched before any connection is attempted.
  - RECEIVE_TOKEN - dispatched when successful connection to specified URL was made and OK status is received.
  - RECEIVE_TOKEN_ERROR - dispatched when didn't receive OK status or error occurred.

### LoginPage and LoginService Example

Below is simple example of LoginPage and LoginService usage with react-redux. 

```
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LoginPage from '@infoserver/gov-shared-ui/lib/LoginPage';
import LoginService from '@infoserver/gov-shared-ui/lib/LoginSeervice';

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => new LoginService('/ibm/iis/api/auth_token/v1/tokens', dispatch).login(username, password),
  redirect: () => browserHistory.push('/ibm/iis/shop4info'),
});

const mapStateToProps = (state) => Object.assign({}, {
  errorMessage: state.authToken.error,
  isFetching: state.authToken.isFetching,
  isAuthenticated: !!state.authToken.accessToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

```


Next example shows a simple reducer which handles login and logout actions. 
The reducer handles actions triggered by LoginService and also logout action
coming from Logout button and unauthorized action coming from Fetch wrapper. 
Browser session storage is used to keep authentication token. 

```
import LoginService from '@infoserver/gov-shared-ui/lib/LoginService';
import { RECEIVE_UNAUTHORIZED } from '../utils/FetchWrapper';
import { LOGOUT } from '../components/header/HeaderActions';

const authToken = (state, action) => {
  const result = Object.assign({}, state);
  if (!result.accessToken) {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      result.accessToken = accessToken;
    }
  }
  switch (action.type) {
    case LoginService.REQUEST_TOKEN:
      sessionStorage.removeItem('access_token');
      return Object.assign({}, result, {
        isFetching: true,
        token: null,
        error: null,
      });
    case LoginService.RECEIVE_TOKEN:
      sessionStorage.setItem('access_token', action.token.accessToken);
      return Object.assign({}, result, {
        isFetching: false,
      }, action.token);
    case LoginService.RECEIVE_TOKEN_ERROR:
      return Object.assign({}, result, {
        isFetching: false,
        error: action.error,
      });
    case RECEIVE_UNAUTHORIZED:
    case LOGOUT:
      sessionStorage.removeItem('access_token');
      return Object.assign({}, result, {
        accessToken: null,
      });
    default:
      return result;
  }
};

export default authToken;
```