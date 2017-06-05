// Binding action and validation functions to the page will enable
// actions and validations to access `page.driver`.
function bindToPage(page, object){
  return Object.keys(actions).reduce((bounded, key) => {
    bounded[key] = object[key].bind(page);
    return bounded;
  }, {});
}

export default class Page {

  constructor(pathname, actions, validations){
    const boundActions =
    Object.extend(this, {
      pathname,
      actions: bindToPage(this, actions),
      validations: bindToPage(this, validations)
    });
  }

  async open(query){
    this.driver = await openUrl(this.pathname, this.query);
  }

  async close(){
    const closed = await this.driver.close();
    this.driver = undefined;
    return closed;
  }

}
