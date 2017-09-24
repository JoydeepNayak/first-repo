/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { mount, shallow } from 'enzyme';
import styles from '../Header.scss';
import Header from '../Header';
import Menu from '../../menu/Menu';
import ibmLogo from '../../icons/ibmLogo.svg';
import SvgIcon from '../../icons/SvgIcon';

describe('<Header />', () => {
  const mainMenuConfig = {
    title: 'Main menu',
    mainMenuFields: [
      {
        name: 'action A',
        link: '',
      },
      {
        name: 'action B',
        link: '',
      },
    ],
  };
  const notificationMenuConfig = {
    title: 'Notification',
    link: '',
    mainMenuFields: [
      {
        name: 'Attention required',
        link: '',
      },
      {
        name: 'Asset and approvals',
        link: '',
      },
      {
        name: 'Approved assets',
        link: '',
      },
    ],
  };
  const accountMenuConfig = {
    title: 'Account',
    link: '',
    mainMenuFields: [
      {
        name: 'Preferences',
        link: '',
      },
      {
        name: 'Tutorial',
        link: '',
      },
      {
        name: 'About',
        link: '',
      },
      {
        name: 'Logout',
        link: '',
      },
    ],
  };
  describe('styling class', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Header
        accountMenuConfig={accountMenuConfig}
      />);
    });
    it('should have container class style', () => {
      expect(wrapper.find(`.${styles.headerContainer}`)).toHaveLength(1);
    });
    it('should have 4 default items', () => {
      expect(wrapper.find(`.${styles.headerItem}`)).toHaveLength(4);
    });
    it('should not have children from outside', () => {
      expect(wrapper.find(`.${styles.headerChildren}`)).toHaveLength(0);
    });
    it('should have children from outside', () => {
      wrapper = mount(
        <Header
          accountMenuConfig={accountMenuConfig}
        >
          <div>something</div>
        </Header>);
      expect(wrapper.find(`.${styles.headerChildren}`)).toHaveLength(1);
    });
  });
  describe('content: All items exist', () => {
    const iconPath = 'icons/path.svg';
    const brandingSVG = <SvgIcon data={iconPath} />;
    it('should have all 3 menus', () => {
      const wrapper = shallow(
        <Header
          mainMenuConfig={mainMenuConfig}
          notificationMenuConfig={notificationMenuConfig}
          accountMenuConfig={accountMenuConfig}
        />
      );
      expect(wrapper.find(Menu)).toHaveLength(3);
    });
    it('should render icon from prop', () => {
      const wrapper = shallow(
        <Header
          mainMenuConfig={mainMenuConfig}
          notificationMenuConfig={notificationMenuConfig}
          accountMenuConfig={accountMenuConfig}
          brandingSVG={brandingSVG}
        />
      );
      expect(wrapper.find(SvgIcon).props().data).toEqual(iconPath);
    });
    it('should render ibm icon', () => {
      const wrapper = shallow(
        <Header
          mainMenuConfig={mainMenuConfig}
          notificationMenuConfig={notificationMenuConfig}
          accountMenuConfig={accountMenuConfig}
        />
      );
      expect(wrapper.find(SvgIcon).props().data).toEqual(ibmLogo);
    });
  });
});
