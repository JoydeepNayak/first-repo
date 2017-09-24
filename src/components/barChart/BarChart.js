/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2017
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React from 'react';
import { findDOMNode } from 'react-dom';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import styles from './barChart.scss';

class BarChart extends React.Component {
  componentDidMount() {
    this.draw();
    window.addEventListener('resize', this.delayDraw.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.delayDraw.bind(this));
    window.clearTimeout(this.delayDrawTimeout);
  }
  delayDraw() {
    if (this.delayDrawTimeout) {
      window.clearTimeout(this.delayDrawTimeout);
      this.delayDrawTimeout = undefined;
    }
    this.delayDrawTimeout = setTimeout(this.draw.bind(this), 250);
  }
  draw() {
    // customizable attr setup
    const {
      entities,
      onBarClicked,
      margin,
      orientation,
      height,
      width } = this.props;
    // container setup
    const containerDOMNode = findDOMNode(this.div);
    while (containerDOMNode.hasChildNodes()) {
      containerDOMNode.removeChild(containerDOMNode.lastChild);
    }
    // d3 attached on container
    const container = d3.select(containerDOMNode);
    const svg = container.append('svg').attr('class', 'chart-svg');

    // svg dimesion calculation
    const containerHeight = height !== undefined ? height : container.node().offsetHeight;
    const containerWidth = width !== undefined ? width : container.node().offsetWidth;
    const svgWidth = containerWidth - margin.left - margin.right;
    const svgHeight = containerHeight - margin.top - margin.bottom;
    svg.attr('height', containerHeight)
      .attr('width', containerWidth);
    // bar group element
    const barGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    // scale for x
    const entitiesScale = d3.scaleBand()
      .domain(entities.map((d) => d.id))
      .rangeRound([0, (orientation === 'vertical' ? svgWidth : svgHeight)])
      .padding(0.1);
    // scale for y
    const volumeScale = d3.scaleLinear()
      .domain([0, d3.max(entities, (d) => d.volume)])
      .range((orientation === 'vertical' ? [svgHeight, 0] : [0, svgWidth]));
    // x-axis
    const xAxis = d3.axisBottom()
      .scale((orientation === 'vertical' ? entitiesScale : volumeScale))
      .tickSize(0)
      .tickValues(((orientation === 'vertical' ? entities.map((d) => d.id) : null)));
    // y-axis
    const yAxis = d3.axisLeft()
      .scale((orientation === 'vertical' ? volumeScale : entitiesScale))
      .tickSize(0)
      .tickValues(((orientation === 'vertical' ? null : entities.map((d) => d.id))));
    // create all bars for each element in the array
    const bar = barGroup.selectAll('.bar')
      .data(entities)
      .enter().append('g')
      .attr('class', styles.bar)
      .attr('style', (d) => d.color ? `fill: ${d.color}` : '')
      .attr('transform', (d) => {
        if (orientation === 'vertical') {
          return `translate(${entitiesScale(d.id)}, ${volumeScale(d.volume)})`;
        }
        return `translate(0, ${entitiesScale(d.id)})`;
      });
    // interaction for each bar
    bar.append('rect')
      .attr('class', `${styles.stack} ${typeof onBarClicked === 'function' ? styles.clickable : ''}`)
      .attr('width', (d) => {
        if (orientation === 'vertical') {
          return entitiesScale.bandwidth();
        }
        return volumeScale(d.volume);
      })
      .attr('height', (d) => {
        if (orientation === 'vertical') {
          return svgHeight - volumeScale(d.volume);
        }
        return entitiesScale.bandwidth();
      })
      .on('click', (d) => {
        if (typeof onBarClicked === 'function') {
          onBarClicked(d);
        }
      });
    // display volume of each bar
    const volumnOffsetX = orientation === 'vertical' ? entitiesScale.bandwidth() / 2 : 20;
    bar.append('text')
      .attr('class', styles.text)
      .attr('dy', orientation === 'vertical' ? '0.75em' : entitiesScale.bandwidth() / 2)
      .attr('x', volumnOffsetX)
      .attr('text-anchor', orientation === 'vertical' ? 'middle' : 'start')
      .text((d) => d.volume !== 0 ? d.volume : '');
    // display axes
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${svgHeight + margin.top})`)
      .attr('class', styles.xAxisLabel)
      .call(xAxis);
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('class', styles.yAxisLabel)
      .call(yAxis);
    // wrap long axis label
    d3.selectAll(`.${orientation === 'vertical' ? styles.xAxisLabel : styles.yAxisLabel} .tick text`)
      .call(this.wrap, orientation === 'vertical' ? entitiesScale.bandwidth() : margin.left);
  }
  wrap(textEl, width) {
    textEl.nodes().forEach((textForTick) => {
      const text = d3.select(textForTick);
      const orignalText = text.text();
      const words = orignalText.split(/\s+/).reverse();
      let word;
      let line = [];
      const lineHeight = 1; // ems
      const y = text.attr('y');
      const dy = parseFloat(text.attr('dy'));
      let tspan = text.text(null).append('tspan').attr('y', y).attr('dy', `${dy}em`);
      while (words.length > 0) {
        word = words.pop();
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', `${lineHeight + dy}em`).text(word);
        }
      }
      text.append('title').text(orignalText);
    });
  }

  render() {
    const { title } = this.props;
    return (
      <div className={styles.container}>
        <h3 className={styles.title}> {title} </h3>
        <div ref={(el) => { this.div = el; }} className={styles.chartContainer}></div>
      </div>
    );
  }
}

BarChart.defaultProps = {
  orientation: 'vertical',
  margin: {
    top: 16,
    right: 32,
    bottom: 16,
    left: 32,
  },
};

BarChart.propTypes = {
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      volume: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  height: PropTypes.number,
  width: PropTypes.number,
  onBarClicked: PropTypes.func,
  title: PropTypes.string,
};

export default BarChart;
