import Mocha from 'mocha';
import fs from 'fs';
import path from 'path';

// Instantiate a Mocha instance.
const mocha = new Mocha({
  ui: 'bdd',
  timeout: 15000
});

function addDirectory(testDir, exclude, regex = /\.test\.jsx?$/) {
  // Add each .js file to the mocha instance
  fs.readdirSync(testDir)
    .forEach((file) => {
      const filePath = path.resolve(testDir, file);
      if (exclude.test(filePath)) return true;
      if (fs.statSync(filePath).isDirectory()) {
        addDirectory(filePath, exclude, regex);
      } else if (regex.test(file)) {
        // Only add the test.js files
        mocha.addFile(filePath);
      }
      return true;
    });
}

addDirectory(path.resolve(__dirname, 'src'), /templates/);

// Run the tests.
mocha.run((failures) => {
  process.exit(failures);  // exit with non-zero status if there were failures
});
