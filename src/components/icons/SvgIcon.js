/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import PropTypes from 'prop-types';
import icon from './icons.scss';

const PREFIX = 'data:image/svg+xml,';

const findAttributeValue = (attrsStr, name) => {
  const index = attrsStr.indexOf(`${name}=`);
  if (index === 0 || (index > 0 && !/\w/.test(attrsStr[index - 1]))) {
    const start = index + name.length + 1;
    const c1 = attrsStr[start];
    if (c1 === '"' || c1 === "'") {
      const match = new RegExp(`(.*?)${c1}`).exec(attrsStr.substring(start + 1));
      return (match && match[1]) || undefined;
    }
    const match = /^\w*/.exec(attrsStr.substring(start));
    return (match && match[0]) || undefined;
  }
  return undefined;
};

const SvgIcon = (props) => {
  const { data, width, height, ...rest } = props;
  let svg = data.replace(/"(.*)"/, '$1');
  if (svg.startsWith(PREFIX)) {
    svg = svg.substring(PREFIX.length);
  }
  svg = decodeURIComponent(svg);
  const origAttrsStr = svg.replace(/^.*<svg(.*?)>.*$/, '$1');
  const innerSvg = svg.replace(/^.*<svg.*?>/, '').replace(/<\/svg>.*$/, '');
  const attrs = Object.assign({}, {
    viewBox: findAttributeValue(origAttrsStr, 'viewBox'),
    width: width || '100%',
    height: height || '100%',
  });
  return (
    /* eslint-disable react/no-danger */
    <svg className={icon.icon} {...attrs} {...rest} dangerouslySetInnerHTML={{ __html: innerSvg }} />
    /* eslint-enable react/no-danger */
  );
};

SvgIcon.propTypes = {
  data: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default SvgIcon;
