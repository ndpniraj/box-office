import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/starred" component={Starred} />
      <Route>This is the 404 page</Route>
    </Switch>
  );
}

export default App;
