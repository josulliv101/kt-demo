import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import ClickOutsideWrapper from 'react-click-outside';

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

    return (
      <ul className="nav nav-pills navbar-right pos-r" style={{top: 12, marginRight: 12}}>
        { 
          user && user.profile

          ? (
              <ul className="nav nav-pills" role="tablist"> 
                <li role="presentation" ref="profileDropdownOptions" className={`dropdown ${ this.state.showProfileOptions ? 'open' : '' }`}> 
                  <a id="drop4" tabIndex="0" onClick={this.toggleProfileOptions.bind(this)} href="#" className="dropdown-toggle pos-r p-y-0" style={{top:4}} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"> 
                    <img className="img-circle" src={user.profile.picture} style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', border: '#d3e0e9 1px solid', width: 30 }} /> <span className={`icon ${ this.state.showProfileOptions ? 'icon-chevron-small-up' : 'icon-chevron-small-down' }`}></span> 
                  </a> 
                  <ul id="menu1" className="dropdown-menu" style={{marginTop: 7}} aria-labelledby="drop4">
                    <li><Link className="p-y-0" to="/settings" onClick={() => this.setState({showProfileOptions: false})}>Settings</Link></li> 
                    <li role="separator" className="divider"></li> 
                    <li><a className="p-y-0" href="/logout">Logout</a></li> 
                  </ul>
                </li>
              </ul>
            )

          : <a className="btn btn-xs btn-pill__ btn-info-outline pos-r m-l" style={{ padding: 'inherit 0', top: 9, right: 6}} href="/private">Login</a>
        }
      </ul>
    );

  }

}

export default ClickOutsideWrapper(ProfileDropdown)