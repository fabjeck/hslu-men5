# react-rest-mysql-gallery #

First steps with React, RESTful and MySQL...

## Usage ##

### Frontend ###

```bash
# Start React app (localhost:3000)
npm start
```

### Backend ###

```bash
# Start API-Server (localhost:8080)
npm start
```

### .ENV-Variables ###

Create .env file to save your credentials and environment variables.

```shell
API_PORT=<api-port>

DB_HOST=<db-host>
DB_USER=<db-user>
DB_PASSWORD=<db-password>
DB_PORT=<db-port>
DB_NAME=<db-name>

JWT_SECRET=<jwt-secret>
JWT_EXPIRY=<jwt-expiry>
JWT_REFRESH_SECRET=<jwt-refresh-secret>
JWT_REFRESH_EXPIRY=<jwt-refresh-expiry>
```

## User Interface ##

## Frontend Architecture ##

### Tech Stack ###

[`React`](https://reactjs.org/) - Javascript Library

[`React Router`](https://reactrouter.com/) - React Routing Library

[`axios`](https://github.com/axios/axios) - Promise based HTTP client

[`validator.js`](https://github.com/validatorjs/validator.js) - Library for input validation and sanitization

[`Sass`](https://sass-lang.com/) - CSS extension language

## Backend  Architecture ##

### Tech Stack ###

[`Express`](https://expressjs.com/) - Node.js web framework

[`express-validator`](https://github.com/express-validator/express-validator) - Set of express.js middlewares wrapping validator.js functions

[`bcrypt`](https://github.com/kelektiv/node.bcrypt.js#readme) - Password hashing library

[`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken#readme) - JWT implementation for Node.js

[`promise-mysql`](https://github.com/CodeFoodPixels/node-promise-mysql#readme) - Promisified Node.js driver for mysql

[`multer`](https://github.com/expressjs/multer) - express.js middleware handling multipart/form-data

[`sharp`](https://github.com/lovell/sharp) - Node.js image converter module

### Swagger Documentation ###

Look up the API documentation on SwaggerHub:
[Swagger API documentation](https://app.swaggerhub.com/apis/fabjeck/restful-gallery/1.0.0)

### Entity Relationship Diagram (ERD) ###

![ERD](assets/ERD.png)

## Authentification ##

![Flowchart](assets/Flowchart.png)

## Documentation ##
