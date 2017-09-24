// Licensed Materials - Property of IBM
// 5724-Q36
// {c} Copyright IBM Corp. 2017
// US Government Users Restricted Rights - Use', duplication or disclosure
// restricted by GSA ADP Schedule Contract with IBM Corp.

import cd from 'color-difference';

/**
 * Compare a given color with IBM design colors and returns most similar IBM design color
 * @param hexColor - hex color value e.g.: 777677 without #
 * @returns  []  array of 2 best matches , first by CIE76 algorithm , second by RGB delta
 */
const findSimilarColor = (hexColor) => {
  const cie76match = findSimilarColorCIE76(hexColor);
  const rgbDeltaMatch = findSimilarColorRGBDelta(hexColor);
// eslint-disable-next-line no-console
  console.log('Best match by CIE76: ', cie76match.pallete, cie76match.colorIndex);
// eslint-disable-next-line no-console
  console.log('Best match by RGB delta: ', rgbDeltaMatch.pallete, rgbDeltaMatch.colorIndex);
  return [cie76match, rgbDeltaMatch];
};
export default findSimilarColor;


const findSimilarColorCIE76 = (hexColor) => {
  const allHex = convertIbmDesignColorsToArray();
  let bestDelta = 200;
  let foundBestMatch = 0;
  allHex.forEach((ibmColor) => {
    const delta = cd.compare(`#${ibmColor.hex}`, `#${hexColor}`);
    if (delta <= bestDelta) {
      bestDelta = delta;
      foundBestMatch = ibmColor.color;
    }
  });
  return foundBestMatch;
};


const findSimilarColorRGBDelta = (hexColor) => {
  const allHex = convertIbmDesignColorsToArray();
  let bestDelta = 0;
  let foundBestMatch = 0;
  allHex.forEach((ibmColor) => {
    const delta = hexColorDelta(ibmColor.hex, hexColor);
    if (delta >= bestDelta) {
      bestDelta = delta;
      foundBestMatch = ibmColor.color;
    }
  });
  return foundBestMatch;
};


const hexColorDelta = (hex1, hex2) => {
  const unifiedHex1 = hex1.length === 3 ? [...hex1].map((ch) => ch + ch).join('') : hex1;
  const unifiedHex2 = hex2.length === 3 ? [...hex2].map((ch) => ch + ch).join('') : hex2;
  // get red/green/blue int values of hex1
  const r1 = parseInt(unifiedHex1.substring(0, 2), 16);
  const g1 = parseInt(unifiedHex1.substring(2, 4), 16);
  const b1 = parseInt(unifiedHex1.substring(4, 6), 16);
  // get red/green/blue int values of hex2
  const r2 = parseInt(unifiedHex2.substring(0, 2), 16);
  const g2 = parseInt(unifiedHex2.substring(2, 4), 16);
  const b2 = parseInt(unifiedHex2.substring(4, 6), 16);
  // calculate differences between reds, greens and blues
  let r = 255 - Math.abs(r1 - r2);
  let g = 255 - Math.abs(g1 - g2);
  let b = 255 - Math.abs(b1 - b2);
  // limit differences between 0 and 1
  r /= 255;
  g /= 255;
  b /= 255;
  // 0 means opposit colors, 1 means same colors
  return (r + g + b) / 3;
};

const convertIbmDesignColorsToArray = () => {
  const colorsArray = [];
  Object.keys(ibmDesignColors).forEach(
    (pallete) => {
      const palleteObject = ibmDesignColors[pallete];
      Object.keys(palleteObject).forEach(
      (colorIndex) => colorsArray.push({ hex: palleteObject[colorIndex].substring(1, 7), color: { pallete, colorIndex } }));
    });
  return colorsArray;
};

