import path from 'path';
import Base from '../base';

module.exports = class App extends Base {

  configuring() {
    this.destinationRoot(this.options.destinationRoot);
  }

  writing() {
    this.sourceRoot(path.join(__dirname, 'templates'));
    this.copy(
      this.templatePath('.seedApp'),
      this.destinationPath('.seedApp')
    );
    // this._copyDirectoryDeep(this.sourceRoot(), { exclude: /(node_modules|dist)$/ });
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }

  static get OPTIONS() {
    return {
      destinationRoote: {
        type: String,
        desc: 'Destination path for app relative to CWD.',
        required: false,
        alias: 'd',
        default: '.'
      }
    };
  }
};
