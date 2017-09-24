/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SvgIcon from '../icons/SvgIcon';

const SvgButton = (props) => {
  const { icon, className, ...rest } = props;
  return (
    <button className={cx('button button--icon', className)} {...rest}>
      <SvgIcon data={icon} />
      {props.children}
    </button>
  );
};

SvgButton.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default SvgButton;
