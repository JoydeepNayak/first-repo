/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'ap-components-react';
import cx from 'classnames';

import info32 from 'ibm-design-icons/dist/svg/action-based/get-information_32.svg';
import warn32 from 'ibm-design-icons/dist/svg/action-based/warn_32.svg';
import error32 from 'ap-icons/svg/general/error_32.svg';
import styles from './dialogBox.scss';


import SvgIcon from '../icons/SvgIcon';

export default class DialogBox extends React.Component {

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModals = this.closeModals.bind(this);
    this.isModalVisible = this.isModalVisible.bind(this);
    this.getButtonType = this.getButtonType.bind(this);
    this.getHeaderType = this.getHeaderType.bind(this);
    this.state = {
      isOpen: this.props.isOpen,
      type: this.props.type,
    };
  }

  getButtonType() {
    const buttonType = this.props.type;
    switch (buttonType) {
      case 'info' :
        return (<div className="modal__buttons">
          <Button
            className="no-smoothstate"
            onClick={this.closeModals}
            medium
            semantic
          >
                Ok
              </Button>
        </div>);
      case 'error':
        return (<div className="modal__buttons">
          <Button
            className="no-smoothstate"
            onClick={this.closeModals}
            medium
            semantic
          >
              Fix it
            </Button>
        </div>);
      case 'warning':
        return (<div className="modal__buttons">
          <Button
            className="no-smoothstate"
            onClick={this.closeModals}
            medium
            semantic
          >
              Close
            </Button>
        </div>);
      default:
        return (<div className="modal__buttons">
          <Button
            className="button__cancel"
            hyperlink
            onClick={this.closeModals}
            medium
            semantic
          >
                Cancel
              </Button>
          <Button
            className="no-smoothstate"
            onClick={this.closeModals}
            medium
            semantic
          >
                Save
              </Button>
        </div>);
    }
  }

  getHeaderType() {
    const headerType = this.props.type;
    let title = this.props.title;
    if (title === undefined || title === null) {
      title = '';
    }
    switch (headerType) {
      case 'info' :
        return (
          <div className={styles.dialogHeader}>
            <SvgIcon className={cx(styles.dialogHeaderIcon, styles.iconInfo)} data={info32} />
            <h2 className={styles.dialogHeaderItem} >{title !== '' ? title : 'Information'}</h2>
          </div>
        );
      case 'error':
        return (
          // styles.modalError is added until ap-components-react fixes the error
          <div className={cx(styles.dialogHeader, styles.modalError)} >
            <SvgIcon className={cx(styles.dialogHeaderIcon, styles.iconError)} data={error32} />
            <h2 className={styles.dialogHeaderItem}>{title !== '' ? title : 'Error'}</h2>
          </div>);
      case 'warning':
        return (
          <div className={styles.dialogHeader}>
            <SvgIcon className={cx(styles.dialogHeaderIcon, styles.iconWarning)} data={warn32} />
            <h2 className={styles.dialogHeaderItem}>{title !== '' ? title : 'Warning'}</h2>
          </div>);
      default:
        return (
          <div className={styles.dialogHeader}>
            <h2 className={styles.dialogHeaderItem}>{title !== '' ? title : 'Information'}</h2>
          </div>);
    }
  }

  closeModals() {
    this.setState({
      isOpen: false,
    });
  }

  openModal() {
    this.setState({
      isOpen: true,
    });
  }

  isModalVisible() {
    return this.state.isOpen === this.props.isOpen;
  }


  render() {
    return (
      <Modal
        isOpen={this.isModalVisible()}
        type={this.props.type}
      >
        {this.getHeaderType()}
        <p style={{ minHeight: '20em' }}>
          {this.props.children}
        </p>
        {this.getButtonType()}
      </Modal>
    );
  }

}

DialogBox.propTypes = {
  isOpen: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};
