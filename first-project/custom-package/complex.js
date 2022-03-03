const power = (req, res) => {
    let a = req.body.a, b = req.body.b
    res.send({"q" : Math.pow(a, b)})
}

const factorial = (req, res) => {
    let fact = 1, a = req.body.a
    while(a){
        fact *= a--;
    }
    res.send({"q": fact})
}

const sumofn =  (req, res) => {
    let sm = 0, a = req.body.a
    while(a){
        sm += a--;
    }
    res.send({"q": sm})
}

const modulo = (req, res) => {
    let a = req.body.a, b = req.body.b
    res.send({"q" : a % b})
}

module.exports = {
    power,
    factorial,
    sumofn,
    modulo
}