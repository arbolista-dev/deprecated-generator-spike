import path from 'path';
import Base from '../base';

export default class App extends Base {

  async _promptActionData(){
    const answers = await this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : 'action creator name'
      }, {
        type    : 'input',
        name    : 'description',
        message : 'action description (passed to redux-act)'
      }, {
        type    : 'checkbox',
        message: 'Add more actions?',
        name: 'more',
        choices: [
          {name: 'Yes', value: true},
          {name: 'No', value: false}
        ]
      }]);

      this.actions.push({
        name: answers.name,
        description: answers.description
      });

      if (answers.more){
        return this._promptActionData();
      }
  }

  prompting(){
    this.actions = [];
    return this._promptActionData();
  }

  writing() {
    this.sourceRoot(path.join(__dirname, 'templates'));
    this.fs.copyTpl(
      this.templatePath('action.ejs'),
      this.destinationPath(`src/shared/redux/actions/${this.options.filename}.js`),
      { actions: this.actions }
    );
  }

  static get OPTIONS(){
    return {
      filename: { 
        type: String,
        desc: 'Filename for new set of actions.',
        required: true,
        alias: 'f'
      }
    }
  }

}