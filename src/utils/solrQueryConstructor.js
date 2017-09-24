// Licensed Materials - Property of IBM
// 5724-Q36
// {c} Copyright IBM Corp. 2017
// US Government Users Restricted Rights - Use', duplication or disclosure
// restricted by GSA ADP Schedule Contract with IBM Corp.
import _ from 'lodash';

const SolrCloudSearchFormat = () => ({
  params: {
    q: '',
    start: 0,
    rows: 0,
    mincount: 0,
    sort: [],
    facet: true,
    'facet.field': [], // aka string facet
    'facet.range': [], // aka number facet
  },
});

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
      fieldId: 'qualityScore',
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
 * @description
 * Escape any characters that have special meaning in SOLR queries.
 * @param inputString string to be escaped, usually a single keyword or
 *        and the contents of a phrase,
 * @returns string value that is safe to use in SOLR query.
 */
const escapeSolrSpecialCharacter = (inputString) => {
  const pattern = /\\!\*\\-\\=\\<\\>\\&\+\|\(\)\[\]\{\}\^\\~\?\\:\\\\"/g;

  const inputStringParam = inputString.replace(pattern, '\\$1');
  return inputStringParam;
};

/**
 * @description
 * Take the search information input by the user, validate it and
 * transform it into a search string that Apache Lucene will accept.
 * See Lucene search information here:
 *     https://lucene.apache.org/core/2_9_4/queryparsersyntax.html
 * @param inputString string entered in the search field by the user
 * @returns transformed input string that is in the format needed for
 *          Lucene/SOLR.
 */
