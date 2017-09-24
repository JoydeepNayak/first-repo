/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2017
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import DonutChart from '../DonutChart';

describe('<DonutChart />', () => {
  const mockEntities = [
    {
      label: 'male',
      count: 10,
    },
    {
      label: 'female',
      count: 8,
    },
  ];
  it('should display an svg element', () => {
    const wrapper = shallow(<DonutChart entities={mockEntities} />);
    expect(wrapper.find('svg').node).toBeDefined();
  });
  it('should display legends', () => {
    const wrapper = mount(<DonutChart entities={mockEntities} />);
    expect(wrapper.find('.legendEntity')).toHaveLength(mockEntities.length);
  });
  // TODO: add test for click on slice. Currently blocked because nothing is
  // rendered inside svg
});
