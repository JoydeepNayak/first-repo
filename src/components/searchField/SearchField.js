/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'ap-components-react';
import search24 from 'ibm-design-icons/dist/svg/action-based/search_24.svg';
import { findDOMNode } from 'react-dom';
import SvgIcon from '../icons/SvgIcon';
import styles from './searchField.scss';

const ENTER_KEY = 13;

export default class SearchField extends Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleSearchChanged = this.handleSearchChanged.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      query: props.query || '',
    };
  }

  componentDidMount() {
    this.focusSearchField();
    this.search();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.state.query) {
      this.setState({ query: nextProps.query }, () => {
        this.focusSearchField();
        this.search();
      });
    }
  }

  focusSearchField() {
    if (this.props.focused) {
          // hack to focus and set caret position to the end of the search field
      const searchInput = findDOMNode(this.searchField).children[0];
      const value = searchInput.value;
      searchInput.focus();
      searchInput.value = '';
      searchInput.value = value;
    }
  }

  handleSearchChanged(event) {
    clearTimeout(this.timer);
    this.setState({ query: event.target.value });
    this.timer = setTimeout(this.search, this.props.waitInterval || 1000);
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.search();
    }
  }

  search() {
    const { query } = this.state;
    if (!query || !query.trim()) {
      return;
    }
    this.props.onSearch(query);
  }


  render() {
    const mainClass = this.props.withIcon ? styles.searchFieldContainer : styles.searchFieldContainerNoIcon;
    return (
      <div className={mainClass}>
        {
            this.props.withIcon &&
            <div className={styles.icon}>
              <SvgIcon data={search24} style={{ width: 20, height: 20, fill: '#a6266e' }} />
            </div>
        }
        <TextField
          ref={(field) => { this.searchField = field; }}
          placeholder={this.props.text || ''}
          value={this.state.query}
          onChange={this.handleSearchChanged}
          onKeyDown={this.handleKeyDown}
          disabledPlaceholderAnimation={!this.props.textAnimation}
          {...this.props.textFieldProps}
        />
      </div>
    );
  }

}

SearchField.propTypes = {
  query: PropTypes.string,
  text: PropTypes.string,
  waitInterval: PropTypes.number,
  withIcon: PropTypes.bool,
  textAnimation: PropTypes.bool,
  focused: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  textFieldProps: PropTypes.object,
};
