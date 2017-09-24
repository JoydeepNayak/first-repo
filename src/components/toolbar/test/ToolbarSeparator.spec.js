/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import ToolbarSeparator from '../ToolbarSeparator';

describe('<ToolbarSeparator>', () => {
  it('renders ToolbarSeparator and by default left', () => {
    const wrapper = shallow(<ToolbarSeparator />);
    expect(wrapper.find('div.toolbar-separator')).toBeDefined();
    expect(wrapper.find('div.postion-left')).toBeDefined();
  });

  it('renders ToolbarSeparator and postion right', () => {
    const wrapper = shallow(<ToolbarSeparator position="right" />);
    expect(wrapper.find('div.toolbar-separator')).toBeDefined();
    expect(wrapper.find('div.postion-right')).toBeDefined();
  });
});
