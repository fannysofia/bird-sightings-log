import React from 'react';
import NewBird from './component/NewBird.jsx'
import BirdTable from './component/BirdTable.jsx'
import ImageBrowser from './component/ImageBrowser';
import './App.css';
import {Route,BrowserRouter,Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <ImageBrowser year="2020" />    
      <BrowserRouter>
      {/* menut */}
      <p class="image">Image: Creative Commons</p>
      <nav>
        <p><Link to="/ExistInfo">Birds you have already seen this year</Link></p>
        <p><Link to="/Addinfo">Add a new bird sight to your list</Link></p>
      </nav>

      
      
      {/* routing */}
      <Route path="/Addinfo" exact component={NewBird}/>
      <Route path="/ExistInfo" exact component={BirdTable}/>

      </BrowserRouter>
    </div>
  );
}

export default App;
