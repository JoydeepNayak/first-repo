/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2017
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

import { getSearchOptions, constructQueryJson, clearFiltering, setDataRuleRunStatusFilter, resetAnalysisStatusFilter, setAnalysisStatusFilter, getFilterValue, setStringFilter, setNumberRangeFilter, isFilteringEnabled, setAvailableSearchFilters, setFacetQueries } from '../DatasetSolrQuery';


describe('datasetSolrQuery', () => {
  it('getsearchOptions returns searchoption object', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {},
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };

    expect(getSearchOptions()).toEqual(expectedActions);
  });

  it('setfacetQueries returns searchoption object ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {},
      facetFields: {
        numberFacetFields: [
          { fieldId: 'numberOfColumns',
            params: {
              start: 1,
              end: 100,
              gap: 25,
              include: 'lower' } },
          { fieldId: 'qualityScore',
            params: {
              start: 0,
              end: 100,
              gap: 10 } },
          { fieldId: 'numberOfDataRules',
            params: {
              start: 1,
              end: 10,
              gap: 10,
              other: 'all' } }],
        stringFacetFields: ['type', 'assignedDataClasses', 'foundDataClasses', 'qualityScoreStatus'] },
      lastFilterState: null,
      queryFacets: true,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setFacetQueries(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('resetfacetQueries returns searchoption object ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {},
      facetFields: {},
      lastFilterState: null,
      queryFacets: true,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = setFacetQueries(getSearchOptions());
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = clearFiltering(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('constructQueryJson returns solr query object without sort and pagination', () => {
    const expectedActions = {
      params: {
        'f.numberOfColumns.facet.range.end': 100,
        'f.numberOfColumns.facet.range.gap': 25,
        'f.numberOfColumns.facet.range.include': 'lower',
        'f.numberOfColumns.facet.range.start': 1,
        'f.numberOfDataRules.facet.range.end': 10,
        'f.numberOfDataRules.facet.range.gap': 10,
        'f.numberOfDataRules.facet.range.other': 'all',
        'f.numberOfDataRules.facet.range.start': 1,
        'f.qualityScore.facet.range.end': 100,
        'f.qualityScore.facet.range.gap': 10,
        'f.qualityScore.facet.range.start': 0,
        facet: true,
        'facet.field': [
          'type',
          'assignedDataClasses',
          'foundDataClasses',
          'qualityScoreStatus',
        ],
        'facet.range': [
          'numberOfColumns',
          'qualityScore',
          'numberOfDataRules',
        ],
        mincount: 0,
        q: '*:*',
        rows: 24,
        sort: [
          '',
        ],
        start: 0,
      },
    };

    const searchOptions = getSearchOptions();
    searchOptions.sortFields = [];
    searchOptions.pagination.start = 0;
    searchOptions.pagination.rows = 24;

    const originalObject = setFacetQueries(searchOptions);
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = constructQueryJson(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('constructQueryJson returns solr query object', () => {
    const expectedActions = {
      params: {
        'f.numberOfColumns.facet.range.end': 100,
        'f.numberOfColumns.facet.range.gap': 25,
        'f.numberOfColumns.facet.range.include': 'lower',
        'f.numberOfColumns.facet.range.start': 1,
        'f.numberOfDataRules.facet.range.end': 10,
        'f.numberOfDataRules.facet.range.gap': 10,
        'f.numberOfDataRules.facet.range.other': 'all',
        'f.numberOfDataRules.facet.range.start': 1,
        'f.qualityScore.facet.range.end': 100,
        'f.qualityScore.facet.range.gap': 10,
        'f.qualityScore.facet.range.start': 0,
        facet: true,
        'facet.field': [
          'type',
          'assignedDataClasses',
          'foundDataClasses',
          'qualityScoreStatus',
        ],
        'facet.range': [
          'numberOfColumns',
          'qualityScore',
          'numberOfDataRules',
        ],
        mincount: 0,
        q: '*:*',
        rows: 0,
        sort: [
          '',
        ],
        start: 0,
      },
    };

    const searchOptions = getSearchOptions();

    const originalObject = setFacetQueries(searchOptions);
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = constructQueryJson(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('constructQueryJson returns solr query object with pagination and sort', () => {
    const expectedActions = {
      params: {
        'f.numberOfColumns.facet.range.end': 100,
        'f.numberOfColumns.facet.range.gap': 25,
        'f.numberOfColumns.facet.range.include': 'lower',
        'f.numberOfColumns.facet.range.start': 1,
        'f.numberOfDataRules.facet.range.end': 10,
        'f.numberOfDataRules.facet.range.gap': 10,
        'f.numberOfDataRules.facet.range.other': 'all',
        'f.numberOfDataRules.facet.range.start': 1,
        'f.qualityScore.facet.range.end': 100,
        'f.qualityScore.facet.range.gap': 10,
        'f.qualityScore.facet.range.start': 0,
        facet: true,
        'facet.field': [
          'type',
          'assignedDataClasses',
          'foundDataClasses',
          'qualityScoreStatus',
        ],
        'facet.range': [
          'numberOfColumns',
          'qualityScore',
          'numberOfDataRules',
        ],
        mincount: 0,
        q: '*:*',
        rows: 24,
        sort: [
          'qualityScore ASC',
        ],
        start: 0,
      },
    };

    const searchOptions = getSearchOptions();
    searchOptions.sortFields = [{
      fieldId: 'qualityScore',
      sortOrder: 'ASC',
    }];
    searchOptions.pagination.start = 0;
    searchOptions.pagination.rows = 24;
    const originalObject = setFacetQueries(searchOptions);
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = constructQueryJson(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setDataRuleRunStatusFilter returns set darulerunstatus filter', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{
          fieldId: 'dataRuleRunStatuses',
          filterValue: undefined,
          value: undefined,
        }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };

    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setDataRuleRunStatusFilter(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setDataRuleRunStatusFilter when appliedFilter is null returns set darulerunstatus filter', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{
          fieldId: 'dataRuleRunStatuses',
          filterValue: undefined,
          value: undefined,
        }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const searchOptions = getSearchOptions();
    searchOptions.appliedFilterQueries = null;

    const originalObject = searchOptions;
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setDataRuleRunStatusFilter(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setDataRuleRunStatusFilter when a darulerunstatus exits returns searchoption and appends darulerunstatus filter', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{
          fieldId: 'dataRuleRunStatuses',
          filterValue: undefined,
          value: undefined,
        }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const searchoptions = setAnalysisStatusFilter(getSearchOptions(), 'Analyzed', 'dataRuleRunStatuses');

    const originalObject = searchoptions;
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setDataRuleRunStatusFilter(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('resetAnalysisStatusFilter when filter applied returns search option', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = setDataRuleRunStatusFilter(getSearchOptions());
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = resetAnalysisStatusFilter(originalObject, 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('resetAnalysisStatusFilter when no filter returns search option', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {},
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    const newSearchObject = resetAnalysisStatusFilter(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAnalysisStatusFilter returns Analysis filter when Analyzed is status ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{ fieldId: 'dataRuleRunStatuses', filterValue: 'Analyzed', value: '(3 4 8 9)' }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAnalysisStatusFilter(originalObject, 'Analyzed', 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAnalysisStatusFilter returns Analysis filter when Not Analyzed is status ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{ fieldId: 'dataRuleRunStatuses', filterValue: 'Not Analyzed', value: '(0 1)' }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };

    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAnalysisStatusFilter(originalObject, 'Not Analyzed', 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAnalysisStatusFilter returns Analysis filter when In Queue is status ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{ fieldId: 'dataRuleRunStatuses', filterValue: 'In Queue', value: '(10)' }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAnalysisStatusFilter(originalObject, 'In Queue', 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAnalysisStatusFilter returns Analysis filter when In Progress is status ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{ fieldId: 'dataRuleRunStatuses', filterValue: 'In Progress', value: '(2)' }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAnalysisStatusFilter(originalObject, 'In Progress', 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAnalysisStatusFilter returns Analysis filter when Error is status ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{ fieldId: 'dataRuleRunStatuses', filterValue: 'Error', value: '(5)' }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAnalysisStatusFilter(originalObject, 'Error', 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAnalysisStatusFilter returns Analysis filter when Outdated is status ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{ fieldId: 'dataRuleRunStatuses', filterValue: 'Outdated', value: '(11)' }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAnalysisStatusFilter(originalObject, 'Outdated', 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAnalysisStatusFilter returns Analysis filter when Not Analyzable is status ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{ fieldId: 'dataRuleRunStatuses', filterValue: 'Not Analyzable', value: '(6 7)' }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAnalysisStatusFilter(originalObject, 'Not Analyzable', 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAnalysisStatusFilter returns Analysis filter when unknown is status ', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        rawQueries: [{ fieldId: 'dataRuleRunStatuses', filterValue: 'unknown', value: '[12 TO *]' }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAnalysisStatusFilter(originalObject, 'unknown', 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAnalysisStatusFilter returns searchoption back when no status is sent', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {},
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    const newSearchObject = setAnalysisStatusFilter(originalObject, '', 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('getFilterValue returns filter value by Analyzed type', () => {
    const expectedActions = 'Analyzed';
    const originalObject = setAnalysisStatusFilter(getSearchOptions(), 'Analyzed', 'dataRuleRunStatuses');
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = getFilterValue(originalObject, 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('getFilterValue returns filter value by all type', () => {
    const expectedActions = 'all';

    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = getFilterValue(originalObject, 'dataRuleRunStatuses');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setStringFilter return searchOption with stringFieldQueries', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        stringFieldQueries: [{ fieldId: 'qualityScoreStatus', exclude: false, values: [1] }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setStringFilter(originalObject, 'qualityScoreStatus', 1);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setStringFilter with no appliedFilterQueries return searchOption with stringFieldQueries', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        stringFieldQueries: [{ fieldId: 'qualityScoreStatus', exclude: false, values: [1] }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const searchOptions = getSearchOptions();
    searchOptions.appliedFilterQueries = null;

    const originalObject = searchOptions;
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setStringFilter(originalObject, 'qualityScoreStatus', 1);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setNumberRangeFilter returns searchoption with numberFieldQueries', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        numberFieldQueries: [{ fieldId: 'qualityScore', values: [{ end: 100, start: 0 }] }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };

    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setNumberRangeFilter(originalObject, 'qualityScore', 0, 100);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setNumberRangeFilter with no appliedFilterQueries returns searchoption with numberFieldQueries', () => {
    const expectedActions = {
      availableSearchFilters: {},
      textSearchField: '',
      appliedFilterQueries: {
        numberFieldQueries: [{ fieldId: 'qualityScore', values: [{ end: 100, start: 0 }] }],
      },
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };

    const searchOptions = getSearchOptions();
    searchOptions.appliedFilterQueries = null;
    const originalObject = searchOptions;
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setNumberRangeFilter(originalObject, 'qualityScore', 0, 100);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('isFilteringEnabled return true depending upon filter', () => {
    const expectedActions = true;

    const originalObject = setNumberRangeFilter(getSearchOptions(), 'qualityScore', 0, 100);
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = isFilteringEnabled(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('isFilteringEnabled return true if textSearchField', () => {
    const expectedActions = true;
    const searchOptions = getSearchOptions();
    searchOptions.textSearchField = 'test';

    const originalObject = setNumberRangeFilter(searchOptions, 'qualityScore', 0, 100);
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = isFilteringEnabled(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('isFilteringEnabled return false depending upon no filter', () => {
    const expectedActions = false;

    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = isFilteringEnabled(originalObject);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAvailableSearchFilters sets filter on the basis of filtercategories', () => {
    const expectedActions = {
      availableSearchFilters: { filterCategories: ['dataset', 'wsBrowse'], filterIds: undefined },
      textSearchField: '',
      appliedFilterQueries: {},
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAvailableSearchFilters(originalObject, ['dataset', 'wsBrowse']);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAvailableSearchFilters sets availableSearchFilters.filterIds to array if other invalid value sent', () => {
    const expectedActions = {
      availableSearchFilters: { filterCategories: ['dataset', 'wsBrowse'], filterIds: [] },
      textSearchField: '',
      appliedFilterQueries: {},
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };

    const originalObject = getSearchOptions();
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAvailableSearchFilters(originalObject, ['dataset', 'wsBrowse'], 'wrongvalue');
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAvailableSearchFilters sets availableSearchFilters to object if other invalid value sent', () => {
    const expectedActions = {
      availableSearchFilters: { filterCategories: ['dataset', 'wsBrowse'], filterIds: undefined },
      textSearchField: '',
      appliedFilterQueries: {},
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const searchOptions = getSearchOptions();
    searchOptions.availableSearchFilters = null;
    const originalObject = searchOptions;
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAvailableSearchFilters(originalObject, ['dataset', 'wsBrowse']);
    expect(newSearchObject).toEqual(expectedActions);
  });

  it('setAvailableSearchFilters sets filter categories to array if other invalid value sent', () => {
    const expectedActions = {
      availableSearchFilters: { filterCategories: [], filterIds: undefined },
      textSearchField: '',
      appliedFilterQueries: {},
      facetFields: {},
      lastFilterState: null,
      queryFacets: false,
      contextKey: '',
      pagination: { start: 0, rows: 0 },
      sortFields: [],
    };
    const searchOptions = getSearchOptions();
    const originalObject = searchOptions;
    expect(originalObject).not.toEqual(expectedActions);
    const newSearchObject = setAvailableSearchFilters(originalObject, 'wrongvalue');
    expect(newSearchObject).toEqual(expectedActions);
  });
});
