/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import DisplayCard from '../cardLayout/DisplayCard';

export default class DrillDownComponentFactory {
  static make(componentName, props) {
    let component;
    const localProps = Object.assign(props);
    switch (componentName) {
      default:
        component = DisplayCard;
        break;
    }
    return React.createElement(component, localProps);
  }
}
