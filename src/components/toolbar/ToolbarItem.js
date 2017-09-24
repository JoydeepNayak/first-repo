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


const ToolbarItem = (props) => (
  <div className={cx(styles.toolbarItem, props.position === 'right' ? styles.positionRight : styles.positionLeft)}>
    {props.children}
  </div>
  );

ToolbarItem.propTypes = {
  children: PropTypes.node,
  position: PropTypes.string,
};

ToolbarItem.defaultProps = {
  position: 'left',
};

export default ToolbarItem;
