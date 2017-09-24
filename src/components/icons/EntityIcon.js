/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import PropTypes from 'prop-types';

import bee24 from 'ibm-design-icons/dist/svg/object-based/bee_24.svg';
import column24 from 'ibm-design-icons/dist/svg/object-based/column_24.svg';
import folder32 from 'ibm-design-icons/dist/svg/object-based/folder_32.svg';
import data32 from 'ibm-design-icons/dist/svg/object-based/data_32.svg';
import dataSet24 from 'ibm-design-icons/dist/svg/object-based/data-set_24.svg';
import pieChart24 from 'ibm-design-icons/dist/svg/object-based/pie-chart_24.svg';
import schemaDiagram24 from 'ibm-design-icons/dist/svg/object-based/schema-diagram_24.svg';
import table24 from 'ibm-design-icons/dist/svg/object-based/table_24.svg';
import person32 from 'ibm-design-icons/dist/svg/object-based/person_32.svg';

import SvgIcon from './SvgIcon';
import dataclass32 from './entities/dataclass_32.svg';
import database24 from './entities/database_24.svg';
import server24 from './entities/server_24.svg';
import term24 from './entities/term_24.svg';

export const entityTypeToIconMap = {
  bi_folder: folder32,
  bi_report_data_set: dataSet24,
  bi_report_data_item: data32,
  bi_report_definition: pieChart24,
  bi_server: server24,
  data_class: dataclass32,
  database: database24,
  database_schema: schemaDiagram24,
  database_table: table24,
  database_column: column24,
  host: server24,
  person: person32,
  server: server24,
  term: term24,
};

const EntityIcon = (props) => {
  const { entityType, ...rest } = props;
  return (<SvgIcon {...rest} data={entityTypeToIconMap[entityType] || bee24} />);
};

EntityIcon.propTypes = {
  entityType: PropTypes.string,
};

export default EntityIcon;
