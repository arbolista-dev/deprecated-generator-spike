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
    this.fs.copyTpl(
      this.templatePath('epics.ejs'),
      this.destinationPath(`src/shared/redux/epics/${this.options.filename}.js`),
      { epics: this.epics }
    );
  }

  static get OPTIONS() {
    return {
      filename: {
        type: String,
        desc: 'Filename for new set of epics.',
        required: true,
        alias: 'f'
      }
    };
  }

};
