/*  B"H

*/

const Knex = require("knex");

module.exports = Knex({ 
    client: "mysql", 
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        pool: {
            max: 10
        }
    },
});