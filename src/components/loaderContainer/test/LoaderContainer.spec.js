/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import LoaderContainer from '../LoaderContainer';

describe('<LoaderContainer />', () => {
  it('should display Loader element', () => {
    const wrapper = shallow(<LoaderContainer />);
    expect(wrapper.find('Loader').node).toBeDefined();
  });

  it('should pass props to Loader element', () => {
    const wrapper = shallow(<LoaderContainer prop={'xyz'} />);
    expect(wrapper.find('Loader').props().prop).toBe('xyz');
  });
});
