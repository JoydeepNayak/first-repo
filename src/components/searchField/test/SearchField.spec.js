/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import SearchField from '../SearchField';


describe('<SearchField>', () => {
  const wrap = (props) => shallow(<SearchField {...props} />);

  it('should display textfield within .searchFieldContainerNoIcon', () => {
    const enzymew = wrap();
    expect(enzymew.find('.searchFieldContainerNoIcon TextField').node).toBeDefined();
  });

  it('should display svgIcon when required', () => {
    const enzymew = wrap({ query: 'aa', withIcon: true });
    expect(enzymew.find('.searchFieldContainer SvgIcon').node).toBeDefined();
  });
  it('should not display svgIcon by default', () => {
    const enzymew = wrap({ query: 'aa' });
    expect(enzymew.find('.searchFieldContainer SvgIcon').node).toBeUndefined();
  });
  it('should call onSerach upon search', () => {
    const search = sinon.spy();
    jest.useFakeTimers();
    const renderedComponent = mount(<SearchField onSearch={search} focused />);
    renderedComponent.find('input').simulate('change', { target: { value: 'abc' } });
    jest.runAllTimers();
    expect(search.calledOnce).toEqual(true);
    expect(search.calledWith('abc')).toEqual(true);
  });
  it('should call onSearch after mount', () => {
    const search = sinon.spy();
    mount(<SearchField onSearch={search} query="aa" />);
    expect(search.calledWith('aa')).toEqual(true);
  });
  it('should call onSearch after property update', () => {
    const search = sinon.spy();
    const wrapper = mount(<SearchField onSearch={search} />);
    wrapper.setProps({ query: 'aa' });
    expect(search.calledOnce).toEqual(true);
    expect(search.calledWith('aa')).toEqual(true);
  });
  it('should not call onSearch after property update when there is no need', () => {
    const search = sinon.spy();
    const wrapper = mount(<SearchField onSearch={search} query="aa" />);
    wrapper.setProps({ query: 'aa' });
    expect(search.calledOnce).toEqual(true);
  });
  it('should handle enter key', () => {
    const spy = sinon.spy();
    const wrapper = mount(<SearchField onSearch={spy} query="aa" />);

    const input = wrapper.find('input');
    input.simulate('keyDown', { key: 'a' });
    input.simulate('keyDown', { keyCode: 13 });
    expect(spy.calledWith('aa')).toBeTruthy();
    // once after mount and then on enter
    expect(spy.calledTwice).toBeTruthy();
  });
});
