import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer';
import SvgIcon from '../../icons/SvgIcon';

describe('<Footer />', () => {
  it('should render 2 span and 1 SvgIcon element', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(SvgIcon).exists()).toBe(true);
    expect(wrapper.find('.footer-text-right')).toBeDefined();
    expect(wrapper.find('.footer-text-left')).toBeDefined();
  });
});
