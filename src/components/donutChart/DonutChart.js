/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2017
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { Tooltip } from 'ap-components-react';

import donutChartStyles from './donutChart.scss';

class DonutChart extends Component {
  constructor() {
    super();
    this.state = {
      tooltipContent: '',
      isTooltipVisible: false,
      tooltipPosition: {
        top: 0,
        left: 0,
      },
    };
    this.d3Color = d3.scaleOrdinal(d3.schemeCategory20b);
  }
  componentDidMount() {
    this.update();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.update();
    }
  }
  getColor(entity) {
    return entity.color ? entity.color : this.d3Color(entity.label);
  }
  update() {
    const svgDOMNode = findDOMNode(this.svg);
    this.drawChart(svgDOMNode);
  }
  clearChart(svgDOMNode) {
    while (svgDOMNode.hasChildNodes()) {
      svgDOMNode.removeChild(svgDOMNode.lastChild);
    }
  }
  drawChart(svgDOMNode) {
    this.clearChart(svgDOMNode);

    // dimension
    const { height, width } = svgDOMNode.getBoundingClientRect();
    this.outerRadius = (height < width ? height : width) / 2;
    const innerRadius = this.outerRadius / 1.5; // make it donut

    const svg = d3
      .select(svgDOMNode)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(this.outerRadius);

    const pie = d3.pie()
      .value((d) => d.count || 0)
      .sort(null);

    svg.selectAll('path')
      .data(pie(this.props.entities))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('key', (d) => `slice-${d.data.label}`)
      .attr('class', donutChartStyles.chartSlice)
      .attr('fill', (d) => this.getColor(d.data))
      .on('click', (d) => {
        this.props.onSliceClick(d.data);
      })
      .on('mouseenter', (d) => {
        const mouseX = d3.event.x;
        const mouseY = d3.event.y;
        this.setState({
          tooltipContent: d.data.tooltipContent ? d.data.tooltipContent : `${d.data.label} (${d.data.count || 0})`,
          isTooltipVisible: true,
          tooltipPosition: {
            top: mouseY - 50,
            left: mouseX - 20,
          },
        });
      })
      .on('mouseleave', () => {
        this.setState({
          isTooltipVisible: false,
        });
      });
  }
  render() {
    return (
      <div className={donutChartStyles.chartContainer}>
        {
          this.props.title &&
          <h4 className={donutChartStyles.chartTitle}>{this.props.title}</h4>
        }
        <Tooltip
          text={this.state.tooltipContent}
          isVisible={this.state.isTooltipVisible}
          position={this.props.tooltipAttr.position}
          renderIntoBody
          style={{
            left: this.state.tooltipPosition.left,
            top: this.state.tooltipPosition.top,
          }}
        >
          <span className={donutChartStyles.tooltipPlaceholder}></span>
        </Tooltip>
        <svg
          ref={(e) => { this.svg = e; }}
          className={donutChartStyles.svgContainer}
        />
        {
          this.props.displayLegend &&
          <div className={donutChartStyles.chartLegendContainer}>
            {this.props.entities.map((entity) => (
              <Tooltip
                text={entity.tooltipContent ? entity.tooltipContent : `${entity.label} (${entity.count || 0})`}
                position={this.props.tooltipAttr.position}
                key={`tooltip-${entity.label}`}
                renderIntoBody
              >
                <div key={entity.label} className={donutChartStyles.legendEntity}>
                  <span
                    className={donutChartStyles.legendColor}
                    style={{ backgroundColor: this.getColor(entity) }}
                  />
                  <span className={donutChartStyles.legendLabel}>
                    {entity.label}{`(${entity.count || 0})`}
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        }
      </div>
    );
  }
}

DonutChart.defaultProps = {
  height: 200,
  tooltipAttr: {
    position: 'top',
  },
  displayLegend: true,
};
DonutChart.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    tooltipContent: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    color: PropTypes.string,
  })),
  onSliceClick: PropTypes.func,
  title: PropTypes.string,
  tooltipAttr: PropTypes.shape({
    position: PropTypes.string,
  }),
  displayLegend: PropTypes.bool,
};

export default DonutChart;
