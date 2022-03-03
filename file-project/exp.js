const obj = {
    'a': 10,
    'b': 20
};

for(let i of Object.keys(obj)){
    console.log(i)
}

let arr = Object.keys(obj);
console.log(typeof(arr[0]));

for(let i in arr){
    console.log(i, typeof(i))
}



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