/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { Component, PropTypes } from 'react';
import './sidebar.scss';
export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      isExpanded: false,
    };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
    this.toggleSideMenuExpanded = this.toggleSideMenuExpanded.bind(this);
  }

  toggleSideMenu() {
    this.setState({ isOpen: !this.state.isOpen });
    if (this.state.isExpanded && !this.state.isOpen) {
      this.toggleSideMenuExpanded();
    }
  }
  toggleSideMenuExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }
  render() {
    let className = '';
    const { position, layout } = this.props;

    if (this.state.isOpen) {
      className = `sidebar__menu-${position} sidebar__side-menu-after-open`;
    } else {
      className = `sidebar__menu-${position}`;
    }
    if (this.state.isExpanded && this.state.isOpen) {
      className = `sidebar__menu-${position} sidebar__side-menu-after-full-open`;
    }
    return (
      <div className="container">
        <div id="side" className={`sidebar__side-menu ${className} sidebar__${layout} sidebar__${layout}-${position}`} >
          <div className="sidebar__side-menu-content">
            <button onClick={this.toggleSideMenu}>X</button>
            <button onClick={this.toggleSideMenuExpanded} className={`sidebar__side-menu-expand-btn sidebar__btn-${position}`}>I</button>
            <h1>TEST</h1>
          </div>
        </div>
        <div id="pannel" className="sidebar__side-pannel">
          <button onClick={this.toggleSideMenu}>open menu</button>
          <p>What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                        Why do we use it?
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

                        Where can I get some?
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
        </div>
      </div>
    );
  }
}

SideMenu.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node,
  layout: PropTypes.oneOf(['overlay']),
};
