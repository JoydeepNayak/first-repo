/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2016, 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/


import React from 'react';
import { mount } from 'enzyme';
import BadgeCount from '../BadgeCount';

describe('Test on BadgeCount Component ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BadgeCount count={20} position="top-right" />);
  });
  it('1-Must render BadgeCount component ', () => {
    expect(wrapper.instance()).toBeInstanceOf(BadgeCount);
  });
  it('2-Must change props "show" to true on function call ', () => {
    const test = { count: 11, position: 'top-right', radius: 8, isEnableHide: false, show: false };
    wrapper.instance().componentWillReceiveProps(test);
    expect(wrapper.instance().state.show).toBe(true);
  });
  it('3-Must change props "show" to false on function call ', () => {
    const test = { count: 0, position: 'top-right', radius: 8, isEnableHide: false, show: true };
    wrapper.instance().componentWillReceiveProps(test);
    expect(wrapper.instance().state.show).toBe(false);
  });
});
