/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import ToolbarItem from '../ToolbarItem';

describe('<ToolbarItem>', () => {
  it('renders ToolbarItem and postion left by default', () => {
    const wrapper = shallow(<ToolbarItem />);
    expect(wrapper.find('div.toolbar-item')).toBeDefined();
    expect(wrapper.find('div.postion-left')).toBeDefined();
  });

  it('renders ToolbarItem and postion right', () => {
    const wrapper = shallow(<ToolbarItem position="right" />);
    expect(wrapper.find('div.toolbar-item')).toBeDefined();
    expect(wrapper.find('div.postion-left')).toBeDefined();
  });
});
