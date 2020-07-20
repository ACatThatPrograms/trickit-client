import React from 'react';
import PropTypes from 'prop-types';
import connectComponent from 'redux/helpers/helpers.js';
import { Link } from 'react-router-dom';
// Images
import logo from 'img/logo.svg';
// Semantic-UI
import {
  Header,
  Icon,
  Image,
  Menu,
  Sidebar,
} from 'semantic-ui-react';
// Custom Styling
import lstyle from './PushMenu.module.scss';

/**
 * Main navigation for site. 
 * Visibility controlled by redux state: (Bool) client.navOpen
 * @memberof components
 * @example
 * <PushMenu/>
 */
function PushMenu(props) {

  function logout() {
    props.dispatches.account.logout()
  }

  return (<>

      <Sidebar
        as={Menu}
        animation="push"
        direction="left"
        icon='labeled'
        inverted
        vertical
        visible={props.state.client.navOpen}
        width='wide'
      >

        <div className={lstyle.menuContent}>

          <Header as='h2'>Trickit</Header>

          <Image src={logo}
            size="small"
            centered
          />

          <PushMenuLinkItem name="Dashboard" to="/dashboard"/>
          <PushMenuLinkItem name="Campaign" to="/campaigns"/>
          <PushMenuLinkItem name="Settings" to="/settings"/>
          <Menu.Item name="Logout" onClick={logout}/>

        </div>

      </Sidebar>

  </>)
}
export default connectComponent(PushMenu)
////////////////////////////////
// PushMenu Link Item Builder //
////////////////////////////////
function PushMenuLinkItem(props) {
  return (
    <Menu.Item as={Link} to={props.to}>
      {props.icon ? <Icon name={props.icon} /> : ""}
      {props.name}
    </Menu.Item>
  )
}

PushMenuLinkItem.propTypes = {
  icon : PropTypes.string,
  name : PropTypes.string,
  to   : PropTypes.string,
}