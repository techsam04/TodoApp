// const pgp = require('pg')();

// const connectionString = 'postgres://postgres:Hudwsqoi#90@localhost:5432/TaskManagement';

// const db = pgp(connectionString);
// console.log(db.query('SELECT* from TaskManagement'));


const { Pool } =  require('pg');
const pool = new Pool({
    user: 'postgres',
    host:'localhost',
    database: 'TaskManagement',
    password: 'Hudwsqoi#90',
    port: 5432
});


module.exports = pool;



