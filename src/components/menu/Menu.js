/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { PropTypes } from 'react';
import cx from 'classnames';

import SvgIcon from '../icons/SvgIcon';
import MenuItem from './MenuItem';
import styles from './menu.scss';

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.checkChildMenu = this.checkChildMenu.bind(this);
    this.checkParentMenu = this.checkParentMenu.bind(this);
    this.checkMainParentMenu = this.checkMainParentMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.state = {
      navData: this.props.config,
      navDataRecentHistory: null,
      navDataHistory: null,
      show: false,
    };
  }

  checkMainParentMenu() {
    if (this.state.navDataHistory) {
      this.setState({ navData: this.state.navDataHistory });
    }
  }

  checkParentMenu() {
    if (this.state.navDataRecentHistory) {
      this.setState({ navData: this.state.navDataRecentHistory });
    }
    if (this.state.navDataHistory) {
      this.setState({ navDataRecentHistory: this.state.navDataHistory });
    }
  }

  checkChildMenu(navData) {
    if (navData.sub) {
      if (!this.state.navDataRecentHistory) {
        this.setState({ navDataRecentHistory: this.state.navData });
      } else {
        this.setState({ navDataHistory: this.state.navDataRecentHistory });
        this.setState({ navDataRecentHistory: this.state.navData });
      }
      this.setState({ navData: navData.sub[0] });
    }
    if (navData.onClickFunc) {
      // on click function is provided for this menu item
      navData.onClickFunc(navData);
    }
  }

  hideMenu() {
    this.setState({ show: false });
  }

  showMenu() {
    this.setState({ show: true });
  }

  render() {
    const navData = this.state.navData;
    const { headerIcon, customClass } = this.props;
    return (
      <div
        className={styles.menu}
        onMouseLeave={this.hideMenu}
      >
        <span
          role="presentation"
          className={styles.menuIcon}
          onClick={() => { this.showMenu(); }}
        >
          <SvgIcon data={headerIcon} />
        </span>
        <div
          className={this.state.show ? cx(styles.navMenu, customClass) : styles.hide}
        >
          {navData.showParentList ? <MenuItem customClass={styles.menuHeader} data={this.state.navDataRecentHistory} cbClick={() => { this.checkMainParentMenu(); }} /> : ''}
          <MenuItem
            customClass={styles.menuHeader}
            data={navData}
            cbClick={() => { this.checkParentMenu(); }}
          />
          {navData.mainMenuFields.map((item) => (
            <MenuItem
              key={`${item.name}`}
              customClass={styles.menuLink}
              data={item}
              cbClick={() => { this.checkChildMenu(item); }}
            />
          ))}
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  config: PropTypes.object.isRequired,
  customClass: PropTypes.string,
  headerIcon: PropTypes.string,
};
