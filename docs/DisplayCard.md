 ## Display Card Component
   ![Alt text](DisplayCard.png?raw=true "Display Card")
  
   Display Card displays a card with information either in a default format or transcludes whatever is passed to it.
   
  ### Display Card
  
  Display Card component accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | data | Object | No | Data object contains: title, description, rows array of metadata of the card|
  | children | Node | No | JSX to be transcluded. |  
          
   ### Example
 ````
<div className={styles.container}>
   <DisplayCard><div>Transcluded content</div></DisplayCard>
</div>