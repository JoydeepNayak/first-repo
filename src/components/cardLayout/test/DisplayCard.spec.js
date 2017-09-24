/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import DisplayCard from '../DisplayCard';

describe('<DisplayCard>', () => {
  it('renders card with default layout', () => {
    const dataObj = {
      title: 'Connection1',
      description: 'short description',
      rows: [{ label: 'Engine host', value: 'IBM235-R90GWC4Q' },
         { label: 'ConnectionType', value: 'HDFS-FileConnector' },
         { label: 'CreatedBy', value: 'isadmin' }],
    };
    const wrapper = shallow(<DisplayCard data={dataObj} />);
    expect(wrapper.find('BaseCard').node).toBeDefined();
  });

  it('renders card with child nodes', () => {
    const wrapper = shallow(<DisplayCard id="myId"><div>My Content</div></DisplayCard>);
    expect(wrapper.find('#myId').node).toBeDefined();
    expect(wrapper.find('.icon SvgIcon').node).toBeUndefined();
  });

  it('should display svgIcon when required', () => {
    const wrapper = shallow(<DisplayCard id="myId" isDraggable><div>My Content</div></DisplayCard>);
    expect(wrapper.find('.icon SvgIcon').node).toBeDefined();
  });
});
