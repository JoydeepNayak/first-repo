// Licensed Materials - Property of IBM
// 5724-Q36
// {c} Copyright IBM Corp. 2017
// US Government Users Restricted Rights - Use', duplication or disclosure
// restricted by GSA ADP Schedule Contract with IBM Corp.
import _ from 'lodash';
import construct from '../../utils/solrQueryConstructor';


/**
 * Constructor for SearchOptions
 */
const SearchOptions = () => {
    // REQUIRED: list of 'filterCategories' and/or 'filterIds' (as fieldIds) for current context
    // Set via setAvailableSearchFilters() api
  const searchOptionObj = {
    availableSearchFilters: {}, // Keyword/text search string
    textSearchField: '',
        // Currently applied search filter query definitions.  Can contain queries of one or more of:
        // stringFieldQueries, numberFieldQueries, dateRangeQueries - for Search UI filters (custom JSON).
        // rawQueries - for ad-hoc, non-Search UI filters, like analysis status filter (Solr q syntax).
        //              Note: for rawQueries, 'filterValue' attribute stores original UI filter value
    appliedFilterQueries: {},

        // PRIVATE (reserved for advSearch): facet field query definitions (by type: numberFacetFields or stringFacetFields),
        // based on availableSearchFilters
    facetFields: {},
        // PRIVATE (reserved for advSearch): Stores current filter selection state. Used to restore filter selection in advanced search controller
    lastFilterState: null,
        // PRIVATE (reserved for advSearch): set to true when facets/facet counts are needed to be returned by the query
    queryFacets: false,
        // PRIVATE: used to record contextKey with bag/help with debugging. Can be used in future for session for managing & persisting search state.
    contextKey: '',
        // Additional query settings used by client:
    pagination: { start: 0, rows: 0 },
    sortFields: [],
  };// sorting info. used for constructQueryJson.  Example format: [{fieldId: name, sortOrder: "ASC"}]

  return searchOptionObj;
};

