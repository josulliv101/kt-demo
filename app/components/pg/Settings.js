import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Validate from 'validate.js';

class Settings extends React.Component {

 handleSubmit(ev) {

    console.log('handleSubmit');
/*
    ev.preventDefault();

    var v = Validate.collectFormValues(this.refs.formCreateCampaign);

    var errors = Validate(this.refs.formCreateCampaign, this.getConstraints());

    this.setState({ errors });

    if (!errors) this.save();*/
  }

  render() {

    const {profile_id, name} = this.props.viewer.user.profile;
    const [fname, lname] = name.split(' ');
    let errors = this.state && this.state.errors || {};

    var fields = [
      {id: 'owner_id', value: '...', label: 'Owner', placeholder: 'Enter owner', disabled: true},
      {id: 'profile_id', label: 'Username', value: profile_id},
      {id: 'fname', label: 'First Name', value: fname, disabled: false},
      {id: 'lname', label: 'Last Name', value: lname, disabled: false}
    ];

    return (
      <div className="docs-content">
        <h1 className="m-t-0">Settings</h1>
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
    <div key={index} className={classNames('form-group', {'has-error': errors[id] }, {'hide': disabled })}>
      <label htmlFor="state">{label}</label>
      <input type="text" className="form-control" onChange={()=>{}} id={id} name={id} ref={id} placeholder={placeholder || `enter ${id}`} value={value} disabled={disabled}/>
      {errors[id] && <span id="helpBlock" className="help-block text-danger">{errors[id]}</span>}
    </div>
  )
}


export default Relay.createContainer(Settings, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          profile {
            profile_id
            name
          }
        }
      }
    `
  }
});