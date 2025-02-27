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
 
This project is a secure authentication and file management system built with **NestJS** as the backend framework and **PostgreSQL** as the database. The system provides role-based authentication for both **admin** and **user** accounts. Users can **sign up, log in, and upload files**, while admins have the authority to manage users and uploaded files.

## Features
- **User & Admin Login**: Secure authentication using JWT and role-based access control.
- **Signup & Validation**: User registration with email/password authentication and validation checks.
- **Session Management**: Token-based authentication for secure access.
- **User File Upload**: Users can upload files securely.
- **Admin Controls**: Admin can view, delete, or manage uploaded files.
- **Database (PostgreSQL)**: Stores user credentials, uploaded file metadata, and access permissions.

## Tech Stack
- **Backend**: NestJS (TypeScript, JWT authentication, file handling with Multer)
- **Database**: PostgreSQL
- **ORM**: TypeORM/Prisma
- **Validation**: Class-validator for request validation
- **File Storage**: Local storage or cloud services (AWS S3, Supabase Storage, etc.)

## Use Cases
1. A user signs up and logs in to access their dashboard.
2. The user uploads a file, which is stored securely in the system.
3. Admins can view and manage all uploaded files and user details.
4. Users can download or delete their own files.
5. Security features like JWT authentication and role-based permissions ensure data privacy and access control.

## Setup
1. Clone the repository:
   \`\`\`
   git clone <repository-url>
   \`\`\`
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

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
## API Endpoints  

### **1. User Registration**  
#### **Endpoint:**  
```http
POST /createUser
```
Request Body :
```bash
{
  "fullName": "John Doe",
  "username": "johndoe",
  "password": "securePassword123",
  "phoneNumber": "+1234567890",
  "email": "johndoe@example.com"
}
```
Response :
```bash

