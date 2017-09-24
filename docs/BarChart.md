  ## Bar chart Component
   ![Bar chart vertical](BarChartVertical.png?raw=true "Bar Chart")

   ![Bar chart horizontal](BarChartHorizontal.png?raw=true "Bar Chart")
  
   An implementation of d3 bar chart. (horizontal/vertical)
   
  ### Bar chart
  
  Bar chart component accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  | :---: | :---: | :---: | :---: |
  | entities | Array | Yes | Array of objects. Each object contains: id (String,required), volume (Integer,required) and color (String). |
  | onBarClicked | Function | No | Called when user click on any of the bar. Called with respective entity in the entities |
  | orientation | String | No | `vertical`(default) or `horizontal` |
  | margin | Object | No | need to provide all `top`, `right`, `bottom`, `left` |
  | height | Integer | No | if not provided, will take the parent available height |
  | width | Integer | No | if not provided, will take the parent available width |
  | title | String | No | title will be on the top left to the chart |
  
  Caveat:

  1. labeling, the component will try the best to break down the `id` of an entity into multiple lines to display. But due to different dimension/orientation of the bar, in some instance, the label will overlaps with another one (horizontal), or out of sight (vertical). Be sure to give enough margin/size to the component so that it will display properly.

  ### Example
in the container:
````
  this.state = {
    entities: [
      {
        id: 'A',
        volume: 1500,
        color: 'teal'
      },
      {
        id: 'B',
        volume: 400,
      },
    ],
  };
  this.onBarClicked = function (entity) {
    console.log(entity.id);
    // B
  };
````

````
  <BarChart
    entities={ this.state.entities }
    onBarClicked={ this.onSliceClick }
  />
````
