# simple-nodejs-console-app

This project is a console application to interact with a SQLite database. Currently there is only one table in the DB named Contacts, however new tables can be created after having installed the project. 

This project is not focused on a solid architecture or software design, but only in the functionality of a basic console interface that interacts with the SQLite database through Sequelize. 

The unique goal is to illustrate the basic CRUD operations of the promise-based Node.js ORM Sequelize. The interface logic is coded in a monolith located in index.js on the root directory.

To see this project working:

* Clone the project.

* On the console go to the root directory and install its dependencies: "npm install".

* Start interacting with the database upon sending CRUD commands like in the following examples:

CREATE: "node . --create:Contact --firstname=Andres --lastname=Vera-Pineda --phone=1234567890 --email=andres@email.com"

READ:   "node . --read:Contact __id=3" (Retrieves only one row from the Contacts table. The arguments starting with __ set the where clause.)

READ:   "node . --read:Contact "       (Retrieves all rows in the Contacts table)

UPDATE: "node . --update:Contact --phone=1112223330 --email=nuevo@email.com __id=3" (At least one argument starting with __ is mandatory as it sets the where clause.)

DELETE: "node . --delete:Contact __id=3" (At least one argument starting with __ is mandatory as it sets the where clause.)
