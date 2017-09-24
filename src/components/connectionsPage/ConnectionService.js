/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

export const REQUEST_CONNECTIONS = 'REQUEST_CONNECTIONS';
const connectionsAreLoading = (bool) => ({
  type: REQUEST_CONNECTIONS,
  isFetching: bool,
});

export const RECEIVE_CONNECTIONS = 'RECEIVE_CONNECTIONS';
const allConnections = (connections) => ({
  type: RECEIVE_CONNECTIONS,
  isFetching: false,
  connections,
});

export const RECEIVE_CONNECTIONS_ERROR = 'RECEIVE_CONNECTIONS_ERROR';
const allConnectionsError = (error) => ({
  type: RECEIVE_CONNECTIONS_ERROR,
  isFetching: false,
  error,
});

export default function fetchConnections(query) {
  const requestData = { params: {} };
  if (!query) {
    // Fetch all connections if no query specified.
    requestData.params.q = 'assetType: DataConnections';
  } else {
    requestData.params.q = query.q;
    if (query.rows) {
      requestData.params.rows = query.rows;
    }
  }

  const headers = {
    method: 'POST',
    body: JSON.stringify(requestData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  // FIXME: Hardcoded for now. Will change once integrated with backend
  const url = '/ibm/iis';
  return (dispatch) => {
    // set the loading bit
    dispatch(connectionsAreLoading(true));

    fetch(`${url}/imam/dcm/searchDC`, headers)
      .then((result) => {
        if (!result.ok) {
          throw new Error('Unexpected response status: {result.status}');
        }
        return result.json();
      })
      .then((json) => dispatch(allConnections(json)))
      .catch((error) => dispatch(allConnectionsError(error)));
  };
}

module.exports.fetchConnections = fetchConnections;
