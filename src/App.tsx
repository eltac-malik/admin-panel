import React from 'react';
import './App.css';
import Main from './components/Main/Main';
import Sidebar from "./components/Sidebar/Sidebar"
import Home from './Pages/Home'
import Add from './Pages/Add/Add'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add' element={<Add/>}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
