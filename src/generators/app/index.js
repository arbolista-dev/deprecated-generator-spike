import Generator from 'yeoman-generator';


const OPTIONS = {

  isomorphic: {
    desc: 'Inidicate whether your app should support server side rendering.'
    alias: 'i',
    type: 'Boolean',
    default: true
  },
  configLibrary: {
    desc: 'Use NPM config library for configuring your environments (highly recommended).'
    alias: 'c',
    type: 'Boolean',
    default: true
  }

}

const DEFAULT_CONFIG = {
  reduxLibrary: 'redux-loop',
  style: null,
  reactTestHelper: 'enzyme',
  testRunner: 'mocha',
  testAssertions: 'chai'
}

/*
initializing - Your initialization methods (checking current project state, getting configs, etc)
prompting - Where you prompt users for options (where you'd call this.prompt())
configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
default - If the method name doesn't match a priority, it will be pushed to this group.
writing - Where you write the generator specific files (routes, controllers, etc)
conflicts - Where conflicts are handled (used internally)
install - Where installations are run (npm, bower)
end - Called last, cleanup, say good bye, etc
*/

export default class SpikeApp extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    Object.keys(OPTIONS).forEach((optionKey)=>{
      this.option(optionKey, OPTIONS[optionKey]);
    });
  }



  // Eventually we may want to support other configuration options,
  // in which case we should pull them from prompt answers.
  configuring(){
    this.confg.set(DEFAULT_CONFIG);
  }

  writing(){
    // .babelrc, package.json, .eslintrc
    //
  }

  install(){
    this.yarnInstall([

    ]);
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }


}
