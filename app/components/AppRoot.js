import React, {Component} from 'react';
import TopNav from './layout/TopNav';
import { NotificationStack as Growl } from 'react-notification';
import storeListener from '../decorators/components/storeListener';
import {NotifyActions as Notify} from '../actions/';
import {Store} from '../utils/registry';

@storeListener(Store, 'fetching', 'notifications', 'auth') 
export default class AppRoot extends Component {
  
  render() {

    const {auth, notifications = [], fetching} = this.props;

    return (
      <div className="container pos-r" style={{top: 90}}>
        <TopNav user={auth} />
        {this.props.children}
        <Growl notifications={notifications} onDismiss={msg => Notify().clear(msg)} />
      </div>
    )
  }
}