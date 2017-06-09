import fs from 'fs-extra';
import path from 'path';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import { assertFixtureMatch } from 'testUtils';
import IntegrationTests from './index';

describe.skip('spike:integrationTests', () => {
  const { prompting } = IntegrationTests.prototype;
  after(() => {
    IntegrationTests.prototype.prompting = prompting;
  });

  context('when integration tests are not yet scaffolded.', () => {
    before(() => {
      IntegrationTests.prototype.prompting = async function promptingStub() {
        // eslint-disable-next-line no-template-curly-in-string
        const config = { frontendPort: 3000, dockerImageName: 'yada', dockerImageTag: '${BUILD_NUMBER}' };
        const pages = [
          { name: 'Home', pathname: '/', actions: ['jumps', 'dances'], validations: ['expectSpinner'] },
          { name: 'Login', pathname: '/login', actions: ['laughs', 'cries'], validations: ['expectSpinner'] }
        ];
        const tests = [
          { pageName: 'Home', description: 'base cases', filename: 'HomeBaseCases', assertions: ['jumps', 'dances'] },
          { pageName: 'Login', description: 'base cases', filename: 'LoginBaseCases', assertions: ['laughs', 'cries'] }
        ];
        this.answers = { pages, tests, config };
      };
    });
    it('can create scaffolding, new pages, and new actions.', async () => {
      await helpers.run(IntegrationTests);
      await Promise.all([
        '.yo-rc.json',
        '.dockerignore',
        'Dockerfile',
        'docker-compose.integrationTests.yml',
        'tests/integration/index.js',
        'tests/integration/openUrl.js',
        'tests/integration/pages/base.js',
        'tests/integration/pages/index.js',
        'tests/integration/pages/Home/index.js',
        'tests/integration/pages/Home/domValidations.js',
        'tests/integration/pages/Home/domActions.js',
        'tests/integration/pages/Login/index.js',
        'tests/integration/pages/Login/domValidations.js',
        'tests/integration/pages/Login/domActions.js',
        'tests/integration/testCases/HomeBaseCases.test.js',
        'tests/integration/testCases/LoginBaseCases.test.js'
      ].map(filepath => assertFixtureMatch(filepath, path.resolve(__dirname, 'fixtures/tc1', filepath))));
    });
  });

  context('when integration tests already scaffolded.', () => {
    before(() => {
      IntegrationTests.prototype.prompting = async function promptingStub() {
        const pages = [
          { name: 'Dog', pathname: '/dog', actions: ['growls', 'barks'], validations: ['expectToBeTrained'] }
        ];
        const tests = [
          { pageName: 'Dog', description: 'walking in the park', filename: 'DogInPark', assertions: ['barks', 'growls'] }
        ];
        this.answers = { pages, tests };
      };
    });
    it('skips scaffolding and just adds new files', async () => {
      await helpers.run(IntegrationTests)
        .inTmpDir((dir) => {
          fs.copySync(path.join(__dirname, 'fixtures/tc1'), dir);
        });
      assert.file([
        'tests/integration/testCases/DogInPark.test.js',
        'tests/integration/pages/Dog/index.js',
        'tests/integration/pages/Dog/domValidations.js',
        'tests/integration/pages/Dog/domActions.js'
      ]);
    });
  });
});
