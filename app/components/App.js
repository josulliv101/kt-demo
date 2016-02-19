import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import registry from '../utils/registry';

function getStoreState() {

  var {fetching} = registry.get('Store')().getState();

  return {
    fetching
  };
}

class App extends React.Component {
//let App = React.createClass({ JSON.stringify(this.props.routes[0].authUser.name)

  constructor(props) {
    super(props);
    this.state = {fetching: false};
  }

  onChange() {
    console.log('App Compopnent CHANGED!', getStoreState());
    this.setState(getStoreState());
  }

  componentDidMount() {
    var store = registry.get('Store')();
    console.log('App Compopnent componentDidMount', store);
    store.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    var store = registry.get('Store')();
    console.log('App Compopnent componentWillUnmount', store);
    store.removeChangeListener(this.onChange.bind(this));
  }

  render() {
    var {id, user, campaigns} = this.props.viewer;
    var {authenticated} = this.props;
    var {fetching} = this.state;
    var activeStyle = {borderLeft: '2px solid #3097d1' };
    var breadcrumb = this.props.routes.filter(route => !!route.breadcrumb).map(route => route.breadcrumb).join(' / ');
    
    console.log('APP::render', this.props.authenticated);

    return (
      <div className="test-123 m-t">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="clearfix">
                <div className="navbar-header">
                  <Link className="navbar-brand pos-r" to="/" style={{letterSpacing: '.06em', color: '#888', fontSize:'1.3em', top: 6 }}>
                    { authenticated ? <span style={{marginLeft: 36}}> / </span> : null }{ "kindturtle" || breadcrumb}
                  </Link>
                </div>
                <ul className="nav nav-pills pull-right pos-r" style={{top: 12, marginRight: 12}}>
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
                  { 
                    authenticated && user && user.profile

                    ? <li className="pos-r" style={{top: -2}}>
                        <a href="/logout" className="p-l-0__" style={{fontSize: '1.2em'}}><span className="icon icon-dots-three-horizontal" /></a>
                      </li>

                    : <a className="btn btn-xs btn-pill btn-info-outline pos-r m-l" style={{ padding: 'inherit 0', top: 9, right: 0}} href="/private">Login</a>
                  }
                </ul>
              </nav>
              <div className="pos-a img-circle" style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', background: '#3097d1', border: '#d3e0e9 1px solid', top: 0, left: '50%', width: 42, height: 42, marginLeft: '-21px' }}>
                <img className={`img-responsive pos-r animated ${fetching ? 'tada infinite' : ''}`} src="/img/kt.png" style={{width: 27, top: 8, left: 6 }} /> 
              </div>        
            </div>
          </div>

          <div className="row pos-r">
            <div className="col-md-12">
              <div className="panel panel-default visible-md-block visible-lg-block m-b-0">
                <div className="panel-body m-t" style={{minHeight: 550}}>
                  <div className="row">
                    {
                      authenticated && user && user.profile && <img className="pos-a img-circle" src={user.profile.picture} style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', border: '#d3e0e9 1px solid', top: -36, left: 28, width: 32 }} />
                    }
                    { fetching && <div className="pos-a" style={{top: 0, top: 0, width: '100%', height: '100%', background: '#fff', zIndex: 999, opacity: '.7'}} />}
                    <div className="col-md-2">
                      <ul id="markdown-toc" className="m-t-0">
                        <li><a href="#contents" id="markdown-toc-contents">Contents</a></li>
                        <li><Link to="/" activeStyle={activeStyle} onlyActiveOnIndex={true}>Welcome</Link></li>
                        <li><Link to="/about" activeStyle={activeStyle}>About</Link></li>
                        <li><Link to="/campaigns" activeStyle={activeStyle}>Campaigns <span className="badge pull-right">{campaigns.length}</span></Link><ul>
                            <li><a href="#getting-started" id="markdown-toc-getting-started">Getting started</a></li>
                            <li><a href="#gulpfilejs" id="markdown-toc-gulpfilejs">Gulpfile.js</a></li>
                            <li><a href="#theme-source-code" id="markdown-toc-theme-source-code">Theme source code</a></li>
                          </ul>
                        </li>
                        <li><a href="#custom-builds" id="markdown-toc-custom-builds">Custom builds</a></li>
                        <li><a href="#basic-template" id="markdown-toc-basic-template">Basic template</a></li>
                        <li><a href="#utilities" id="markdown-toc-utilities">Utilities</a>    <ul>
                            <li><a href="#positioning" id="markdown-toc-positioning">Positioning</a></li>
                            <li><a href="#width" id="markdown-toc-width">Width</a></li>
                            <li><a href="#margin-and-padding" id="markdown-toc-margin-and-padding">Margin and padding</a></li>
                            <li><a href="#responsive-text-alignment" id="markdown-toc-responsive-text-alignment">Responsive text alignment</a></li>
                          </ul>
                        </li>
                        <li><a href="#components" id="markdown-toc-components">Components</a>    <ul>
                            <li><a href="#entypo" id="markdown-toc-entypo">Entypo</a>        <ul>
                                <li><a href="#available-icons" id="markdown-toc-available-icons">Available icons</a></li>
                                <li><a href="#examples" id="markdown-toc-examples">Examples</a></li>
                              </ul>
                            </li>
                            <li><a href="#outline-buttons" id="markdown-toc-outline-buttons">Outline buttons</a></li>
                            <li><a href="#pill-buttons" id="markdown-toc-pill-buttons">Pill buttons</a></li>
                            <li><a href="#avatar-list" id="markdown-toc-avatar-list">Avatar list</a></li>
                            <li><a href="#growl" id="markdown-toc-growl">Growl</a></li>
                            <li><a href="#profile-header" id="markdown-toc-profile-header">Profile header</a></li>
                            <li><a href="#panel-profile" id="markdown-toc-panel-profile">Panel profile</a></li>
                            <li><a href="#panel-link-list" id="markdown-toc-panel-link-list">Panel link list</a></li>
                            <li><a href="#media-list-steam" id="markdown-toc-media-list-steam">Media list steam</a></li>
                            <li><a href="#media-list-conversation" id="markdown-toc-media-list-conversation">Media list conversation</a></li>
                            <li><a href="#media-list-users" id="markdown-toc-media-list-users">Media list users</a></li>
                            <li><a href="#custom-form-controls" id="markdown-toc-custom-form-controls">Custom form controls</a></li>
                            <li><a href="#custom-modals" id="markdown-toc-custom-modals">Custom Modals</a></li>
                            <li><a href="#custom-containers" id="markdown-toc-custom-containers">Custom containers</a></li>
                          </ul>
                        </li>
                        <li><a href="#plugins" id="markdown-toc-plugins">Plugins</a>    <ul>
                            <li><a href="#image-grids" id="markdown-toc-image-grids">Image grids</a>        <ul>
                                <li><a href="#options" id="markdown-toc-options">Options</a></li>
                                <li><a href="#javascript-api" id="markdown-toc-javascript-api">JavaScript API</a></li>
                                <li><a href="#data-api" id="markdown-toc-data-api">Data Api</a></li>
                              </ul>
                            </li>
                            <li><a href="#zoom" id="markdown-toc-zoom">Zoom</a>        <ul>
                                <li><a href="#data-api-1" id="markdown-toc-data-api-1">Data API</a></li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-7 p-l-0 p-r">
                      {this.props.children}                
                    </div>
                    <div className="col-md-3">
                      <div className="alert alert-danger alert-dismissible hidden-xs" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <a className="alert-link" href="profile/index.html">Please login</a>. You can use your facebook account.
                      </div>
                      <Link to="/campaign/create" activeClassName="hide" className="btn btn-success-outline btn-lg btn-block m-b">
                        Create a New Campaign
                      </Link>
                      <div className="alert alert-info hidden-xs" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <a className="alert-link" href="profile/index.html">Visit your profile!</a> Check your self, you aren't looking too good.
                      </div>
                      <div className="panel panel-default m-b-md hidden-xs">
                        <div className="panel-body">
                          <h5 className="m-t-0">Sponsored</h5>
                          <p><strong>It might be time to visit Iceland.</strong> Iceland is so chill, and everything looks cool here. Also, we heard the people are pretty nice. What are you waiting for?</p>
                          <button className="btn btn-primary-outline btn-sm">Buy a ticket</button>
                        </div>
                      </div>
                      <div className="panel panel-default visible-md-block visible-lg-block">
                        <div className="panel-body">
                          <h5 className="m-t-0">About</h5>
                          <ul className="list-unstyled list-spaced">
                            <li><span className="text-muted icon icon-calendar m-r"></span>Went to <a href="#">Oh, Canada</a>
                            </li><li><span className="text-muted icon icon-users m-r"></span>Became friends with <a href="#">Obama</a>
                            </li><li><span className="text-muted icon icon-github m-r"></span>Worked at <a href="#">Github</a>
                            </li><li><span className="text-muted icon icon-home m-r"></span>Lives in <a href="#">San Francisco, CA</a>
                            </li><li><span className="text-muted icon icon-location-pin m-r"></span>From <a href="#">Seattle, WA</a>
                          </li></ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <nav className="pos-r" style={{top: 6, padding: '0 15px' }}>
                <ul className="list-unstyled text-muted clearfix">
                  <li className="pull-right">
                    Technologies behind this site <span className="icon icon-github hide"></span>
                    <span style={{opacity: .3, margin: '0 6px'}}>|</span> 
                    Terms of Use 
                    <span style={{opacity: .3, margin: '0 6px'}}>|</span> 
                    Privacy
                    <span style={{opacity: .3, margin: '0 6px'}}>|</span> 
                    Kindturtle Corporation &copy; 2016
                  </li>
                  <li className="pull-left hide">Kindturtle Corporation &copy; 2016</li>
                </ul>
              </nav>       
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
        campaigns {
          id
        }
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