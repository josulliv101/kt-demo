import React from 'react';
import Relay from 'react-relay';
//import {Link} from 'react-router';

class Campaigns extends React.Component {

  render() {
    var {campaigns} = this.props.viewer;
    return (
      <div className="docs-content">
        <h1 className="m-t-0">Campaigns ({campaigns.length})</h1>
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
                    <td>{campaign.owner_id}</td>
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

export default Relay.createContainer(Campaigns, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        campaigns {
          owner_id
          title
          location
        }
      }
    `
  }
});