const filterDefinitions = {
  version: '7', // IMPORTANT: arbitrary version identifier - MUST be modified/incremented when filter changes are made, in order to invalidate cached search options.
  filterDefs: [
    {
      fieldId: 'database',
      filterCategory: 'dataset',
      isAvailable: false,
      isApplied: false,
      type: 'text', // text field filter
      values: [
        {
          value: '',
          selected: true,
        },
      ],
    },
    {
      fieldId: 'schema',
      filterCategory: 'dataset',
      isAvailable: false,
      isApplied: false,
      type: 'text', // text field filter
      values: [
        {
          value: '',
          selected: true,
        },
      ],
    },
    {
      fieldId: 'type',
      filterCategory: 'dataset',
      isAvailable: false,
      isApplied: false,
      type: 'string',
      values: [
        {
          value: 'F',
          displayValue: 'advSearch.label.file',
          selected: true,
        },
        {
          value: 'T',
          displayValue: 'advSearch.label.table',
          selected: true,
        },
      ],
    },
    {
      fieldId: 'numberOfColumns',
      filterCategory: 'dataset',
      isAvailable: false,
      isApplied: false,
      type: 'number',
      facetQueryDefn: {
        fieldId: 'numberOfColumns',
        params: {
          start: 1,
          end: 100,
          gap: 25,
          include: 'lower', // ensure that 101 end value isn't included in last range count
        },
      },
      values: [
        {
          start: 1,
          end: 25,
          selected: true,
        },
        {
          start: 26,
          end: 50,
          selected: true,
        },
        {
          start: 51,
          end: 75,
          selected: true,
        },
        {
          start: 76,
          end: 100,
          selected: true,
        },
        {
          start: 101,
          end: '*',
          displayValue: 'advSearch.label.greaterThanRange',
          selected: true,
        },
      ],
    },
    {
      fieldId: 'assignedDataClasses',
      filterCategory: 'dataset',
      isAvailable: false,
      isApplied: false,
      type: 'string-dynamic',
      values: [],  // dynamic filter
    },
    {
      fieldId: 'foundDataClasses',
      filterCategory: 'dataset',
      isAvailable: false,
      isApplied: false,
      type: 'string-dynamic',
      values: [], // dynamic filter
    },
    {
      fieldId: 'qualityScorequalityScore',
      filterCategory: 'dataset',
      isAvailable: false,
      isApplied: false,
      type: 'number',
      queryType: 'decFloorRounded', // need to match decimal values up to end+1 exclusive
      facetQueryDefn: {
        fieldId: 'qualityScore',
        params: {
          start: 0,
          end: 100,
          gap: 10,
        },
      },
      values: [
        {
          start: 0,
          end: 9,
          selected: true,
        },
        {
          start: 10,
          end: 19,
          selected: true,
        },
        {
          start: 20,
          end: 29,
          selected: true,
        },
        {
          start: 30,
          end: 39,
          selected: true,
        },
        {
          start: 40,
          end: 49,
          selected: true,
        },
        {
          start: 50,
          end: 59,
          selected: true,
        },
        {
          start: 60,
          end: 69,
          selected: true,
        },
        {
          start: 70,
          end: 79,
          selected: true,
        },
        {
          start: 80,
          end: 89,
          selected: true,
        },
        {
          start: 90,
          end: 100,
          selected: true,
        },
      ],
    },
    {
      fieldId: 'qualityScoreStatus',
      filterCategory: 'dataset', // TODO: enable to catalog too when
            // threshold is part of publish
      isAvailable: false,
      isApplied: false,
      type: 'string',
      values: [
        {
          value: '1',
          displayValue: 'advSearch.label.noCompared',
          selected: true,
        },
        {
          value: '2',
          displayValue: 'advSearch.label.conformed',
          selected: true,
        },
        {
          value: '0',
          displayValue: 'advSearch.label.violated',
          selected: true,
        },
      ],
    },
    {
      fieldId: 'numberOfDataRules',
      filterCategory: 'wsBrowse',
      isAvailable: false,
      isApplied: false,
      type: 'number',
      facetQueryDefn: {
        fieldId: 'numberOfDataRules',
        params: {
          start: 1,
          end: 10,
          gap: 10,
          other: 'all',
        },
      },
      values: [
        {
          start: '*',
          end: 0,
          displayValue: 'advSearch.label.none',
          selected: true,
        },
        {
          start: 1,
          end: 10,
          selected: true,
        },
        {
          start: 11,
          end: '*',
          displayValue: 'advSearch.label.elevenOrMore',
          selected: true,
        },
      ],
    },
    {
            // Note that the column is called createdOn in the DB,
            // though it's labelled as First Imported Date in the UI
            // and returned as LASTIMPORTEDDATE from getWrkspDataSets()
      fieldId: 'createdOn',
      filterCategory: 'dataset',
      isAvailable: false,
      isApplied: false,
            // If true, then Applying Filter will display a 1, instead of
            // the number of values selected.
      applyAsSingleValue: true,
      type: 'date',
      values: [
        {
          fieldName: 'fromDate',
        },
        {
          fieldName: 'toDate',
        },
      ],
    },
    {
      fieldId: 'lastAnalyzed',
      filterCategory: 'wsBrowse',
      isAvailable: false,
      isApplied: false,
            // If true, then Applying Filter will display a 1, instead of
            // the number of values selected.
      applyAsSingleValue: true,
      type: 'date',
      values: [
        {
          fieldName: 'fromDate',
        },
        {
          fieldName: 'toDate',
        },
      ],
    },
    {
      fieldId: 'fkAnalysisDate',
      filterCategory: 'wsBrowse',
      isAvailable: false,
      isApplied: false,
            // If true, then Applying Filter will display a 1, instead of
            // the number of values selected.
      applyAsSingleValue: true,
      type: 'date',
      values: [
        {
          fieldName: 'fromDate',
        },
        {
          fieldName: 'toDate',
        },
      ],
    },
    {
      fieldId: 'lastPublished',
      filterCategory: 'dataset',
      isAvailable: false,
      isApplied: false,
            // If true, then Applying Filter will display a 1, instead of
            // the number of values selected.
      applyAsSingleValue: true,
      type: 'date',
      values: [
        {
          fieldName: 'fromDate',
        },
        {
          fieldName: 'toDate',
        },
      ],
    },
  ],
};

