/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2016, 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/


/** Example Drawer component usage
 * <Drawer position="right">
 *   <h1>DRAWER CONTENTS</h1>
 * </Drawer>
 */

import React, { Component, PropTypes } from 'react';
import { Icon } from 'ap-components-react';
import './drawer.scss';
export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  // Toggles the opening and closing of drawer
  toggleDrawer() {
    this.setState({ isOpen: !this.state.isOpen });
  }


  render() {
    let className = '';
    if (this.state.isOpen) {
      className = `drawer__open-drawer-${this.props.position} ${this.props.classNameDrawer}`;
    } else {
      className = `drawer__close-drawer-${this.props.position}`;
    }
    const { size, position, classNameIcon } = this.props;
    return (
      <div className="drawer__container">
        <div role="presentation" onClick={this.toggleDrawer}>
          <Icon size={size} className={`${classNameIcon || ''}`} type={this.state.isOpen ? 'close' : 'plus'} ></Icon>
        </div>
        <div
          className={`
          drawer__pannel
          drawer__${position}
          ${className}
        `}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
// props to be sent by the user while using Drawer
Drawer.propTypes = {
  position: PropTypes.oneOf(['up', 'left', 'down', 'right']), // To set the opening and closing of drawer
  size: PropTypes.number, // To set the size of the drawer icon
  children: PropTypes.node, // Child nodes sent to the Drawer
  classNameIcon: PropTypes.string, // To send additional stylings to the Drawer icon eg. background-color
  classNameDrawer: PropTypes.string, // To set the additional stylings for the Drawer.
};

// default props for position of drawer opening and icon size
Drawer.defaultProps = {
  position: 'right',
  size: 22,
};
