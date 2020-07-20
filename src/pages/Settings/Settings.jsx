import React from 'react';
import {Link} from 'react-router-dom';
import {
  Header,
  Button,
  Input,
  Container,
  Segment,
  Icon,
} from 'semantic-ui-react';
import lstyle from './Settings.module.scss';
import connectComponent from 'redux/helpers/helpers';

function Settings(props) {

  const initState = {
    shopName: props.state.account.shopName,
    shopUrl: props.state.account.shopUrl,
    saveBtnTxt: "Save",
    saveBtnCol: "blue",
  }

  let [settings, setSettings] = React.useState({ ...initState });

  function updateSettings(k,v) {
    let update = {}
    if (isButtonDisabled() || settings.saveBtnCol === "red") {
      update = {saveBtnCol: "blue", saveBtnTxt: "Save" }
    }
    setSettings( (state) => ({...state, ...update, [k]:v }) )
  }

  function isButtonDisabled() {
    return settings.shopName === initState.shopName && settings.shopUrl === initState.shopUrl
  }

  async function save() {
    let res = await props.dispatches.account.update({
      type: "settings",
      data: settings
    })
    if (res.error) {
      setSettings({
        ...settings,
        saveBtnTxt: "Error",
        saveBtnCol: "red"
      })
    }
    else {
      setSettings({
        ...settings,
        saveBtnTxt: "Saved!",
        saveBtnCol: "green"
      })
    }
  }

  return (

    <Container>

      <Segment className={lstyle.settingsSegment}>

        <Header as={Link} color="teal" to="/dashboard">
          <Icon name='backward' />
          <Header.Content>Back to Dash</Header.Content>
        </Header>

        <Input
          className={lstyle.input}
          label="Shop Name"
          value={settings.shopName}
          onChange={ (e) => updateSettings("shopName", e.target.value)}
        />

        <Input
          className={lstyle.input}
          label="Shop URL"
          value={settings.shopUrl}
          onChange={ (e) => updateSettings("shopUrl", e.target.value)}
        />

        <Button
          content={settings.saveBtnTxt}
          color={settings.saveBtnCol}
          disabled={isButtonDisabled()}
          onClick={save}
          loading={props.state.loaders.account}
        />

      </Segment>

    </Container>

  )

}

export default connectComponent(Settings)