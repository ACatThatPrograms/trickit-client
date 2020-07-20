// React && Core Dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import connectComponent from 'redux/helpers/helpers.js';
import RegistrationForm from 'components/forms/Registration.jsx';
import LoginForm        from 'components/forms/Login.jsx';
import { Image, Grid, Header, Segment } from 'semantic-ui-react'
import logo from 'img/logo.svg';

function Lander(props) {

  const [registrationView, setRegistrationView] = useState(false); // Show registration panel?

  React.useEffect( () => {
    checkUserState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  function switchForm() {
    setRegistrationView(!registrationView);
  }

  function renderForm() {
    return registrationView ? <RegistrationForm switchFx={switchForm} /> : <LoginForm switchFx={switchForm}/>
  }

  function checkUserState() {
    props.dispatches.account.login("check", "check")
  }

  //////////////////
  // Push to Dash //
  //////////////////
  if (props.state.account.loggedIn) {
    return <Redirect to='/dashboard'/>
  }

  /////////////////
  // MAIN RETURN //
  /////////////////

  return (
    <Grid container columns={1} textAlign="center" verticalAlign="middle" className="grid-container">
      <Grid.Column style={{"maxWidth":600}} verticalAlign="middle" >
        <Segment>
          <Header as="h2" textAlign="left" className="color-dark-blue">
            <Image src={logo}/> {"Trickit"}
            <Header.Subheader>
              {`Campaign management so easy a dog can do it.`}
            </Header.Subheader>
          </Header>
        </Segment>

        {renderForm()}

      </Grid.Column>
    </Grid>
  )

}

export default connectComponent(Lander)
