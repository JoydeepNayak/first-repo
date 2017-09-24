/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from '../Toolbar';

describe('<Toolbar>', () => {
  it('renders toolbar', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.find('div.toolbar-container')).toBeDefined();
  });
});
