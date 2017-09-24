/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import SideMenu from '../SideMenu';

describe('SideMenu Component (<SideMenu/>)', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SideMenu />);
  });

  it('should render a basic SideMenu', () => {
    expect(wrapper.instance()).toBeInstanceOf(SideMenu);
  });
  it('toggleSideMenu function must work as expected ', () => {
    wrapper.setState({ isOpen: true, isExpanded: true });
    wrapper.instance().toggleSideMenu();
    expect(wrapper.state().isExpanded).toBe(false);
  });
  it('toggleSideMenuExpanded function must work as expected ', () => {
    wrapper.setState({ isExpanded: false });
    wrapper.instance().toggleSideMenuExpanded();
    expect(wrapper.state().isExpanded).toBe(true);
  });
  it('Must close when we click on cross button ', () => {
    wrapper.setState({ isOpen: true });
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.state().isOpen).toBe(false);
  });
  it('Must change extended flag when we simulate toggleSideMenu button', () => {
    wrapper.setState({ isExpanded: false });
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.state().isExpanded).toBe(true);
  });
  it('Must toggle when we simulate "open menu" button ', () => {
    wrapper.setState({ isOpen: true, isExpanded: true });
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.state().isOpen).toBe(false);
  });
});
