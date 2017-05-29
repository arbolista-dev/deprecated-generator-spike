import path from 'path';
import Base from '../base';

module.exports = class Actions extends Base {

  async _promptActionData() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'action creator name'
      }, {
        type: 'input',
        name: 'description',
        message: 'action description (passed to redux-act)'
      }, {
        type: 'list',
        message: 'Add more actions?',
        name: 'more',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }]);

    this.actions.push({
      name: answers.name,
      description: answers.description
    });

    if (answers.more) {
      return this._promptActionData();
    }
    return undefined;
  }

  prompting() {
    this.actions = [];
    return this._promptActionData();
  }

  writing() {
    this.sourceRoot(path.join(__dirname, 'templates'));
    const actionsPath = path.join('src/shared/redux/actions', this.options.actionsPath, `${this.options.filename}.js`);
    this.fs.copyTpl(
      this.templatePath('action.ejs'),
      this.destinationPath(actionsPath),
      { actions: this.actions }
    );
  }

  static get OPTIONS() {
    return {
      filename: {
        type: String,
        desc: 'Filename for new set of actions.',
        required: true,
        alias: 'f'
      },
      actionsPath: {
        type: String,
        desc: 'Path within redux actions directory.',
        required: false,
        alias: 'p',
        default: ''
      }
    };
  }

};
