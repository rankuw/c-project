const fs = require("fs");
const user = require('./user'); //return an object of json which we'll manipulate and write back.
const express = require('express');

const app = express();
app.use(express.json());
// console.log(user.users[0].userName)


app.post('/', (req, res) => {
    let flag = 0;
    const promise = new Promise((resolve, reject) => {
        for(let i = 0; i < user.length; i++){
            if(user[i].userId === req.body.userId){
                flag = 1;
                break;
            }
        }
        if(flag) reject("Entry already present");
        else{
            user.push(req.body);
            fs.writeFile('user.json', JSON.stringify(user), err => {
                console.log(err);
            });
            resolve("Entry added with id " + req.body.userId);
        }
    });
    async function main(){
        try{
            let result = await promise;
            res.send(result);
        }catch(err){
            console.log(err)
            res.send(err);
        }
    }
    main();
})

app.get("/", (req, res) => {
    try{
        res.send(user);
    }catch(err){
        console.log(err);
        res.send("Could not fetch data");
    }
})

app.get("/:id", (req, res) => {
    let id = +req.params.id;
    const promise = new Promise((resolve, reject) => {
        user.forEach(element => {
            if(element.userId === id){
                resolve(element);
            }
        });
        reject("No such entry found");
    })

    async function main(){
        try{
            const ans = await promise;
            res.send(ans);
        }catch(err){
            console.log(err);
            res.send("User not found");
        }
    }
    main();
})

app.put("/", (req, res) => {
    const id = req.body.userId;
    const promise = new Promise((resolve, reject) => {
        let index = -1;
        for(let indx = 0; indx < user.length; indx++){
            if(id === user[indx].userId){
                index = indx;
                break;
            }
        }
        if(index === -1){
            console.log(req.body.id)
            reject("Data not found");
        }
        else{
            user[index] = req.body;
            console.log(user[index], index)
            fs.writeFile('user.json', JSON.stringify(user), err => {
                reject("Could not update the value");
            })
            resolve(`User with id: ${id} succesfully updated`);
        }

    });

    async function main(){
        try{
            const status = await promise;
            
            res.send(status);
        }catch(err){
            console.log(err);
            res.send(err);
        }
    }

    main();
});

app.patch("/", (req, res) => {
    let id = req.body.userId, index = -1;
    if(id === undefined)res.send("Enter a userId")
    else{
        const userKeys = Object.keys(req.body);
        for(let i = 0; i < user.length; i++){
            if(user[i].userId === id){
                index = i;
                break;
            }
        }
        if(index === -1){
            res.send(`No user with Id ${id} found`);
        }
        for(let key of userKeys){
            user[index][key] = req.body[key];
        }
        fs.writeFile('user.json', JSON.stringify(user), err => {
            if(err){
                console.log("Error occured");
                res.send("Error occured");
            }
            else{
                res.send(`user with id ${id} updated`);
            }
            
        });

    }
});

app.delete("/", (req, res) => {
    let id = req.body.userId, index = -1;
    const promise = new Promise((resolve, reject) => {
        for(let indx = 0; indx < user.length; indx++){
            console.log(user[indx].userId, id);
            if(id === user[indx].userId){
                index = indx;
                break;
            }
        }
        if(index === -1){
            console.log(id);
            reject("Data not found");
        }
        else{
            console.log(id, "else");
            let data = user.splice(index, 1);
            fs.writeFile('user.json', JSON.stringify(user), err => {
                console.log(err);
                reject("Error occured");
            })
            resolve(data);
        }
    })

    async function main(){
        try{
            const data = await promise;
            res.send(JSON.stringify(data));
        }catch(err){
            console.log(err);
            res.send("No user with id: " + id + "deleted");
        }
    }
    main();
    
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
})

// const data = {
//     userId: 4,
//     userName: "adf",
//     email: "helo"
// };





