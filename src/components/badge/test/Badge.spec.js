/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2016, 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/


import React from 'react';
import { mount } from 'enzyme';
import Badge from '../Badge';

describe('Test on Badge Component ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Badge count={20} position="top-right" />);
  });
  it('1-Must render Badge component ', () => {
    expect(wrapper.instance()).toBeInstanceOf(Badge);
  });
  it('2-Must receive the same count value as props as sent ', () => {
    expect(wrapper.instance().props.count).toBe(20);
  });
  it('3-Must receive the same position value as the props as sent ', () => {
    expect(wrapper.instance().props.position).toBe('top-right');
  });
});
