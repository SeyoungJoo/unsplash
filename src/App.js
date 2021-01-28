import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Unsplash from './Unsplash/Unsplash';
import Navbar from './Navbar/Navbar'
import Questions from './Questions/Questions'
import Review from './Review/Review'

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
        <Route exact path="/review">
          <Review />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
