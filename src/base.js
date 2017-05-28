import Generator from 'yeoman-generator';
import path from 'path';
import fs from 'fs';

const includeFile = (filePath, { include, exclude }) =>
  (include === undefined || include.test(filePath))
    && (exclude === undefined || !exclude.test(filePath));

export default class Base extends Generator {

  constructor(args, opts) {
    super(args, opts);

    Object.keys(this.constructor.OPTIONS).forEach((optionKey) => {
      this.option(optionKey, this.constructor.OPTIONS[optionKey]);
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

  static get OPTIONS(){
    return {};
  }

}