/**
 * @ngdoc method
 * @name getSearchOptions
 * @description A new SearchOptions object will be created and return
 * @public
 * @returns {object} search options
 */
const getSearchOptions = () => {
  const options = SearchOptions();
  return options;
};

/**
 * @ngdoc method
 * @name resetFilteringOptions
 * @description Resets searchOptions settings to a non-filtered state - leaving alone filter config options (availableSearchFilters),
 *              and non-filtering related search settings (sortFields).
 * @public
 * @param {object} searchOption object
 * @returns {Object} modified searchOptions
 */
const resetFilteringOptions = (searchOption) => {
  const searchOptions = searchOption;
  const defaultOptions = SearchOptions();
    // reset filtering related attributes to default values:
  searchOptions.appliedFilterQueries = defaultOptions.appliedFilterQueries;
  searchOptions.textSearchField = defaultOptions.textSearchField;
  searchOptions.facetFields = defaultOptions.facetFields;
  searchOptions.lastFilterState = defaultOptions.lastFilterState;
  searchOptions.pagination = defaultOptions.pagination;
  return searchOptions;
};

/**
 * @ngdoc method
 * @name setAvailableSearchFilters
 * @description Convenience property accessor method to set availableSearchFilters property.
 * @public
 * @param {object} searchOption object
 * @param {Array} filterCategories Array of filterCategory id(s) whose filters should be enabled/displayed.
 *              For example, ["dataset"]. Specify null or empty array to omit.
 * @param {Array} filterIds (optional) Array of specific fieldIds for filters to be included.
 * @returns {Object} Modified searchOptions
 */
const setAvailableSearchFilters = (searchOption, filterCategories, filterIds) => {
  const searchOptions = searchOption;
  if (!searchOptions.availableSearchFilters) {
    searchOptions.availableSearchFilters = {};
  }
    // Check if filterCategories is specified and validate it as array
  if (filterCategories !== null && !Array.isArray(filterCategories)) {
    console.warn('Invalid value for filterCategories param passed to da.searchService.setAvailableSearchFilters');
    searchOptions.availableSearchFilters.filterCategories = [];
  } else {
    searchOptions.availableSearchFilters.filterCategories = filterCategories;
  }
    // Check if filterCategories is specified and validate it as array
  if (typeof filterIds !== 'undefined' && filterIds !== null && !Array.isArray(filterIds)) {
    console.warn('Invalid value for filterIds param passed to setAvailableSearchFilters');
    searchOptions.availableSearchFilters.filterIds = [];
  } else {
    searchOptions.availableSearchFilters.filterIds = filterIds;
  }
  return searchOptions;
};

/**
 * @ngdoc method
 * @name isFilteringEnabledF
 * @description Private/internal function that determines if any filtering criteria have been specified - either
 *              text and/or facet filter queries.
 * @private
 * @param {Object} SearchOptions object
 * @returns {boolean} true if filtering is enabled, otherwise false
 */
const isFilteringEnabledF = (searchOptions) => {
  if (searchOptions.textSearchField) {
    return true;
  }
  if ((searchOptions.appliedFilterQueries.numberFieldQueries && searchOptions.appliedFilterQueries.numberFieldQueries.length > 0) ||
        (searchOptions.appliedFilterQueries.stringFieldQueries && searchOptions.appliedFilterQueries.stringFieldQueries.length > 0) ||
        (searchOptions.appliedFilterQueries.dateRangeFieldQueries && searchOptions.appliedFilterQueries.dateRangeFieldQueries.length > 0) ||
        (searchOptions.appliedFilterQueries.rawQueries && searchOptions.appliedFilterQueries.rawQueries.length > 0)) {
    return true;
  }
  return false;
};

/**
 * @ngdoc method
 * @name isFilteringEnabled
 * @description Function that determines if any filtering criteria have been specified - either
 *              text and/or facet filter queries.
 * @public
 * @param {object} searchOption object
 * @returns {boolean} true if filtering is enabled, otherwise false
 */
