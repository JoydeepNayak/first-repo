/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import SvgIcon from '../SvgIcon';

describe('<SvgIcon />', () => {
  it('should display something', () => {
    const wrapper = shallow(<SvgIcon data={'data:image/svg+xml,table24'} />);
    expect(wrapper.find('svg').length).toBe(1);
  });
});
