import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';

export default class Home extends React.Component {
//var Home = React.createClass({

  render() {
    return (
      <div>
        page is 'Home'
      </div>
    )
  }
}

/*export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        __typename
        id
      }
    `
  }
});*/