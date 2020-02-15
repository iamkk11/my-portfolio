import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import {SignIn} from './components/SignIn';
import {Home} from './components/Checkout';
import {store} from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter >
          <div>
            <Route exact path = "/" component={SignIn}/>
            <Route component={UserContainer}/>
            <Route component={HomeContainer}/>
          </div>
        </BrowserRouter>
      </ Provider>
    );
  }
}

const UserContainer = () => (
  <div>
    <Route exact path="/dashboard" component={Dashboard} />
  </div>
)

const HomeContainer = () => (
  <div>
    <Route exact path="/home" component={Home} /> 
  </div>
)