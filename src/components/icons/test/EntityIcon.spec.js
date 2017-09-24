/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import EntityIcon from '../EntityIcon';

describe('<EntityIcon />', () => {
  it('should display something', () => {
    const wrapper = shallow(<EntityIcon entityType={'database_table'} />);
    expect(wrapper.find('SvgIcon').length).toBe(1);
  });
});
