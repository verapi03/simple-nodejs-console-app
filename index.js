/* The console app will receive the following input examples:
 CREATE: node . --create:Contact --firstname=Andres --lastname=Vera-Pineda --phone=1234567890 --email=andres@email.com
 READ:   node . --read:Contact __id=3 (Retrieves only one register. The arguments starting with __ set the where clause)
 READ:   node . --read:Contact        (Retrieves all registers in the DB)
 UPDATE: node . --update:Contact --phone=1112223330 --email=nuevo@email.com __id=1 (At least one argument starting with __ is mandatory as it sets the where clause). 
 DELETE: node . --delete:Contact __id=3 (At least one argument starting with __ is mandatory as it sets the where clause). 
 */

const {CRUD} = require("./helper");
const db = require("./models");
const params = process.argv;

if (params.length <= 2) {
    process.exit(0);
}

const commandEntity = params.slice(2, 3);
const args = params.slice(3);

// Determine the CRUD operation:
const command = commandEntity[0].split(":")[0].slice(2);
const entity = commandEntity[0].split(":")[1];

// Turn arguments input into an objectwith two elements: data & whereClause. Data 
// contains the data to be written in the DB and whereClause is self-explanatory.
function argsSetup(args) {
    const result = {
        data:{},
        whereClause:{}
    };
    args.forEach(element => {
        const arrElem = element.split("=");
        if (arrElem[0].startsWith("--")) { 
            result.data[arrElem[0].slice(2)] = arrElem[1]; 
        } else if (arrElem[0].startsWith("__")) { 
            result.whereClause[arrElem[0].slice(2)] = arrElem[1]; 
        }  
    });
    return result;
}

let where = {};

switch (command) {
    case CRUD.CREATE:
        arguments = argsSetup(args);
        db[entity]
            .create(arguments.data)
            .then(_ => {console.log("User created!")})
            .catch(console.log);
        break;
    case CRUD.READ:
        arguments = argsSetup(args);
        
        if (Object.keys(arguments.whereClause).length != 0) {
            where.where = arguments.whereClause;
        }
        db[entity]
            .findAll(where)
            .then(console.log)
            .catch(console.log);
        break;
    case CRUD.UPDATE:
        arguments = argsSetup(args);
        if (Object.keys(arguments.whereClause).length != 0) {
            where.where = arguments.whereClause;
        }
        db[entity]
            .update(arguments.data, where)
            .then(_ => {console.log("User updated!")})
            .catch(console.log);
        break;
    case CRUD.DELETE:
        arguments = argsSetup(args);
        if (Object.keys(arguments.whereClause).length != 0) {
            where.where = arguments.whereClause;
            db[entity]
            .destroy(where)
            .then(_ => {console.log("User deleted!")})
            .catch(console.log);
        } else {
            console.log("Enter a valid argument, e.g. __id=3");
        }
        break;
    default:
        console.log("Operation not recognized!");
        break;
}