[![Build Status](https://travis-ci.org/arbolista-dev/generator-spike.svg?branch=develop)](https://travis-ci.org/arbolista-dev/generator-spike)

[![NPM](https://nodei.co/npm/generator-spike.png)](https://npmjs.org/package/generator-spike)

# What

Spike is a complete development solution React applications. Among other things we support:

* webpack configuration - including CSS module support.
* server side rendering.
* redux (as of this writing, redux-observable specifically).
* unit and integration tests.

# Why

React it is not a framework. There exist a number of scaffoldings, but we aim to be a complete framework solution with specific emphasis on easy configuration, best Redux practices, and testing.

# How

Spike is a [Yeoman generator](http://yeoman.io/generators/). Rather than clone our repo or copy and paste code, simply use the yeoman cli to produce the code you want.

## Notes on Yeoman installation

First, make sure you have npm [correctly installed](https://docs.npmjs.com/getting-started/fixing-npm-permissions). Doing this will save you time both when running code locally and when configuring Dockerfiles. If you use `nvm` make sure you are using the same nvm Node version when you install `yo` and `generator-spike`.

```sh
npm install -g yo
npm install -g generator-spike
yo spike
# Add additional reducers to your redux app.
yo spike:reducer
# Add additional redux-observable epics to your redux app.
yo spike:epics
# Add additional action creators to your redux app.
yo spike:actions
# Create and configure integration tests.
yo spike:integrationTests
```
---

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

## Important Note about images

If you import images within a component, you should not expect it to render on the server - so there will be a discrepancy between server and client. To avoid this issue:

* Use CSS to set images using the background property rather than importing within components.
* Do not import any images within components that will render on the server. If necessary, replace those components with a loader that will be replaced when the app has mounted on the client.

# Integration Tests

Configure your app for integration tests `yo spike:integrationTests`.

This will create Docker file as well as docker-compose files that will launch a selenium server connected through the example test cases and pages you generate.

This scaffolding encourages practices of the [Page Object Design Pattern](http://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern) for writing selenium tests. While it's tempting to cram driver actions and validations into your tests and you'll find it saves you time, keeps your tests more readable and stable if you follow these patterns. It also makes it much easier to include `wait` timeout parameters and failure messages the will make your tests run faster and provide you with more detailed test failure messages. For instance:

```js
export async function expectFooterText(expectedText, wait = 2500) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.css('footer')),
    wait, 'expectFooterText - footer not found.');
  const footer = await driver.findElement(By.css('footer'));
  await driver.wait(async () => {
    const actualText = await footer.getText();
    return actualText === expectedText;
  }, wait, `expectFooterText - text did not match '${expectedText}'`);
}
```

See more examples in `tests/integration/pages` of this repository.

## Writing Integration tests locally

You will notice the above command creates a `docker-compose.ci.yml` file, as well as a `docker-compose.integrationTest.yml` file. The former is for use within you integration tool (Jenkins, travis, CircleCI, etc). The latter is for devloping locally.

During development you may run tests by:

```sh
docker-compose -f docker-compose.integrationTests.yml up -d
docker-compose -f docker-compose.integrationTests.yml run --rm -w"/home/app/code" app npm run test:integration
```

Note the development file:
* mounts your local directory to the container so you can update the tests without having to rebuild your image.
* Uses `-debug` [Docker Selenium images](https://github.com/SeleniumHQ/docker-selenium) so that you can use a [VCN client](http://www.davidtheexpert.com/post.php?id=5) to watch the browser Selenium is controlling.
