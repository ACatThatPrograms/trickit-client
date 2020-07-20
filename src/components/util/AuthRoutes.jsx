import React from 'react';
import { Redirect } from 'react-router-dom';
import connectComponent from 'redux/helpers/helpers';

function AuthRoutes(props) {
  if (!props.state.account.loggedIn) { return <Redirect to='/'/> }
  return props.children;
}

export default connectComponent(AuthRoutes);
export const authRoutes = AuthRoutes;