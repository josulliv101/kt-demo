import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import ClickOutsideWrapper from 'react-click-outside';

class ProfileDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
  
    // `this` bindings
    this.open   = ::this.open;
    this.close  = ::this.close;
    this.toggle = ::this.toggle;
  }

  handleClickOutside(ev) {
    this.close()
  }

  toggle(ev) {
    ev && ev.preventDefault();
    this.state.isOpen ? this.close() : this.open();
  }

  open() {
    this.setState({isOpen: true});
  }
  
  close() {
    this.setState({isOpen: false});
  }

  style() {
    return {
      dropdown: {
        open: {
          background: 'transparent', 
          borderColor: 'transparent', 
          boxShadow: 'none', 
          marginTop: -6
        }
      }
    }
  }

  render() {

    var {user, authenticated} = this.props;
    const {isOpen} = this.state;
    const dropdownStyleOpen = {background: 'transparent', borderColor: 'transparent', boxShadow: 'none', marginTop: -6 };

    return (
      <ul className="nav nav-pills navbar-right pos-r" style={{top: 4, marginRight: 0}}>
        { 
          user &&  user.picture

          ? (
              <ul className="nav nav-pills menu-auth" role="tablist"> 
                <li role="presentation" ref="profileDropdownOptions" className={`dropdown open ${ isOpen ? 'open' : '' }`}> 
                  <a id="drop4" tabIndex="0" href="#" className="hide dropdown-toggle pos-r p-a-0" style={{top:9, left: '-9px'}} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"> 
                    <img className="img-circle" src={user.picture} style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', border: '#d3e0e9 1px solid', width: 30 }} /> 
                    <span className={`icon ${ isOpen ? 'icon-chevron-small-up' : 'icon-chevron-small-down' }`}></span> 
                  </a> 
                  <ul id="menu1" className="dropdown-menu " style={!isOpen ? dropdownStyleOpen : {marginTop: -6}} aria-labelledby="drop4">
                    <li> 
                      <button id="action-toggle" className="btn btn-link pos-r" style={{color: '#fff', top: 4}} onClick={this.toggle}> 
                        <img className="img-circle" src={user.picture} style={{boxShadow: 'none', border: 'none', width: 26, marginRight: 12 }} />
                          my account 
                          <span className={`icon ${ isOpen ? 'icon-chevron-small-up' : 'icon-chevron-small-down' }`}></span> 
                      </button> 
                    </li>
                    {
                      isOpen && 

                        [
                          <li key='1' role="separator" className='divider'></li>,
                          <li key='2'>
                            <Link 
                              className='p-y-0 settings' 
                              to="/settings" 
                              onClick={this.close}
                            >
                              Settings
                            </Link>
                          </li>,
                          <li key='3' role="separator" className='divider'></li>,
                          <li key='4'><a className='p-t-0' href="/logout">Logout</a></li>
                        ]
                    }
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

export default ClickOutsideWrapper(ProfileDropdown); // HOC
export { ProfileDropdown as PureProfileDropdown}; // Pure for test 