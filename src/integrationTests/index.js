import path from 'path';
import Base from '../base';

module.exports = class IntegrationTests extends Base {

  /**
   * Initializing
   */

  intializing() {
    // FIXME: For some reason, unit tests config namespace is "*".
    this.config.name = 'generator-spike';
  }

  /*
   * Prompting
   */

  async prompting() {
    this.answers = {
      pages: [],
      tests: []
    };
    if (!this.config.get('integrationTests')) {
      await this._promptConfig();
    } else {
      this.log.info('Your integration test scaffolding has already been created.');
    }
    return this._promptPagesAndTests();
  }

  async _promptConfig() {
    this.answers.config = await this.prompt([
      {
        type: 'input',
        name: 'frontendPort',
        message: 'When running tests locally, what port will serve your app on?'
      }, {
        type: 'input',
        name: 'dockerImageName',
        message: 'Docker image name for CI builds.'
      }, {
        type: 'input',
        name: 'dockerImageTag',
        message: 'Docker image tags for CI builds.',
        // eslint-disable-next-line no-template-curly-in-string
        default: '${BRANCH_NAME}_${BUILD_NUMBER}'
      }
    ]);
    return undefined;
  }

  async _promptPagesAndTests() {
    const { generatePages } = await this.prompt([
      {
        type: 'list',
        name: 'generatePages',
        message: 'Do you want to generate page configuration, actions, and validations?',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }
    ]);
    if (generatePages) {
      await this._promptPages();
    }

    const { generateTests } = await this.prompt([
      {
        type: 'list',
        name: 'generateTests',
        message: 'Do you want to generate some test cases?',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }
    ]);
    if (generateTests) {
      await this._promptTests();
    }

    return undefined;
  }

  async _promptPages() {
    const page = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name of page (used as filename and accessor from \'pages\' object within tests).'
      }, {
        type: 'input',
        name: 'pathname',
        message: 'Page URL?'
      }]);

    const { addActions } = await this.prompt([
      {
        type: 'list',
        name: 'addActions',
        message: 'Add some DOM operations to this page?',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }
    ]);
    if (addActions) page.actions = await this._promptActions(page, []);

    const { addValidations } = await this.prompt([
      {
        type: 'list',
        name: 'addValidations',
        message: 'Add some DOM validations to this page?',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }
    ]);
    if (addValidations) page.validations = await this._promptValidations(page, []);

    this.answers.pages.push(page);

    const { more } = await this.prompt([
      {
        type: 'list',
        message: 'Add more pages?',
        name: 'more',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }
    ]);

    if (more) {
      return this._promptPages();
    }
    return undefined;
  }

  async _promptActions(page, actions) {
    const { action } = await this.prompt([
      {
        type: 'input',
        name: 'action',
        message: 'Name of DOM operation.'
      }]);

    actions.push(action);

    const { more } = await this.prompt([
      {
        type: 'list',
        message: 'Add more DOM operations to this page?',
        name: 'more',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }
    ]);

    if (more) {
      return this._promptActions(page, actions);
    }
    return actions;
  }

  async _promptValidations(page, validations) {
    const { validation } = await this.prompt([
      {
        type: 'input',
        name: 'validation',
        message: 'Name of DOM validation.'
      }]);

    validations.push(validation);

    const { more } = await this.prompt([
      {
        type: 'list',
        message: 'Add more DOM validations to this page?',
        name: 'more',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }
    ]);

    if (more) {
      return this._promptValidations(page, validations);
    }
    return validations;
  }

  async _promptTests() {
    const test = await this.prompt([
      {
        type: 'input',
        name: 'filename',
        message: 'Filename of test.'
      }, {
        type: 'input',
        name: 'pageName',
        message: 'Page name (\'pages\' accessor).'
      }, {
        type: 'input',
        name: 'description',
        message: 'Description for top line Mocha \'describe\' statement.'
      }
    ]);

    test.assertions = await this._promptAssertions(test, []);

    this.answers.tests.push(test);

    const { more } = await this.prompt([
      {
        type: 'list',
        message: 'Add more tests?',
        name: 'more',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }]);

    if (more) {
      return this._promptTests();
    }
    return undefined;
  }

  async _promptAssertions(test, assertions) {
    const { assertion, more } = await this.prompt([
      {
        type: 'input',
        name: 'assertion',
        message: 'Assertion for Mocha \'it\' statement.'
      }, {
        type: 'list',
        message: 'More assertions?',
        name: 'more',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }
    ]);

    assertions.push(assertion);

    if (more) {
      return this._promptAssertions(test, assertions);
    }
    return assertions;
  }

  /**
   * Writing
   */

  async writing() {
    this.sourceRoot(path.join(__dirname, 'templates'));
    if (!this.config.get('integrationTests')) {
      await this._writeScaffolding();
    }
    await this._writePages();
    await this._writeTests();
    this.config.set('integrationTests', true);
  }

  async _writeScaffolding() {
    [
      '.dockerignore',
      'docker-compose.integrationTests.yml.ejs',
      'Dockerfile.ejs',
      'tests/integration/index.js',
      'tests/integration/openUrl.js',
      'tests/integration/pages/base.js',
      'tests/integration/pages/index.js.ejs'
    ].forEach((templateName) => {
      const filePath = templateName.replace(/\.ejs$/, '');
      this.fs.copyTpl(
        this.templatePath(templateName),
        this.destinationPath(filePath),
        {
          ...this.answers.config,
          pages: this.answers.pages
        }
      );
    });
    this.log.info('docker-compose.integrationTests.yml use Selenium docker images with \'-debug\' suffix.');
    this.log.info('For more information see https://github.com/SeleniumHQ/docker-selenium.');
    this.log.invoke('Make sure to add "integrationTests.origin" to your config/test.js file:');
  }

  async _writePages() {
    this.answers.pages.forEach((page) => {
      [
        'tests/integration/pages/page/domActions.js.ejs',
        'tests/integration/pages/page/domValidations.js.ejs',
        'tests/integration/pages/page/index.js.ejs'
      ].forEach((templateName) => {
        const filePath = templateName
          .replace(/\.ejs$/, '')
          .replace(/\/page\//, `/${page.name}/`);
        this.fs.copyTpl(
          this.templatePath(templateName),
          this.destinationPath(filePath),
          { page }
        );
      });
    });
  }

  async _writeTests() {
    this.answers.tests.forEach((test) => {
      this.fs.copyTpl(
        this.templatePath('tests/integration/testCases/test.js.ejs'),
        this.destinationPath(`tests/integration/testCases/${test.filename}.test.js`),
        { test }
      );
    });
  }

  /**
   * Installing
   */

  async installing() {
    this.yarnInstall(['selenium-webdriver']);
  }

};
