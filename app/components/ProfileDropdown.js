import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import ClickOutsideWrapper from 'react-click-outside';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

/*var Auth0Lock, lock = {};

if (ExecutionEnvironment.canUseDOM) {
  Auth0Lock = require('auth0-lock');
  lock = new Auth0Lock('ii54WCtwK0XQKi5LxKq9AIsLm4SJA3sh', 'kindturtle.auth0.com');
}*/


class ProfileDropdown extends React.Component {
//let App = React.createClass({ JSON.stringify(this.props.routes[0].authUser.name)

  constructor(props) {
    super(props);
    this.state = {showProfileOptions: false};

  }

  toggleProfileOptions(ev) {
    ev.preventDefault();
    console.log('showProfileOptions');
    this.setState({showProfileOptions: !this.state.showProfileOptions});
  }

  handleClickOutside(e) {
    this.setState({showProfileOptions: false});
  }

  render() {

    var {user, authenticated} = this.props;
    const {showProfileOptions} = this.state;
    const dropdownStyleOpen = {background: 'transparent', borderColor: 'transparent', boxShadow: 'none', marginTop: -6 };

    return (
      <ul className="nav nav-pills navbar-right pos-r" style={{top: 4, marginRight: 0}}>
        { 
          user &&  user.picture

          ? (
              <ul className="nav nav-pills" role="tablist"> 
                <li role="presentation" ref="profileDropdownOptions" className={`dropdown open ${ showProfileOptions ? 'open' : '' }`}> 
                  <a id="drop4" tabIndex="0" href="#" className="hide dropdown-toggle pos-r p-a-0" style={{top:9, left: '-9px'}} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"> 
                    <img className="img-circle" src={user.picture} style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', border: '#d3e0e9 1px solid', width: 30 }} /> <span className={`icon ${ this.state.showProfileOptions ? 'icon-chevron-small-up' : 'icon-chevron-small-down' }`}></span> 
                  </a> 
                  <ul id="menu1" className="dropdown-menu " style={!showProfileOptions ? dropdownStyleOpen : {marginTop: -6}} aria-labelledby="drop4">
                    <li> 
                      <a href="#" className="pos-r" style={{color: '#fff', top: 4}} onClick={this.toggleProfileOptions.bind(this)}> 
                        <img className="img-circle" src={user.picture} style={{boxShadow: 'none', border: 'none', width: 26, marginRight: 12 }} />my account <span className={`icon ${ this.state.showProfileOptions ? 'icon-chevron-small-up' : 'icon-chevron-small-down' }`}></span> 
                      </a> 
                    </li>
                    <li role="separator" className={`divider ${ showProfileOptions ? '' : 'hide' }`}></li> 
                    <li><Link className={`p-y-0 ${ showProfileOptions ? '' : 'hide' }`} to="/settings" onClick={() => this.setState({showProfileOptions: false})}>Settings</Link></li> 
                    <li role="separator" className={`divider ${ showProfileOptions ? '' : 'hide' }`}></li> 
                    <li><a className={`p-t-0 ${ showProfileOptions ? '' : 'hide' }`} href="/logout">Logout</a></li> 
                  </ul>
                </li>
              </ul>
            )

          : <a className="btn btn-xs btn-pill__ btn-default pos-r m-l" style={{ padding: 'inherit 0', top: 12, right: 6}} href="/private">Login</a>
        }
      </ul>
    );

  }

}

export default ClickOutsideWrapper(ProfileDropdown)