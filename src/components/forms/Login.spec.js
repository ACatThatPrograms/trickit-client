import React from 'react';
import {loginForm as Component} from './Login';

const reqProps = (bool) => ({state: {loaders: {account: bool}}})

describe("components/forms/Login", () => {

  it("Should have 2 inputs with empty state", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let forms = wrapper.find("FormInput")
    expect(forms.length).to.equal(2)
    expect(forms.get(0).props.value).to.equal('')
    expect(forms.get(1).props.value).to.equal('')
  })

  it("Should have two buttons, (1) => login (2) => undefined", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let buttons = wrapper.find("Button")
    expect(buttons.length).to.equal(2)
    expect(buttons.get(0).props.onClick.name).to.equal('login')
    expect(buttons.get(1).props.onClick).to.be.an('undefined')
  })

  
})