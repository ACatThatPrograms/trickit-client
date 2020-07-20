import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// Components
import AppButtons from 'components/util/AppButtons';
import PageWrap from 'components/util/PageWrap';
import PushMenu from 'components/general/PushMenu/PushMenu';
import AuthRoutes from 'components/util/AuthRoutes';
// Pages
import Home from 'pages/Lander/Lander';
import Campaigns from 'pages/Campaigns/Campaigns';
import Dashboard from 'pages/Dashboard/Dashboard';
import Settings from 'pages/Settings/Settings';
import Data from 'pages/Data/Data';
// Semantic-UI
import {
  Sidebar,
} from 'semantic-ui-react';

export default function App(props) {

  if (process.env.REACT_APP_DEBUG_MODE === "true") {
    console.log("APP LEVEL RENDER!")
  }

  return (
    <div className="app-wrapper">

      <Router>

        <Sidebar.Pushable>

          <PushMenu/>

          {/* All application content Must be inside Sidebar.Pusher */}
          <Sidebar.Pusher className="pusher-content">

            <AppButtons/>

            <Switch>
              <PageWrap>
                <Route exact path="/" render={ (props) => <Home/> }/>
                <AuthRoutes>
                  <Route exact path="/dashboard" render={ (props) => <Dashboard/> }/>
                  <Route exact path="/settings" render={ (props) => <Settings/> }/>
                  <Route exact path="/campaigns" render={ (props) => <Campaigns/> }/>
                  <Route exact path="/analytics" render={ (props) => <Data/> }/>

                </AuthRoutes>
              </PageWrap>
            </Switch>

          </Sidebar.Pusher>
          {/* STOP!, additional application content should be inside Sidebar!*/}
        </Sidebar.Pushable>

      </Router>
    </div>
  );
}