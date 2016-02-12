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
              <nav>
                <ul className="nav nav-pills">
                  <li>
                    <Link to="/" activeClassName="active">
                      <span className="icon icon-home" style={{marginRight: 6}}></span>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" activeClassName="active">
                      <span className="icon icon-shield" style={{marginRight: 6}}></span>
                      About
                    </Link>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon icon-mail" style={{marginRight: 6}}></span>
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
              <h3>Kindturtle App</h3>
              {
                authenticated && 

                <ul className="media-list media-list-stream m-t">
                  <li className="media m-b">
                    <a className="media-left" href="#">
                      <img className="media-object img-circle" src={user.profile.picture} />
                    </a>
                    <div className="media-body">
                      <strong>{ user.profile.name }</strong> ({user.user_id})
                    </div>
                  </li>
                </ul>

              }
              <p>
                { authenticated && <a className="btn btn-sm btn-primary m-r" href="/logout">logout</a> }
                <a className="btn btn-sm btn-primary"  href="/private">members only</a>
              </p>
              {this.props.children}
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