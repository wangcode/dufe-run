import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route } from 'react-router-dom';
import Map from 'pages/map';
import Home from 'pages/home';
import Point from 'pages/points';
import Rank from 'pages/rank';
import Introduction from 'pages/introduction';
import IntroductionPerson from 'pages/introduction/person';
import IntroductionTeam from 'pages/introduction/team';
import Login from 'pages/login';
import Team from 'pages/team';
import TeamSelect from 'pages/teamselect';

import 'react-circular-progressbar/dist/styles.css';
import 'antd/dist/antd.css'
import "./index.css"
import PersonMap from 'pages/person';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="/webview/dufe-run">
      <Route exact path="/"><Home /></Route>
      <Route exact path="/map"><Map /></Route>
      <Route exact path="/person"><PersonMap /></Route>
      <Route exact path="/team"><Team /></Route>
      <Route exact path="/teamselect"><TeamSelect /></Route>
      <Route exact path="/rank"><Rank /></Route>
      <Route exact path="/points"><Point /></Route>
      <Route exact path="/login"><Login /></Route>
      <Route exact path="/introduction"><Introduction /></Route>
      <Route exact path="/introduction/person"><IntroductionPerson /></Route>
      <Route exact path="/introduction/team"><IntroductionTeam /></Route>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('root')
)
