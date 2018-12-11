import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ProductsList from '../../components/ProductsList';
import ProductDetails from '../../components/ProductDetails';
import SearchBox from '../../components/SearchBox';
import './app.scss';

const App = () => (
  <Router>
    <div className="app">
      <div className="header">
        <SearchBox />
      </div>
      <div className="content">
        <Switch>
          <Route path="/items/:id" component={ProductDetails} />
          <Route path="/items" component={ProductsList} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
