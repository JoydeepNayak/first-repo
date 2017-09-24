  ## Rating Component
   ![Alt text](Rating.png?raw=true "Rating")
  
   Rating component presents numeric value between 0 and 5. It can be used to change value as it supports onClick event.
   
  ### Rating Props
  
  Rating accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | value | Number | No | Value to display. |
  | error | Object | No | Component will display error.message if this is set. |
  | onClick | Function | No | Callback function on click. It passes index of clicked element. |
    
    
   ### Example
 ````
 <Rating onClick={onClick} value={2.4} />