const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json())
let connection = mysql.createConnection({
    host: "localhost",
    user: "admin1",
    password: "ranvijay",
    database: "user"
});

connection.connect(err => {
    if(err) console.log(err.stack);
    else{
        console.log("Connected");
    }
});

app.get("/:id", (req, res) => {
    let id = +req.params.id;
    connection.query({
        sql: 'SELECT firstName, lastName, age FROM user_info WHERE id = ?',
        values: [id]
    }, (err, result, field) => {
        console.log(id);
        if(err){
            console.log(err);
            res.end();
        }else{
            let obj = result[0];
                    res.write("User First Name: " + obj.firstname);
                    res.write("\nLast Name: " + obj.lastName);
                    res.write("\nAge is: " + obj.age);
                    res.end();
        }
    })
})

app.get("/", (req, res) => {
    connection.query('SELECT firstName, lastName, age, name from user join user_info', (err, result, field) => {
        if(err){
            console.log(err);
        }else{
            for(let data of result){
                res.write(`username is ${data.name}  name is ${data.firstname} ${data.lastName} and age is ${data.age}`);
            }
            res.end();
        }
    })
})


app.post('/sign-up', (req, res) => { //{"name": "newdestt", "password": "wewasdfw", "fName": "asdfasf", "lName": "asdfsdfsdfsdf", "age": 15}
    let {name, password, fName, lName, age} = req.body;
    connection.query({
        sql: 'SELECT id from user WHERE name = ?',
        values: [name]
    }, (err, result, field) => {
        if(err){
            console.log(err);
            res.end();
        }else{
            if(result.length > 0){
                res.send("User exists");
            }else{
                connection.query({
                    sql: 'insert into user value(NULL, ?, ?)',
                    values: [ name, password]
                }, (err, result, field) => {
                    if(err){
                        console.log(err);
                        res.end();
                    }
                    else{
                        let id = result['insertId'];
                        connection.query({
                            sql: 'insert into user_info value(?, ?, ?, ?)',
                            values: [id,fName, lName, age]
                        }, (err, result, field) => {
                            if(err){
                                console.log(err);
                                res.send();
                            }else{
                                res.send("Added with id"+ id) ;
                            }
                        })
                    }
                });
            }
        }
    })
    
    
})


app.post("/sign-in", (req, res) => {
    const {name, password} = req.body;
    connection.query({
        sql: 'SELECT * FROM user WHERE name = ? and password = ?',
        values: [name, password]
    }, (err, data, field) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            if(data.length === 0){
                res.send("User Name or password is wrong..");
                res.end();
            }
            else{
                connection.query({
                    sql: 'SELECT * FROM user_info WHERE id = ?',
                    values: [data[0].id]
                }, (err, result, field) => {
                    if(err){
                        console.log(err);
                        res.end();
                    }else{
                        let obj = result[0];
                        res.write("User First Name: " + obj.firstname);
                        res.write("\nLast Name: " + obj.lastName);
                        res.write("\nAge is: " + obj.age);
                        res.end();
                    }
                })
            }
        }
    })
})

app.delete("/", (req, res) => {
    const {name} = req.body;
    connection.query({
        sql: 'DELETE FROM user where name = ?',
        values: [name]
    },(err, result, field) => {
        if(err){
            console.log(err);
            res.end();
        }else{
            console.log(result);
            if(result['affectedRows'] > 0){
                res.send("User with user name " + name + " deleted");
            }
            else{
                res.send("No user with userName " + name);
            }
        }
    })
})

app.put("/", (req, res) => {
    const {name, password} = req.body();
    connection.query({
        sql: 'SELECT id FROM user where name ='
    })
})

app.listen(4000);