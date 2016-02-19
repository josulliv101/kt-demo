import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';

class CampaignsCard extends React.Component {
 
  render() {
    var {campaigns} = this.props;
    return (
      <div>
        <h5 className="m-t-0">Popular Campaigns</h5>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>title</th>
              <th>location</th>
            </tr>
          </thead>
          <tbody>
            {
              campaigns.map((campaign, index) => {
                return (
                  <tr key={index}>
                    <td>{campaign.title}</td>
                    <td>{campaign.location}</td>
                  </tr>                  
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default CampaignsCard; /*Relay.createContainer(CampaignsCard, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        campaigns {
          title
          location
        }
      }
    `
  }
});*/