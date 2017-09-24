/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2016, 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import badgeCountStyle from './Badge.scss';

export default class BadgeCount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    this.showHandler();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.count || nextProps.isEnableHide) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }

  // It will set the show property which decides wheather to show the badgeCount or not.
  showHandler() {
    if (this.props.count || this.props.isEnableHide) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }

  render() {
    if (!this.state.show) {
      return <div />;
    }
    return (

      <div
        className={`
          ${badgeCountStyle.badgeNumber}
          ${badgeCountStyle[`${this.props.position}`]}
          ${this.props.classNameBadgeCount || ''}
        `}
        style={this.props.styleBadgeCount}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${this.props.radius * 2} ${this.props.radius * 2}`} preserveAspectRatio="xMidYMid meet">
          <g>
            <circle cx={this.props.radius} cy={this.props.radius} r={this.props.radius} />
            <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf" dy=".3em">{this.props.count}</text>
          </g>
        </svg>

      </div>
    );
  }
}
BadgeCount.propTypes = {
  radius: PropTypes.number,
  isEnableHide: PropTypes.bool,
  position: PropTypes.string,
  count: PropTypes.number,
  classNameBadgeCount: PropTypes.string,
  styleBadgeCount: PropTypes.object,
};

BadgeCount.defaultProps = {
  show: false,
  count: 0,
  position: 'top-right',
};
