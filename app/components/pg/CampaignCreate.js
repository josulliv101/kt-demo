import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Validate from 'validate.js';
import Moment from 'moment';
import CreateNewCampaignMutation from '../../mutations/CreateNewCampaignMutation.js';
//import {Link} from 'react-router';

class CampaignCreate extends React.Component {

  componentDidMount() {

    // Before using it we must add the parse and format functions
    // Here is a sample implementation using moment.js
    Validate.extend(Validate.validators.datetime, {
      // The value is guaranteed not to be null or undefined but otherwise it
      // could be anything.
      parse: function(value, options) {
        return +Moment.utc(value);
      },
      // Input is a unix timestamp
      format: function(value, options) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return Moment.utc(value).format(format);
      }
    });

  }

  getConstraints() {
    return {
      owner_id: {
        presence: true
      },
      title: {
        presence: true
      },
      city: {
        presence: true
      },
      state: {
        presence: true
      }
    }
  } 

  handleSubmit(ev) {

    console.log('handleSubmit', this.getConstraints());

    ev.preventDefault();

    var v = Validate.collectFormValues(this.refs.formCreateCampaign);

    var errors = Validate(this.refs.formCreateCampaign, this.getConstraints());

    this.setState({ errors });

    if (!errors) this.save();
  }

  save(ev) {

    console.log('save', this.props);

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

    let errors = this.state && this.state.errors || {};
    
    var fields = [
      {id: 'owner_id', value: user_id, label: 'Owner', placeholder: 'Enter owner', disabled: true},
      {id: 'title', label: 'Title'},
      {id: 'description', label: 'Description'},
      {id: 'city', label: 'City'},
      {id: 'state', label: 'State'}
    ];
    console.log('errors', errors);

    return (
      <div className="docs-content">
        <h1 className="m-t-0">Create a Campaign</h1>
        <form ref="formCreateCampaign"className="form" noValidate>
          { fields.map((field, index) => getFormControl(field, index, errors)) }
          <button type="submit" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

function getFormControl({id, label, placeholder, value, disabled}, index, errors) {
  return (
    <div key={index} className={classNames('form-group', {'has-error': errors[id] })}>
      <label htmlFor="state">{label}</label>
      <input type="text" className="form-control" id={id} name={id} ref={id} placeholder={placeholder || id} value={value} disabled={disabled}/>
      {errors[id] && <span id="helpBlock" className="help-block text-danger">{errors[id]}</span>}
    </div>
  )
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