# Haiku Dada API

### [Haiku Dada API: Live Site](https://intense-ridge-06549.herokuapp.com/)

##### Summary

          Haiku Dada is a platform where users can auto-generate new haikus by
          using a madlibs-style form. Users can also view all previously created
          haikus. Finally, users can view a randomly generated haiku - based on
          the inputs of previous users.

## Haiku Dada API in a local development environment

### Installation

* Clone this repository:
  * `git clone https://github.com/devlewis/haiku-shift-api`
* Install dependencies 

### Run Program

* Create local database and user 
* Run `npm run migrate`
* Make requests using the root: `localhost:8000` or your specified port

### Test

* Run `npm test`



## API Overview

### /api

* The /api endpoint is for getting all haikus and posting newly generating ones. 

#### GET /api/

* Successful response (200) will return the haiku collection
* If haiku collection is empty, will return response 200 and an empty array in the response body. 

#### POST /api/

* adds a new haiku to the haiku collection.
* Valid requests must provide an array 'haiku' in the request body
* Successful request will return 

##### Live App Screenshots

![](src/images/Screen%20Shot%202020-04-25%20at%204.57.52%20PM.png) 
----------
![](src/images/Screen%20Shot%202020-04-25%20at%204.59.01%20PM.png) 
----------
![](src/images/Screen%20Shot%202020-04-25%20at%204.59.35%20PM.png) 
----------
![](src/images/Screen%20Shot%202020-04-25%20at%205.03.59%20PM.png)

## Technology

* [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/)
  * Mocha test framework and Chai assertion library, Supertest 
  * Morgan, helmet 
* PSQL
* [Heroku](https://www.heroku.com/) Cloud Application Platform

#####  
