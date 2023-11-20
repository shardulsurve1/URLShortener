# URLShortener

Github Repo for Tram Co-op/Internship Assignment - URLShortener

# URL Shortener Service

## Overview

This is a simple URL shortener service that allows users to create shortened URLs.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MySQL workbench or server setup on your machine
- Postman App installed (optional)

1.  Navigate to the project directory

2.  install project dependencies --> npm install

3.  Create a MySQL database.
    Update the database configuration in config.env file with your database credentials.
    Set environment variables:

    Create a config.env file in the root directory and add the following:

        PORT=3000
        DB_PASSWORD=root
        DB_USERNAME=root
        DB_DATABASE=URLSHORTNER
        DB_HOST=127.0.0.1
        BASE_URL=http://localhost:3000
        INVALID_LONG_URL= Invalid Long URL!
        INVALID_CUSTOM_ALIAS= Invalid Custom Alias! Length should be less than or equal to 32 characters
        INVALID_BOTH= Invalid Long URL and Custom Alias!
        SERVER_ERROR= Server Error!! Please Try Again Later!
        LONG_URL_REQUIRED= Long URL is required!

    Make sure to change 'username' and 'password' accoring to your database server

4.  start application --> npm start

The server should be running at http://localhost:3000.

Use Postman API to make requests :

https://elements.getpostman.com/redirect?entityId=29855529-713409ac-3a4c-4f1c-a1b0-67c0462ebf9e&entityType=collection

use above postman api to make requests once application is running.

Application is also responsible to create the database in your Mysql Workbench if not already created!!. (You dont have to create databse by yourself! just run application!!)

## Information on Endpoints

1. healthz endpoint : this endpoint is gives you a system check! if lets you know that you are connected to database successfully

2. createAccount endpoint : In this application there are 3 Tiers - Tier0, Tier1, Tier2

Tier0 --> the users who are not registered in database and havent created an account . The users can still use "createShortURL" endpoint. but cannot see their history (history feature is only available after registration)

Tier1 --> users can only shorten 100 Urls

Tier2 --> users can only shorten 1000 urls

3. getHistory --> users can see their urls history . can also give use localhost:3000/v1/history?limit=15" to see last 15 requests. default limit is 10

4. createShortUrl --> this will return you shortURl.

   constaints :

   Long URL Required:

   1. If the longURL is not provided in the request body, the API will respond with a 400 Bad Request status and a JSON object containing the message: "Long URL is required."

   # this also checks if longURL is a valid URI resource or not

   2. Custom Alias Length Check: If a customAlias is provided and its length is greater than or equal to 32 characters, the API will respond with a 400 Bad Request status and a JSON object containing the message: "Invalid custom alias. Must be less than 32 characters."

   3. URL Validation: The longURL and, if provided, the customAlias are validated using the valid-url library to ensure they are valid URLs. If validation fails, the API will respond with a 400 Bad Request status and a JSON object containing the message: "Invalid URL or custom alias."

   4. Existing URL Check: Before creating a new short URL, the system checks if a short URL with the same longURL already exists. If it does, the API responds with the existing short URL information.
