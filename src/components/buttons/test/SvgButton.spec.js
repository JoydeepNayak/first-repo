/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { shallow } from 'enzyme';
import SvgButton from '../SvgButton';

describe('SvgButton', () => {
  it('renders SvgButton with icon only', () => {
    const wrapper = shallow(<SvgButton icon="test" />);
    expect(wrapper.find('button').node).toBeDefined();
    expect(wrapper.find('SvgIcon').node).toBeDefined();
  });
});
