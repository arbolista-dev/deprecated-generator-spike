# Why

React it is not a framework. There do exist a number of scaffoldings, but we aim to be a complete framework solution that makes use of generators so you can additively build your app, rather than starting out with a scaffolding and stripping away pieces you do not need. Additionally, we place an emphasis on the following areas:

- Test writing through the use of generators that reflect current best practices.
- Support for server side rendering out of the box.
- Support CSS modules out of the box.
- Support for running webpack dev server and compiling a production app and server right out of the box.
- Best Redux practices with support for development and production logging. Read your frontend logs like you read your server logs!

# Redux Dependencies

* redux-observable: Abstracts all async out of reducers and components using ReactiveX.
* redux-act: Provides structure for action creator pattern.
* react-redux: Create containers for injecting redux state and actions into components.
* reselect: Modular pattern for destructuring and deriving additional data from state.
* redux-storage: Generic module for initializing Redux store with stored data. Accepts different storage engine plugins, we can easily configure our app to accept localStorage from browser, cookies from server, and native storage from mobile.
  * Initially, we'll use cookies to support server side rendering.
* redux-catch: Tested pattern for catching errors during redux updates. Can configure this to log errors to console, or save them through an API such as Firebase.
* redux-logger: Log changes to redux state for development purposes.

# Server Side rendering with Styles

We explored a few options:

* [babel-plugin-react-css-modules](https://www.npmjs.com/package/babel-plugin-react-css-modules): We should consider this if we ever do inline styles. We can use [postcss-scss](https://www.npmjs.com/package/postcss-scss) to compile scss.
* [ignore-styles](https://www.npmjs.com/package/ignore-styles).
* We ended up using [node-hook](https://www.npmjs.com/package/node-hook) because it should be flexible enough to handle a variety of situations.
