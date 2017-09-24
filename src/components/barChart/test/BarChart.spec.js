/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2017
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React from 'react';
import { mount } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import BarChart from '../BarChart';
import styles from '../barChart.scss';

describe('<BarChart />', () => {
  const entities = [
    {
      volume: 500,
      id: 'AMMMMMMM MMMM MMMM',
      color: 'teal',
    },
    {
      volume: 203,
      id: 'B',
    },
    {
      volume: 103,
      id: 'C',
    },
    {
      volume: 500,
      id: 'D',
    },
    {
      volume: 203,
      id: 'E',
    },
    {
      volume: 10,
      id: 'F',
    },
    {
      volume: 500,
      id: 'G',
    },
    {
      volume: 203,
      id: 'H',
    },
    {
      volume: 103,
      id: 'I',
    },
  ];
  describe('mount', () => {
    it('mount should display an svg element', () => {
      const wrapper = mount(<BarChart entities={entities} />);
      expect(wrapper.find(`.${styles.chartContainer}`)).toHaveLength(1);
    });
    it('mount should add resize event', () => {
      sinon.spy(window, 'addEventListener');
      expect(window.addEventListener.called).toBeFalsy();
      mount(<BarChart entities={entities} />);
      expect(window.addEventListener.called).toBeTruthy();
    });
    it('unmount should remove resize event', () => {
      sinon.spy(window, 'removeEventListener');
      expect(window.removeEventListener.called).toBeFalsy();
      const wrapper = mount(<BarChart entities={entities} />);
      wrapper.unmount();
      expect(window.removeEventListener.called).toBeTruthy();
    });
  });
  describe('horizontal', () => {
    let wrapper;
    let cheerioWrapper;
    beforeEach(() => {
      wrapper = mount(
        <BarChart
          entities={entities}
          orientation={'horizontal'}
          margin={{
            top: 12,
            left: 12,
            right: 12,
            bottom: 12,
          }}
          height={300}
          width={400}
        />
      );
      cheerioWrapper = wrapper.render();
    });
    it('should display correct number of horizontal bars', () => {
      expect(cheerioWrapper.find(`.${styles.bar}`)).toHaveLength(entities.length);
    });
    it('should display have title on y axis', () => {
      expect(cheerioWrapper.find(`.${styles.yAxisLabel} .tick text`)).toHaveLength(entities.length);
    });
    xit('should wrap entity label for long texts', () => {
      // TODO: wrap func is called, but textEl doesn't have any children
      const firstTick = cheerioWrapper.find(`.${styles.yAxisLabel} .tick`)[0];
      const firstTickWords = entities[0].id.split(/\s+/).reverse();
      expect(firstTick.find('tspan')).toHaveLength(firstTickWords.length);
    });
  });
  describe('vertical', () => {
    it('should display correct number of vertical bars', () => {
      const wrapper = mount(<BarChart entities={entities} />);
      // https://github.com/airbnb/enzyme/blob/master/docs/common-issues.md
      const cherrioWrapper = wrapper.render();
      expect(cherrioWrapper.find(`.${styles.bar}`)).toHaveLength(entities.length);
    });
    it('should display have title on x axis', () => {
      const wrapper = mount(
        <BarChart
          entities={entities}
        />
      );
      const cheerioWrapper = wrapper.render();
      expect(cheerioWrapper.find(`.${styles.xAxisLabel} text`)).toHaveLength(entities.length);
    });
  });
  describe('clickability', () => {
    describe('not clickable', () => {
      let wrapper;
      let cheerioWrapper;
      beforeEach(() => {
        wrapper = mount(
          <BarChart
            entities={entities}
            orientation={'horizontal'}
            margin={{
              top: 12,
              left: 12,
              right: 12,
              bottom: 12,
            }}
            height={300}
            width={400}
          />
        );
        cheerioWrapper = wrapper.render();
      });
      it('is defined, bar should not have clickable class', () => {
        expect(cheerioWrapper.find(`.${styles.clickable}`)).toHaveLength(0);
      });
    });
    describe('clickable', () => {
      let wrapper;
      let cheerioWrapper;
      let clickSpy;
      beforeEach(() => {
        clickSpy = sinon.spy();
        wrapper = mount(
          <BarChart
            entities={entities}
            orientation={'horizontal'}
            margin={{
              top: 12,
              left: 12,
              right: 12,
              bottom: 12,
            }}
            height={300}
            width={400}
            onBarClicked={clickSpy}
          />
        );
        cheerioWrapper = wrapper.render();
      });
      it('is defined, bar should have clickable class', () => {
        expect(cheerioWrapper.find(`.${styles.clickable}`)).toHaveLength(entities.length);
      });
      xit('click on bar will call with entity', () => {
        // TODO: trigger the click event correctly
        const firstBar = cheerioWrapper.find(`.${styles.clickable}`).first();
        expect(clickSpy.called).toBeFalsy();
        ReactTestUtils.Simulate.click(firstBar);
        expect(clickSpy.called).toBeTruthy();
      });
    });
  });
  describe('on window resize', () => {
    let wrapper;
    beforeEach(() => {
      sinon.spy(BarChart.prototype, 'delayDraw');
      wrapper = mount(
        <BarChart
          entities={entities}
          orientation={'horizontal'}
          margin={{
            top: 12,
            left: 12,
            right: 12,
            bottom: 12,
          }}
          height={300}
          width={400}
        />
      );
    });
    it('should call delay draw on window resize', () => {
      expect(BarChart.prototype.delayDraw.called).toBeFalsy();
      expect(wrapper.instance().delayDrawTimeout).toBeUndefined();
      window.dispatchEvent(new Event('resize'));
      expect(BarChart.prototype.delayDraw.calledOnce).toBeTruthy();
      expect(wrapper.instance().delayDrawTimeout).toBeDefined();
    });
  });
  describe('unmount', () => {

  });
});
