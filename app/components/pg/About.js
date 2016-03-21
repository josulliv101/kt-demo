import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';

class About extends React.Component {

  render() {
    var {authenticated, viewer} = this.props;
    var authLabel = `user is ${authenticated ? '' : 'not'} authenticated`
    console.log('About', this.props.authenticated);
    return (
      <div className="docs-content">
        <h1 className="m-t-0">About <small className="text-muted">{authLabel}</small></h1>
        <p>Each theme is designed as it’s own toolkit—a series of well designed, intuitive, and cohesive components—built on top of Bootstrap. If you’ve used Bootstrap itself, you’ll find this all super familiar, but with new aesthetics, new components, beautiful and extensive examples, and easy-to-use build tools and documentation.</p>
        <p>Hey there! You’re looking at the docs for an Official Bootstrap Theme—thanks for your purchase! This theme has been lovingly crafted by Bootstrap’s founders and friends to help you build awesome projects on the web. Let’s dive in.</p>
        <button className="btn btn-lg btn-pill btn-primary-outline">{viewer && viewer.user && viewer.user.profile && viewer.user.profile.profile_id}</button>
      </div>
    )
  }
}

export default Relay.createContainer(About, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        __typename
      }
    `
  }
});