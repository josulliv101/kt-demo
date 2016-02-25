import path from 'path';
import auth from '../server/authentication';

const {STRIPE_SECRET_KEY} = process.env;

var stripe = require("stripe")(STRIPE_SECRET_KEY);

export default (req, res, next) => {
    
    console.log('subscribe', STRIPE_SECRET_KEY, req.body.id, req.body.email);
    
    stripe.customers.create({
      description: req.body.email,
      plan: 'slim',
      source: req.body.id // obtained with Stripe.js
    }, function(err, customer) {
      console.log('customer', customer.id)
      res.json({ subscribed: plan });
    });

};
