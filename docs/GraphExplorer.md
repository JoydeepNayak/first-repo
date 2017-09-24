 ## GraphExplorer Component
 
 GraphExplorer wraps RelationshipsGraphContainer. It adds title panel with buttons. 
 It renders RelationshipsGraphContainer with isGraphExplorer option which changes 
 the way grouped nodes are handled.
  
 ![Alt text](GraphExplorerScreenshot.png?raw=true "Graph Explorer")
  
  
  ### GraphExplorer props
 
  GraphExplorer accepts the following props. 
  
  | Prop name | Type | Required | Comments |
  |   :---: | :---: | :---: | :---  |
  | graph | Object | Yes | Use Graph.newInstance() to create graph from JSON. See example below. |
  | onNodeClicked | Function | No | Function is called when user clicks on a node. |
  | messages | Object | No | Allows to override default messages. |

#### Default Messages

  - title: 'Graph Explorer'
  
  
  ### GraphExplorer example

```
import GraphExplorer from '@infoserver/gov-shared-ui/lib/GraphExplorer';
import Graph from '@infoserver/gov-shared-ui/lib/Graph';


  ...
  
  handleNodeClicked(node) {
     console.log('Node clicked', node.entity.id);
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
            
  <GraphExplorer
     graph={Graph.newInstance(graph)}
     onNodeClicked={this.handleNodeClicked}
   />

```

