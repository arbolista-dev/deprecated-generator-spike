import path from 'path';
import Base from '../base';

module.exports = class App extends Base {

  writing() {
    this.destinationRoot(this.options.destinationRoot);
    this.sourceRoot(path.join(__dirname, 'templates'));
    this._copyDirectoryDeep(this.sourceRoot(), { exclude: /(node_modules|dist)$/ });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  static get OPTIONS() {
    return {
      destinationRoot: {
        type: String,
        desc: 'Destination path for app relative to CWD.',
        required: false,
        alias: 'd',
        default: '.'
      }
    };
  }
};
