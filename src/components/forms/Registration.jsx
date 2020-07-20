import React from 'react';
import { Grid,  Form, Segment, Button } from 'semantic-ui-react'
import lstyle from './forms.module.scss';
import util from 'util/index.js';
import api from 'api/api.js';

/** Registration Form
 * @prop {function} switchFx - Parent function to switch render views between Login / Register
 */
export default function RegistrationForm(props) {

  const defaultRegisterFormState = {
    "email": "",
    "password": "",
    "username": "",
  }

  const initFeedbackState = {
    loading: false,
    success: false,
    msg: ""
  }

  // Reducer for common UX Feedback state changes, grouped for simultaneous setting to eliminate re-renders
  const feedbackReducer = (state, action) => {
    switch(action.type) {
      case "LOADING_TRUE": return {...state, loading: true};
      case "LOADING_FALSE": return {...state, loading: false};
      case "SUCCESS": return {...state, loading:false, success: true, msg: "Account created, go ahead and log in!"}
      case "SET_MSG": return {...state, msg: action.msg}
      default: return;
    }
  }

  const [feedback, feedbackDispatch] = React.useReducer(feedbackReducer, initFeedbackState) 
  const [registerDetails, setRegisterDetails] = React.useState({ ...defaultRegisterFormState });

  function updateRegisterFields(key, value) {
    setRegisterDetails((state) => ({ ...state, [key]: value }))
  }

  async function register() {
    let verifyForm = util.validation.verifyRegistrationForm(registerDetails.username, registerDetails.email, registerDetails.password);
    if (verifyForm.error) { return handleRegisterErr(verifyForm.error); }
    feedbackDispatch({type:"LOADING_TRUE"});
    let res = await api.account.register(registerDetails.username, registerDetails.email, registerDetails.password);
    if (res.error) { 
      feedbackDispatch({type:"LOADING_FALSE"});
      return handleRegisterErr(res.error);
    }
    feedbackDispatch({type:"SUCCESS", })
  }

  function handleRegisterErr(errMsg) {
    feedbackDispatch({type:"SET_MSG", msg: errMsg});
  }

  function getMsgClass() {
    return feedback.success ? lstyle["success-segment"] : lstyle["err-segment"]
  }

  return (

    <Form size="large">
      <Segment>

        <Form.Input id="form_register_username" fluid icon="user" iconPosition="left" placeholder="Desired Username"
          onChange={(e) => updateRegisterFields("username", e.target.value)}
          value={registerDetails.username}
        />
        <Form.Input id="form_register_email" fluid icon="mail" iconPosition="left" placeholder="Email"
          onChange={(e) => updateRegisterFields("email", e.target.value)}
          value={registerDetails.email}
        />
        <Form.Input id="form_register_password" fluid icon="lock" iconPosition="left" placeholder="Password ( > 8 characters, please!)"
          type="password"
          onChange={(e) => updateRegisterFields("password", e.target.value)}
          value={registerDetails.password}
        />

        <Grid columns={2} className={lstyle.buttonWrap}>
          <Grid.Column>
            <Button loading={feedback.loading} color="teal" fluid size="large" onClick={register}> {`Register`} </Button>
          </Grid.Column>
          <Grid.Column>
            <Button color="blue" fluid size="large" onClick={props.switchFx}> {`Back`} </Button>
          </Grid.Column>
        </Grid>

        <Segment placeholder className={getMsgClass()}>
          {feedback.msg}
        </Segment>

      </Segment>
    </Form>

  )

}