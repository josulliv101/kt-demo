import Relay from 'react-relay';

export default class UpdateProfileMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        __typename
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation { updateProfile }`;
  }

/*  getFatQuery() {

    return Relay.QL`
        fragment on User {
          users {
            __typename
            id
            fname
            lname
          }
        }
      `;
  }*/

  getFatQuery () {
    return Relay.QL`
      fragment on UpdateProfilePayload {
        profile {
          id
          profile_id
          fname
          lname
        }
      }
    `
  }
 
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        profile: this.props.profile.id
      },
    }];
  }
  
  getVariables() {
    var {fname, lname, profile_id, user_id} = this.props;
    return {fname, lname, profile_id, user_id};
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