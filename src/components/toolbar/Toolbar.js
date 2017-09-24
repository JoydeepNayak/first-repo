/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './toolbar.scss';

const Toolbar = (props) => (
  <div className={styles.toolbarContainer}>
    {props.children}
  </div>);


Toolbar.propTypes = {
  children: PropTypes.node,
};

export default Toolbar;

