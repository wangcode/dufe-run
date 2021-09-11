import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Map from './pages/map';
import Home from './pages/home';
import Point from './pages/points';
import Rank from './pages/rank';

import 'react-circular-progressbar/dist/styles.css';
import 'antd/dist/antd.css'
import "./index.css"

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/"><Home /></Route>
    <Route exact path="/map"><Map /></Route>
    <Route exact path="/rank"><Rank /></Route>
    <Route exact path="/points"><Point /></Route>
  </BrowserRouter>,
  document.getElementById('root')
)
