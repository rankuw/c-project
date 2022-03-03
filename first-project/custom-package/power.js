let boot = [400, 500, 600]
let processing = [300, 200, 100]


let maxPower = 5000

let cnt = 0;

for(let i = 0; i < boot.length; i++){
    let sm = 0;
    for(let j = i; j < boot.length; j++){
        sm = boot[j] + (j - i + 1) * processing.slice(i, j+1).reduce((total, elem) => {
            return total + elem
        })
        if(sm <= 10000){
            console.log(sm, i)
            cnt++;
        }

        else{
            break;
        };
    }
}

console.log(cnt);