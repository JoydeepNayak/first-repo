/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DisplayCard from './DisplayCard';

const CardLayout = (props) => {
  const layout = [];
  for (let i = 0; i < props.data.length; i += 1) {
    // Define a 4 column layout of cards with each card of 1 unit width
    // Cards are not draggable or resizable but layout should resize
    // as per zoom level or window resize (breakpoints)
    layout[i] = { properties: { i: (`card${i}`), x: (i % 4), y: (Math.floor(i / 4) * 2) + 1, h: 2.15, w: 1, isDraggable: false } };
  }
  const itemList = props.data.map((item, idx) => {
    const cardComponent = <DisplayCard data={item}></DisplayCard>;
    return (
      <div key={layout[idx].properties.i} data-grid={layout[idx].properties}>
        {cardComponent}
      </div>
    );
  });
  const ResponsiveReactGridLayout = WidthProvider(Responsive);
  return (
    <ResponsiveReactGridLayout cols={{ lg: 4, md: 4, sm: 3, xs: 2, xxs: 1 }} >
      {itemList}
    </ResponsiveReactGridLayout>
  );
};

export default CardLayout;

CardLayout.propTypes = {
  data: PropTypes.array.required,
};
