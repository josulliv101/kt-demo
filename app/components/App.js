import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class App extends React.Component {
//let App = React.createClass({ JSON.stringify(this.props.routes[0].authUser.name)

  render() {
    var {id, authenticated, user} = this.props.viewer;
    
    var breadcrumb = this.props.routes.filter(route => !!route.breadcrumb).map(route => route.breadcrumb).join(' / ');
    console.log('breadcrumb', breadcrumb);
    return (
      <div className="test-123">
        <div className="container p-t-md">

          <div className="row">
            <div className="col-md-12">
              <nav className="clearfix">
                <div className="navbar-header">
                  <a className="navbar-brand pos-r" href="index.html" style={{letterSpacing: '.06em', color: '#888', fontSize:'1.3em', top: 6 }}>
                    { authenticated ? <span style={{marginLeft: 36}}> / </span> : null }{breadcrumb}
                  </a>
                </div>
                <ul className="nav nav-pills pull-right pos-r" style={{top: 12}}>
                  <li>
                    <Link to="/" activeClassName="active">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" activeClassName="active">
                      About
                    </Link>
                  </li>
                  <li>
                    <a href="#">
                      Contact
                    </a>
                  </li>
                  { 
                    authenticated && user.profile

                    ? <li className="pos-r" style={{top: -2}}>
                        <a href="/logout" className="p-l-0__" style={{fontSize: '1.2em'}}><span className="icon icon-dots-three-horizontal" /></a>
                      </li>

                    : <a className="btn btn-xs btn-default-outline pos-r m-l" style={{ top: 9, right: 3}} href="/private">Login</a>
                  }
                </ul>
              </nav>
              <div className="pos-a img-circle" style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', background: '#3097d1', border: '#d3e0e9 1px solid', top: 0, left: '50%', width: 42, height: 42, marginLeft: '-21px' }}>
                <img className="img-responsive pos-r" src="/img/kt.png" style={{width: 27, top: 8, left: 6}} /> 
              </div>        
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default visible-md-block visible-lg-block">
                <div className="panel-body" style={{minHeight: 550}}>
                  <div className="row">
                    {
                      authenticated && user.profile && <img className="pos-a img-circle" src={user.profile.picture} style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', border: '#d3e0e9 1px solid', top: -36, left: 28, width: 32 }} />
                    }
                    <div className="col-md-2">
                      left
                    </div>
                    <div className="col-md-7">
                      {this.props.children}                
                    </div>
                    <div className="col-md-3">
                      right
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id, 
        authenticated, 
        user {
          user_id
          profile {
            name
            picture
          }
        }
      }
    `
  }
});