/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import SideMenuTray from '../SideMenuTray';
describe('SideMenuTray Component (<SideMenuTray />)', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SideMenuTray />);
  });

  it('should render a basic SideMenuTray', () => {
    expect(wrapper.instance()).toBeInstanceOf(SideMenuTray);
  });
});
