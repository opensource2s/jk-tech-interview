<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<!-- <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)--> 

## Description
```bash
This project is a secure authentication and file management system built with NestJS as the backend framework and PostgreSQL as the database. The system provides role-based authentication for both admin and user accounts. Users can sign up, log in, and upload files, while admins have the authority to manage users and uploaded files.

# Features
Authentication & Authorization
User & Admin Login: Secure authentication using JWT and role-based access control.
Signup & Validation: User registration with email/password authentication and validation checks.
Session Management: Token-based authentication for secure access.
File Upload & Management
User File Upload: Users can upload files securely.
Storage Management: Uploaded files are stored and linked to user accounts.
Admin Controls: Admin can view, delete, or manage uploaded files.
Database (PostgreSQL)
Stores user credentials, uploaded file metadata, and role-based access permissions.
Ensures data consistency, security, and scalability.
# Tech Stack
Backend: NestJS (TypeScript, JWT authentication, file handling with Multer)
Database: PostgreSQL
ORM: TypeORM/Prisma
Validation: Class-validator for request validation
File Storage: Local storage or integration with cloud services (AWS S3, Supabase Storage, etc.)
# Use Cases
A user signs up and logs in to access their dashboard.
The user uploads a file, which is stored securely in the system.
Admins can view and manage all uploaded files and user details.
Users can download or delete their own files.
Security features like JWT authentication and role-based permissions ensure data privacy and access control.

```
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# build
$ npm run build

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

```

## Deployment


## Resources

