const method = (req, res) => {
    let string = req.body.s, stringArr = req.body.sarr;

    stringArr.sort((a, b) => {
        let lenA = a.length, lenB = b.lenght
        const order = (len) => {
            for(let i = 0; i < len; i++){
                let first = string.indexOf(a[i]); 
                let second = string.indexOf(b[i]);
                if(first == -1){
                    if(second == -1){
                        continue;
                    }
                    else return 1;
                }
                else if(second == -1){
                    return -1;
                }

                else if(first == second){
                    continue;
                }
                
                else if(first > second) return 1;
                else return -1;
            }
            return lenA - lenB
        }
        if(lenA >= lenB){
            return order(lenB)
        }
        else{
            return order(lenA)
        }
        
    })
    
    res.send({"ans" : stringArr})
    
}
module.exports = method

