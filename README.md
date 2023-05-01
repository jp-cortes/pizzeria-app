# Pizzeria Restaurant Website
This is a web application for a pizzeria restaurant built with Next.js and Redux. The application also integrates a payment option with PayPal and cash on delivery. The database is MongoDB and it is connected to the application using Mongoose.

# Features
* Display of pizza menu
* Order placement functionality
* Payment options using PayPal and cash on delivery
* Admin dashboard for managing orders

# Technologies
* Next.js
* Redux
* MongoDB with Mongoose
* PayPal API
* Typescript

# Installation
* Clone the repository
bash
```
git clone https://github.com/jp-cortes/pizzeria-app.git
```
* Install dependencies
bash

```cd pizzeria-next```
```npm install```

* Set up environment variables
Create a .env file in the root directory of the project and add the following variables:

makefile .env
```
NEXT_PUBLIC_PAYPAL_CLIENT_ID=<PayPal client ID>
MONGODB_URL=<MongoDB URL>
ADMIN_USERNAME = <user>
ADMIN_PASSWORD = <password>
TOKEN = <token>
NEXT_PUBLIC_CLOUDINARY_URL = <cloudinary url>
```
* Start the application

```
npm run dev
```
# Usage
The web application can be accessed by visiting http://localhost:3000 in your web browser.

# Order Placement
* Browse the pizza menu and add items to your cart
* Proceed to the checkout page
* Select your preferred payment method (PayPal or cash on delivery)
* Provide your details and confirm your order

# Admin Dashboard
* Visit http://localhost:3000/admin in your web browser
* Log in with the admin credentials
* View and manage orders

# License
This project is licensed under the MIT License. See the LICENSE file for details.
