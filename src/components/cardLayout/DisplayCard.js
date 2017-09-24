/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'ap-components-react';
import cx from 'classnames';
import spaces24 from 'ibm-design-icons/dist/svg/object-based/spaces_24.svg';
import SvgIcon from '../icons/SvgIcon';
import styles from './displayCard.scss';

const BaseCard = (props) => (
  <Card className={cx(styles.displayCard, styles.cardShadow)}>
    <div className={styles.upperSection}>
      <h2 className={styles.title}>{props.data.title}</h2>
      <div><p className={styles.description}>{props.data.description}</p></div>
    </div>
    <div className={styles.separator}></div>
    <div className={styles.lowerSection}>
      {props.data.rows.map((row) => (
        <div>
          <div><h3 className={styles.label}>{row.label}</h3></div>
          <div>{row.value}</div>
        </div>
      ))}
    </div>
  </Card>
);

const DisplayCard = (props) => {
  const content = props.children;
  if (!content) {
    return <BaseCard data={props.data} />;
  }
  return (
    <div id={props.id} className={cx(styles.cardContainer, styles.cardShadow)}>
      <div className={styles.card}>
        <div className={styles.header}>
          {
            props.isDraggable &&
            <div className={styles.icon}>
              <SvgIcon data={spaces24} className={styles.dragIcon} style={{ fill: '#a6266e' }} />
            </div>
          }
          <strong>{props.title || ''}</strong>
        </div>
        <div className={styles.body}>
          <div className={styles.innerBody}>
            {content}
          </div>
        </div>
      </div>
    </div>);
};

DisplayCard.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node,
  id: PropTypes.string,
  title: PropTypes.string,
  isDraggable: PropTypes.bool,
};
BaseCard.propTypes = {
  data: PropTypes.object,
};

export default DisplayCard;
