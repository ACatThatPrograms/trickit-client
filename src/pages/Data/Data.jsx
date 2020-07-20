import connectComponent from "redux/helpers/helpers";
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Card, Image } from 'semantic-ui-react';
import lstyle from './Data.module.scss';

function Data(props) {

  const history = useHistory();

  function toCampaigns(campaignData) {
    history.push({
      pathname: '/campaigns',
      state: campaignData
    })
  }

  function renderColumns() {

    let cols = props.state.account.data.campaigns.map((x) => {

      let img = x.media ? <Image src={x.media} wrapped ui={false} /> : <div className={lstyle.placeholder}/>

      return (
        <Grid.Column key={x.id} onClick={() => toCampaigns(x)}>
          <Card className={lstyle.card}>
            {img}
            <Card.Content>
              <Card.Header>{x.name}</Card.Header>
              <Card.Meta>
                {(x.stats && x.stats.sent) || 0 } messages sent.
              </Card.Meta>
              <Card.Description>
                {(x.stats && x.stats.clicked) || 0 } messages clicked!
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    })

    return cols

  }

  return (

    <Grid columns={3} doubled stackable>

      {renderColumns()}

    </Grid>

  )

}

export default connectComponent(Data);