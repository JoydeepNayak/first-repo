# gov-shared-ui [![Build Status](https://travis.ibm.com/InformationServer/gov-shared-ui.svg?token=YWEwuqs6dBNtmTzRDVBg&branch=master)](https://travis.ibm.com/InformationServer/gov-shared-ui)
Code repository for shared, re-usable React components for governance apps, and **Issue tracking** repo for all shared components including [gov-shared-ui](https://github.ibm.com/InformationServer/gov-shared-ui).

## How to Use
1. Create a .npmrc file in the root of your project and add this:
   ```
   registry=https://npm-registry.whitewater.ibm.com
   ```
   You can find all the details about using IBM npm here: https://github.ibm.com/Whitewater/npm-enterprise
2. Command line:
   ```
   npm install @infoserver/gov-shared-ui --save
   ```
   In case of an error - go to this repo and read about how to login to the IBM Npm.
   https://github.ibm.com/Whitewater/npm-enterprise
3. Add components to your React file where needed:
   ```
   import LoginPage from '@infoserver/gov-shared-ui/lib/LoginPage';
   import Rating from '@infoserver/gov-shared-ui/lib/Rating';
   ```

## Components List
- [Bar chart](docs/BarChart.md)
- [Card Layout Manager](docs/CardLayoutManager.md)
- [Comments List](docs/CommentsList.md)
- [ConnectionsPage](docs/ConnectionsPage.md)
- [Context Element](docs/ContextElement.md)
- [Dataset Solr Query](docs/DatasetSolrQuery.md)
- [Details Content](docs/DetailsContent.md)
- [Dialog Box](docs/DialogBox.md)
- [Display Card](docs/DisplayCard.md)
- [Donut Chart](docs/DonutChart.md)
- [FlipCard](docs/FlipCard.md)
- [GraphExplorer](docs/GraphExplorer.md)
- [Header](docs/Header.md)
- [Loader Container](docs/LoaderContainer.md)
- [Login Page Component](docs/LoginPage.md)
- [Menu](docs/Menu.md)
- [Panel](docs/Panel.md)
- [Rating](docs/Rating.md)
- [RelationshipGraphContainer](docs/RelationshipGraphContainer.md)
- [Result Item](docs/ResultItem.md)
- [Result List](docs/ResultList.md)
- [Search Field](docs/SearchField.md)
- [Toolbar](docs/Toolbar.md)


## How to create new component
1. Add source files to a folder inside `src/components`
2. Update `webpack.base.js`. Here we have two sections: `entry` and `externals`. 
   * To `entry` section add your new component name and path within `src/components`  
     Make sure name is unique.
   * To `externals` section add dependencies to external libraries. Externals won't 
     be included in resulting bundle. This is important as we want to keep our components
     as small as possible.
3.  Update `package.json`.
    Here you will need to provide dependencies to external libraries excluded in step 2.
    There are three sections regarding dependencies `dependencies`, `devDependencies`, `peerDependencies`.
    * `dependencies` - will be installed in local node_modules if not present in consumer application.
    * `devDependencies` - required for tests and building, won't be installed in consumer application.
    * `peerDependencies` - consumer application must have them installed.
4. Proceed reading next sections on how to make the changes consumable.

## How to publish new version of library into npm
Whenever you want additions of new components or fixes to existing ones available to the consumer, a new version of the library must be created (one of the reasons being, npm will not allow you to override an already published version). Consumer applications will always depend on a specific version of the library, which will prevent automatic consumption of new library versions. This works just like a double-edged sword: it will prevent random build breaks caused by disrupting changes in the library, though it will also require additional work to explicitly bump up library version in the application's `package.json`, most probably done in the same branch as the application feature which requires new library capabilities.

To create a new version of the library, follow these steps:
1. Important: the version numbers MUST follow semver rules, as outlined in http://semver.org/. Reading and complying is mandatory.
2. Before creating new library version:
   - all changes that should go into the new version must be merged into the `master` branch
   - `master` branch build must be green
3. Issue the following commands in order to create a new library version (must be done by repository administrator):
   ```
   git fetch
   git checkout master
   git reset --hard origin/master
   npm version [major|minor|patch] -m "Upgrade to %s"
   git push
   git push --tags
   ```
   Successful execution of the above commands will trigger tag build with Travis, which will automatically push new library version into npm (consult `.travis.yml` for details).

TODO ML: Create and document changelog management
