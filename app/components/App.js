import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class App extends React.Component {
//let App = React.createClass({ JSON.stringify(this.props.routes[0].authUser.name)

  render() {
    var {id, authenticated, user} = this.props.viewer;
    return (
      <div className="test-123">
        <div className="container p-t-md">

          <div className="row">
            <div className="col-md-12">
              <nav className="clearfix">
                <div className="navbar-header">
                  <a className="navbar-brand pos-r" href="index.html" style={{letterSpacing: '.06em', color: '#888', fontSize:'1.2em', top: 6 }}>
                    kindturtle
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
                    authenticated 

                    ? <li className="pos-r" style={{top: -2}}>
                        <a href="/logout" className="p-l-0__" style={{fontSize: '1.2em'}}><span className="icon icon-dots-three-horizontal" /></a>
                      </li>

                    : <a className="btn btn-xs btn-primary pos-r m-l m-r" style={{top: 9}} href="/private">login</a>
                  }
                </ul>
              </nav>            
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default visible-md-block visible-lg-block">
                <div className="panel-body">
                  <div className="row">
                    {
                      authenticated && <img className="pos-a img-circle" src={user.profile.picture} style={{border: '#999 1px solid', top: -6, right: 10, width: 28 }} />
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