import React from 'react';
import Relay from 'react-relay';

export default class App extends React.Component {
//let App = React.createClass({ JSON.stringify(this.props.routes[0].authUser.name)

  render() {
    var {children, routes, viewer} = this.props;
    var authUser = routes[0].authUser;
    console.log('routes!!!', this.props.routes[0]);
    return (
      <div className="test-123">
        <div className="container p-t-md">
          <div className="row">
            <div className="col-md-12">
              <h3>Kindturtle App</h3>
              <p>viewer id {viewer.uid}</p>
              {
                authUser && 
                <div>
                  <p>
                    <img style={{width: '32px', position: 'relative', top: 12, marginRight: 9, border: '#6699cc 1px solid', borderRadius: '50%'}} src={authUser.picture} />
                    {authUser.name}
                  </p>
                  <p><a href="/logout">logout</a></p>
                </div>
              }
              <p><a href="/private">members only</a></p>
              {children}
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
      fragment on User {
        __typename
        id, uid
      }
    `
  }
});