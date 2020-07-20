import React from 'react';
import CornerButton from 'components/general/CornerButton/CornerButton';
import { useLocation, useHistory } from 'react-router-dom';
import connectComponent from 'redux/helpers/helpers';

function AppButtons(props) {

  const path = useLocation().pathname;
  const history = useHistory();

  function checkLocation() {
    return !props.state.account.loggedIn ? true : path.indexOf("dashboard") !== -1;
  }

  function toggleNav() {
    props.dispatches.client.toggleNav()
  }

  function toDash() {
    history.push('/dashboard');
  }

  const hideMenuButton = !props.state.account.loggedIn;
  const hideDashButton = checkLocation()

  return (<>
    <CornerButton icon="bars" onClick={toggleNav} hidden={hideMenuButton} />
    <CornerButton icon="block layout" onClick={toDash} hidden={hideDashButton} distanceY={"4rem"}/>
  </>)

}

export default connectComponent(AppButtons);
export const appButtons = AppButtons;