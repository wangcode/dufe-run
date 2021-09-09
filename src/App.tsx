import React, { useState } from 'react'

import Map from './pages/map';
import Home from './pages/home';
import "./index.css"
import Point from './pages/point';


import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {

  return (
    <Map />
    // <div>
    //   <CircularProgressbar value={20} />
    // </div>
  )
}

export default App
