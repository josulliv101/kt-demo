import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Validate from 'validate.js';
import UpdateProfileMutation from '../../mutations/UpdateProfileMutation';

class Settings extends React.Component {

  getConstraints() {
    return {
      owner_id: {
        presence: true
      },
      fname: {
        presence: true
      },
      lname: {
        presence: true
      },
      profile_id: {
        presence: true
      }
    }
  } 

 handleSubmit(ev) {

    console.log('handleSubmit');

    ev.preventDefault();

    var v = Validate.collectFormValues(this.refs.formUpdateProfile);

    var errors = Validate(this.refs.formUpdateProfile, this.getConstraints());

    this.setState({ errors });

    if (!errors) this.save();
  }

  save(ev) {

    console.log('save', this.props);

    Relay.Store.commitUpdate(new UpdateProfileMutation({
      user_id: this.refs.owner_id.value,
      fname: this.refs.fname.value,
      lname: this.refs.lname.value,
      profile_id: this.refs.profile_id.value,
      viewer: this.props.viewer,
      profile: this.props.viewer.user.profile
    }), {
      onSuccess: (res) => {
        console.log('success', res)
        //history.pushState(null, `/campaigns`)
      },
      onFailure: (res) => console.log('fail', res)
    });

  }

  render() {

    const {profile_id, fname, lname, owner_id} = this.props.viewer.user.profile;
    //const [fname, lname] = name.split(' ');
    let errors = this.state && this.state.errors || {};

    var fields = [
      {id: 'owner_id', value: owner_id, label: 'Owner', placeholder: 'Enter owner', disabled: false},
      {id: 'profile_id', label: 'Username', value: profile_id},
      {id: 'fname', label: 'First Name', value: fname, disabled: false},
      {id: 'lname', label: 'Last Name', value: lname, disabled: false}
    ];

    return (
      <div className="docs-content">
        <h1 className="m-t-0">Settings</h1>
        <form ref="formUpdateProfile"className="form" noValidate>
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
      <input type="text" className="form-control" onChange={()=>{}} id={id} name={id} ref={id} placeholder={placeholder || `enter ${id}`} defaultValue={value} disabled={disabled}/>
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
            id
            profile_id
            fname
            lname
            owner_id
          }
        }
        ${UpdateProfileMutation.getFragment('viewer')}
      }
    `
  }
});