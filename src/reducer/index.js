import path from 'path';
import Base from '../base';

module.exports = class Reducers extends Base {

  async _promptReducerActions() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'actionPath',
        message: 'Path of action (eg \'contactForm.submit\' for \'actions.contactForm.submit\').'
      }, {
        type: 'list',
        message: 'Add more actions?',
        name: 'more',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }]);

    this.actionPaths.push(answers.actionPath);

    if (answers.more) {
      return this._promptReducerActions();
    }
    return this._promptReducerValues();
  }

  async _promptReducerValues() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'State object attribute name.'
      }, {
        type: 'input',
        name: 'default',
        message: 'Default value of state object attribute.'
      }, {
        type: 'list',
        message: 'Add more values?',
        name: 'more',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }]);

    this.values.push(answers);

    if (answers.more) {
      return this._promptReducerValues();
    }
    return undefined;
  }

  prompting() {
    this.actionPaths = [];
    this.values = [];
    this._promptReducerActions();
  }

  writing() {
    this.sourceRoot(path.join(__dirname, 'templates'));
    const reducerPath = path.join('src/shared/redux/reducers', this.options.reducerPath, `${this.options.filename}.js`);
    this.fs.copyTpl(
      this.templatePath('reducer.ejs'),
      this.destinationPath(reducerPath),
      { actionPaths: this.actionPaths, values: this.values }
    );
  }

  static get OPTIONS() {
    return {
      filename: {
        type: String,
        desc: 'Filename for new reducer.',
        required: true,
        alias: 'f'
      },
      reducerPath: {
        type: String,
        desc: 'Path within reducers directory.',
        required: false,
        alias: 'p'
      }
    };
  }

};
