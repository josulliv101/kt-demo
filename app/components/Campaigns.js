import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';

class Campaigns extends React.Component {

  render() {
    var {campaigns, title} = this.props;
    return (
      <div className="docs-content">
        <h1 className="m-t-0">{title} ({campaigns.length})</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>title</th>
              <th>owner</th>
              <th>location</th>
            </tr>
          </thead>
          <tbody>
            {
              campaigns.map((campaign, index) => {
                return (
                  <tr key={index}>
                    <td>{campaign.title}</td>
                    <td>
                      {campaign.owner && campaign.owner.profile.fname} {campaign.owner && campaign.owner.profile.lname}
                    </td>
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

export default Campaigns