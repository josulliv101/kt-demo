import Relay from 'react-relay';

/* TODO: Needs refactor */

export default class CreateNewCampaignMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        __typename
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation { createNewCampaign }`;
  }

/*  getFatQuery() {

    return Relay.QL`
      fragment on Viewer {
        __typename
        id
        campaigns {
          title
          location,
          owner_id
        }
      }
      `;
  }*/

  getFatQuery () {
    return Relay.QL`
      fragment on CreateNewCampaignPayload {
        viewer {
          campaigns
        }
      }
    `
  }
 
 
/*  getConfigs() {

    return [];
  }*/

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id
      },
    }];
  }

/*  getConfigs() {
    console.log('configs arg', arguments, this);

    return [{
      type: 'REQUIRED_CHILDREN',
      // Forces these fragments to be included in the query
      children: [Relay.QL`
        fragment on CreateNewCampaignPayload {
          success
        }
      `],
    }];
  }*/
  
  getVariables() {
    var {title, description, city, state, owner_id} = this.props;
    return {title, description, city, state, owner_id, picture: "abc.png"};
  }

/*  getOptimisticResponse() {
    return {

        fname: this.props.fname,
        lname: this.props.lname,
        email: this.props.email,
        type: this.props.type,

    };
  }*/

}