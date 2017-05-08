# Redux Dependencies

* redux-observable: Abstracts all async out of reducers and components using ReactiveX.
* redux-act: Provides structure for action creator pattern.
* react-redux: Create containers for injecting redux state and actions into components.
* reselect: Modular pattern for destructuring and deriving additional data from state.
* redux-storage: Generic module for initializing Redux store with stored data. Accepts different storage engine plugins, we can easily configure our app to accept localStorage from browser, cookies from server, and native storage from mobile.
  * Initially, we'll use cookies to support server side rendering.
* redux-catch: Tested pattern for catching errors during redux updates. Can configure this to log errors to console, or save them through an API such as Firebase.
* redux-logger: Log changes to redux state for development purposes.

