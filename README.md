[DEMO-LINK](https://authapp-gt7u.onrender.com/)

## Technologies used
- Node.js
- Nest.js
- Passport
- TypeScript
- PostgreSQL
- Sequelize
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)

## API Description
Server: render.com (needs ~1 minute to wake up if have no action in the last 30 minutes) <br>
Base URL = https://authapp-gt7u.onrender.com/

### **ADMIN USER**
**username**: denyskleimenov <br>
**password**: test1234nest

To log in, enter username and password, copy the received token, and paste it in Authorization as Bearer token in Postman or any other API testing tool.
![image](https://user-images.githubusercontent.com/110383794/218401974-c05d400d-44a0-455a-8b72-d3dc5de9e9fb.png)

### /auth
Method | URL | Description | Request Body | Required Role
--- | --- | --- | --- | ---
POST | /signup | Register a new user | + | Admin
POST | /login | Login | + | Default - Admin

### /users

Method | URL | Description | Request Body | Required Role
--- | --- | --- | --- | ---
GET | / | Get all users | - | Admin
GET | /id | Get a user by id | - | -
DELETE | /id | Delete a user | - | Admin

### /posts

Method | URL | Description | Request Body | Required Role
--- | --- | --- | --- | ---
POST | / | Create a new post | + | Default - Admin
GET | / | Get all posts | - | -
GET | /id | Get a post by id | - | -
PATCH | /id | Change status of post | + | Manager
DELETE | /id | Delete a post | - | Manager-Admin

### /comments

Method | URL | Description | Request Body | Required Role
--- | --- | --- | --- | ---
GET | / | Get all comments | - | -
GET | /id | Get a comment by id | - | -
PATCH | /id | Change the text of a comment | + | Default-Admin
DELETE | /id | Delete a comment | - | Manager-Admin

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

