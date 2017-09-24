# Drawer
Allows the user to open or close a drawer in left, right, top and  bottom directions.
  ![Drawer Example](Drawer.png?raw=true "Drawer")
#### Usage
For a developer to access drawer. Following steps need to be followed -

1) import Drawer from gov-shared-ui -> `import Drawer from '@infoserver/gov-shared-ui/src/components/drawer/Drawer';`



#### Default and required props
   | Prop name | Type | isRequired | Comments |
   |   :---: | :---: | :---: | :---  |
   | position| String | No | Sets the opening and closing of drawer. Default: right|
   | children|node|No|Set the appropriate children|
   | classNameDrawer|String |No|Sets additional stylings for the drawer|
   | classNameIcon|String |No|Sets additional stylings for the drawer Icon|
   | Size |String/ Number|No|Size of the drawer icon|
`
import Drawer from '@infoserver/gov-shared-ui/src/components/drawer/Drawer;'

...

        <Drawer position="down">
          <p>OPENS</p>
        </Drawer>
`