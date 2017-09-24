 ## RelationshipGraphContainer Component
 
RelationshipGraphContainer renders a given graph. It allows to zoom in and out.
It offers graph control options to show/hide nodes and/or relationships labels.

  
 ![Alt text](RelationshipGraphContainer.png?raw=true "RelationshipGraphContainer")
  
  
  ### RelationshipGraphContainer props
 
  RelationshipGraphContainer accepts the following props. 
  
  | Prop name | Type | Required | Comments |
  |   :---: | :---: | :---: | :---  |
  | graph | Object | Yes | Use Graph.newInstance() to create graph from JSON. See example below. |
  | onNodeClicked | Function | No | Function is called when user clicks on a node. |
  | isGraphExplorer | bool | No | RelationshipGraphContainer works in GraphExplorer mode. |
  | onClickExplore | Function | No | Function is called when user click "graph" button in top right corner. |
  | allowZoom | bool | No | Display/hide "Zoom In/Out" buttons |
  | messages | Object | No | Allows to override default messages. |

#### Default Messages


    
  
  ### RelationshipGraphContainer example

```
import GraphExplorer from '@infoserver/gov-shared-ui/lib/RelationshipGraphContainer';
import Graph from '@infoserver/gov-shared-ui/lib/Graph';


  ...
  
  handleNodeClicked(node) {
     console.log('Node clicked', node.entity.id);
  }
  showExplorer() {
    browserHistory.push(`/ibm/iis/shop4info/graph_explorer?e=${entity.id}`);
  }
  ...
  
  // graph comes from Rest API in JSON format e.g.:
  const graph = {
              entities: [
                { id: '4', name: 'TEST_COL_1', type: 'database_column'},
                { id: '3', name: 'TEST_TABLE', type: 'database_table' },
                { id: '8', name: 'Zip Code', type: 'data_class' }],
              relationships: [{ source_id: '4', target_id: '3', label: 'context' }, { source_id: '4', target_id: '8', label: 'classified_as' }],
              incident_entity_relationships: [{ source_id: '3', target_id: '8', label: 'has' }],
            };
            
  <RelationshipGraphContainer
     graph={Graph.newInstance(graph)}
     onNodeClicked={this.handleNodeClicked}
     allowZoom
     onClickExplore={this.showExplorer}
   />

```

