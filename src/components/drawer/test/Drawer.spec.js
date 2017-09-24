 /*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2016, 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import Drawer from '../Drawer';

describe('Drawer Component Testing (<Drawer />)', () => {
  let wrapper;
  let wrapperProps;
  let props;

  beforeEach(() => {
    props = {
      position: 'left',
      size: 2,
      classNameDrawer: 'abc',
      width: '400px',
    };
    wrapper = shallow(<Drawer />);
    wrapperProps = shallow(<Drawer {...props} />);
  });
  it('1-Must render Drawer component with props ', () => {
    expect(wrapperProps.instance()).toBeInstanceOf(Drawer);
  });
  it('2-Must render Drawer component with default props ', () => {
    expect(wrapper.instance()).toBeInstanceOf(Drawer);
  });
  it('3-Must toggle the isOpen value ', () => {
    wrapperProps.instance().toggleDrawer();
    expect(wrapperProps.instance().state.isOpen).toBe(true);
  });
});
