import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';

class Home extends React.Component {
//var Home = React.createClass({

  render() {
    return (
      <div className="docs-content">
        <h1 className="m-t-0">An Underground Society of Altruistic People</h1>
        <p>Hey there! You’re looking at the docs for an Official Bootstrap Theme—thanks for your purchase! This theme has been lovingly crafted by Bootstrap’s founders and friends to help you build awesome projects on the web. Let’s dive in.</p>
        <p>Each theme is designed as it’s own toolkit—a series of well designed, intuitive, and cohesive components—built on top of Bootstrap. If you’ve used Bootstrap itself, you’ll find this all super familiar, but with new aesthetics, new components, beautiful and extensive examples, and easy-to-use build tools and documentation.</p>

        <div className="m-t">
          <div className="row">
            <div className="col-md-6">
              <div className="panel panel-default panel-profile">
                <div className="panel-heading" style={{height: 66}}></div>
                <div className="panel-body text-center">
                  <img className="panel-profile-img" src="/img/avatar-fat.jpg"/>
                  <h5 className="panel-title">Jacob Thornton</h5>
                  <p className="m-b-md">Big belly rude boy, million dollar hustler. Unemployed.</p>
                  <button className="btn btn-primary-outline btn-sm">
                    <span className="icon icon-add-user"></span> Follow
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="panel panel-default panel-profile">
                <div className="panel-heading" style={{height: 66}}></div>
                <div className="panel-body text-center">
                  <img className="panel-profile-img" src="/img/avatar-mdo.png"/>
                  <h5 className="panel-title">Mark Otto</h5>
                  <p className="m-b-md">GitHub and Bootstrap. Formerly at Twitter. Huge nerd.</p>
                  <button className="btn btn-primary-outline btn-sm">
                    <span className="icon icon-add-user"></span> Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  }
})