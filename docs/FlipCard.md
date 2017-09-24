  ## FlipCard Component

  FlipCard component display a card with content passed to it along with an icon to flip the card and display additional content on the full size view of the flip card. Flip icon on the full screen dialog will return back to the original card.

  ### FlipCard Props

  FlipCard accepts the following props.

  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | cardContent | Node | Yes | JSX to display at the front of the card. |
  | flipContent | Node | Yes | JSX to display at the flipped side of the card. |

  ### Example

  <FlipCard cardContent={frontCardJSX} flipContent={flipCardJSX} />