import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Views/Home';
import SaveData from './Views/SaveData';
import UpdateData from './Views/UpdateData';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/save" component={SaveData} />
          <Route path="/update/:id" component={UpdateData} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