const ibmDesignColors = {
  ultramarine: {
    1: '#e7e9f7',
    10: '#d1d7f4',
    20: '#b0bef3',
    30: '#89a2f6',
    40: '#648fff',
    50: '#3c6df0',
    60: '#3151b7',
    70: '#2e3f8f',
    80: '#252e6a',
    90: '#20214f',
  },
  blue: {
    1: '#e1ebf7',
    10: '#c8daf4',
    20: '#a8c0f3',
    30: '#79a6f6',
    40: '#5392ff',
    50: '#2d74da',
    60: '#1f57a4',
    70: '#25467a',
    80: '#1d3458',
    90: '#19273c',
  },
  cerulean: {
    1: '#deedf7',
    10: '#c2dbf4',
    20: '#95c4f3',
    30: '#56acf2',
    40: '#009bef',
    50: '#047cc0',
    60: '#175d8d',
    70: '#1c496d',
    80: '#1d364d',
    90: '#1b2834',
  },
  aqua: {
    1: '#d1f0f7',
    10: '#a0e3f0',
    20: '#71cddd',
    30: '#00b6cb',
    40: '#12a3b4',
    50: '#188291',
    60: '#17616b',
    70: '#164d56',
    80: '#13393e',
    90: '#122a2e',
  },
  teal: {
    1: '#c0f5e8',
    10: '#8ee9d4',
    20: '#40d5bb',
    30: '#00baa1',
    40: '#00a78f',
    50: '#008673',
    60: '#006456',
    70: '#124f44',
    80: '#133a32',
    90: '#122b26',
  },
  green: {
    1: '#cef3d1',
    10: '#89eda0',
    20: '#57d785',
    30: '#34bc6e',
    40: '#00aa5e',
    50: '#00884b',
    60: '#116639',
    70: '#12512e',
    80: '#123b22',
    90: '#112c1b',
  },
  lime: {
    1: '#d7f4bd',
    10: '#b4e876',
    20: '#95d13c',
    30: '#81b532',
    40: '#73a22c',
    50: '#5b8121',
    60: '#426200',
    70: '#374c1a',
    80: '#283912',
    90: '#1f2a10',
  },
  yellow: {
    1: '#fbeaae',
    10: '#fed500',
    20: '#e3bc13',
    30: '#c6a21a',
    40: '#b3901f',
    50: '#91721f',
    60: '#70541b',
    70: '#5b421a',
    80: '#452f18',
    90: '#372118',
  },
  gold: {
    1: '#f5e8db',
    10: '#ffd191',
    20: '#ffb000',
    30: '#e39d14',
    40: '#c4881c',
    50: '#9c6d1e',
    60: '#74521b',
    70: '#5b421c',
    80: '#42301b',
    90: '#2f261c',
  },
  orange: {
    1: '#f5e8de',
    10: '#fdcfad',
    20: '#fcaf6d',
    30: '#fe8500',
    40: '#db7c00',
    50: '#ad6418',
    60: '#814b19',
    70: '#653d1b',
    80: '#482e1a',
    90: '#33241c',
  },
  peach: {
    1: '#f7e7e2',
    10: '#f8d0c3',
    20: '#faad96',
    30: '#fc835c',
    40: '#fe6100',
    50: '#c45433',
    60: '#993a1d',
    70: '#782f1c',
    80: '#56251a',
    90: '#3a201b',
  },
  red: {
    1: '#f7e6e6',
    10: '#fccec7',
    20: '#ffaa9d',
    30: '#ff806c',
    40: '#ff5c49',
    50: '#e62325',
    60: '#aa231f',
    70: '#83231e',
    80: '#5c1f1b',
    90: '#3e1d1b',
  },
  magenta: {
    1: '#f5e7eb',
    10: '#f5cedb',
    20: '#f7aac3',
    30: '#f87eac',
    40: '#ff509e',
    50: '#dc267f',
    60: '#a91560',
    70: '#831b4c',
    80: '#5d1a38',
    90: '#401a29',
  },
  purple: {
    1: '#f7e4fb',
    10: '#efcef3',
    20: '#e4adea',
    30: '#d68adf',
    40: '#cb71d7',
    50: '#c22dd5',
    60: '#9320a2',
    70: '#71237c',
    80: '#501e58',
    90: '#3b1a40',
  },
  violet: {
    1: '#ece8f5',
    10: '#e2d2f4',
    20: '#d2b5f0',
    30: '#bf93eb',
    40: '#b07ce8',
    50: '#9753e1',
    60: '#7732bb',
    70: '#602797',
    80: '#44216a',
    90: '#321c4c',
  },
  indigo: {
    1: '#e9e8ff',
    10: '#dcd4f7',
    20: '#c7b6f7',
    30: '#ae97f4',
    40: '#9b82f3',
    50: '#785ef0',
    60: '#5a3ec8',
    70: '#473793',
    80: '#352969',
    90: '#272149',
  },
  gray: {
    1: '#eaeaea',
    10: '#d8d8d8',
    20: '#c0bfc0',
    30: '#a6a5a6',
    40: '#949394',
    50: '#777677',
    60: '#595859',
    70: '#464646',
    80: '#343334',
    90: '#272727',
  },
  'cool-gray': {
    1: '#e3ecec',
    10: '#d0dada',
    20: '#b8c1c1',
    30: '#9fa7a7',
    40: '#8c9696',
    50: '#6f7878',
    60: '#535a5a',
    70: '#424747',
    80: '#343334',
    90: '#272727',
  },
  'warm-gray': {
    1: '#efe9e9',
    10: '#e2d5d5',
    20: '#ccbcbc',
    30: '#b4a1a1',
    40: '#9e9191',
    50: '#7d7373',
    60: '#5f5757',
    70: '#4b4545',
    80: '#373232',
    90: '#2a2626',
  },
  'neutral-white': {
    1: '#fcfcfc',
    2: '#f9f9f9',
    3: '#f6f6f6',
    4: '#f3f3f3',
  },
  'cool-white': {
    1: '#fbfcfc',
    2: '#f8fafa',
    3: '#f4f7f7',
    4: '#f0f4f4',
  },
  'warm-white': {
    1: '#fdfcfc',
    2: '#fbf8f8',
    3: '#f9f6f6',
    4: '#f6f3f3',
  },
  black: {
    100: '#000',
  },
  white: {
    0: '#fff',
  },
};
