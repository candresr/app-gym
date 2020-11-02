# AppGym

#Practical Test

## Overview: User Manager 
Depenencies Application:

- Angular CLI: 10.1.1
- npm 6.13.4^
- node 12.16.1^
- docker 19.03.13^

### Install
- Clone the project ()
- Find 3 directories front, apirest & database
####Compile and deploy apirest
- cd apirest/
- npm i
- npm start*

*For connect database, you must change credentials in the file apirest/config.js and run command npm start (create automatic database).

#### Create Docker container apirest:
- sudo docker build -t apirest:v1 .
- sudo docker build run -d -p 4000:4000 apirest:v1
- 
####Compile and deploy front
- cd front/
- npm i
- npm start

#### Create Docker container front:
- run command ng build
- sudo docker build -t front:v1 .
- sudo docker build run -d -p 80:80 front:v1

### Run website in your local
- [localhost](http://localhost:4000/)
- Register your user (role Admin)
- Start create cities and campuses

# Happy Coding! 
Author: __Cesar Ramirez__ - *candresramirez@gmail.com*
