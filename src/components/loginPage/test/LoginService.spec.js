import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import LoginService from '../LoginService';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LoginService', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('login successful', () => {
    const responseToken = {
      access_token: 'fakefakefake',
      token_type: 'bearer',
      expired_in: 600,
    };
    fetchMock.post('*', responseToken);

    const expectedActions = [
      { creds: { username: 'user' }, type: LoginService.REQUEST_TOKEN },
      { token: { accessToken: 'fakefakefake', expired_in: 600, token_type: 'bearer' }, type: LoginService.RECEIVE_TOKEN },
    ];
    const store = mockStore({ });

    return (new LoginService('fakeurl', store.dispatch).login('user', 'passw0rd'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('login failed', () => {
    fetchMock.post('*', 401);

    const store = mockStore({ });

    return (new LoginService('fakeurl', store.dispatch).login('user', 'passw0rd'))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).toEqual({ creds: { username: 'user' }, type: LoginService.REQUEST_TOKEN });
        expect(store.getActions()[1]).toEqual(expect.objectContaining({ type: LoginService.RECEIVE_TOKEN_ERROR }));
      });
  });
});
