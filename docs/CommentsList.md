  ## Comments List Component
   ![Alt text](CommentsList.png?raw=true "Comments List")
  
   Comments List displays list of short messages (comments). It supports adding and deleting items.
   
  ### Comments List
  
  Comments List component accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | items | Array | No | Array of objects. Each object contains: id, text, author and created. |
  | error | String | No | Error message to display. |
  | isFetching | Boolean | No | When true Loading progress will be displayed. |
  | onAddComment | Function | Yes | Called when user hits enter in text field. Text value is passed. |
  | onDeleteComment | Function | Yes | Called when user clicks on Delete. Comment id is passed. |
  
          
   ### Example
 ````
<div className={styles.container}>
   <CommentsListContainer items={[]} onAddComment={this.onAddComment} onDeleteComment={this.onDeleteComment} />
</div>