## Connection Page Component
   
  Connection Page with Card Layout displays connection cards in a four-column layout building cards from an array of data.
   
### Connection Page
  
  Connection Page accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | dispatch | function | Yes | function to call fetchConnections from connection service|
  | connections | Array | No | Data is an array of objects that contains: title, description, rows array of metadata of the card|
  | isFetching | Boolean | No | Flag indicating that connections are loading|
  | errorMessage | String | No | Error message if connections don't load|
  | query | Object | No | Solr type query to fetch Connections. If not specified fetches all connections|

          
### Example
 ````
<div>
   <ConnectionsPage dispatch={dispatchFn} query={query} />
</div>