import React from 'react';
import {authRoutes as AuthRoutes} from './AuthRoutes';

const reqProps = (bool) => ({state: {account: {loggedIn: bool}}})

describe("components/util/AuthRoutes", () => {

  it("When logged in should render redirect to '/' ", () => {
    const wrapper = shallow(<AuthRoutes {...reqProps(false)} />)
    expect(wrapper.props().to).to.equal('/')
  })

  it("When not logged in should render children to '/' ", () => {
    const wrapper = shallow(<AuthRoutes {...reqProps(true)}><div/><div/></AuthRoutes>)
    expect(wrapper.length).to.equal(2)
  })
  
})