const isFilteringEnabled = (searchOption) => {
  const searchOptions = searchOption;
  return isFilteringEnabledF(searchOptions);
};

/**
 * @ngdoc method
 * @name setNumberRangeFilter
 * @description Function to set a single number range filter to given search options.
 *              Saves updated search options to session.
 *              NOTE: client should ensure filtering or search options has been reset prior to setting filter.
 *              LIMITATION: will reset/clear any existing numberFieldQueries and only supports adding single field & range.
 * @public
 * @param {object} searchOption object
 * @param {string} fieldId ID of field/filter.
 * @param {int} start Range filter start value.
 * @param {int} end Range filter end value.
 * @returns {Object} Modified searchOptions
 */
const setNumberRangeFilter = (searchOption, fieldId, start, end) => {
  const searchOptions = searchOption;
  if (!searchOptions.appliedFilterQueries) {
    searchOptions.appliedFilterQueries = {};
  }
  const numberFieldQueries = [];
  const fieldQueryValues = [{
    start,
    end,
  }];
  const fieldQuery = {
    fieldId,
    values: fieldQueryValues,
  };
  numberFieldQueries.push(fieldQuery);
  searchOptions.appliedFilterQueries.numberFieldQueries = numberFieldQueries;
  return searchOptions;
};


/**
 * @ngdoc method
 * @name setStringFilter
 * @description Function to add a single selected string facet value (e.g. data class) to search options.
 *              Saves updated search options to session.
 *              NOTE: client should ensure filtering or search options has been reset prior to setting filter.
 *              LIMITATION: will reset/clear any existing stringFieldQueries and only supports adding single field & value.
 * @public
 * @param {object} searchOption object
 * @param {string} fieldId ID of field/filter.
 * @param {string} facetValue The facet value (e.g. name of the data class), for which drill down is expected.
 * @returns {Object} Modified searchOptions
 */
const setStringFilter = (searchOption, fieldId, facetValue) => {
  const searchOptions = searchOption;
  if (!searchOptions.appliedFilterQueries) {
    searchOptions.appliedFilterQueries = {};
  }

  const stringFieldQueries = [];
  const fieldQuery = {
    fieldId,
    exclude: false,
    values: [facetValue],
  };
  stringFieldQueries.push(fieldQuery);
  searchOptions.appliedFilterQueries.stringFieldQueries = stringFieldQueries;
  return searchOptions;
};


/**
 * @ngdoc method
 * @name getFilterValue
 * @description Function to lookup the filterValue attribute of a given applied rawQuery filter (if found).
 *          LIMITATION: currently only supported for ad-hoc, component filters saved as appliedFilterQueries.rawQueries.
 *
 * @param {object} searchOption object
 * @param {string} fieldId Id of raw field query, e.g. "analysisStatus"
 * @returns {string} saved UI filterValue for applied query, otherwise returns "all" if no query is found.
 */
const getFilterValue = (searchOption, fieldIdParam) => {
  const ALL_DATA_FILTER_DEFAULT = 'all';
  const searchOptions = searchOption;

    // Find associated field query for given field
  const query = _.filter(searchOptions.appliedFilterQueries.rawQueries, (obj) => obj.fieldId === fieldIdParam);
  if (!query || query.length === 0 || query[0].filterValue === undefined) {
    return ALL_DATA_FILTER_DEFAULT;
  }

  return query[0].filterValue;
};


/**
 * @ngdoc method
 * @name addRawQuery
 * @public
 * @description Adds adhoc field filter - used when no Adv Search filter exist for a given field/facet.
 *      Field query is added to searchOptions.appliedFilterQueries.rawQueries.
 *      LIMITATION: only supports *one value* filter for a given field.
 *      SENDS 'da.searchService.updatedFilter' event (to notify advSearch)
 * @param {object} searchOption object
 * @param {string} fieldId Query field id
 * @param {?} value Value for field to match
 * @param {string} filterValue Selected UI filter value
 * @returns {object} updated searchOptions
 */
