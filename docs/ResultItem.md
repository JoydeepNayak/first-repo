  ## Result Item Component
 ![Alt text](ResultItem.png?raw=true "Result Item")
  
  Single element on results list.
  Contains Icon, name, type, context, search score and description.
  
  ### Result Item props
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | id | String | Yes | Item id |
  | name | String | Yes | Item name |
  | type | String | Yes | Item type |
  | entity_context | Array | No | Array of context elements |
  | score | Number | Yes | Search result score |
  | description | String | No | Item description |
  | onNameClick | Function | No | Executed when user clicks on result name. |
  | onContextElemClick | Function | No | Executed when user clicks on result context. |
  
  ### Example
    <div className={styles.resultList}>
          {props.results.map((result) => (
            <ResultItem
              key={result.id}
              id={result.id}
              name={result.name}
              type={result.entity_type}
              score={result.score}
              context={result.context}
              description={result.description}
              onNameClick={nameClick}
              onContextElemClick={onContextElemClick}
            />
              ))}
        </div>
   