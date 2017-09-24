/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import CardLayout from 'cardLayout/CardLayout';

describe('<CardLayout>', () => {
  it('renders card with default layout', () => {
    const dataObj = [{
      title: 'Connection1',
      description: 'short description',
      rows: [{ label: 'Engine host', value: 'IBM235-R90GWC4Q' },
         { label: 'ConnectionType', value: 'HDFS-FileConnector' },
         { label: 'CreatedBy', value: 'isadmin' }],
    },
    {
      title: 'Connection2',
      description: 'short description',
      rows: [{ label: 'Engine host', value: 'IBM235-R90GWC4Q' },
         { label: 'ConnectionType', value: 'HDFS-FileConnector' },
         { label: 'CreatedBy', value: 'isadmin' }],
    }];
    const wrapper = shallow(<CardLayout data={dataObj} />);
    expect(wrapper.find('DisplayCard').node).toBeDefined();
  });
});
