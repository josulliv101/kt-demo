import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {BasicCard, AlertCard} from '../cards/CardTypes';
import Campaigns from '../Campaigns';
import BecomeMemberCard from '../cards/BecomeMemberCard';

class Home extends React.Component {

  render() {

    var {user, authenticated, auth} = this.props;
    //console.log('user', user);
    return (
      <div className="row">
        <div className="col-md-9">
              <AlertCard type="info">
                <p>
                  <strong>kindturtle</strong> is home to an underground society of charitable people. We crowdsource kindness &mdash; awarding grants to in-need/deserving people.
                  <br/>
                  <Link to="/faq"><small>Check out FAQ <span className="icon icon-chevron-small-right"/></small></Link>
                </p>
              </AlertCard>
          <BasicCard>
            <div className="docs-content">
              <h1 className="m-t-0 hide">Welcome to Kindturtle</h1>

              <div className="m-t">
                <div className="row">
                  <div className="col-md-12">
                    <Campaigns title={'Past Grants'} campaigns={this.props.viewer.campaigns}/>
                  </div>
                </div>
              </div>
            </div>
          </BasicCard>

        </div>
        <div className="col-md-3">
          {
            //true || authenticated && user && !user.isCustomer &&
            <BasicCard>
              <BecomeMemberCard {...this.props} forceFetch={this.props.relay.forceFetch} />
            </BasicCard>
          }
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