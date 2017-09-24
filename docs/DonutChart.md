  ## Donut chart Component
   ![Donut chart](DonutChart.png?raw=true "Donut Chart")
  
   An implementation of d3 pie chart.
   
  ### Donut chart
  
  Donut chart component accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | entities | Array | Yes | Array of objects. Each object contains: label (String,required), count (Integer,required), tooltipContent (jsx) and color (String). |
  | onSliceClick | Function | No | Called when user click on any of the slice. Called with respective entity in the entities |
  | title | String | No | title of the donut chart |
  | displayLegend | Boolean | No | whether to display the legend of donut chart. default to true |
  
  You can customize tooltip content (default is the label), color of the each slice (default is the d3.schemeCategory20b, just like the screenshot above).
  
   ### Example
in the container:
````
  this.state = {
    entities: [
      {
        label: 'Imported',
        count: 3,
      },
      {
        label: 'Not Imported',
        count: 4,
      },
    ],
  };
  this.onSliceClick = function (entity) {
    console.log(entity.label);
    // Imported
  };
````

````
  <DonutChart
    entities={ this.state.entities }
    onSliceClick={ this.onSliceClick }
    title="Connections"
  />
````
