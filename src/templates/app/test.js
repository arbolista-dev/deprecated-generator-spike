import Mocha from 'mocha';
import fs from 'fs';
import path from 'path';
import { argv } from 'yargs';

// Instantiate a Mocha instance.
const mocha = new Mocha({
  ui: 'bdd',
  timeout: argv.timeout || 15000
});

function addDirectory(testDir, regex = /\.test\.js$/) {
  // Add each .js file to the mocha instance
  fs.readdirSync(testDir)
    .forEach((file) => {
      const filePath = path.resolve(testDir, file);
      if (fs.statSync(filePath).isDirectory())        {
        return addDirectory(filePath, regex);
      }

      // Only add the test.js files
      if (regex.test(file)) mocha.addFile(filePath);
    });
}

addDirectory(`${__dirname}/src`);

// Run the tests.
mocha.run((failures) => {
  process.exit(failures);  // exit with non-zero status if there were failures
});
