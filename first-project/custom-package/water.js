

let method1 = (req, res) => {
    let arr = req.body.arr
    let left = new Array(arr.length).fill(-1), right = new Array(arr.length).fill(-1);
    let cnt = 0
    let l = -1, r = -1;
    for(let i = 0; i < arr.length - 1; i++){
        l = Math.max(l, arr[i]);
        left[i] = l;
    }

    for(let i = arr.length - 1 ; i > 0; i--){
        r = Math.max(r, arr[i]);
        right[i] = r;
    }
    console.log(left, right)
    for(let i = 1; i < arr.length - 1; i++){
        cnt += Math.min(left[i], right[i]) - arr[i];
    }
    res.send({"ans": cnt})
}





const method2 = (req, res) => {
    let arr = req.body.arr;
    let left = 0, right = arr.length - 1, lMax = arr[left], rMax = arr[right], cnt = 0;
    while(left <= right){
        if(lMax < rMax){
            lMax = Math.max(lMax, arr[left]);
            cnt += lMax - arr[left++];
        }
        else{
            rMax = Math.max(rMax, arr[right])
            cnt += rMax - arr[right--];
        }
    }

    res.send({"ans": cnt})
}

module.exports = method1


