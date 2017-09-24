  ## Panel Component
   ![Alt text](Panel.png?raw=true "Panel")
  
   Displays items in single column. Item is defined as header and content. 
   Header is displayed in bold. Last item is resizeable.
   
  ### Panel Props
  
  Panel accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | items | Object | Yes | Items that should be rendered, header and content. |
  | className | String | No | CSS class for extended formatting. |
    
    
   ### Example
 ````
  items.push({
    header: messages.rate,
    content: (<Rating count={undefined} value={rating.value} onClick={rating.onClick} />),
  });
  items.push({
    content: (<CommentsListContainer {...comments} />),
  });
  return (
    <Panel className={className} items={items} />
  );