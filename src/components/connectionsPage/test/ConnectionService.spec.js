/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchConnections, REQUEST_CONNECTIONS } from '../ConnectionService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ConnectionService', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('gets connection successfully', () => {
    const connections = [{
      title: 'Connection1',
      description: 'short description',
      rows: [{ label: 'Engine host', value: 'IBM235-R90GWC4Q' },
         { label: 'ConnectionType', value: 'HDFS-FileConnector' },
         { label: 'CreatedBy', value: 'isadmin' }],
    }];
    fetchMock.post('/ibm/iis/imam/dcm/searchDC', connections);

    const store = mockStore({ });
    store.dispatch(fetchConnections({ q: 'Used', rows: 10 }));
    expect(store.getActions()[0]).toEqual({ isFetching: true, type: REQUEST_CONNECTIONS });
  });

  it('gets all connection if no query specified', () => {
    const allConnections = [{
      title: 'Connection1',
      description: 'short description',
      rows: [{ label: 'Engine host', value: 'IBM235-R90GWC4Q' },
         { label: 'ConnectionType', value: 'HDFS-FileConnector' },
         { label: 'CreatedBy', value: 'isadmin' }],
    }];
    fetchMock.post('/ibm/iis/imam/dcm/searchDC', allConnections);

    const store = mockStore({ });
    store.dispatch(fetchConnections());
    expect(store.getActions()[0]).toEqual({ isFetching: true, type: REQUEST_CONNECTIONS });
  });
});
