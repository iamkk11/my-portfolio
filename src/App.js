import React, {Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';

export default class App extends Component {
  render() {
    return (
        <BrowserRouter >
          <div>
            <Route exact path = "/" component={SignIn}/>
            <Route component={UserContainer}/>
          </div>
      </BrowserRouter>
    );
  }
}

const UserContainer = () => (
  <div>
    <Route exact path="/dashboard" component={Dashboard} />
  </div>
)