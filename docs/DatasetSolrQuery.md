# Dataset Solr Query Constructor
DatasetSolrQuery component/function for building the request object for solr cloud.

## API's exposed to user 
- clearFiltering
- constructQueryJson
- getSearchOptions
- getFilterValue
- isFilteringEnabled
- resetAnalysisStatusFilter
- setAvailableSearchFilters
- setAnalysisStatusFilter
- setDataRuleRunStatusFilter
- setFacetQueries
- setStringFilter
- setNumberRangeFilter

### searchOption Object
````
 searchOptionObj = {
    availableSearchFilters: {}, // Keyword/text search string
    textSearchField: '',
        // Currently applied search filter query definitions.  Can contain queries of one or more of:
        // stringFieldQueries, numberFieldQueries, dateRangeQueries - for Search UI filters (custom JSON).
        // rawQueries - for ad-hoc, non-Search UI filters, like analysis status filter (Solr q syntax).
        //              Note: for rawQueries, 'filterValue' attribute stores original UI filter value
    appliedFilterQueries: {},

        // PRIVATE (reserved for advSearch): facet field query definitions (by type: numberFacetFields or stringFacetFields),
        // based on availableSearchFilters
    _facetFields: {},
        // PRIVATE (reserved for advSearch): Stores current filter selection state. Used to restore filter selection in advanced search controller
    _lastFilterState: null,
        // PRIVATE (reserved for advSearch): set to true when facets/facet counts are needed to be returned by the query
    _queryFacets: false,
        // PRIVATE: used to record contextKey with bag/help with debugging. Can be used in future for session for managing & persisting search state.
    _contextKey: '',
        // Additional query settings used by client:
    pagination: { start: 0, rows: 0 },
    sortFields: [],
  };//
````

## API
### clearFiltering
Function to reset filtering.
- Params
    ````
    {Object} 'searchOption' - SearchOption object
    ````
### constructQueryJson
Client function to call to generate JSON query payload for search request.
- Params
    ````
    {Object} 'searchOption' object - SearchOptions settings to derive query JSON from.
    ````
- Returns 
   ````
   JSON object to use for search request query payload.
   ````
### getSearchOptions
A new SearchOptions object will be created and return
- Returns
    ````
    {Object} 'searchOption' - SearchOption object
    ````
### getFilterValue
Function to lookup the filterValue attribute of a given applied rawQuery filter (if found).
LIMITATION: currently only supported for ad-hoc, component filters saved as appliedFilterQueries.rawQueries.
- Params
    ````
    {Object} 'searchOption' - SearchOption object
    {string} 'fieldId' - {string} Id of raw field query, e.g. "analysisStatus"
    ````
- Returns 
    ````
    {string} saved UI filterValue for applied query, otherwise returns "all" if no query is found.
    ````
### isFilteringEnabled
Function that determines if any filtering criteria have been specified - either text and/or facet filter queries.
- Params
    ````
   {Object} 'searchOption' - SearchOption object
    ````
- Returns
    ````
  {boolean} true if filtering is enabled, otherwise false
    ````
### resetAnalysisStatusFilter
Function to reset analysis status code(s) to search options. 
- Params
    ````
   {Object} 'searchOption' - SearchOption object
   {string} fieldId Id of Solr index field for analysis status field
    ````
- Returns
   ````
   {Object} updated searchOptions
   ````
### setAvailableSearchFilters
 Convenience property accessor method to set availableSearchFilters property.
- Params
    ````
   {Object} 'searchOption' - SearchOption object
   {Array} filterCategories Array of filterCategory id(s) whose filters should be enabled/displayed.
   {Array} filterIds (optional) Array of specific fieldIds for filters to be included.
    ````
- Returns
   ````
   {Object} updated searchOptions
   ````
### setAnalysisStatusFilter
 Function to set analysis status code(s) to search options.
- Params
    ````
   {Object} 'searchOption' - SearchOption object
   {string} status Selected UI filter value
   {string} fieldId Id of Solr index field for analysis status field
    ````
- Returns
   ````
   {Object} updated searchOptions or undefined if status not valid.
   ````
### setDataRuleRunStatusFilter
Function to set analysis status code(s) to search options.
- Params
    ````
   {Object} 'searchOption' - SearchOption object
   {string} status Selected values
    ````
### setFacetQueries
Function to initialize _facetFields property for facet query definitions.
- Params
   ````
   {Object} searchOptions Current searchOptions bag value
   {Array} filters List of available adv search filters for which facet queries are derived.
   ````
- Returns 
   ````
    {Object} Returns modified searchOptions bag with _facetFields property set.
   ````
###  setStringFilter
Function to add a single selected string facet value (e.g. data class) to search options.
NOTE: client should ensure filtering or search options has been reset prior to setting filter.
LIMITATION: will reset/clear any existing stringFieldQueries and only supports adding single field & value.
- Params
   ````
   {Object} 'searchOption' - SearchOption object
   {string} fieldId ID of field/filter.
   {string} facetValue The facet value (e.g. name of the data class), for which drill down is expected.
   ````
- Returns 
   ````
    {Object} modified searchOptions.
   ````
### setNumberRangeFilter
Function to set a single number range filter to given search options.
NOTE: client should ensure filtering or search options has been reset prior to setting filter.
LIMITATION: will reset/clear any existing numberFieldQueries and only supports adding single field & range. field & value.
- Params
   ````
   {Object} 'searchOption' - SearchOption object
   {string} fieldId ID of field/filter.
   {int} start Range filter start value.
   {int} end Range filter end value. expected.
   ````
- Returns 
   ````
    {Object} modified searchOptions.
   ````

## Usage
#### Example

Import
````
import { DatasetSolrQuery } from '@infoserver/gov-shared-ui';
````

To Obtain the JSON
````
...

 let searchoption = DatasetSolrQuery.getSearchOptions();
     searchoption = DatasetSolrQuery.setFacetQueries(searchoption);
     const jsonQuery = DatasetSolrQuery.constructQueryJson(searchoption);

....
````