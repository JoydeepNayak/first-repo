/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import previous24 from 'ibm-design-icons/dist/svg/action-based/previous_24.svg';
import SvgIcon from '../icons/SvgIcon';
import styles from './menu.scss';

class MenuItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getIcon = this.getIcon.bind(this);
    this.getNotification = this.getNotification.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  getIcon() {
    if (!this.props.data.iconUrl) return null;
    return (
      <SvgIcon data={previous24} />
    );
  }

  getNotification() {
    if (!this.props.data.count) return null;
    return (
      <span className={styles.notificationCount}>{this.props.data.count}</span>
    );
  }

  getTitle() {
    return this.props.data.name || this.props.data.title;
  }

  handleClick(link, e) {
    if (link === '') e.preventDefault();
    if (this.props.cbClick) this.props.cbClick();
  }

  render() {
    const icon = this.getIcon();
    const notification = this.getNotification();
    const title = this.getTitle();
    const { customClass } = this.props;
    const { link } = this.props.data;
    return (
      <Link
        to={link}
        className={customClass}
        onClick={(e) => { this.handleClick(link, e); }}
      >
        {icon}{title}{notification}
      </Link>
    );
  }
}

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  customClass: PropTypes.string,
  cbClick: PropTypes.func,
};

export default MenuItem;
