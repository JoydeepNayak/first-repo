  ## Search Field Component
   ![Alt text](SearchField.png?raw=true "Search Field")
  
   Input field that can be used to get search query.
   
  ### Search Field Props
  
  Search Field accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | onSearch | Function | Yes | Search Field calls this function when requesting for search results. It takes query as a parameter. |
  | query | String | No | Initial query value. |
  | text | String | No | Text to be displayed when query is empty. |
  | waitInterval | Number | No | Time in ms to wait before calling onSearch. |
  | withIcon | Boolean | No | Should Icon be visible. |
  | textAnimation | Boolean | No | Should text be animated or hidden. |
  | focused | Boolean | No | Should grab focus upon rendering. |
  | textFieldProps | Boolean | No | Props that will be passed to underlying TextField. |
    
    
   ### Example
 ````
 <div style={{ backgroundColor: '#f9f9fb', borderBottom: '1px solid #e0e0e0', padding: '10px 20px' }}>
     <SearchField
         onSearch={this.search}
         text="What are you looking for?"
         query={query}
         withIcon
         focused
     />
 </div>    