import path from 'path';
import Base from '../base';

const AJAX_PROMPTS = [{
  type: 'input',
  name: 'apiPath',
  when: (answers => answers.type === 'ajax'),
  default: '< INSERT API PATH HERE >',
  message: 'API path string. (ex for api.authentication.login, use \'authentication.login\').'
}, {
  type: 'input',
  name: 'successActionPath',
  when: (answers => answers.type === 'ajax'),
  default: '< INSERT SUCCESS ACTION PATH HERE >',
  message: 'Success action path string.'
}, {
  type: 'input',
  name: 'errorActionPath',
  when: (answers => answers.type === 'ajax'),
  default: '< INSERT ERROR ACTION PATH HERE >',
  message: 'Error action path string.'
}
];

module.exports = class Epics extends Base {

  async _promptEpicsData() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Epic name'
      }, {
        type: 'input',
        name: 'actionPath',
        default: '< INSERT ACTION PATH HERE >',
        message: 'Action path string. (ex for actions.authentication.login, use \'authentication.login\').'
      }, {
        type: 'list',
        name: 'type',
        message: 'Type of epic',
        choices: [
          { name: 'Ajax call', value: 'ajax' },
          { name: 'Other', value: 'other' }
        ]
      },
      ...AJAX_PROMPTS,
      {
        type: 'list',
        message: 'Add more epics?',
        name: 'more',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }]);

    this.epics.push(answers);

    if (answers.more) {
      return this._promptEpicsData();
    }
    return undefined;
  }

  prompting() {
    this.epics = [];
    return this._promptEpicsData();
  }

  writing() {
    this.sourceRoot(path.join(__dirname, 'templates'));
    const epicsPath = path.join('src/shared/redux/epics', this.options.epicsPath, `${this.options.filename}.js`);
    this.fs.copyTpl(
      this.templatePath('epics.ejs'),
      this.destinationPath(epicsPath),
      { epics: this.epics }
    );
    if (this.options.includeTests) {
      const filename = this.options.filename;
      let epicsName = filename;
      if (epicsName === 'index') {
        const paths = this.options.reducerPath.split('/');
        epicsName = paths[paths.length - 1];
      }
      const testPath = path.join('src/shared/redux/epics', this.options.epicsPath, `${epicsName}.test.js`);
      this.fs.copyTpl(
        this.templatePath('epics.test.ejs'),
        this.destinationPath(testPath),
        {
          epics: this.epics,
          filename,
          epicsName
        }
      );
    }
  }

  static get OPTIONS() {
    return {
      filename: {
        type: String,
        desc: 'Filename for new set of epics.',
        required: true,
        alias: 'f'
      },
      epicsPath: {
        type: String,
        desc: 'Path within redux epics directory.',
        required: false,
        alias: 'p',
        default: ''
      },
      includeTests: {
        type: Number,
        desc: 'Include tests with epics? 0 for false, 1 for true.',
        required: false,
        default: 0,
        alias: 't'
      }
    };
  }

};
