/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
module.exports = {
  entry: {
    LoginService: 'loginPage/LoginService',
    LoginPage: 'loginPage/LoginPage',
    EntityIcon: 'icons/EntityIcon',
    LoaderContainer: 'loaderContainer/LoaderContainer',
    SearchField: 'searchField/SearchField',
    DonutChart: 'donutChart/DonutChart',
    DisplayCard: 'cardLayout/DisplayCard',
    FlipCard: 'flipCard/FlipCard',
    CardLayout: 'cardLayout/CardLayout',
    BarChart: 'barChart/BarChart',
    Menu: 'menu/Menu',
    SvgIcon: 'icons/SvgIcon',
    DatasetSolrQuery: 'datasetSolrQuery/DatasetSolrQuery',
    ConnectionsPage: 'connectionsPage/ConnectionsPage',
    ConnectionService: 'connectionsPage/ConnectionService',
    Toolbar: 'toolbar/Toolbar',
    ToolbarItem: 'toolbar/ToolbarItem',
    ToolbarSeparator: 'toolbar/ToolbarSeparator',
    Header: 'header/Header',
    CardLayoutManager: 'layoutManager/CardLayoutManager',
    DialogBox: 'dialogBox/DialogBox',
    Footer: 'footer/Footer',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
    'react-router': {
      commonjs: 'react-router',
      commonjs2: 'react-router',
      amd: 'react-router',
      root: 'react-router',
    },
    'react-modal': {
      commonjs: 'react-modal',
      commonjs2: 'react-modal',
      amd: 'react-modal',
      root: 'ReactModal',
    },
    'ap-components-react': {
      commonjs: 'ap-components-react',
      commonjs2: 'ap-components-react',
      amd: 'ap-components-react',
      root: 'ap-components-react',
    },
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: 'lodash',
    },
    d3: {
      commonjs: 'd3',
      commonjs2: 'd3',
      amd: 'd3',
      root: 'd3',
    },
    'react-grid-layout': {
      commonjs: 'react-grid-layout',
      commonjs2: 'react-grid-layout',
      amd: 'react-grid-layout',
      root: 'react-grid-layout',
    },
    'react-draggable': {
      commonjs: 'react-draggable',
      commonjs2: 'react-draggable',
      amd: 'react-draggable',
      root: 'react-draggable',
    },
    moment: {
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
      root: 'moment',
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types',
      root: 'prop-types',
    },
  },
};
