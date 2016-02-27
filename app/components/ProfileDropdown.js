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
    const {showProfileOptions} = this.state;
    const dropdownStyleOpen = {background: 'transparent', borderColor: 'transparent', boxShadow: 'none', marginTop: -6 };

    return (
      <ul className="nav nav-pills navbar-right pos-r" style={{top: 4, marginRight: 12}}>
        { 
          user && user.profile

          ? (
              <ul className="nav nav-pills" role="tablist"> 
                <li role="presentation" ref="profileDropdownOptions" className={`dropdown open ${ showProfileOptions ? 'open' : '' }`}> 
                  <a id="drop4" tabIndex="0" href="#" className="hide dropdown-toggle pos-r p-a-0" style={{top:9, left: '-9px'}} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"> 
                    <img className="img-circle" src={user.profile.picture} style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', border: '#d3e0e9 1px solid', width: 30 }} /> <span className={`icon ${ this.state.showProfileOptions ? 'icon-chevron-small-up' : 'icon-chevron-small-down' }`}></span> 
                  </a> 
                  <ul id="menu1" className="dropdown-menu " style={!showProfileOptions ? dropdownStyleOpen : {marginTop: -6}} aria-labelledby="drop4">
                    <li> 
                      <a href="#" className="pos-r" style={{top: 4}} onClick={this.toggleProfileOptions.bind(this)}> 
                        <img className="img-circle" src={user.profile.picture} style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', border: '#d3e0e9 1px solid', width: 26, marginRight: 12 }} />my account <span className={`icon ${ this.state.showProfileOptions ? 'icon-chevron-small-up' : 'icon-chevron-small-down' }`}></span> 
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

          : <a className="btn btn-sm btn-pill__ btn-info-outline pos-r m-l" style={{ padding: 'inherit 0', top: 9, right: 6}} href="/private">Login</a>
        }
      </ul>
    );

  }

}

export default ClickOutsideWrapper(ProfileDropdown)