const addRawQuery = (searchOption, fieldId, value, filterValue) => {
  let i;
  let foundIdx = -1;
  const searchOptions = searchOption;
  const fieldQuery = {
    fieldId,
    value,
    filterValue, // actual ui filter control value if different
  };

  if (!searchOptions.appliedFilterQueries) {
    searchOptions.appliedFilterQueries = {};
  }
  if (!searchOptions.appliedFilterQueries.rawQueries) {
    searchOptions.appliedFilterQueries.rawQueries = [];
  }
    // Look for existing field query...
  for (i = 0; i < searchOptions.appliedFilterQueries.rawQueries.length; i += 1) {
    if (searchOptions.appliedFilterQueries.rawQueries[i].fieldId === fieldId) {
      foundIdx = i;
      break;
    }
  }
  if (foundIdx < 0) {
        // if not found, add to rawQueries array
    searchOptions.appliedFilterQueries.rawQueries.push(fieldQuery);
  } else {
        // otherwise update existing object
    searchOptions.appliedFilterQueries.rawQueries[foundIdx] = fieldQuery;
  }
  return searchOptions;
};

/**
 * method
 * @name setAnalysisStatusFilter
 * @description Function to set analysis status code(s) to search options.
 * @param {object} searchOption object
 * @param {string} status Selected UI filter value
 * @param {string} fieldId Id of Solr index field for analysis status field: current possible values
 *          include: "analysisStatus", and "pfkeyAnalysisStatus"
 * @returns {object} updated searchOptions, or undefined if status not valid.
 */
const setAnalysisStatusFilter = (searchOption, status, fieldId) => {
  const ANALYSISSTATUS_CODE = {
    NOT_ANALYZED: '(0 1)', // 0 - null case;1 - not analyzed
    IN_PROGRESS: '(2)', // 2 - in progress
    ANALYZED: '(3 4 8 9)', // include all 4 states of analyzed
    ERROR: '(5)', // 5 - error
    NOT_ANALYZABLE: '(6 7)', // 2 states of not analyzable
    IN_QUEUE: '(10)', // 10 - in queue
    OUTDATED: '(11)', // 11 - outdated
    unknown: '[12 TO *]', // unknown status codes
  };
  let statusCode;

    // define query & save ui status value
  switch (status) {
    case 'Analyzed':
      statusCode = ANALYSISSTATUS_CODE.ANALYZED;
      break;
    case 'Not Analyzed':
      statusCode = ANALYSISSTATUS_CODE.NOT_ANALYZED;
      break;
    case 'In Queue':
      statusCode = ANALYSISSTATUS_CODE.IN_QUEUE;
      break;
    case 'In Progress':
      statusCode = ANALYSISSTATUS_CODE.IN_PROGRESS;
      break;
    case 'Error':
      statusCode = ANALYSISSTATUS_CODE.ERROR;
      break;
    case 'Outdated':
      statusCode = ANALYSISSTATUS_CODE.OUTDATED;
      break;
    case 'Not Analyzable':
      statusCode = ANALYSISSTATUS_CODE.NOT_ANALYZABLE;
      break;
    case 'unknown':
      statusCode = ANALYSISSTATUS_CODE.unknown;
      break;
    default:
      return searchOption; // no status filter is applied
  }
  return addRawQuery(searchOption, fieldId, statusCode, status);
};

/**
 * method
 * @name resetAnalysisStatusFilter
 * @description Function to reset analysis status code(s) to search options.
 * @param {object} searchOption object
 * @param {string} fieldId Id of Solr index field for analysis status field: current possible values
 *          include: "analysisStatus", and "pfkeyAnalysisStatus"
 * @returns {object} updated searchOptions,
 */
const resetAnalysisStatusFilter = (searchOption, fieldId) => {
  const searchOptions = searchOption;
  let i;
  if (!searchOptions.appliedFilterQueries || !searchOptions.appliedFilterQueries.rawQueries) {
    return searchOptions;
  }
    // loop through the rawQuery array
  for (i = 0; i < searchOptions.appliedFilterQueries.rawQueries.length; i += 1) {
        // check if the fieldId is matched analysisStatus
    if (searchOptions.appliedFilterQueries.rawQueries[i].fieldId === fieldId) {
      searchOptions.appliedFilterQueries.rawQueries.splice(i, 1);
    }
  }
  return searchOptions;
};

