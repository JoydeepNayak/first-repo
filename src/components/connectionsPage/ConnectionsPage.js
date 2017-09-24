/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import CardLayoutManager from '../layoutManager/CardLayoutManager';
import LoaderContainer from '../loaderContainer/LoaderContainer';
import { fetchConnections } from './ConnectionService';
import ConnectionsFactory from './ConnectionsFactory';


export class ConnectionsPage extends Component {
  constructor(props) {
    super(props);
    this.loader = this.loader.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchConnections(this.props.query));
  }

  loader() {
    const connections = transform(this.props.connections.rows);
    const layout = [];
    for (let i = 0; i < connections.length; i += 1) {
      // Define a 4 column layout of cards with each card of 1 unit width
      // Cards are not draggable or resizable but layout should resize
      // as per zoom level or window resize (breakpoints)
      layout[i] = {
        properties: { i: (`card${i}`), x: (i % 4), y: (Math.floor(i / 4) * 2) + 1, h: 2.15, w: 1, isDraggable: false },
        childProps: { data: connections[i] },
      };
    }
    return {
      version: 1,
      cols: {
        lg: 4,
        md: 4,
        sm: 3,
        xs: 2,
        xxs: 1,
      },
      items: layout,
    };
  }

  render() {
    if (this.props.isFetching) {
      return (<LoaderContainer />);
    } else if (this.props.connections) {
      const factoryList = [ConnectionsFactory];
      return (
        <CardLayoutManager load={this.loader} factoryList={factoryList} />
      );
    }
    return (<div>Could not load connections: {this.props.errorMessage}</div>);
  }
}

ConnectionsPage.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};

ConnectionsPage.propTypes = {
  connections: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.object,
  query: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    errorMessage: getErrorMessage(state.connections),
    isFetching: state.connections.isFetching,
    connections: state.connections.connections,
  };
}

export default connect(mapStateToProps)(ConnectionsPage);

const getErrorMessage = (connections) => {
  if (!connections || !connections.error) {
    return null;
  }
  const errorCode = connections.error.resp && connections.error.resp.status;
  switch (errorCode) {
    case 401:
      return 'No privileges';
    default: {
      return 'Unknown error occurred. Please contact Administrator.';
    }
  }
};

function transform(apiResponse) {
  const connArray = [];
  let rows;
  let obj1;
  let i = 0;

  for (i = 0; i < apiResponse.length; i += 1) {
    obj1 = {};
    obj1.title = apiResponse[i].NAME;
    obj1.description = apiResponse[i].SHORTDESCRIPTION;
    rows = [];
    rows.push({ label: 'Engine host', value: apiResponse[i].HOSTNAME });
    rows.push({ label: 'Connection type', value: apiResponse[i].CONNECTIONTYPE });
    obj1.rows = rows;
    connArray.push(obj1);
  }
  return connArray;
}
