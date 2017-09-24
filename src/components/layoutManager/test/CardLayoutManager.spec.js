/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import CardLayoutManager from 'layoutManager/CardLayoutManager';
const layout = {
  version: 1,
  cols: { lg: 12, md: 10, sm: 8, xs: 5, xxs: 2 },
  items:
  [{ classname: 'Activity', properties: { i: '1', x: 0, y: 0, w: 4, h: 1, minW: 4, maxW: 8 } },
   { classname: 'Latest News', properties: { i: '2', x: 4, y: 0, w: 8, h: 1, minW: 4, maxW: 8 } }] };

let loader = function load() {
  return layout;
};
const Factory = {};
Factory.make = jest.fn();
const arr = [Factory];
const saveFn = sinon.spy();

describe('<CardLayoutManager>', () => {
  it('renders card with given layout', () => {
    const wrapper = shallow(<CardLayoutManager load={loader} factoryList={arr} save={saveFn} />);
    expect(wrapper.find('DisplayCard').node).toBeDefined();
  });

  it('renders error div for incorrect layout', () => {
    loader = function load() { return {}; };
    const wrapper = shallow(<CardLayoutManager load={loader} factoryList={arr} save={saveFn} />);
    expect(wrapper.find('div').at(0).text()).toEqual('Error: Please provide a loader with appropriate format');
  });

  it('changes state after first load', () => {
    const wrapper = shallow(<CardLayoutManager load={loader} factoryList={arr} save={saveFn} />);
    expect(wrapper.instance().state.hasChanged).toEqual(false);
    wrapper.instance().onLayoutChange(layout);
    expect(wrapper.instance().state.hasChanged).toEqual(true);
  });

  it('saves only when layout changes', () => {
    const wrapper = shallow(<CardLayoutManager load={loader} factoryList={arr} save={saveFn} />);
    expect(saveFn.calledOnce).toEqual(false);
    wrapper.setState({ hasChanged: true });
    wrapper.instance().onLayoutChange(layout);
    expect(saveFn.calledOnce).toEqual(true);
  });
});
