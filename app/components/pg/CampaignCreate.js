import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Validate from 'validate.js';
import CreateNewCampaignMutation from '../../mutations/CreateNewCampaignMutation.js';
//import {Link} from 'react-router';

class CampaignCreate extends React.Component {

  save(ev) {

    console.log('save', this.props);
    
    ev.preventDefault();
    
    /*var {history} = this.props;*/

    Relay.Store.commitUpdate(new CreateNewCampaignMutation({
      owner_id: this.refs.owner_id.value,
      title: this.refs.title.value,
      description: this.refs.description.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      viewer: this.props.viewer
    }), {
      onSuccess: (res) => {
        console.log('success', res)
        //history.pushState(null, `/user/${res.createUser.userEdge.node.id}/edit`)
      },
      onFailure: (res) => console.log('fail', res)
    });

  }

  render() {
    var {user_id} = this.props.routes[0];
    return (
      <div className="docs-content">
        <h1 className="m-t-0">Create a Campaign</h1>
        <form>
          <div className="form-group">
            <label htmlFor="owner_id">owner_id</label>
            <input type="text" className="form-control" id="owner_id" ref="owner_id" placeholder="title" value={user_id} disabled/>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" ref="title" placeholder="title"/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" ref="description" placeholder="description"/>
          </div>
          <div className="form-group">
            <label htmlFor="description">City</label>
            <input type="text" className="form-control" id="city" ref="city" placeholder="city"/>
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="text" className="form-control" id="state" ref="state" placeholder="state"/>
          </div>
          <button type="submit" className="btn btn-default" onClick={this.save.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Relay.createContainer(CampaignCreate, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        __typename
        id
        ${CreateNewCampaignMutation.getFragment('viewer')}
      }
    `
  }
});