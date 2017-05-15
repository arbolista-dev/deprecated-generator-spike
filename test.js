import Mocha from 'mocha';

// Instantiate a Mocha instance.
const mocha = new Mocha({
  ui: 'bdd',
  timeout: 15000
});

mocha.addFile(`${__dirname}/src/generators/app/app.test.js`);

// Run the tests.
mocha.run((failures) => {
  process.exit(failures);  // exit with non-zero status if there were failures
});
