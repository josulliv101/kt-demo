import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import registry from '../utils/registry';
import {BasicCard, AlertCard} from './cards/CardTypes';
import CampaignsCard from './cards/CampaignsCard';
import NextGiftCard from './cards/NextGiftCard';
import BecomeMemberCard from './cards/BecomeMemberCard';
import ProfileDropdown from './ProfileDropdown';
import { Notification, NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';

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
    this.state = {fetching: false, showProfileOptions: false, showNotification: false, count: 0, notifications: OrderedSet()};
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

  addNotification() {
    const { notifications, count } = this.state;
    const id = notifications.size + 1;
    const newCount = count + 1;

    return this.setState({
      count: newCount,
      notifications: notifications.add({
        message: `Please login to join the party. Use your facebook account.`,
        key: newCount,
        dismissAfter: 5000,
        style: this.getNotificationStyles()
      })
    });
  }

  getNotificationStyles() {
    let bar = {
        position: 'fixed',
        top: '1rem',
        left: 'none',
        right: '-100%',
        width: 'auto',
        maxHeight: 54,
        padding: '2rem',
        margin: 0,
        zIndex: 999999,
        color: '#fafafa',
        font: '1.6rem normal Roboto, sans-serif',
        borderRadius: '2px',
        background: '#3097d1',
        borderSizing: 'border-box',
        boxShadow: '0 0 1px 1px rgba(10, 10, 11, .125)',
        cursor: 'default',
        WebKittransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
        MozTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
        msTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
        OTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
        transition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',

        // Trigger GPU acceleration
        WebkitTransform: 'translatez(0)',
        MozTransform: 'translatez(0)',
        msTransform: 'translatez(0)',
        OTransform: 'translatez(0)',
        transform: 'translatez(0)'
    };

    let active = {
      top: '1rem',
      left: 'none',
      right: '1rem'
    };

    let action = {
      padding: '0.125rem',
      marginLeft: '1rem',
      color: '#f44336',
      font: '.75rem normal Roboto, sans-serif',
      lineHeight: '1rem',
      letterSpacing: '.125ex',
      textTransform: 'uppercase',
      borderRadius: '2px',
      cursor: 'pointer'
    };

    return { bar, active, action };
  }

  render() {
    var {id, user, campaigns} = this.props.viewer;
    var {authenticated, viewer, user_id} = this.props;
    var {fetching, showNotification} = this.state;
    var activeStyle = {borderLeft: '2px solid #3097d1' };
    var breadcrumb = this.props.routes.filter(route => !!route.breadcrumb).map(route => route.breadcrumb).join(' / ');
    var breadcrumbRoutes = this.props.routes.filter(route => !!route.breadcrumb);
    console.log('APP::render', this.props);

    return (
      <div className="test-123 m-t">
        <NotificationStack
          notifications={this.state.notifications.toArray()}
          onDismiss={notification => this.setState({
            notifications: this.state.notifications.delete(notification)
          })}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="clearfix">
                <div className="navbar-header">
                  <Link className="navbar-brand pos-r" to="/" style={{letterSpacing: '.06em', color: '#888', fontSize:'1.3em', top: 6 }}>
                    { false && authenticated ? <span style={{marginLeft: 36}}> / </span> : null }{ "kindturtle" || breadcrumb}
                  </Link>
                </div>
                <ProfileDropdown user={user} />
              </nav>
              <div className="pos-a img-circle" style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', background: '#3097d1', border: '#d3e0e9 1px solid', top: -4, left: '50%', width: 46, height: 46, marginLeft: '-23px' }}>
                <img className={`img-responsive pos-r animated ${fetching ? 'tada infinite' : ''}`} src="/img/kt.png" style={{width: 27, top: 10, left: 8 }} /> 
              </div>        
            </div>
          </div>

          <div className="row pos-r">
            <div className="col-md-12">
              <div className="panel panel-default visible-md-block visible-lg-block m-b-0">
                <div className="panel-body m-t" style={{minHeight: 550}}>
                  <div className="row">
                    {
                      authenticated && user && user.profile && <img className="hide pos-a img-circle" src={user.profile.picture} style={{boxShadow: '0 1px 1px rgba(0,0,0,.05)', border: '#d3e0e9 1px solid', top: -36, left: 28, width: 32 }} />
                    }
                    { fetching && <div className="pos-a" style={{top: 0, top: 0, width: '100%', height: '100%', background: '#fff', zIndex: 999, opacity: '.7'}} />}
                    <div className="col-md-2">
                      <ul id="markdown-toc" className="m-t-0">
                        <li><a href="#contents" id="markdown-toc-contents">Contents</a></li>
                        <li><Link to="/" activeStyle={activeStyle} onlyActiveOnIndex={true}>Home</Link></li>
                        <li className="hide"><Link to="/campaigns" activeStyle={activeStyle}>Campaigns <span className="badge pull-right">{campaigns.length}</span></Link></li>
                        <li><Link to="/faq" activeStyle={activeStyle}>FAQ</Link></li>
                        <li><Link to="/about" activeStyle={activeStyle}>About</Link></li>
                      </ul>
                    </div>
                    <div className="col-md-7 p-l-0 p-r">
                      {
                        breadcrumbRoutes.length > 1 && // No breadcrumb on homepage
                        <ol className="breadcrumb p-l-0 p-b-0" style={{backgroundColor: 'transparent'}}>
                          {
                            breadcrumbRoutes.map((route, i, routes) => {
                              return i < routes.length-1
                                ? <li key={i}><Link to={route.path}>{route.breadcrumb}</Link></li>
                                : <li key={i} className='active'>{route.breadcrumb}</li>
                            })
                          }
                        </ol>
                      }
                      {this.props.children}                
                    </div>
                    <div className="col-md-3">
                      
                      {
                        user && !user.isCustomer &&
                        <BasicCard>
                          <BecomeMemberCard userId={user_id} forceFetch={this.props.relay.forceFetch} growl={::this.addNotification} />
                        </BasicCard>
                      }

                      <BasicCard>
                        <NextGiftCard />
                      </BasicCard>

                      <Link to="/campaign/create" activeClassName="hide" className="btn btn-success-outline btn-lg btn-block m-b">
                        Create a New Campaign
                      </Link>

                      <button className="btn btn-lg btn-primary" onClick={::this.addNotification}>Snackbar</button>
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
          isCustomer
          profile {
            name
            picture
          }
        }
      }
    `
  }
});