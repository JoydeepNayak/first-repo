import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import LoginPage from '../LoginPage';

describe('<LoginPage />', () => {
  it('should contain username, password, SignIn button and others', () => {
    const renderedComponent = mount(<LoginPage login={() => {}} redirect={() => {}} />);
    expect(renderedComponent.find('TextField').find({ placeholder: 'Username' }).type()).toEqual('input');
    expect(renderedComponent.find('TextField').find({ placeholder: 'Password' }).type()).toEqual('input');
    expect(renderedComponent.find('button').at(0).text()).toEqual('Sign In');
    expect(renderedComponent.find('h3').at(0).text()).toEqual('IBM Product Name');
    expect(renderedComponent.find('Tabs').find('li').at(0).text()).toEqual('Sign In');
  });

  it('should contain error message', () => {
    const error = 'error occurred';
    const renderedComponent = mount(<LoginPage login={() => {}} redirect={() => {}} errorMessage={error} />);
    expect(renderedComponent.find('.alertMessage').at(0).text()).toEqual(error);
  });

  it('SignIn button clicked calling loginUser function with username and password', () => {
    const usernameValue = 'User';
    const passwordValue = 'Password';
    let loginUserCalled = false;
    const loginUser = (username, password) => {
      expect(username).toEqual(usernameValue);
      expect(password).toEqual(passwordValue);
      loginUserCalled = true;
    };
    const renderedComponent = mount(<LoginPage login={loginUser} redirect={() => {}} />);
    renderedComponent.find('TextField').find({ placeholder: 'Username' }).at(0).simulate('change', { target: { value: usernameValue } });
    renderedComponent.find('TextField').find({ placeholder: 'Password' }).at(0).simulate('change', { target: { value: passwordValue } });

    renderedComponent.find('button').at(0).simulate('click');
    expect(loginUserCalled).toEqual(true);
  });

  it('submitted by hitting ENTER', () => {
    const usernameValue = 'User';
    const passwordValue = 'Password';
    let loginUserCalled = false;
    const loginUser = (username, password) => {
      expect(username).toEqual(usernameValue);
      expect(password).toEqual(passwordValue);
      loginUserCalled = true;
    };
    const renderedComponent = mount(<LoginPage login={loginUser} redirect={() => {}} />);
    renderedComponent.find('TextField').find({ placeholder: 'Username' }).at(0).simulate('change', { target: { value: usernameValue } });
    renderedComponent.find('TextField').find({ placeholder: 'Password' }).at(0).simulate('change', { target: { value: passwordValue } });
    renderedComponent.find('TextField').find({ placeholder: 'Username' }).simulate('keypress', { key: 'Enter' });
    renderedComponent.find('TextField').find({ placeholder: 'Password' }).simulate('keypress', { key: 'Enter' });
    expect(loginUserCalled).toEqual(true);
    loginUserCalled = false;
    renderedComponent.find('TextField').find({ placeholder: 'Username' }).simulate('keypress', { key: 'x' });
    renderedComponent.find('TextField').find({ placeholder: 'Password' }).simulate('keypress', { key: 'x' });
    expect(loginUserCalled).toBeFalsy();
  });

  it('displays Loader', () => {
    jest.useFakeTimers();
    const renderedComponent = mount(<LoginPage login={() => {}} redirect={() => {}} />);
    renderedComponent.setProps({ isFetching: true });
    jest.runAllTimers();
    expect(renderedComponent.find('Loader').length).toEqual(1);
  });

  it('redirects when authenticated', () => {
    const redirect = sinon.spy();
    mount(<LoginPage login={() => {}} redirect={redirect} isAuthenticated />);

    expect(redirect.calledOnce).toEqual(true);
  });

  it('redirects when authenticated changed', () => {
    const redirect = sinon.spy();
    const renderedComponent = mount(<LoginPage login={() => {}} redirect={redirect} />);
    renderedComponent.setProps({ isAuthenticated: true });
    expect(redirect.calledOnce).toEqual(true);
  });

  it('unmount', () => {
    const renderedComponent = mount(<LoginPage login={() => {}} redirect={() => {}} />);
    renderedComponent.unmount();
  });

  it('uses messages', () => {
    const renderedComponent = mount(<LoginPage login={() => {}} redirect={() => {}} messages={{ productName: 'name' }} />);
    expect(renderedComponent.find('h3').at(0).text()).toEqual('name');
    renderedComponent.setProps({ messages: { productName: 'name2' } });
    expect(renderedComponent.find('h3').at(0).text()).toEqual('name2');
  });
});
