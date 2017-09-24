# Toolbar
A generic horizontal row to maintain list of actions used to perform certain functions.

# Toolbar Item
Identifies each item under toolbar component.
### Properties
'position' - for aligning it left or right. By default its always left.

# Toolbar Separator
Separates the items using '|'.
### Properties
'position' - for aligning it left or right. By default its always left.

# Example
`````
import Toolbar from '@infoserver/gov-shared-ui/lib/Toolbar';
import ToolbarItem from '@infoserver/gov-shared-ui/lib/ToolbarItem';
import ToolbarSeparator from '@infoserver/gov-shared-ui/lib/ToolbarSeparator';
import { Dropdown } from 'ap-components-react'; //Just for example

...

<Toolbar>
    <ToolbarItem><div>Title</div></ToolbarItem>
    <ToolbarSeparator />
    <ToolbarItem>
        <Dropdown
         text="Select your favourite fruit"
         name="FavFruit"
         medium
         maxVisibleItems={5}
         options={[
            'Apple', 'Banana', 'Orange', 'Pineapple',
            'Coconut', 'Avacado', 'Kiwi', 'Papaya',
         ]}
         />
    </ToolbarItem>
    <ToolbarItem position="right"><div>Title</div></ToolbarItem>
    <ToolbarSeparator position="right" />
    <ToolbarItem position="right">
        <Dropdown
          text="Select your favourite fruit"
          name="FavFruit"
          medium
          maxVisibleItems={5}
          options={[
             'Apple', 'Banana', 'Orange', 'Pineapple',
             'Coconut', 'Avacado', 'Kiwi', 'Papaya',
          ]}
          />
    </ToolbarItem>
</Toolbar>




`````

## Output
![Toolbar](Toolbar.png?raw=true "Toolbar")