const express = require('express')
const basic = require('./custom-package/basic')
const complex = require('./custom-package/complex')
const missing = require('./custom-package/missing')
const fibo = require('./custom-package/fibo')
const stringsort = require("./custom-package/stringsort")
const water = require("./custom-package/water")

const app = express()
app.use(express.json())
app.get("/", (req, res) => {
    res.send("This is the first project.")
})

app.post("/add", basic.add)
app.post("/subtract", basic.subtract)
app.post("/multiply", basic.multiply)
app.post("/divide", basic.divide)

app.post("/power", complex.power)
app.post("/factorial", complex.factorial)
app.post("/sumofn", complex.sumofn)
app.post("/modulo", complex.modulo)

app.post("/missing", missing)

app.post("/fibo", fibo.with0)
app.post("/wfibo", fibo.with1)

app.post("/stringsort", stringsort)

app.post("/water", water)

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(80, () => {
    console.log("Listening on port 3000")
})