import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import classNames from 'classnames';
import Validate from 'validate.js';
//import UpdateProfileMutation from '../../../mutations/UpdateProfileMutation';
import storeListener from '../../../decorators/components/storeListener';
import {Store} from '../../../utils/registry';

@storeListener(Store, 'auth') 
class SettingsIndex extends React.Component {

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

/*    Relay.Store.commitUpdate(new UpdateProfileMutation({
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
    });*/

  }

  render() {

    const {profile_id, given_name, family_name, sub} = this.props.auth;
    //const [fname, lname] = name.split(' ');
    let errors = this.state && this.state.errors || {};

    var fields = [
      {id: 'owner_id', value: sub, label: 'Owner Id', placeholder: 'Enter owner', disabled: false},
      {id: 'profile_id', label: 'Username', value: profile_id},
      {id: 'given_name', label: 'First Name', value: given_name, disabled: false},
      {id: 'family_name', label: 'Last Name', value: family_name, disabled: false}
    ];
    
    var activeStyle = {borderLeft: '2px solid #3097d1' };

    return (
      <div className="docs-content">
        <h1 className="m-t-0">Settings ({this.props.user.name})</h1>
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

//${UpdateProfileMutation.getFragment('viewer')}

export default Relay.createContainer(SettingsIndex, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name
      }
    `
  }
});
