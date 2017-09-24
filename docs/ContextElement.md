  ## Context Element Component
  ![Alt text](Context.png?raw=true "Context Element")
  
   Context Element Component displays context path for entity.
   
### Context Element Props
| Prop name | Type | isRequired | Comments |
|   :---: | :---: | :---: | :---  |
| entity_context | Array | No | Array of context elements. Context element is object with following fields: id, name, entity_type|
| onContextElemClick | Function | No | Executed when user clicks on element. |
  
 
### Example
    <div>
      <ContextElement onContextElemClick={props.onContextElemClick} context={props.context} />
    </div>