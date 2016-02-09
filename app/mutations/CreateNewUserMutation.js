import Relay from 'react-relay';

export default class CreateNewUserMutation extends Relay.Mutation {

  static fragments = {

  };

  getMutation() {
    return Relay.QL`mutation { createNewUser }`;
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
      fragment on CreateNewUserPayload {
        success 
      }
    `
  }
 
  getConfigs() {
    return [];
  }

/*  getConfigs() {
    debugger;
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
        //game: this.props.game.id,
      },
    }];
  }*/

/*  getConfigs() {
    console.log('configs arg', arguments, this);

    return [{
      type: 'REQUIRED_CHILDREN',
      // Forces these fragments to be included in the query
      children: [Relay.QL`
        fragment on CreateUserPayload {
          user {
            __typename
          }
        }
      `],
    }];
  }*/
  
  getVariables() {
    var {fname, lname, email} = this.props;
    return {fname, lname, email};
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