/*
Licensed Materials - Property of IBM
5724-Q36
(c) Copyright IBM Corp. 2017
US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { shallow } from 'enzyme';
import FlipCard from '../FlipCard';

describe('<FlipCard>', () => {
  it('renders card with flip modal layout', () => {
    const cardContent = () => <div>Front card content</div>;
    const flipContent = () => <div>Flip modal content</div>;
    const wrapper = shallow(<FlipCard cardContent={cardContent} flipContent={flipContent} />);

    // See whether card with icon gets displayed.
    expect(wrapper.find('SvgIcon').node).toBeDefined();

    wrapper.instance().handleOpenModal();
    expect(wrapper.find('div.ReactModal__Overlay')).toBeDefined();
  });
});
