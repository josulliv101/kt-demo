import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {BasicCard, AlertCard} from '../cards/CardTypes';
import Campaigns from '../Campaigns';

class Home extends React.Component {

  render() {
    return (
      <div className="docs-content">
        <h1 className="m-t-0 hide">Welcome to Kindturtle</h1>
        <AlertCard type="info">
          <p>
            <strong>kindturtle</strong> is home to an underground society of charitable people. We crowdsource kindness &mdash; finding in-need/deserving individuals and awarding them a grant.
            <br/>
            <Link to="/faq"><small>Check out FAQ <span className="icon icon-chevron-small-right"/></small></Link>
          </p>
        </AlertCard>
        <div className="m-t">
          <div className="row">
            <div className="col-md-12">
              <Campaigns title={'Past Campaigns'} campaigns={this.props.viewer.campaigns}/>
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
        campaigns {
          owner_id
          owner {
            name
            profile {
              fname
              lname
            }
          }
          title
          location
        }
      }
    `
  }
})