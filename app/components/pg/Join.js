import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';

class Join extends React.Component {

  render() {
    return (
      <div className="docs-content">
        <h1 className="m-t-0">Become a Member</h1>
        <p>Each theme is designed as it’s own toolkit—a series of well designed, intuitive, and cohesive components—built on top of Bootstrap. If you’ve used Bootstrap itself, you’ll find this all super familiar, but with new aesthetics, new components, beautiful and extensive examples, and easy-to-use build tools and documentation.</p>
      </div>
    )
  }
}

export default Relay.createContainer(Join, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        __typename
      }
    `
  }
});