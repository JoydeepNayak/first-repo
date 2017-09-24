/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectionsPage from '../ConnectionsPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<ConnectionsPage />', () => {
  it('renders Card Layout Manager correctly', () => {
    const store = mockStore({
      connections: {
        error: null,
        isFetching: false,
        connections: {
          rows: [{
            HOSTNAME: 'IBM235-R90GWC4Q',
            NAME: 'DB2DSN_conn',
            CONNECTIONTYPE: 'ODBCConnector',
            ID: 'b1c497ce.8e4c0a48.taill420p.a8jreqe.fs19il.foq0rsmp2i4ven58cch3r',
          }],
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectionsPage
          query={{ q: 'Used', rows: 10 }}
          connections={{
            rows: [{
              HOSTNAME: 'IBM235-R90GWC4Q',
              NAME: 'DB2DSN_conn',
              CONNECTIONTYPE: 'ODBCConnector',
              ID: 'b1c497ce.8e4c0a48.taill420p.a8jreqe.fs19il.foq0rsmp2i4ven58cch3r',
            }],
          }}
        />
      </Provider>
    );

    // See whether display card gets rendered.
    expect(wrapper.find('CardLayoutManager').node).toBeDefined();
  });

  it('renders Loader while connections are loading', () => {
    const store = mockStore({
      connections: {
        error: null,
        isFetching: true,
        connections: undefined,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectionsPage query={{ q: 'Used', rows: 10 }} />
      </Provider>
    );

    // See whether display card gets rendered.
    expect(wrapper.find('LoaderContainer').node).toBeDefined();
  });

  it('renders error message in case of error', () => {
    const store = mockStore({
      connections: {
        error: 'Error',
        isFetching: false,
        connections: undefined,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectionsPage query={{ q: 'Used', rows: 10 }} />
      </Provider>
    );

    // See whether display card gets rendered.
    expect(wrapper.find('div').at(0).text()).toEqual('Could not load connections: Unknown error occurred. Please contact Administrator.');
  });

  it('renders error message in case of 401', () => {
    const store = mockStore({
      connections: {
        error: { resp: { status: 401 } },
        isFetching: false,
        connections: undefined,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectionsPage query={{ q: 'Used', rows: 10 }} />
      </Provider>
    );

    // See whether display card gets rendered.
    expect(wrapper.find('div').at(0).text()).toEqual('Could not load connections: No privileges');
  });
});
