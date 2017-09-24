  ## DetailsContent Component
   
   Shows all details of search result. Together with relationships graph. 
   
   
  ### DetailsContent Props
  
  DetailsContent accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | entity | Object | Yes | Result item. |
  | rating | Object | Yes | Object passed to Rating component. |
  | comments | Object | Yes | Object passed to CommentsList component. |
  | messages | Object | No | Allows to override default messages  |
  | graph | Object | No | Graph data object. |
  | onClickExplore | Function | No | Called when explore button is clicked. |
  | handleGraphNodeClicked | Function | No | Called when graph node is clicked. |

    
    
   ### Example
 ````
        <div className={styles.searchResultDetails}>
          <DetailsContent
            entity={entity}
            rating={rating}
            comments={comments}
            graph={graph}
            onClickExplore={this.showExplorer}
            handleGraphNodeClicked={this.handleGraphNodeClicked}
          />
        </div>