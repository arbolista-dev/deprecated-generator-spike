/* eslint-disable no-underscore-dangle */
import Generator from 'yeoman-generator';
import path from 'path';
import fs from 'fs';

const OPTIONS = {};
const includeFile = (filePath, { include, exclude }) =>
  (include === undefined || include.test(filePath))
    && (exclude === undefined || !exclude.test(filePath));

/*
  initializing - Your initialization methods (checking current project state, getting configs, etc)
  prompting - Where you prompt users for options (where you'd call this.prompt())
  configuring - Saving configurations and configure the project (creating .editorconfig files and
    other metadata files)
  default - If the method name doesn't match a priority, it will be pushed to this group.
  writing - Where you write the generator specific files (routes, controllers, etc)
  conflicts - Where conflicts are handled (used internally)
  install - Where installations are run (npm, bower)
  end - Called last, cleanup, say good bye, etc
*/

export default class App extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    Object.keys(OPTIONS).forEach((optionKey) => {
      this.option(optionKey, OPTIONS[optionKey]);
    });
  }

  /**
   * _copyDirectoryDeep will copy all files from sub-directories within
   * sourcePath, to the corresponding directory in the generator#destinationPath.
   * These files can be filtered by a  (see includeFile above).
   */
  _copyDirectoryDeep(sourcePath, options = {}) {
    fs.readdirSync(sourcePath)
      .forEach((filename) => {
        const filePath = path.resolve(sourcePath, filename);
        if (includeFile(filePath, options)) {
          if (fs.statSync(filePath).isDirectory()) {
            this._copyDirectoryDeep(filePath, options);
          } else {
            const relativePath = filePath.replace(this.templatePath(), '');
            const destinationPath = path.join(this.destinationPath(), relativePath);
            this.fs.copy(filePath, destinationPath);
          }
        }
      });
  }

  writing() {
    this.sourceRoot(path.join(__dirname, 'templates'));
    this._copyDirectoryDeep(this.sourceRoot(), { exclude: /(node_modules|dist)$/ });
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }

}
/* eslint-enable no-underscore-dangle */
