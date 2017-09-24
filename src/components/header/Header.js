/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import PropTypes from 'prop-types';
import notificationIcon from 'ibm-design-icons/dist/svg/object-based/user_32.svg';
import mainMenuIcon from 'ap-icons/svg/general/menu_32.svg';
import bellIcon from 'ap-icons/svg/general/bell_32.svg';
import Badge from '../badge/Badge';
import styles1 from '../../index.scss';

import ibmLogo from '../icons/ibmLogo.svg';
import styles from './Header.scss';
import Menu from '../menu/Menu';
import SvgIcon from '../icons/SvgIcon';

const Header = (props) => {
  const {
    mainMenuConfig,
    notificationMenuConfig,
    accountMenuConfig,
    brandingSVG,
    children,
    number
  } = props;
  const props1 = {
    count:
    props.number,
    position:
    'top-right',
    size: 46,
    radius: 8,
    isEnableHide: false,
    classNameBadgeCount: styles1.custom,
    classNameBadge: styles1.custom1,

  };
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerAlignLeft}>
        <div className={styles.headerItem}>
          {
            mainMenuConfig &&
            // hide the menu if main menu config is not provided
            <Menu
              type={'fixed'}
              config={mainMenuConfig}
              headerIcon={mainMenuIcon}
              customClass={styles.headerMainMenu}
            />
          }
        </div>
        <div className={styles.headerItem}>
          <span className={styles.headerIcon}>
            {
              brandingSVG ||
              // if no other branding svg node provided
              // fall back to IBM logo
              <SvgIcon
                data={ibmLogo}
                width={50}
              />
            }
          </span>
        </div>
      </div>
      {children &&
        <div className={styles.headerChildren}>
          {children}
        </div>
      }
      <div className={styles.headerAlignRight}>

        <div className={styles.headerItem}>

          <Badge {...props1}>
            {
              notificationMenuConfig &&
              // hide the menu if the notifiction menu config is not provided
              <Menu
                type={'fixed'}
                config={notificationMenuConfig}
                headerIcon={bellIcon}
                customClass={styles.headerMenuRight}
              />
            }
          </Badge>

        </div>
        <div className={styles.headerItem}>
          <Menu
            type={'fixed'}
            config={accountMenuConfig}
            headerIcon={notificationIcon}
            customClass={styles.headerMenuRight}
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  accountMenuConfig: PropTypes.object.isRequired,
  mainMenuConfig: PropTypes.object,
  notificationMenuConfig: PropTypes.object,
  brandingSVG: PropTypes.node,
  children: PropTypes.node,
};

export default Header;
