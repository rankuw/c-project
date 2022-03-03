let add = (req, res) => {
    console.log(req.body)
    let a = req.body.a, b = req.body.b
    res.send({q: a + b})
}

let subtract = (req, res) => {
    let a = req.body.a, b = req.body.b
    res.send({q: a - b})
}

let multiply = (req, res) => {
    let a = req.body.a, b = req.body.b
    res.send({q: a * b})
}

let divide = (req, res) => {
    let a = req.body.a, b = req.body.b
    res.send({q: a / b})
}

const method = {
    add,
    subtract,
    multiply,
    divide
}
module.exports = method