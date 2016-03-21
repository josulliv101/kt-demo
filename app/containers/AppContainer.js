import React, {Component} from 'react';
import storeListener from '../decorators/components/storeListener';
import {Store} from '../utils/registry';
import AppRoot from '../components/AppRoot';

// Specify the state in the Store we care about

@storeListener(Store, 'fetching', 'notifications', 'auth') 
export default class AppContainer extends Component {
  
  render() {
    return <AppRoot {...this.props} {...this.state} />
  }
}