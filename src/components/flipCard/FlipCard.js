/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import maximize32 from 'ibm-design-icons/dist/svg/action-based/maximize_32.svg';
import minimize32 from 'ibm-design-icons/dist/svg/action-based/minimize_32.svg';
import cx from 'classnames';
import DisplayCard from '../cardLayout/DisplayCard';
import SvgIcon from '../icons/SvgIcon';
import styles from './flipCard.scss';

export default class FlipCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <DisplayCard {...this.props}>
        <div className={cx(styles.flipIcon)} role="button" tabIndex="0" onClick={this.handleOpenModal}>
          <SvgIcon data={maximize32} style={{ width: 20, height: 20, fill: '#a6266e' }} />
        </div>
        {this.props.cardContent}
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="flip card"
          className={{ base: styles.modalContainer, afterOpen: cx(styles.flipCardBack, styles.fullsizeView) }}
          overlayClassName={styles.outsideOverlayContainer}
        >
          <div className={styles.rotateYInverse}>
            {this.props.flipContent}
            <div className={cx(styles.flipIcon)} role="button" tabIndex="0" onClick={this.handleCloseModal}>
              <SvgIcon data={minimize32} style={{ width: 20, height: 20, fill: '#a6266e' }} />
            </div>
          </div>
        </ReactModal>
      </DisplayCard>
    );
  }

}

FlipCard.propTypes = {
  cardContent: PropTypes.node.isRequired,
  flipContent: PropTypes.node.isRequired,
};
