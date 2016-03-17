import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import NotifyActions from '../../actions/NotifyActions';
import style from '../../style/notification';

class BecomeMemberCard extends React.Component {
  
  handleSubscribe() {
		
		const {auth, user, forceFetch} = this.props;
		
		// TODO Make pretty
		if (!auth) return NotifyActions().show({ message: 'Please login to subscribe.', style });

		var handler = StripeCheckout.configure({
		  key: "pk_test_QNcoIF4kr7w3xPprqgjYNzGv",
		  image: "https://stripe.com/img/documentation/checkout/marketplace.png",
		  name: "kindturtle",
		  description: "Slim Plan ($3 per month)",
		  panelLabel: "Subscribe",
		  allowRememberMe: false,
		  billingAddress: false,
		  token: function(token) {
	      // Use the token to create the charge with a server-side script.
	      // You can access the token ID with `token.id`
	      token.kt_user_id = user.user_id;
	      console.log('and here is the token', token.id);
				 request
				   .post('/api/subscribe')
				   .send(token)
				   .end(function(err, res){
				     if (err || !res.ok) {
				       alert('Oh no! error');
				     } else {
				       console.log('yay got ', JSON.stringify(res.body));

				       // So the 'isCustomer' flag gets updated. 
				       forceFetch();
				     }
				   });
	    }
		});

		handler.open();

  }

  render() {
    return (
      <div>
	        <h5 className="m-t-0">So you want to join the party?</h5>
	        <p className="m-b">
	        	All of your monthly contribution goes towards a grant. Check out the different plans below.
	        </p>
	        <button className="btn btn-primary-outline btn-lg btn-block pos-r" style={{textAlign: 'left'}} onClick={this.handleSubscribe.bind(this)}>
			    	Slim Plan 
			    	<small className="pos-a" style={{top: 14, right: '1pc'}} >$3/month</small>
	        </button>
	        <Link to="/join" className="btn btn-primary-outline btn-lg btn-block pos-r" style={{textAlign: 'left'}}>Toned Plan <small className="pos-a" style={{top: 14, right: '1pc'}}>$9/month</small></Link>
	        <Link to="/join" className="btn btn-primary-outline btn-lg btn-block pos-r" style={{textAlign: 'left'}}>Muscle Plan <small className="pos-a" style={{top: 14, right: '1pc'}}>$18/month</small></Link>
      </div>
    )
  }
}

export default BecomeMemberCard;