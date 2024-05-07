# Virtual TA

Author: 
Ruiyang Liu
Chengwei Zhou

This repository contains the code for both the frontend and backend of our system. Below is the detailed information on each component and setup instructions.

## Structure

- `login_frontend`: Contains all the frontend code of the project.
- `login_backend`: Contains the backend code for the login functionality only.

Note: the backend for chatbot is https://github.com/marioUSC/academyChatBot. We only used its API, didn't change or directly use any code of it. And you can find how to run each program in their readme. 

## `login_frontend`

This directory houses the frontend code of the project. It includes all user interface components that interact with the backend to facilitate user login.


## `login_backend`

The backend for the login functionality is located in this directory. It interacts with AWS RDS to store and manage user login data.

### Prerequisites

- AWS credentials are required to access AWS RDS. These are sensitive and should be securely stored.
- The backend is designed to operate within a specific environment and may not function correctly outside of our pre-configured settings due to dependency on AWS services.


### Note
While the login functionality may not run as expected outside our designated environment due to the reliance on specific AWS services, this does not impact the use of other functionalities within the project.
