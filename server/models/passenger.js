'use strict';

const config = require('../config');
const stripe = require('stripe')(config.stripe.secretKey);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Passenger schema.
const PassengerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  created: { type: Date, default: Date.now },

  // Stripe customer ID storing the payment sources.
  stripeCustomerId: String
});

// Return a passenger name for display.
PassengerSchema.methods.displayName = function() {
  return `${this.firstName} ${this.lastName.charAt(0)}.`;
};

// Get the latest passenger.
PassengerSchema.statics.getLatest = async function() {
  try {
    // Count all the passengers.
    const count = await Passenger.countDocuments().exec();
    if (count === 0) {
      // Create default passengers.
      await Passenger.insertDefaultPassengers();
    }
    // Return latest passenger.
    return Passenger.findOne()
      .sort({ created: -1 })
      .exec();
  } catch (err) {
    console.log(err);
  }
};

// Find a random passenger.
PassengerSchema.statics.getRandom = async function() {
  try {
    // Count all the passengers.
    const count = await Passenger.countDocuments().exec();
    if (count === 0) {
      // Create default passengers.
      await Passenger.insertDefaultPassengers();
    }
    // Returns a document after skipping a random amount.
    const random = Math.floor(Math.random() * count);
    return Passenger.findOne().skip(random).exec();
  } catch (err) {
    console.log(err);
  }
};

// Create a few default passengers for the platform to simulate rides.
PassengerSchema.statics.insertDefaultPassengers = async function() {
  try {
    const data = [{
      firstName: 'Sergio',
      lastName: 'Rodriguez',
      email: 'sergio@colibri.com'
    }, {
      firstName: 'Veronika',
      lastName: 'Lambert',
      email: 'veronika@colibri.com'
    }, {
      firstName: 'Xavier',
      lastName: 'Maillot',
      email: 'xavier@colibri.com'
    }, {
      firstName: 'Therese',
      lastName: 'Chitavong',
      email: 'therese@colibri.com'
    }, {
      firstName: 'Myriam',
      lastName: 'Bourgeot',
      email: 'myriam@colibri.com'
    }, {
      firstName: 'Olivier',
      lastName: 'Vaury',
      email: 'olivier@colibri.com'
    }, {
      firstName: 'Sergio',
      lastName: 'Rodriguez',
      email: 'sergio@colibri.com'
    
    }];
    for (let object of data) {
      const passenger = new Passenger(object);
      // Create a Stripe account for each of the passengers.
      const customer = await stripe.customers.create({
        email: passenger.email,
        description: passenger.displayName()
      });
      passenger.stripeCustomerId = customer.id;
      await passenger.save();
    }
  } catch (err) {
    console.log(err);
  }
};

const Passenger = mongoose.model('Passenger', PassengerSchema);

module.exports = Passenger;
