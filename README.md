# msm-web Application

<code>Currently under construction for additional features</code>

# Description

Full-stack ecommerce application built with MERN stack. This project has two features:

1. Buyers register and browse the marketplace while interacting with products across different categories.
2. Admins control and manage the marketplace items and customer acounts.

# Getting Started

## Dependencies

- Nodejs - The runtime environment of the application
- Reactjs - Component based UI library
- MongoDB - NoSQL database
- Expressjs - Framework to handle routes and requests
- Mongoose - MongoDB object modeling tool to model the database schema

## Installation

After you cloned the repository do not start the application. To run the application fully you need to create a database and collection and provide your own database URI.

### Setup

- Create a .env file in the server folder and type the following

```
  HOST=127.0.0.1
  PORT=8000
  NODE_ENV=development

  USERNAME =// Your username
  PASSWORD =// Your password

  JWT_SECRET=// Your jwt secret key
  JWT_EXPIRES_IN=1d
  JWT_COOKIE_EXP_IN=1

  EMAIL_USERNAME=// mailtrap userID
  EMAIL_PASSWORD=// mailtrap password
  EMAIL_HOST=// mailtrap email host
  EMAIL_PORT=// email port

  DATABASE=// database connection uri
  DATABASE_USERNAME=// database username
  DATABASE_PASSWORD=// database password
```

### Running

After this you can run the project locally:

- To run the front end
  - <code>cd client</code>
  - <code>npm start</code>
- To run the back end

  - <code>cd server</code>
  - <code>npm run dev</code>
    TIP: Run both in split terminal so that you can see both ends running

- To run both concuretly
  - <code> cd server </code>
  - <code>npm run start:dev </code>

# Languages and tools

- [Node](https://nodejs.org)
- [React](https://reactjs.org/)
- [Expressjs](https://expressjs.com)
- [Mongoose](https://mongoosejs.com)
- [Material UI](https://mui.com/)
