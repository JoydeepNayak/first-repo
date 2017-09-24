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
import DialogBox from '../DialogBox';


describe('<DialogBox />', () => {
  it('should display a Modal with type info', () => {
    const renderedComponent = mount(<DialogBox type="info" />);
    expect(renderedComponent.find('Modal'));
    expect(renderedComponent.find('h2').at(0).text()).toEqual('Information');
  });
  it('should display a Modal with type error', () => {
    const renderedComponent = mount(<DialogBox type="error" />);
    expect(renderedComponent.find('Modal'));
    expect(renderedComponent.find('h2').at(0).text()).toEqual('Error');
  });
  it('should display a Modal with type warning', () => {
    const renderedComponent = mount(<DialogBox type="warning" />);
    expect(renderedComponent.find('Modal'));
    expect(renderedComponent.find('h2').at(0).text()).toEqual('Warning');
  });
  it('should display a Modal with type default', () => {
    const renderedComponent = mount(<DialogBox />);
    expect(renderedComponent.find('Modal'));
    expect(renderedComponent.find('h2').at(0).text()).toEqual('Information');
  });
  it('should display a Modal with type info with custom title', () => {
    const renderedComponent = mount(<DialogBox type="info" title="Test" />);
    expect(renderedComponent.find('Modal'));
    expect(renderedComponent.find('h2').at(0).text()).toEqual('Test');
  });
  it('should display a Modal with type error with custom title', () => {
    const renderedComponent = mount(<DialogBox type="error" title="test" />);
    expect(renderedComponent.find('Modal'));
    expect(renderedComponent.find('h2').at(0).text()).toEqual('test');
  });
  it('should display a Modal with type warning with custom title', () => {
    const renderedComponent = mount(<DialogBox type="warning" title="test" />);
    expect(renderedComponent.find('Modal'));
    expect(renderedComponent.find('h2').at(0).text()).toEqual('test');
  });
  it('should display a Modal with type default with custom title', () => {
    const renderedComponent = mount(<DialogBox title="test" />);
    expect(renderedComponent.find('Modal'));
    expect(renderedComponent.find('h2').at(0).text()).toEqual('test');
  });
  it('should display a Modal is opened and closed', () => {
    const shallowWrapper = shallow(<DialogBox type="info" />);
    const compInstance = shallowWrapper.instance();

    const closeModalsStub = sinon.stub(compInstance, 'closeModals');
      // Force the component and wrapper to update so that the stub is used
    compInstance.forceUpdate();
    shallowWrapper.update();
    expect(closeModalsStub.called).toEqual(false);
    shallowWrapper.find('Button').simulate('click');
    expect(closeModalsStub.called).toEqual(true);
  });
  it('should open the dialogbox', () => {
    const wrapper = shallow(<DialogBox type="info" isOpen={false} />);
    expect(wrapper.find('Modal').node).toBeDefined();
    wrapper.instance().openModal();
    expect(wrapper.find('div.modal')).toBeDefined();
  });
  it('should close the dialogbox', () => {
    const wrapper = shallow(<DialogBox type="info" isOpen />);
    expect(wrapper.find('div.modal')).toBeDefined();
    wrapper.instance().closeModals();
    expect(wrapper.prop('isOpen')).toEqual(false);
  });
});
