  ## Card Layout Manager

  Card Layout loads from given layout building cards using factory list passed. Each factory in the list should have a make method that returns either a component or null for default case. Also, load function should return a layout JSON which follows format like
  ````
  { version: 1, cols: { lg: 12, md: 10 }, items: [{ classname: 'CardType', properties: { i: '1', x: 0, y: 0, w: 4, h: 1, minW: 4, maxW: 8 }}]}
  ````

  ### CardLayoutManager

  Card Layout accepts the following props. 

  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | load | function | Yes | Function that returns the layout for the cards to be displayed|
  | factoryList | Array | Yes | List of factories that generate cards in the layout. Each factory must have the make method|
  | save | function | No | Function that saves the layout if cards are rearranged or resized|
  | draggableClassName | string | No | Css class name for icon/draggable point on the cards laid out. Should start with '.'|
  | layoutClass | string | No | CSS class to be applied at the top level of layout manager|

  ### Example
  ````
  <CardLayoutManager load={loaderFunction} factoryList={arrayOfFactory} save={saveFunction} draggableClassName={'.drag-icon'} layoutClass={'mylayoutClass'} />
