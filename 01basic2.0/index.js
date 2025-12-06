const express = require("express");

const app = express();
const port = 3000

app.get('/', (req,res) => {
    res.send("Hii i am gopee singh")
})

app.listen(port, () =>{
    console.log(`app is lestening at ${port}`);
})

app.get("/sum/:firstArg/:secondArg", function(req, res){  // http://localhost:3000/subtract?a=5&b=5
    const a = parseInt(req.params.firstArg);
    const b = parseInt(req.params.secondArg);

    res.json({
        answer: a + b
    })
})

app.get('/multiply', function(req, res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer: a * b
    })
})

app.get('/divide/:firstArg/:secondArg', function(req, res){
    const a = parseInt(req.query.firstArg);
    const b = parseInt(req.query.secondArg);

    res.json({
        answer: a / b
    })
})

app.get('/subtract', function(req, res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer: a - b
    })
})