const processSearchTermLine = (inputStringParam) => {
  let processedString = '';
  let arrayOfKeywords;
  let arrInd;
  let currentWord;
  let nextWord;

    // SOLR doesn't like strings quoted with single quote
    // marks, so change these to double quotes. This also
    // fixes any issues with mismatched quote mark types.
    // A side effect is that the user can't search for text
    // that includes a single quote character.
  const inputString = inputStringParam.replace(/'/g, '"');

    // Try to tokenize the input line using double quotes. Include the double quotes
    // in the resulting token array so we can reassemble the quoted string
  if (inputString.split(/(")/).length > 1 ||
        (inputString.split(/(")/) === 1 && inputString[0] === '"' && inputString[inputString.length - 1] === '"')) {
    arrayOfKeywords = inputString.split(/(")/);
    for (arrInd = 0; arrInd < arrayOfKeywords.length; arrInd += 1) {
      currentWord = arrayOfKeywords[arrInd].trim();

              // If this is a quote mark it's the start of a new phrase
      if (arrayOfKeywords[arrInd].trim() === '"') {
        arrInd += 1;

                // Loop through the remaining elements and build
                // the search phrase until the closing quote (if any)
                // is found.
        for (0; arrInd < arrayOfKeywords.length; arrInd += 1) {
          nextWord = arrayOfKeywords[arrInd];

                    // Confirm the token being processed isn't just a
                    // set of spaces
          if (nextWord.trim().length > 0) {
            currentWord += nextWord;
            if (nextWord === '"') {
              break;
            }
          }
        }
      }

            // Ignore empty quoted strings, invalid user input
      if (currentWord !== '""') {
        if (processedString.length > 0) {
          processedString += ' AND ';
        }

        if (currentWord[0] === '"' && currentWord[currentWord.length - 1] === '"') {
                    // Don't surround phrases with wildcards, it seems to
                    // cause all data sets to be matched.
          processedString += `_text_:${escapeSolrSpecialCharacter(currentWord)}`;
        } else {
          processedString += `${'_text_:*'}${escapeSolrSpecialCharacter(currentWord)}*`;
        }
      }
    }
  } else {
        // No quote marks, so tokenize input text using spaces as separators
    arrayOfKeywords = inputString.split(' ');
    arrayOfKeywords.forEach((tokenparam) => {
      const token = tokenparam.trim();
      if (token.length > 0) {
        if (processedString.length > 0) {
          processedString += ' AND ';
        }

        processedString += `_text_:*${escapeSolrSpecialCharacter(token)}*`;
      }
    });
  }

    // If the resulting string is empty, just search for everything
    // This can happen if the user just enters "" as a search term.
  if (processedString.length === 0) {
    processedString = '*:*';
  }
  return processedString;
};

/**
 * @ngdoc object
 * @param   {Number} start start of the number range
 * @param   {Number} end   end of the number range
 * @returns {Object} the number range object
 */
const NumberRange = (startparam, endparam) => {
    // properties
  const start = startparam;
  const end = endparam;

  if (typeof getStart !== 'function') {
    NumberRange.prototype.getStart = function () {
      return start;
    };

    NumberRange.prototype.getEnd = function () {
      return end;
    };
  }
};

/**
 * @ngdoc  object
 * @param   {Number}  filedId filed id of the string term (facet)
 * @param   {Boolean} exclude boolean of the exclusion
 * @param   {Array}   values  array of the values of the string
 * @returns {object}  the string term query object
 */
const StringTermQuery = (fieldId, exclude, values) => {
    // properties
  const obj = {
    fieldId,
    exclude,
    values,
  };
  return obj;
};

/**
 * @ngdoc  object
 * @param   {Number}  filedId field id of the query
 * @param   {String}  the value of the query
 *                    NOTE: to handle analysis status filter query for V1
 *                    Can only be selected from toolbar dropdown -- not for Search UI
 */
const RawQuery = (fieldId, value) => {
    // properties
  const obj = {
    fieldId,
    value,
  };
  return obj;
};

/**
 * @ngdoc object
 * @param {Number} fieldId the field id of the number range
 * @param {Array}  ranges  the array of number range objects
 */
const NumberRangeQuery = (fieldId, ranges, queryType) => {
    // properties

  const obj = {
    fieldId,
    queryType,
    ranges: ranges.length > 0 ? ranges : null,
  };
  return obj;
    /* Leaving this - might need?
     if (typeof this.append !== "function") {
     NumberRangeQuery.prototype.append = function(start, end) {
     var range = new NumberRange(start, end);
     if (this.values === null)
     this.values = [];
     this.values.push(range);
     }
     } */
};

/**
 * @ngdoc object
 * @param   {Date}   start start date of the range
 * @param   {Date}   end   end date of the range
 * @returns {object} the date range object
 */
const DateRange = (startparam, endparam) => {
    // properties
  let start;
  let end;
  if (startparam) {
    if (typeof startparam === 'string') {
      start = new Date(startparam);
    } else if (typeof startparam === typeof Date) {
      start = startparam;
    }
        // Set the start date to the beginning of the day
        // This ensures that a value is included whatever time of
        // the date it happened.
    start.setHours(0, 0, 0);
  }
  if (endparam) {
    if (typeof endparam === 'string') {
      end = new Date(endparam);
    } else if (typeof endparam === typeof Date) {
      end = endparam;
    }
        // Set the end date to the end of the day
        // This ensures that a value is included whatever time of
        // the date it happened.
    end.setHours(23, 59, 59);
  }

  if (typeof getStart !== 'function') {
    DateRange.prototype.getStart = function () {
      return start;
    };

    DateRange.prototype.getEnd = function () {
      return end;
    };
  }
};

/**
 * @ngdoc object
 * @param {Number} fieldId the field id of the date range
 * @param {Array}  ranges  the array of date range objects
 */
const DateRangeQuery = (fieldId, ranges) => {
    // properties
  const obj = {
    fieldId,
    range: ranges.length > 1 ? new DateRange(ranges[0], ranges[1]) : null,
  };
    // This assumes there is only two values in ranges. If date fields
    // support multiple ranges, there's more work needed here
    // because unless we impose a rule on the current range structure
    // that its size is a multiple of 2 which would be very inelegant.

  return obj;
};

/**
 * @ngdoc object
 * @description
 * the search query object.
 *
 * @returns {object} search query object. has 5 public methods:
 *                   1. addSearchFieldString(text)
 *                   2. addStringTermQuery(fieldId, exclude, values)
 *                   3. addNumberRangeQuery(fieldId, values)
 *                   4. addDateRangeQuery(fieldId, values)
 *                   5. addRawQuery(fieldId, value)
 *                   6. getQuery()
 */
const SearchQuery = () => {
    // properties
  let textSearchField = '';
  let stringTermQueries = null;
  let numberRangeQueries = null;
  let dateRangeQueries = null;
  let rawQueries = null;
  const TOKEN_AND = ' AND ';
  const TOKEN_OR = ' OR ';
  const TOKEN_NOT = 'NOT ';
  const TOKEN_TO = ' TO ';

    // methods
  if (typeof addSearchFieldString !== 'function') {
    SearchQuery.prototype.addSearchFieldString = function (text) {
      if (text !== null) {
        textSearchField = text.trim();
      }
    };

    SearchQuery.prototype.addStringTermQuery = function (fieldId, exclude, values) {
      if (fieldId !== null && fieldId !== '' && values !== null) {
        if (stringTermQueries === null) {
          stringTermQueries = [];
        }

        const stringTermQuery = new StringTermQuery(fieldId.trim(), exclude, values);

        stringTermQueries.push(stringTermQuery);
      }
            // JSON.stringfy(this.stringFieldList);
    };

    SearchQuery.prototype.addNumberRangeQuery = function (fieldId, values, queryType) {
      if (fieldId !== null && fieldId !== '' && values !== null) {
        if (numberRangeQueries === null) {
          numberRangeQueries = [];
        }

        const numberRangeQuery = new NumberRangeQuery(fieldId.trim(), values, queryType);

        numberRangeQueries.push(numberRangeQuery);
      }
    };

    SearchQuery.prototype.addDateRangeQuery = function (fieldId, values) {
      if (fieldId !== null && fieldId !== '' && values !== null) {
        if (dateRangeQueries === null) {
          dateRangeQueries = [];
        }

        const dateRangeQuery = new DateRangeQuery(fieldId.trim(), values);

        dateRangeQueries.push(dateRangeQuery);
      }
    };

    SearchQuery.prototype.addRawQuery = function (fieldId, value) {
      if (fieldId !== null && fieldId !== '' && value !== null) {
        if (rawQueries === null) {
          rawQueries = [];
        }

        const rawQuery = new RawQuery(fieldId.trim(), value);

        rawQueries.push(rawQuery);
      }
    };

    SearchQuery.prototype.getQuery = function () {
      let query = '';
      let index;
      let index2;
      let index3;
      let iVal;
      let iVal2;
      let rangeLen;
      let rangeIndex;
      let valuesLen;

      if (textSearchField !== null && textSearchField.length > 0) {
                // Have to validate the input string from the user and, if
                // OK, change it into a format that works for Lucene.
        query = processSearchTermLine(textSearchField);
      } else {
                // When simple text is null or empty, query should
                // start with *:* (start colon start).
                // This returns all data sets
        query = '*:*';
      }

      if (stringTermQueries !== null) {
        for (index = 0; index < stringTermQueries.length; index += 1) {
          if (query.length > 0) {
            query += TOKEN_AND;
          }
          query += stringTermQueries[index].fieldId;
          query += ':';

          valuesLen = stringTermQueries[index].values.length;

          if (stringTermQueries[index].exclude === true) {
            if (valuesLen > 0) {
              query += '(* ';
            }
            for (iVal = 0; iVal < valuesLen; iVal += 1) {
              if (iVal !== 0) {
                query += ' ';
              }
                            // Quote values so we support multi word facet values (e.g. data classes)
              query += `${TOKEN_NOT}"${escapeSolrSpecialCharacter(stringTermQueries[index].values[iVal])}"`;
            }
            if (valuesLen > 0) {
              query += ')';
            }
          } else {
            if (valuesLen > 0) {
              query += '(';
            }
            for (iVal2 = 0; iVal2 < valuesLen; iVal2 += 1) {
              if (iVal2 !== 0) {
                query += TOKEN_OR;
              }
                            // Quote values so we support multi word facet values (e.g. data classes)
              query += `"${escapeSolrSpecialCharacter(stringTermQueries[index].values[iVal2])}"`;
            }
            if (valuesLen > 0) {
              query += ')';
            }
          }
        }
      }

      if (numberRangeQueries !== null &&
                numberRangeQueries.length > 0) {
        for (index2 = 0; index2 < numberRangeQueries.length; index2 += 1) {
          if (numberRangeQueries[index2].ranges) {
            if (numberRangeQueries[index2].fieldId !== null &&
                            numberRangeQueries[index2].fieldId.length > 0 &&
                            numberRangeQueries[index2].ranges !== null &&
                            numberRangeQueries[index2].ranges.length > 0) {
              if (query.length > 0) {
                query += TOKEN_AND;
              }

              query += numberRangeQueries[index2].fieldId;
              query += ':';
              query += '(';

              rangeLen = numberRangeQueries[index2].ranges.length;
              for (rangeIndex = 0; rangeIndex < rangeLen; rangeIndex += 1) {
                if (rangeIndex !== 0) {
                  query += TOKEN_OR;
                }
                query += '[';
                if (numberRangeQueries[index2].ranges[rangeIndex].getStart() === null) {
                  query += '*';
                } else {
                  query += numberRangeQueries[index2].ranges[rangeIndex].getStart();
                }

                query += TOKEN_TO;

                if (numberRangeQueries[index2].ranges[rangeIndex].getEnd() === null) {
                  query += '*';
                } else if (numberRangeQueries[index2].queryType === 'decFloorRounded') {
                                    // Check for special queryType "decFloorRounded", which means we need to match up to, but not
                                    // including end+1.
                  query += (numberRangeQueries[index2].ranges[rangeIndex].getEnd() + 1);
                } else {
                  query += numberRangeQueries[index2].ranges[rangeIndex].getEnd();
                }

                                // Check for special queryType "decFloorRounded", which means we need to match up to, but not
                                // including end+1.  For example:  qualityScore:([10 TO 20})
                if (numberRangeQueries[index2].queryType === 'decFloorRounded') {
                                    // terminate with }
                  query += '}';
                } else {
                                    // otherwise terminate with ]
                  query += ']';
                }
              }

              query += ')';
            }
          }
        }
      }

      if (dateRangeQueries !== null &&
                dateRangeQueries.length > 0) {
        for (index3 = 0; index3 < dateRangeQueries.length; index3 += 1) {
          if (dateRangeQueries[index3].fieldId !== null &&
                        dateRangeQueries[index3].fieldId.length > 0 &&
                        dateRangeQueries[index3].range !== null) {
            if (query.length > 0) {
              query += TOKEN_AND;
            }

            query += dateRangeQueries[index3].fieldId;
            query += ':([';

            if (dateRangeQueries[index3].range.getStart() === null ||
                            dateRangeQueries[index3].range.getStart() === '') {
              query += '*';
            } else {
              query += dateRangeQueries[index3].range.getStart().toISOString();
            }

            query += TOKEN_TO;

            if (dateRangeQueries[index3].range.getEnd() === null ||
                            dateRangeQueries[index3].range.getEnd() === '') {
              query += '*';
            } else {
              query += dateRangeQueries[index3].range.getEnd().toISOString();
            }

            query += '])';
          }
        }
      }

      if (rawQueries !== null) {
        for (index = 0; index < rawQueries.length; index += 1) {
          if (query.length > 0) {
            query += TOKEN_AND;
          }
          query += rawQueries[index].fieldId;
          query += ':';
          query += rawQueries[index].value;
        }
      }
      return query;
    };
  }
};

/**
 * Function to search FilterDefinitions to lookup the queryType property for a filter, if any.
 * Namely for Quality Score "decFloorRounded" query type.
 * @param {string} fieldIdParam
 * @returns {string} queryType attribute value, otherwise returns null or undefined.
 */
const getFilterQueryType = (fieldIdParam) => {
  const allFilters = filterDefinitions;

  const filter = _.filter(allFilters.filterDefs, (obj) => obj.fieldId === fieldIdParam);

  if (!filter || !filter[0]) {
    return null;
  }
  return filter[0].queryType;
};

/**
 * Main method to construct query json.
 * @param   {object}   options searchOptions
 * @returns {SolrCloudSearchFormat} Request object.
 */
const construct = (options) => {
  const solrCloudRequest = new SolrCloudSearchFormat();
  const query = new SearchQuery();

  query.addSearchFieldString(options.textSearchField);

    // Method to add String fields. For eg. you have field called workspace and then
    // you have 3 types of workspace listed
    // query.addStringTermQuery("workspace", false, new Array("demo234", "foo", "bank"));

    // Method to add number ranges.
    // For fields like qualityScore you can have range as follows.
    // 1st range - give me quality score from beginning to 20
    // 2nd range - given me quality score from 30 - 40
    // 3rd range - give me quality score from 50 - ending

  if (options.appliedFilterQueries.numberFieldQueries) {
    Object.keys(options.appliedFilterQueries.numberFieldQueries).forEach((key) => {
      const numberFieldQuery = options.appliedFilterQueries.numberFieldQueries[key];
      const numberRanges = [];
      const queryType = getFilterQueryType(numberFieldQuery.fieldId); // optional query type, e.g. "decFloorRounded".

      Object.keys(numberFieldQuery.values).forEach((innerkey) => {
        const selectedValues = numberFieldQuery.values[innerkey];
        numberRanges.push(new NumberRange(selectedValues.start, selectedValues.end));
      });
      query.addNumberRangeQuery(numberFieldQuery.fieldId, numberRanges, queryType);
    });
  }

    // Method to add String fields, aka string facets
  if (options.appliedFilterQueries.stringFieldQueries) {
    Object.keys(options.appliedFilterQueries.stringFieldQueries).forEach((key) => {
      const stringField = options.appliedFilterQueries.stringFieldQueries[key];
      const stringFields = [];

      Object.keys(stringField.values).forEach((innerkey) => {
        const stringValue = stringField.values[innerkey];
        stringFields.push(stringValue);
      });
      query.addStringTermQuery(stringField.fieldId, stringField.exclude, stringFields);
    });
  }

    // Method to add status fields
  if (options.appliedFilterQueries.rawQueries) {
    Object.keys(options.appliedFilterQueries.rawQueries).forEach((key) => {
      const statusField = options.appliedFilterQueries.rawQueries[key];
      query.addRawQuery(statusField.fieldId, statusField.value);
    });
  }

    // Method to add date range fields
  if (options.appliedFilterQueries.dateRangeFieldQueries) {
    Object.keys(options.appliedFilterQueries.dateRangeFieldQueries).forEach((key) => {
      const dateField = options.appliedFilterQueries.dateRangeFieldQueries[key];
      const dateFields = [];
      Object.keys(dateField.values).forEach((innerkey) => {
        const dateValue = dateField.values[innerkey];
        dateFields.push(dateValue);
      });
      query.addDateRangeQuery(dateField.fieldId, dateFields);
    });
  }

    // Add number range facet queries
  if (options.facetFields.numberFacetFields) {
    Object.keys(options.facetFields.numberFacetFields).forEach((key) => {
      const numberFacetField = options.facetFields.numberFacetFields[key];
      Object.keys(numberFacetField.params).forEach((innerkey) => {
                // set query params, like start, end, gap, etc.
        solrCloudRequest.params[`f.${numberFacetField.fieldId}.facet.range.${innerkey}`] = numberFacetField.params[innerkey];
      });
      solrCloudRequest.params['facet.range'].push(numberFacetField.fieldId);
    });
  }
    // Add string facet queries
  if (options.facetFields.stringFacetFields) {
    Object.keys(options.facetFields.stringFacetFields).forEach((key) => {
      const stringField = options.facetFields.stringFacetFields[key];
      solrCloudRequest.params['facet.field'].push(stringField);
    });
  }

  solrCloudRequest.params.q = query.getQuery();
  return solrCloudRequest;
};
export default construct;
