import path from 'path';
import auth from '../server/authentication';
import Models from '../data/models/Models';

const {STRIPE_SECRET_KEY} = process.env;

var stripe = require("stripe")(STRIPE_SECRET_KEY);

export default (req, res, next) => {
    
    console.log('subscribe', STRIPE_SECRET_KEY, req.body.id, req.body.email);
    
    const plan = 'slim';
    
    stripe.customers.create({
      description: `Kindturtle Subscription ${plan}`,
      email: req.body.email,
      plan: plan,
      metadata: { kt_user_id: req.body.kt_user_id },
      source: req.body.id // obtained with Stripe.js
    }, function(err, customer) {
      console.log('customer', JSON.stringify(customer));
      Models.addCustomer({ 
      	user_id: req.body.kt_user_id, 
      	customer_id: customer.id,
      	email: customer.email,
      	currency: customer.currency,
      	plan: customer.subscriptions.data[0].plan.id,
      	last4: customer.sources.data[0].last4
      }).then(() => res.json({ subscribed: !!customer.id }) )
    });

};
