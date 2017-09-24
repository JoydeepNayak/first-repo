/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '../MenuItem';
import * as config from './Menu.mock.json';

describe('Menu Component (<Menu/>)', () => {
  let wrapper;
  let cb;
  const data = config.mainMenuFields[0].sub[0];

  beforeEach(() => {
    cb = jest.fn();
    wrapper = shallow(<MenuItem data={data} customClass="menu-link" cbClick={cb} />);
  });

  it('should initialize given proper configuration params', () => {
    expect(wrapper.find('.menu-link').node).toBeDefined();
  });

  it('should give an iconUrl when provided', () => {
    const result = wrapper.instance().getIcon();
    expect(result).toBeInstanceOf(Object);
  });

  it('should return a notification if given', () => {
    wrapper.instance().props.data.count = 2;
    const result = wrapper.instance().getNotification();
    expect(result).toBeInstanceOf(Object);
  });

  it('should fire the callback if provided', () => {
    wrapper.instance().handleClick();
    expect(cb).toBeCalled();
  });

  it('should handle links appropriately', () => {
    wrapper = shallow(<MenuItem data={data} customClass="menu-link" />);
    const fn = jest.fn();
    wrapper.instance().handleClick('', { preventDefault: fn });
    expect(cb.mock.calls.length).toBe(0);
    expect(fn).toBeCalled();
  });
});
