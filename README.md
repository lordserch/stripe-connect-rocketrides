# Rocket Rides: Stripe Connect demo

Rocket Rides is a sample on-demand platform that offers passengers rides with pilots, built on top of [Stripe Connect](https://stripe.com/connect), [Connect Express](https://stripe.com/connect/express), and the [Stripe iOS SDK](https://stripe.com/docs/mobile/ios).

**You can try the web app live on [rocketrides.io](https://rocketrides.io).**

This repository contains two components:
* [Web server in Node.js](#web-onboarding-for-pilots) to onboard pilots on the web and get them paid
* [iOS app in Swift](#ios-app-for-passengers) for passengers to request and pay for rides

## Web onboarding for pilots

Rocket Rides showcases how to sign up pilots and use [Connect Express accounts](https://stripe.com/connect/account-types) to get them paid. Express provides onboarding, account management, an account dashboard, and identity verification for your platform, and we've customized Express with Rocket Rides branding.

This platform also uses the Stripe API to create payments for pilots, fetch their available and pending balance, and let them view transfers. It also creates [Payouts](https://stripe.com/docs/connect/payouts) for pilots who use a debit card as their payout account.

<img src="server/public/images/screenshots/rocketrides-web-home.png" width="440"><img src="server/public/images/screenshots/rocketrides-web-connect.png" width="440">

To integrate Stripe Connect in your own app, check out these two files in particular:
1. [`server/routes/pilots/stripe.js`](server/routes/pilots/stripe.js) shows how to easily create Connect Express accounts and interact with the Stripe API.
2. [`server/routes/pilots/pilots.js`](server/routes/pilots/pilots.js) shows how to create payments and transfer funds to recipient pilots.

### Requirements

You'll need a Stripe account to manage pilot onboarding and payments:
- [Sign up for free](https://dashboard.stripe.com/register), then [enable Connect](https://dashboard.stripe.com/account/applications/settings) by filling in your Connect settings.
- In the **Integration** section, add the following **Redirect URI**: `http://localhost:3000/pilots/stripe/token`.
- Under the **Express** account type, click **Manage** to [choose from which countries](https://dashboard.stripe.com/test/settings/applications/express) users can sign up. Where possible, choose the capability to just receive **Transfers**.

You'll need to have [Node.js](http://nodejs.org) >= 7.x and [MongoDB](http://mongodb.org) installed to run this app.

### Getting started

Install dependencies using npm (or yarn):

    cd server
    npm install

Copy the configuration file and add your own [Stripe API keys](https://dashboard.stripe.com/account/apikeys) and [client ID](https://dashboard.stripe.com/account/applications/settings):

    cp config.default.js config.js

Make sure MongoDB is running. If you're using Homebrew on macOS:

    brew services start mongodb

Run the app:

    npm start

Go to http://localhost:3000 in your browser to start using the app.

## Credits

* Code: [Romain Huet](https://twitter.com/romainhuet), [Joey Dong](https://twitter.com/joeydong_), and [Michael Glukhovsky](https://twitter.com/mglukhovsky)
* Design: [Wes Mitchell](https://wes.ly/), [Bill Labus](https://twitter.com/billlabus), [Melissa Cameron](https://twitter.com/melissacameron_), and [Priidu Zilmer](https://zilmer.com/)
* Original logo: [Focus Lab](https://thenounproject.com/term/comet/547848/)
