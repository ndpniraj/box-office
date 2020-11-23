import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        This is the home page.
      </Route>
      <Route exact path="/starred">
        This is the starred page.
      </Route>
      <Route>This is the 404 page</Route>
    </Switch>
  );
}

export default App;