```

### **2. User Login**  
#### **Endpoint:**  
```http
POST /login
```
Request Body :
```bash
{
  "username": "johndoe",
  "password": "securePassword123"
}
```
**Response (If success):** 
```bash
login successful
```
**Response (If given wrong username/password):**
``` bash
Invalid username or password
```

### **3. Upload File**  
#### **Endpoint:**  
```http
POST /files/upload
```  
- **Request Type:** `multipart/form-data`  
- **Body:**  
  - `file` (binary)  

**Example Request (cURL):**  
``` bash
curl -X POST http://localhost:3000/files/upload -F "file=@/path/to/file.pdf"  
```

**Response:**  
 ``` bash
{
  "message": "File uploaded successfully",
  "status": "success"
}
```

---

### **4. Get Upload Status**  
#### **Endpoint:**  
```http
GET /files/status?filename=<filename>
```
- **Request Type:** `Query Parameter`  
- **Example Request:**  

``` bash
curl -X GET "http://localhost:3000/files/status?filename=document.pdf"
```

**Response (If file exists):**  
``` bash  
{
  "filename": "document.pdf",
  "status": "success"
}
```

**Response (If file not found):**  
``` bash  
{
  "filename": "document.pdf",
  "status": "failed"
}
```


## createUser Function

### Function Name: `createUser`  
**Method:** POST  

#### Description  
The `createUser` function is an asynchronous method responsible for creating and saving a new user in the database using a repository pattern. It accepts a `CreateUserDto` object, which contains user-related data, and performs the following operations:

1. **Creating a User Entity:**  
   - It utilizes the `create` method of `userRepository` to instantiate a new user entity.  

2. **Saving the User to the Database:**  
   - The newly created user entity is then passed to the `save` method of `userRepository`.  
   - The `save` method persists the entity into the database and returns the saved entity.  

3. **Error Handling:**  
   - The function is wrapped in a `try-catch` block to handle any potential errors that may arise during the creation or saving process.  
   - If an error occurs (such as a database constraint violation or a connection issue), it is logged to the console.  
   - The error is then thrown to be handled by the calling function or the global error-handling mechanism.  

#### Parameters  
- **`createUserDto: CreateUserDto`** – An object that contains the necessary user details for creating a new user record in the database.  
  - This DTO (Data Transfer Object) is typically used to ensure that only the required and validated data is passed to the repository.  

##### Example Request Object:
```json
{
  "id": "string",
  "fullName": "string",
  "userName": "string",
  "password": "string",
  "email": "string",
  "phone": "string",
  "age": "number",
  "createdAt": "Date"
}
```

#### Returns  
- Returns the newly created and saved user entity.  

#### Possible Exceptions  
- **Database Constraint Violations:**  
  - If there are unique constraints (e.g., email, username) and a duplicate entry is attempted, an error is thrown.  
- **Validation Errors:**  
  - If `createUserDto` contains invalid or incomplete data, the database or validation layer might reject it.  
- **Database Connection Issues:**  
  - If the database connection is lost or unavailable, the function will throw an error.  


### Function Name: `validateUser`  
**Description:**  
The `validateUser` function is an asynchronous method responsible for verifying a user's credentials during the login process. It ensures that the provided username exists in the database and that the entered password matches the stored hashed password. If both checks pass, the function returns the authenticated user; otherwise, it throws appropriate exceptions.

#### Function Workflow:
1. **Retrieve the User by Username:**  
   - Calls `getUserByUsername(username)` to fetch the user record from the database.  
   - If no user is found, an exception is thrown (`NotFoundException`).  

2. **Validate the Password:**  
   - Uses `bcrypt.compare(password, user.password)` to compare the provided password with the hashed password stored in the database.  
   - If the password does not match, an exception is thrown (`UnauthorizedException`).  

3. **Return the Authenticated User:**  
   - If both username and password are valid, the user object is returned.  

#### Parameters:  
- `username: string` – The username provided by the user during login.  
- `password: string` – The plaintext password entered by the user.  

#### Returns:  
- A `Promise<User>` containing the authenticated user object if validation is successful.  

#### Exceptions & Error Handling:  
- **`NotFoundException('User not found')`** – Thrown if the username does not exist in the database.  
- **`UnauthorizedException('Invalid password')`** – Thrown if the provided password does not match the stored hashed password. 


### Function Name: `login` 

**Method:** POST  

#### Description:  
The `login` function is an asynchronous method responsible for authenticating a user and generating a JSON Web Token (JWT) upon successful login. It first validates the user's credentials using the `validateUser` function and, if successful, creates and returns an access token for authentication in subsequent requests.  

#### Function Workflow:  
1. **Validate User Credentials:**  
   - Calls the `validateUser(username, password)` function to check if the provided username and password are correct.  
   - If the user does not exist or the password is incorrect, an `UnauthorizedException` is thrown.  

2. **Generate JWT Token:**  
   - Constructs a `payload` object containing:  
     - `username`: The authenticated user's username.  
     - `sub`: The unique user ID (`user.id`), commonly used as the subject (`sub`) claim in JWT.  
   - Uses `this.jwtService.sign(payload)` to generate a JWT access token.  

3. **Return Login Response:**  
   - Returns an object containing:  
     - A success message (`"Login successful"`).  
     - The generated JWT access token (`access_token`).  

#### Parameters:  
- `username: string` – The username provided by the user for login.  
- `password: string` – The plaintext password entered by the user.  

##### Example Request Object:
```json
{
  "userName": "string",
  "password": "string"
}
```

#### Returns:  
- `message`: A success message indicating successful login.  
- `access_token`: The generated JWT token used for authenticated API requests.  

This function ensures secure user authentication and token-based access control, making it a critical part of an authentication system.

### Function Name: `getUser`

**Method:** POST  

**Description:**  
Retrieves a user record from the database based on the provided unique user ID. Throws a `NotFoundException` if no user is found.

#### Workflow:
1. Queries the database for the given user ID.
2. Returns the user object if found.
3. Throws `NotFoundException` if no user exists.

#### Parameters:
- `id: string` – Unique identifier of the user.

#### Returns:
- A `Promise<User>` containing the user object if found.
- Throws a `NotFoundException` if no user exists.


### Function Name:`updateUser`

**Method:** POST

**Description:**  
Updates an existing user's details using the provided user ID and update data.

#### Workflow:
1. Retrieves the user using `getUser(id)`.
2. Merges new data into the existing user object.
3. Saves the updated user in the database.

#### Parameters:
- `id: string` – Unique identifier of the user.
- `updateUserDto: UpdateUserDto` – Object containing fields to update.

#### Returns:
- A `Promise<User>` containing the updated user object.
- Throws a `NotFoundException` if no user exists.

### Function Name: `deleteUser`

**Method:** POST

**Description:**  
Deletes a user record from the database based on the provided user ID.

#### Workflow:
1. Retrieves the user using `getUser(id)`.
2. Deletes the user from the database.

#### Parameters:
- `id: string` – Unique identifier of the user.

#### Returns:
- A `Promise<void>` after successful deletion.
- Throws a `NotFoundException` if no user exists.

### Function Name:  `uploadFile`

**Method:** POST

**Description:** 

The `uploadFile` function is an asynchronous method responsible for storing file upload records in the database. It takes a filename as input, creates a new file record with an upload status, and saves it using the `uploadFileRepository`. If the operation is successful, it returns a success message and status. In case of an error, it returns a failure message and status without throwing an exception.  

### **Function Workflow:**  
1. **Create a File Record:**  
   - Calls `this.uploadFileRepository.create({ filename, uploadStatus: UploadStatus.SUCCESS })` to create a new file record.  
   - Sets the `uploadStatus` to `UploadStatus.SUCCESS` initially.  

2. **Save the File Record in the Database:**  
   - Calls `this.uploadFileRepository.save(fileRecord)` to persist the record.  

3. **Return the Upload Status:**  
   - If the file record is successfully stored, it returns `{ message: 'File uploaded successfully', status: UploadStatus.SUCCESS }`.  
   - If an error occurs during the process, it catches the exception and returns `{ message: 'File upload failed', status: UploadStatus.FAILED }`.  

---

### **Parameters:**  
- `filename: string` – The name of the uploaded file to be recorded in the database.  
  
**Request Format:**  
```json
{
  "filename": "string",
  "uploadedAt": "Date",
  "uploadStatus": "string"
}
```

---

### **Returns:**  
- A `Promise<{ message: string; status: UploadStatus }>` containing:  
  - `message: string` – A success or failure message.  
  - `status: UploadStatus` – Enum indicating whether the upload was successful or failed.  

---

This function plays a key role in file management by maintaining a record of uploaded files.  
