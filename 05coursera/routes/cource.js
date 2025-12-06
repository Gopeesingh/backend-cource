const { Router } = require("express")
const courceRouter = Router();

const { courseModel } = require("../db")

courceRouter.post('/course', function(req,res){
    res.json({
        message: "signin successfully"
    })
})

courceRouter.post('/purchases', function(req,res){
    res.json({
        message: "signin successfully"
    })
})

courceRouter.post('/preview', function(req,res){
    res.json({
        message: "signin successfully"
    })
})

module.exports = {
    courceRouter: courceRouter
}