import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import registry from '../utils/registry';
import {BasicCard, AlertCard} from './cards/CardTypes';
import CampaignsCard from './cards/CampaignsCard';
import NextGiftCard from './cards/NextGiftCard';

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
    var {authenticated, viewer} = this.props;
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
                  {/*<li>
                    <Link to="/" activeClassName="active">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" activeClassName="active">
                      About
                    </Link>
                  </li>*/}
                  { 
                    authenticated && user && user.profile

                    ? <li className="pos-r" style={{top: -2}}>
                        <a href="/logout" className="p-l-0__ text-muted" style={{fontSize: '1.4em'}}><span className="icon icon-cog" /></a>
                      </li>

                    : <a className="btn btn-xs btn-pill__ btn-info-outline pos-r m-l" style={{ padding: 'inherit 0', top: 9, right: 6}} href="/private">Login</a>
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
                        <li><Link to="/" activeStyle={activeStyle} onlyActiveOnIndex={true}>Home</Link></li>
                        <li><Link to="/campaigns" activeStyle={activeStyle}>Campaigns <span className="badge pull-right">{campaigns.length}</span></Link></li>
                        <li><Link to="/about" activeStyle={activeStyle}>About</Link></li>
                      </ul>
                    </div>
                    <div className="col-md-7 p-l-0 p-r">
                      {this.props.children}                
                    </div>
                    <div className="col-md-3">

                      <BasicCard>
                        <NextGiftCard />
                      </BasicCard>

                      <Link to="/campaign/create" activeClassName="hide" className="btn btn-success-outline btn-lg btn-block m-b">
                        Create a New Campaign
                      </Link>
{/*
                      <AlertCard type='danger' dismissable={true}>
                        <a className="alert-link" href="profile/index.html">Please login</a>. You can use your facebook account.
                      </AlertCard>

                      <Link to="/campaign/create" activeClassName="hide" className="hide btn btn-success-outline btn-lg btn-block m-b">
                        Create a New Campaign
                      </Link>

                      <AlertCard dismissable={true}>
                        <a className="alert-link" href="profile/index.html">Visit your profile!</a> Check your self, you aren't looking too good.
                      </AlertCard>

                      <AlertCard type='success' dismissable={true}>
                        <CampaignsCard campaigns={campaigns.slice(0, 3)} />
                      </AlertCard>
*/}
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
          title
          location
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