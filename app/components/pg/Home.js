import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';

class Home extends React.Component {
//var Home = React.createClass({

  render() {
    return (
      <div className="docs-content">
        <h1 className="m-t-0">An Underground Network of People Helping People</h1>
        <p>Hey there! You’re looking at the docs for an Official Bootstrap Theme—thanks for your purchase! This theme has been lovingly crafted by Bootstrap’s founders and friends to help you build awesome projects on the web. Let’s dive in.</p>
        <p>Each theme is designed as it’s own toolkit—a series of well designed, intuitive, and cohesive components—built on top of Bootstrap. If you’ve used Bootstrap itself, you’ll find this all super familiar, but with new aesthetics, new components, beautiful and extensive examples, and easy-to-use build tools and documentation.</p>
      </div>
    )
  }
}

export default Home; /*Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  }
});*/