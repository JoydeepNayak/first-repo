import React, { Component } from 'react';
import './sidebar.scss';
import SideMenu from './SideMenu';


export default class SideMenuTray extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    return (
      <div>
        <SideMenu isOpen={this.state.isOpen} position="right" layout="overlay" />
      </div>
    );
  }
}
