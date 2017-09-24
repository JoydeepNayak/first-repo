/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Loader } from 'ap-components-react';
import styles from './loaderContainer.scss';

const LoaderContainer = (props) => (
  <div className={styles.loaderContainer}>
    <div><Loader {...props} /></div>
  </div>
  );

export default LoaderContainer;
