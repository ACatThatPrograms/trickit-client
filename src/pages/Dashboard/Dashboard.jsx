import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Icon } from 'semantic-ui-react';
import lstyle from './Dashboard.module.scss';

function Dashboard(props) {

  return (

    <Grid container className={lstyle.grid} padded="vertically" stackable>


      <Grid.Row className={lstyle.row} columns={2} centered>

        <Grid.Column className={lstyle.col}>
          <Link to={"/campaigns"} className={lstyle.tile}>
            <Header as='h2'>
              <Icon name='calendar alternate' />
              <Header.Content>
                Campaigns
                <Header.Subheader>Compose and Manage your Campaigns</Header.Subheader>
              </Header.Content>
            </Header>
          </Link>
        </Grid.Column>

        <Grid.Column className={lstyle.col}>
          <Link to={"/segments"} className={[lstyle.tile, lstyle.disabled].join(" ")}>
            <Header as='h2'>
              <Icon name='users' />
              <Header.Content>
                Segments
                <Header.Subheader>Manage target groups for campaigns</Header.Subheader>
              </Header.Content>
            </Header>
          </Link>
        </Grid.Column>

      </Grid.Row>


      <Grid.Row className={lstyle.row} columns={2} centered>

        <Grid.Column className={lstyle.col}>
          <Link to={"/analytics"} className={[lstyle.tile].join(" ")}>
            <Header as='h2'>
              <Icon name='database' />
              <Header.Content>
                Data & Analytics
                <Header.Subheader>View User Analytics and Campaign Data</Header.Subheader>
              </Header.Content>
            </Header>          </Link>
        </Grid.Column>

        <Grid.Column className={lstyle.col}>
          <Link to={"/settings"} className={lstyle.tile}>
            <Header as='h2'>
              <Icon name='settings' />
              <Header.Content>
                Settings
                <Header.Subheader>Manage Account Settings</Header.Subheader>
              </Header.Content>
            </Header>          </Link>
        </Grid.Column>

      </Grid.Row>

    </Grid>

  )

}

export default Dashboard;