/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DisplayCard from '../cardLayout/DisplayCard';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
export default class CardLayoutManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: props.load(),
      hasChanged: false,
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    if (this.state.hasChanged) {
      this.state.layout = layout;
      if (this.props.save) {
        this.props.save(JSON.stringify(layout));
      }
    } else {
      // set layout changed to true after first load.
      this.setState({
        hasChanged: true,
      });
    }
  }

  render() {
    let itemList = null;
    let cols = null;
    let childComponent = null;

    const layout = this.state.layout;

    if (!layout || !layout.cols || !layout.items) {
      return <div>Error: Please provide a loader with appropriate format</div>;
    }
    cols = layout.cols;
    itemList = layout.items.map((item) => {
      // Iterate through provided factories to see if they return a component
      let factory = null;
      for (let idx = 0; idx < this.props.factoryList.length; idx += 1) {
        factory = this.props.factoryList[idx];
        childComponent = factory.make(item.classname, item.childProps);
        if (childComponent) {
          break;
        }
      }
      if (!childComponent) {
        // Show a default card with error message if no cards from any factory
        childComponent = (
          <DisplayCard>
            <div> Could not load Component {item.classname} </div>
          </DisplayCard>
        );
      }
      return (
        <div key={item.properties.i} data-grid={item.properties}>
          {childComponent}
        </div>
      );
    });
    return (
      <div>
        <ResponsiveReactGridLayout
          cols={cols}
          rowHeight={layout.rowHeight}
          onLayoutChange={this.onLayoutChange}
          draggableHandle={this.props.draggableClassName}
          className={this.props.layoutClass}
        >
          {itemList}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

CardLayoutManager.propTypes = {
  factoryList: PropTypes.array,
  load: PropTypes.func.isRequired,
  save: PropTypes.func,
  draggableClassName: PropTypes.string,
  layoutClass: PropTypes.string,
};
