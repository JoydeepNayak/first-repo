  ## Result List Component
  
   Result List Component provides wrapper for search results.
   It also can display error messages and search progress. 
   
  ### Result List Props
  
 Result List accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | isFetching | Boolean | No | When true Loading progess will be displayed. |
  | results | Array | No | Array of result objects passed to ResultItem. |
  | error | Object |No | When defined error message will be displayed. |
  | showContext | Boolean |No | Should context be displayed in ResultItem.|
  | messages | Object |No | Allows to override default messages. |
  | onNameClick | Function |No | Executed when user clicks on result name. |
  | onContextElemClick | Function |No | Executed when user clicks on result context. |  
   
   #### Default Messages:
   
  - error: 'Failed to obtain search results.'
  - noResults: 'No results have been found.'
  - welcome: 'Please enter search criteria.'

    
   ### Example
 
    <div className={styles.searchResults}>
      <ResultList {...props} onContextElemClick={nameClick} onNameClick={nameClick} />
    </div> 