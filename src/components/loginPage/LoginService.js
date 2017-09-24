
const requestToken = (creds) => ({
  type: LoginService.REQUEST_TOKEN,
  creds,
});

const receiveToken = (json) => {
  const { access_token, ...rest } = json;
  return {
    type: LoginService.RECEIVE_TOKEN,
    token: {
      accessToken: access_token,
      ...rest,
    },
  };
};

const receiveTokenError = (error) => ({
  type: LoginService.RECEIVE_TOKEN_ERROR,
  error,
});


/**
 *  LoginService uses basic authentication to login user at service specified by the provided URL.
 *  It dispatches the following actions during login process:
 *  REQUEST_TOKEN - dispatched before any connection is attempted.
 *  RECEIVE_TOKEN - dispatched when successful connection to specified URL was made and OK status is received.
 *  RECEIVE_TOKEN_ERROR - dispatched when didn't receive OK status or error occurred.
 */
export default class LoginService {

  constructor(url, dispatch) {
    this.url = url;
    this.dispatch = dispatch;
  }

  static get REQUEST_TOKEN() { return 'REQUEST_TOKEN'; }
  static get RECEIVE_TOKEN() { return 'RECEIVE_TOKEN'; }
  static get RECEIVE_TOKEN_ERROR() { return 'RECEIVE_TOKEN_ERROR'; }

  /**
   * Uses basic authentication to login user with provided username and password.
   * @param username
   * @param password
   * @returns {Promise.<TResult>}
   */
  login(username, password) {
    this.dispatch(requestToken({ username }));
    const headers = {
      Authorization: `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`,
    };
    return fetch(this.url, {
      method: 'POST',
      headers,
    }).then((resp) => {
      if (resp.ok) {
        return resp.json().then((json) => this.dispatch(receiveToken(json)));
      }
      const error = new Error('Received error response from server');
      error.resp = resp;
      throw error;
    }).catch((err) => {
      this.dispatch(receiveTokenError(err));
    });
  }
}
