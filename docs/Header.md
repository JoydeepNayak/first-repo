  ## Header Component
  ![Header sample](Header.png?raw=true "Header in monitoring")
  
  Common header component to navigate, invoke different functionality.
   
  ### Header
  
  Header component accepts the following props. 
  
  | Prop name | Type | isRequired | Comments |
  | :---: | :---: | :---: | :---: |
  | accountMenuConfig | Object | Yes | config object for the menu, please refer to Menu read me for detail information |
  | mainMenuConfig | Object | No | config object for the menu, please refer to Menu read me for detail information. If not provided, main menu will be hidden |
  | notificationMenuConfig | Object | No | config object for the menu, please refer to Menu read me for detail information. If not provided, notification menu will be hidden |
  | brandingSVG | Node object | No | override the IBM icon |
  | children | Node object | No | if not provided, it will be put between the branding icon and the notification. |

  ### Example
to render a header like the sample screenshot, 
````
  this.mainMenuConfig = {
    title: 'Main menu',
    mainMenuFields: [
      {
        name: 'action A',
        onClickFunc: this.onMenuClick,
      },
      {
        name: 'action B',
        onClickFunc: this.onMenuClick,
      },
    ],
  };
  this.notificationMenuConfig = {
    title: 'Notification',
    link: '',
    mainMenuFields: [
      {
        name: 'Attention required',
        onClickFunc: this.onMenuClick,
      },
      {
        name: 'Asset and approvals',
        onClickFunc: this.onMenuClick,
      },
      {
        name: 'Approved assets',
        onClickFunc: this.onMenuClick,
      },
    ],
  };
  this.accountMenuConfig = {
    title: 'Account',
    link: '',
    mainMenuFields: [
      {
        name: 'Preferences',
        link: '',
      },
      {
        name: 'Tutorial',
        link: '',
      },
      {
        name: 'What\'s new',
        link: '',
      },
      {
        name: 'About',
        link: '',
      },
      {
        name: 'Logout',
        link: '',
      },
    ],
  };
````

````
  <Header
    mainMenuConfig={this.mainMenuConfig}
    notificationMenuConfig={this.notificationMenuConfig}
    accountMenuConfig={this.accountMenuConfig}
  >
    <div id="app-header" className="dark">
      <h1>
        <Link to="/ibm/iis/govmon/curator" className="govmon-header-item" activeClassName="active">
          <FormattedMessage id="header.curatorDashboard" defaultMessage="Curator Dashboard" />
        </Link>
      </h1>
      <h1>
        <Link to="/ibm/iis/govmon/quality" className="govmon-header-item" activeClassName="active">
          <FormattedMessage id="header.qualityDashboard" defaultMessage="Quality Dashboard" />
        </Link>
      </h1>
    </div>
  </Header>
````
