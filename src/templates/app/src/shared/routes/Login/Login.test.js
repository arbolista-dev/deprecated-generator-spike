import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Login } from './index';


describe('<Login/>', ()=>{

  it('renders header', ()=>{
    const props = {
      login: ()=>{}
    };
    const wrapper = shallow(<Login {...props} />);
    const header = wrapper.find('h3');
    expect(header.length).to.equal(1);
    expect(header.text()).to.equal('Login');
  });

  it('has login button', ()=>{
    const props = {
      login: sinon.spy()
    };
    const wrapper = shallow(<Login {...props} />);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(props.login.callCount).to.equal(1);
  });

});
