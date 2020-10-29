/* B"H

*/
const mysql = require('./mysql');

const data = [{ name: 'Moshe', age: 43}, { name: 'Biden', age: 78 }]

async function getAll(){
    //throw { status: 501, message: "This is a fake error" }
    //await Promise.resolve()
    console.log("Called Get All")
    return await mysql.query(`SELECT * FROM Users`);
}

async function getTypes(){
    return await mysql.query(`SELECT id, Name FROM Types WHERE Type_id = 2`);
}

async function add(name, age){
    data.push({name, age});
}


module.exports = { getAll, add, getTypes, search: async q => data.filter(x=> x.name == q) }