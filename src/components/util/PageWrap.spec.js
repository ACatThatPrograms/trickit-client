import React from 'react';
import {pageWrap as PageWrap} from './PageWrap';

describe("components/util/PageWrap", () => {

  it("Should render with classname page-wrap", () => {
    const wrapper = shallow(<PageWrap/>)
    expect(wrapper.hasClass("page-wrap"))
  })
  
  it("Primary onclick should be toggleNav", () => {
    const wrapper = shallow(<PageWrap/>)
    expect(wrapper.props().onClick.name).to.equal("toggleNav")
  })
  

})