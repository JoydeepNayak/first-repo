/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './toolbar.scss';

const ToolbarSeparator = (props) => (
  <div className={cx(styles.toolbarSeparator, props.position === 'right' ? styles.positionRight : styles.positionLeft)}>|</div>
  );

ToolbarSeparator.propTypes = {
  position: PropTypes.string,
};

ToolbarSeparator.defaultProps = {
  position: 'left',
};

export default ToolbarSeparator;

