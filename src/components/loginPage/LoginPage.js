import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Tabs, TextField, Button, Loader } from 'ap-components-react';
import _ from 'lodash';
import styles from './LoginPageStyles.scss';


// todo accessibility

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showLoader: false,
    };
    this.messages = Object.assign({}, defaultMessages, this.props.messages);
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.redirect();
    }
    this.tabId = _.uniqueId('gov_shared_ui_loginPage_tab_');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      nextProps.redirect();
    }
    if (nextProps.isFetching) {
      this.timer = setTimeout(() => { this.setState(Object.assign({}, this.state, { showLoader: true })); }, 1000);
    } else {
      clearTimeout(this.timer);
      this.setState(Object.assign({}, this.state, { showLoader: false }));
    }
    if (nextProps.messages) {
      this.messages = Object.assign({}, this.messages, nextProps.messages);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  usernameSubmitted(e) {
    if (e.key === 'Enter') {
      const password = findDOMNode(this.passwordInput).children[1];
      password.focus();
    }
  }

  passwordSubmitted(e) {
    if (e.key === 'Enter') {
      this.props.login(this.state.username, this.state.password);
    }
  }

  renderLoader() {
    if (this.state.showLoader) {
      return (
        <div className={styles.overlayCenter}>
          <Loader small />
        </div>
      );
    }
    return '';
  }

  renderErrorMessage(errorMessage) {
    if (errorMessage) {
      return (
        <div className={styles.messagePlaceholder} >
          <svg
            className="icon--24 icon--error"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle fill="#E71D32" cx="12" cy="12" r="11" />
            <path fill="#FFF" d="M11 15h2v2h-2v-2zm2-5l-.6 3.6h-.8L11 10V6h2" />
          </svg>
          <div className={styles.alertMessage}>
            {errorMessage}
          </div>
        </div>
      );
    }
    return <div className={styles.messagePlaceholder} />;
  }

  render() {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginPageMainDiv}>
          <div className={styles.topBelt} />
          <h3>{this.messages.productName}</h3>
          <div className={styles.fieldsAndButton}>
            <Tabs>
              <Tabs.Panel title={this.messages.panelTitle} id={this.tabId}>
                <div className={styles.emptyBelt} />
                <TextField
                  placeholder={this.messages.username}
                  autoFocus
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  onKeyPress={(e) => this.usernameSubmitted(e)}
                />
                <TextField
                  ref={(field) => { this.passwordInput = field; }}
                  placeholder={this.messages.password}
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  onKeyPress={(e) => this.passwordSubmitted(e)}
                />
                {this.renderErrorMessage(this.props.errorMessage)}
                {this.renderLoader()}

                <div className={styles.emptyBelt} />
                <Button
                  medium
                  semantic
                  className={styles.signInButton}
                  onClick={() => this.props.login(this.state.username, this.state.password)}
                >{this.messages.signInButton}
                </Button>
              </Tabs.Panel>
            </Tabs>
          </div>

        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
  login: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
// eslint-disable-next-line react/no-unused-prop-types
  isFetching: PropTypes.bool,
  messages: PropTypes.object,
};

const defaultMessages = {
  productName: 'IBM Product Name',
  panelTitle: 'Sign In',
  username: 'Username',
  password: 'Password',
  signInButton: 'Sign In',
};
