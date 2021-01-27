import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Unsplash from './Unsplash/Unsplash';
import Navbar from './Navbar/Navbar'
import Questions from './Questions/Questions'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Unsplash />
        </Route>
        <Route exact path="/about">
          <Questions />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
