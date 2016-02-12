import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';

class About extends React.Component {

  render() {
    var {user} = this.props.viewer;
    return (
      <div>
        page is 'About'. An attr just on this page is <em>{user && user.profile && user.profile.profile_id}</em>.
      </div> 
    )
  }
}

export default Relay.createContainer(About, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          profile {
            profile_id
          }
        }
      }
    `
  }
});