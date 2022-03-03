

let with0 = (req, res) =>{
    let n = req.body.n;
    console.log(n)
    let arr = []
    const fibo = (num) => {
        if(arr[num] != undefined) return arr[num];
        if(num == 0 || num == 1) arr[num] = num;
        else arr[num] = fibo(num-1) + fibo(num-2);
        return arr[num]
    }
    fibo(n);
    res.send({"fibo": arr})
    
}

let with1 = (req, res) => {
    let n = req.body.n;
    let arr = []
    let fib = (num) => {
        if(arr[num] != undefined) return arr[num];
        if(num == 1 || num == 0){
            arr[num] = 1;
        }
        else arr[num] = fib(num -1) + fib(num-2);
        return arr[num];
    }
    fib(n-1)
    res.send({"fibo" : arr})

}

module.exports = {
    with0,
    with1
}




