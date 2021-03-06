# library-guest-passes

### Library guest passes microservice

A form to be used by staff for checking in students and guests to the library (i.e. a student forgot their ID). Once the guest is approved, the app will print out a pass for them. It also features an Admin mode where staff can edit a guest's information, view all of their past visits, and delete them if necessary.


<img width="500" alt="Preview of guest passes application, purple header with NYU logo and a form is visible" src="https://user-images.githubusercontent.com/49990405/144086507-5697c054-d92f-486a-b922-3e6213393d96.png">

### Develop

To develop the client side locally, run
`yarn start`

It will update itself whilst developing, just save the file.

### Docker

You can also run it in a docker container
`docker-compose up dev`

### Sequelize & Database management

This database is managed through the Sequelize CLI, which affects the MySQL database instance on Docker.

For running the Sequelize commands:

1. Bring up entire project
   `docker-compose up`
2. Go into the shell of the 'backend' container
   `docker-compose exec backend sh`
3. Run any of the [Sequelize CLI](https://github.com/sequelize/cli) commands in it.

Similarly, to see the changes reflected in the 'db' container:

1. Run the entire project
   `docker-compose up`
2. Go into the shell of the 'db' container
   `docker-compose exec db sh`
3. Run `mysql -u root -p` to go into the MySQL interface, it will prompt the databases' password.
4. Query with MySQL commands
