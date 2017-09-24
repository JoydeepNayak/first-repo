/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import PropTypes from 'prop-types';
import bee24 from 'ibm-design-icons/dist/svg/object-based/bee_24.svg';
import styles from './footer.scss';
import SvgIcon from '../icons/SvgIcon';
import IBMLogo from '../icons/ibmLogo.svg';

Footer.propTypes = {
  text: PropTypes.string.isRequired,
};

const entityTypeToIconMap = {
  ibm_logo: IBMLogo,
};

function Footer(props) {
  return (
    <div className={styles.appFooter}>
      <span className={styles.footerTextLeft}>&copy; 2017</span>
      <span className={styles.footerTextRight}>
        Powered by <SvgIcon data={entityTypeToIconMap.ibm_logo || bee24} /> {props.text}
      </span>
    </div>
  );
}

export default Footer;
