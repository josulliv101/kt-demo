import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import ProfileDropdown from './ProfileDropdown';

class TopNav extends React.Component {

  render() {
    
    const {user} = this.props,
          classes = classnames('navbar', 'navbar-inverse', 'navbar-fixed-top', 'app-navbar', { authenticated: user &&  user.picture }); // TODO: switch to real flag

    return (
      <nav className={classes}>
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-main">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">
              kindturtle
            </Link>
          </div>
          {<ProfileDropdown user={user} />}
          <div className="pos-a img-circle" style={{boxShadow: 'none' || '0 1px 1px rgba(0,0,0,.05)', background: '#3097d1', border: 'none' || '#d3e0e9 1px solid', top: 4, left: '50%', width: 46, height: 46, marginLeft: '-23px' }}>
            <Link to="/">
              <img className={`img-responsive pos-r animated ${false ? 'tada infinite' : ''}`} src="/img/kt.png" style={{width: 27, top: 11, left: 8 }} /> 
            </Link>
          </div>  
        </div>
      </nav>
    )
  }
}

export default TopNav;