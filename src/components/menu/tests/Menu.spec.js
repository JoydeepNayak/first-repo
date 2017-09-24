/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import previous24 from 'ibm-design-icons/dist/svg/action-based/previous_24.svg';
import Menu from '../Menu';
import * as config from './Menu.mock.json';

describe('Menu Component (<Menu/>)', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Menu config={config} headerIcon={previous24} customClass="menu-header" />);
  });

  it('should render a basic menu', () => {
    expect(wrapper.find('.menu').node).toBeDefined();
  });
  it('should open on click', () => {
    wrapper.find('span').simulate('click');
    expect(wrapper.instance().state.show).toBeTruthy();
  });
  it('should close on mouseout', () => {
    wrapper.simulate('click');
    wrapper.simulate('mouseout');
    expect(wrapper.instance().state.show).toBeFalsy();
  });
  it('should render a child item when present', () => {
    expect(wrapper.find('MenuItem').node).toBeDefined();
  });
  it('should flip the state to show on call', () => {
    wrapper.instance().showMenu();
    expect(wrapper.instance().state.show).toBeTruthy();
  });
  it('should flip the state to hide on call', () => {
    wrapper.instance().hideMenu();
    expect(wrapper.instance().state.show).toBeFalsy();
  });
  it('should render content inside of sub-navigation items', () => {
    wrapper.instance().hideMenu();
    expect(wrapper.instance().state.show).toBeFalsy();
  });
  it('should show nav data parent title', () => {
    wrapper.setState({
      navData: { showParentList: true, mainMenuFields: [] },
      navDataRecentHistory: {},
    });
    const showParentList = wrapper.instance().state.navData.showParentList;
    if (showParentList) {
      expect(wrapper.find('MenuItem').node).toBeDefined();
    } else {
      expect(wrapper.find('MenuItem').node).toBeUndefined();
    }
  });
  it('should set navigation data to the submenu in checkChildMenu()', () => {
    const data = config.mainMenuFields[0];
    wrapper.instance().checkChildMenu(data);
    expect(wrapper.instance().state.navData).toBe(data.sub[0]);
  });
  it('should assign history appropriately in checkParentMenu()', () => {
    const history = [1, 2, 3];
    wrapper.setState({ navDataHistory: history });
    wrapper.instance().checkParentMenu();
    expect(wrapper.instance().state.navDataRecentHistory).toBe(history);
  });
  it('should assign history in checkMainParentMenu()', () => {
    const history = config;
    wrapper.setState({
      navData: { mainMenuFields: [] },
      navDataHistory: history,
      navDataRecentHistory: [],
    });
    wrapper.instance().checkMainParentMenu();
    expect(wrapper.instance().state.navData).toEqual(history);
  });

  it('should respond to click on header', () => {
    const data = config.mainMenuFields[1].sub[0].mainMenuFields[0];
    wrapper.find('MenuItem').at(0).simulate('click', { preventDefault() {} });
    wrapper.instance().checkChildMenu(data);
    expect(wrapper.instance().state.navDataRecentHistory).toBeDefined();
  });
  it('should set the navData if required from checkParentMenu()', () => {
    const history = config;
    wrapper.setState({
      navData: { mainMenuFields: [] },
      navDataRecentHistory: history,
    });
    wrapper.instance().checkParentMenu();
    expect(wrapper.instance().state.navData).toEqual(history);
  });
  it('should call on click function for the it', () => {
    const clickFuncSpy = sinon.spy();
    const newWrapper = shallow(
      <Menu
        config={{
          title: 'Main menu',
          mainMenuFields: [
            {
              name: 'action A',
              onClickFunc: clickFuncSpy,
            },
            {
              name: 'action B',
              link: '',
            },
          ],
        }}
        headerIcon={previous24}
        customClass="menu-header"
      />);
    // first item in index 0 is the main menu
    // second item in index 1 is the action A
    const itemWrapper = newWrapper.find('MenuItem').at(1).shallow();
    itemWrapper.simulate('click');
    expect(clickFuncSpy.called).toBeTruthy();
  });
});
