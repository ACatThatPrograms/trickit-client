import React from 'react';
import {campaigns as Component} from './Campaigns';

const reqProps = (bool) => ({state: {loaders: {account: bool}}})

describe("components/forms/Campaigns", () => {

  it("First input should be empty title input", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let firstInput = wrapper.find("Input").get(0)
    expect(firstInput.props.label).to.equal("Title")
    expect(firstInput.props.value).to.equal("")

  })

  it("Initial 1st dropdown render should be for Select Draft", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let dropdown = wrapper.find("Dropdown").get(0)
    expect(dropdown.props.text).to.equal("Select Draft")
  })

  it("Send button should 1st and be disabled for now - if this fails hopefully it's from an update : )", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let button = wrapper.find("Button").get(0)
    expect(button.props.disabled).to.equal(true)
  })

  it("Save new button should be 2nd and point to => saveAsNew", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let button = wrapper.find("Button").get(1)
    expect(button.props.onClick.name).to.equal("saveAsNew")

  })

  it("Update button should be 3rd, orange, and point to => overwrite ", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let button = wrapper.find("Button").get(2)
    expect(button.props.onClick.name).to.equal("overwrite")
    expect(button.props.color).to.equal("orange")
  })

  it("Label Button 1 should point to => toggleUrlView ", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let button = wrapper.find("Label").get(0)
    expect(button.props.onClick.name).to.equal("toggleUrlView")
  })

  it("Label Button 2 should point to => toggleEmojiWindow ", () => {
    const wrapper = shallow(<Component {...reqProps(false)}/>)
    let button = wrapper.find("Label").get(1)
    expect(button.props.onClick.name).to.equal("toggleEmojiWindow")
  })

})