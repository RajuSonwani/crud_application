// connection to database rAju
const mysql =require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "root123",
    database: "rAju"
});
connection.connect(err=>{
    if(err)throw err;
    console.log('connected..!')
})


module.exports = connection;