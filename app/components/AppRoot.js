import React, {Component} from 'react';
import TopNav from './layout/topnav/TopNav';
import { NotificationStack as Growl } from 'react-notification';
import {NotifyActions} from '../actions/';
import classnames from 'classnames';

export default class AppRoot extends Component {
  
  style() {
    return { top: 90 };
  }

  render() {
    
    // Props passed-down from AppContainer
    const {auth, notifications = [], fetching} = this.props,
          classes = classnames('container', 'pos-r', { fetching: fetching });

    return (
      <div className={classes} style={ this.style() }>
        <div className="loading">Fetching: {fetching ? 'true' : 'false'}</div>
        <TopNav user={auth} />
        {this.props.children}
        <Growl notifications={notifications} onDismiss={msg => NotifyActions().clear(msg)} />
      </div>
    )
  }
}