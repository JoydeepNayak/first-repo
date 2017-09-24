# Dialog Box
A common dialog box to prompt user depending on action.

![Alt text](DialogBox.png?raw=true "Dialog Box")

## Props

  | Prop name | Type | isRequired | Comments |
  |   :---: | :---: | :---: | :---  |
  | isOpen | Boolean | No | Set it to true for opening the dialog box and false for closing |
  | type | String | No | Decides the type of Dialog box- 4 types available - Information, Error, Warning, Default]|
  | title | String | No | Custom title if provided |

## Example
````
import { DialogBox } from '@infoserver/gov-shared-ui/lib/DialogBox';

...

// Type error with default title
<DialogBox isOpen type="error">This is a Test</DialogBox>

// Type warning with default title
<DialogBox isOpen type="warning">This is a Test</DialogBox>

// Type info with default title
<DialogBox isOpen type="info">This is a Test</DialogBox>

// Type default with default title
<DialogBox isOpen ">This is a Test</DialogBox>

// Type error with custom title
<DialogBox isOpen type="error" title="Test">This is a Test</DialogBox>

````

