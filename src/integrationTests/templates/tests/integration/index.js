import Mocha from 'mocha';
import fs from 'fs';
import path from 'path';
import { argv, alias, help, options } from 'yargs';

function addDirectory(mocha, testDir, regex = /\.test\.js$/) {
  // Add each .js file to the mocha instance
  fs.readdirSync(testDir)
    .forEach((file) => {
      const filePath = path.resolve(testDir, file);
      if (fs.statSync(filePath).isDirectory()) {
        return addDirectory(mocha, filePath, regex);
      }

      if (regex.test(file)) mocha.addFile(filePath);
    });
}

function testRunner(opts) {
  global.browser = opts.browser;

  const setup = {
    ui: 'bdd',
    timeout: 100000,
  };
  if (opts.grep) setup.grep = opts.grep;
  if (opts.invert) setup.invert = opts.invert;

  // Instantiate a Mocha instance.
  const mocha = new Mocha(setup);
  // Include all tests in tests/integration.
  addDirectory(mocha, __dirname);

  // Run the tests.
  mocha.run((failures) => {
    process.exit(failures);  // exit with non-zero status if there were failures
  });
}

// Config yargs
help();
alias('h', 'help');
options({
  browser: {
    alias: 'b',
    describe: 'Browser used by the automated test (chrome or firefox)',
    default: 'chrome',
  },
  grep: {
    alias: 'g',
    type: 'string',
    describe: 'Mocha grep option.',
    default: '',
  },
  invert: {
    alias: 'i',
    type: 'boolean',
    describe: 'Mocha invert option',
    default: false,
  },
});

testRunner(argv);
