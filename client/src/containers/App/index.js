import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ProductsList from '../../components/ProductsList';
import SearchBox from '../../components/SearchBox';
import './app.scss';

const App = () => (
  <Router>
    <div className="app">
      <div className="header">
        <SearchBox />
      </div>
      <Switch>
        <Route path="/items/:id" component="" />
        <Route path="/items" component={ProductsList} />
      </Switch>
    </div>
  </Router>
);

export default App;
