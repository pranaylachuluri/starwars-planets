import './App.css';
import React from 'react';
import Home from './components/Home'
import Details from './components/Details';
import{
  BrowserRouter as Router,
  Routes,Route
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/details" element={<Details/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
