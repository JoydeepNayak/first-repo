/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2016, 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import badgeStyle from './Badge.scss';
import BadgeCount from './BadgeCount';

export default class Badge extends Component {
  // It will return the style for the Badge according to the props provided by the user.
  getSize() {
    const { size } = this.props;
    return { ...this.props.styleBadge, width: size, height: size };
  }

  render() {
    const { onRequestAction, size, position, count, classNameBadge, classNameBadgeCount, styleBadgeCount, radius, isEnableHide, ...rest } = this.props;
    return (
      <div
        role="presentation"
        style={this.getSize()}
        className={`
          ${badgeStyle.badge}
          ${classNameBadge || ''}
        `}
        {...rest}
        onClick={this.props.onRequestAction}
      >
        {this.props.children}
        <BadgeCount count={count} position={position} classNameBadgeCount={classNameBadgeCount} radius={radius} styleBadgeCount={styleBadgeCount} isEnableHide={isEnableHide}></BadgeCount>
      </div>
    );
  }
}

Badge.propTypes = {
  isEnableHide: PropTypes.bool, // Shows the Badge according to the flag set By the user|  optional.
  radius: PropTypes.number, // Set the svg circles radius|  optional.
  id: PropTypes.string, // Set the id | optional.
  position: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']), // Set the position for badge count. | top-right (default) , top-left, bottom-right , bottom-left | optional.
  onRequestAction: PropTypes.func, // Set a function on click | optional.
  count: PropTypes.number, // Set count to be displayed in badge | optional.
  children: PropTypes.node, // set the appropriate children | optional.
  classNameBadge: PropTypes.string, // Set css class name for Badge  | optional
  classNameBadgeCount: PropTypes.string, // Set css class name for Badge count  | optional
  styleBadge: PropTypes.object, // Set style of Badge using style object  | optional.
  styleBadgeCount: PropTypes.object, // Set style Badge count using style object | optional.
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]), // Set size for the Badge | optional default:22px*
};

Badge.defaultProps = {
  position: 'top-right',
  size: 22,
  count: 0,
};
