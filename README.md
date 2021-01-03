# AppGym

# Practical Test

## Overview: User Manager 
Dependencies Application:

- Angular CLI: 10.1.1
- npm 6.13.4^
- node 12.16.1^
- docker 19.03.13^
- MariaDB 10.3.23^

### Install
- Clone the project (https://github.com/candresr/app-gym)
- Find 2 directories front & apirest

#### Compile and deploy apirest
- cd apirest/
- npm i
- npm start

For connect  your database, you must change credentials in the file apirest/config.js and run command __npm start__ (create automatic database).

#### Create Docker container apirest:
- sudo docker build -t apirest:v1 .
- sudo docker run -d -p 4000:4000 apirest:v1

#### Compile and deploy front
- cd front/
- npm i
- npm start

#### Create Docker container front:
- run command ng build
- sudo docker build -t front:v1 .
- sudo docker run -d -p 80:80 front:v1

### Run website in your local
- [localhost](http://localhost:4000/)
- Register your user (role Admin)
- Start create cities and campuses

# Happy Coding! 
Author: __Cesar Ramirez__ - *candresramirez@gmail.com*