/**
 * method
 * @name setDataRuleRunStatusFilter
 * @description Function to set analysis status code(s) to search options.
 * @param {object} searchOption object
 * @param status Selected values
 */
const setDataRuleRunStatusFilter = (searchOption, status) => addRawQuery(searchOption, 'dataRuleRunStatuses', status, status);

/**
 * @ngdoc method
 * @name clearFiltering
 * @description Function to reset filtering.
 * @public
 * @param {object} searchOption object
 * @returns {object} updated searchOptions
 */
const clearFiltering = (searchOption) => resetFilteringOptions(searchOption);

/**
 * Function to initialize facetFields property for facet query definitions.
 * Example json:
 *   numberFacetFields = [{
         *       "fieldId": "qualityScore",
         *       "start": 0,
         *       "end": 100,
         *       "gap": 10
         *   }];
 *   stringFacetFields = ["assignedDataClasses", "foundDataClasses", "type"];
 * IMPORTANT: client must save updated searchOptions to session.
 * @param {Object} searchOptions Current searchOptions bag value
 * @param {Array} filters List of available adv search filters for which facet queries are derived.
 * @returns {Object} Returns modified searchOptions bag with facetFields property set.
 */
const setFacetQueries = (searchOptions) => {
  const filters = filterDefinitions.filterDefs;
  const searchOptionsParam = searchOptions;
  const numberFacetFields = [];
  const stringFacetFields = [];

    // Loop through each available filter and set or extract the facet query for each type:
  filters.forEach((filter) => {
    if (filter.type === 'number') {
      numberFacetFields.push(filter.facetQueryDefn);
    } else if (filter.type === 'string' || filter.type === 'string-dynamic') {
      stringFacetFields.push(filter.fieldId);
    } else if (filter.type !== 'date' || filter.type !== 'text') {
            // We ignore date & text filter types because they don't support facets,
            // warn about other types
      console.warn('Unsupported filter.type value found.  Need to update advancedSearch.');
    }
  });
    // conditionally add facet queries to searchOptions.facetFields
  if (numberFacetFields.length > 0) {
    searchOptionsParam.facetFields.numberFacetFields = numberFacetFields;
  }
  if (stringFacetFields.length > 0) {
    searchOptionsParam.facetFields.stringFacetFields = stringFacetFields;
  }
  searchOptionsParam.queryFacets = true;
  return searchOptionsParam;
};

/**
 * @ngdoc method
 * @name constructQueryJson
 * @description Client function to call to generate JSON query payload for search request.
 * @public
 * @param   {object} searchOptions SearchOptions settings to derive query JSON from.
 * @returns {object} JSON object to use for search request query payload.
 */
const constructQueryJson = (searchOptions) => {
    // build solr request - construct the q, facet setting
  const cloudRequest = construct(searchOptions);

    // Request facet counts only if requested for adv search
  cloudRequest.params.facet = searchOptions.queryFacets;

  if (searchOptions.sortFields) {
    if (searchOptions.sortFields.length === 0) {
      cloudRequest.params.sort.push('');
    } else {
      Object.keys(searchOptions.sortFields).forEach((key) => {
        const sortObject = searchOptions.sortFields[key];
            // do something with obj
        const sortField = `${sortObject.fieldId} ${sortObject.sortOrder}`;
        cloudRequest.params.sort.push(sortField);
      });
    }
  }
  if (searchOptions.pagination) {
    cloudRequest.params.start = searchOptions.pagination.start;
    cloudRequest.params.rows = searchOptions.pagination.rows;
  }

  return cloudRequest;
};

module.exports = {
  getSearchOptions,
  constructQueryJson,
  clearFiltering,
  setDataRuleRunStatusFilter,
  resetAnalysisStatusFilter,
  setAnalysisStatusFilter,
  getFilterValue,
  setStringFilter,
  setNumberRangeFilter,
  isFilteringEnabled,
  setAvailableSearchFilters,
  setFacetQueries,
};
