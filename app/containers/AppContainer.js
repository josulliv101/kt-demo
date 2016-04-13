import React, {Component} from 'react';
import storeListener from '../decorators/components/storeListener';
import {Store} from '../utils/registry';
import AppRoot from '../components/AppRoot';

// Specify the state in the client-side Store we care about (this isn't Relay's Store)

@storeListener(Store, 'fetching', 'notifications', 'auth') 
export default class AppContainer extends Component {
  
  render() {
    return <AppRoot {...this.props} {...this.state} />
  }
  
}