import React from 'react';
import Component from './Registration';

const reqProps = (bool) => ({state: {loaders: {account: bool}}})

describe("components/forms/Registration", () => {

  it("Should have 3 inputs with empty state", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let forms = wrapper.find("FormInput")
    expect(forms.length).to.equal(3)
    expect(forms.get(0).props.value).to.equal('')
    expect(forms.get(1).props.value).to.equal('')
    expect(forms.get(2).props.value).to.equal('')
  })

  it("Should have two buttons, (1) => register (2) => undefined", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let buttons = wrapper.find("Button")
    expect(buttons.length).to.equal(2)
    expect(buttons.get(0).props.onClick.name).to.equal('register')
    expect(buttons.get(1).props.onClick).to.be.an('undefined')
  })
  
})