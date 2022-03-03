module.exports = (req, res) => {
    let n = req.body.n, arr = req.body.arr
    let sum1 = arr.reduce((acc, x) => {
        acc += x;
        return acc;
    }, 0);
    let sum2 = n * (n+1)/2;
    res.send({"missing": sum2 -sum1});
}
