import React from 'react';
import { Grid, Form, Segment, Button } from 'semantic-ui-react'
import lstyle from './forms.module.scss';
import connectComponent from 'redux/helpers/helpers';

/** Registration Form
 * @prop {function} switchFunction - Parent function to switch login views between Register / Login
 */
function LoginForm(props) {

  const isAccountLoading = props.state.loaders.account;

  const defaultLoginFormState = {
    "username": "",
    "password": "",
  }

  let [loginDetails, setLoginDetails] = React.useState({ ...defaultLoginFormState });
  let [err, setErr] = React.useState("");

  function updateLoginFields(key, value) {
    setLoginDetails((state) => ({ ...state, [key]: value }))
  }

  async function login() {
    let res = await props.dispatches.account.login(loginDetails.username, loginDetails.password)
    if (res.error) {
      setErr(res.error)
    }
  }

  return (
    <Form size="large">
      <Segment>

        <Form.Input fluid icon="user" iconPosition="left" id="form_username" placeholder="Username"
          onChange={(e) => updateLoginFields("username", e.target.value)}
          value={loginDetails.username}
        />

        <Form.Input fluid icon="lock" iconPosition="left" id="form_password" type="password" placeholder="Password"
          onChange={(e) => updateLoginFields("password", e.target.value)}
          value={loginDetails.password}
        />

        <Grid columns={2} className={lstyle.buttonWrap}>
          <Grid.Column>
            <Button type="submit" loading={isAccountLoading} color="teal" fluid size="large" onClick={login}> {`Login`} </Button>
          </Grid.Column>
          <Grid.Column>
            <Button color="blue" fluid size="large" onClick={props.switchFx}> {`Register`} </Button>
          </Grid.Column>
        </Grid>

        <Segment placeholder className={lstyle["err-segment"]}>
          {err}
        </Segment>

      </Segment>

    </Form>
  )

}

export default connectComponent(LoginForm);
export const loginForm = LoginForm; 