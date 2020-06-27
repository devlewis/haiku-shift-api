# Haiku Dada API

### [Haiku Dada API: Live Site](https://haiku-shift-client.now.sh/)

##### Summary

Haiku Dada is a platform where users can auto-generate new haikus by
using a madlibs-style form. Users can also view all previously created
haikus. Finally, users can view a randomly generated haiku - based on
the inputs of previous users.

## Haiku Dada API in a local development environment

### Installation

- Clone this repository:
  - `git clone https://github.com/devlewis/haiku-shift-api`
- Install dependencies

### Run Program

- Create local database and user, local test database and user
- Run `npm run migrate`
- Make requests using the root: `localhost:8000` or your specified port

### Test

- Run `npm test`

## API Overview

#### GET /api/

- Successful response (200) will return the haiku collection
- If haiku collection is empty, will return response 200 and an empty array in the response body.
- Failed response will return 500 and error message

#### POST /api/

- adds a new haiku to the haiku collection.
- Valid requests must provide an array 'haiku' in the request body.
  - syntax: `{haiku: [line1(string, line2(string), line3(string), penname(string, may be empty)]}`
- Invalid requests will return "error": "Bad request body; try again"
- Successful request will return 201 and newly created haiku's id.

#### GET /api/penname/:penname

- Parameter :penname returns any haikus with penname signature.
- Invalid requests will return 400, "error": "No haikus found with that penname. Please try again"
- Successful request will return 200 and relevant haikus.

##### Live App Screenshots

## ![](src/images/Screen%20Shot%202020-05-17%20at%209.13.40%20PM.png)

## ![](src/images/Screen%20Shot%202020-05-17%20at%209.14.18%20PM.png)

## ![](src/images/Screen%20Shot%202020-05-17%20at%209.14.41%20PM.png)

## ![](src/images/Screen%20Shot%202020-05-17%20at%209.14.53%20PM.png)

## Technology

- [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/)
  - Mocha test framework and Chai assertion library, Supertest
  - Morgan, helmet
- PSQL
- [Heroku](https://www.heroku.com/) Cloud Application Platform

#####
