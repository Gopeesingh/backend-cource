const { Router } = require('express')
const adminRouter = Router()
const { adminModel } = require('../db')
const bcrypt = require('bcrypt')
const { z } = require('zod')
const jwt = require('jsonwebtoken')

const JWT_ADMIN_PASSWORD = '1234dfefe'

adminRouter.post("/signup", async function(req,res){
    const requireBody = z.object({
        email: z.string().min(5).max(50).email(),
        password: z.string().min(8).max(12),
        firstName: z.string().min(3).max(16),
        lastName: z.string().min(3).max(17)
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body)
    if(!parseDataWithSuccess.success){
        res.status(403).json({
            meassage: 'Incorrect formate'
        })
    }

    const {email, password, firstName, lastName} = req.body;

    const hashPoassword = await bcrypt.hash(password, 5);

    await adminModel.create({
        email: email,
        password: hashPoassword,
        firstName,
        lastName
    })
    res.json({
        message: "admin signup successfully"
    })
})

adminRouter.post("/signin", async function(req,res){
    const {email, password} = req.body;
    const admin = await adminModel.findOne({
        email,
    })
    const passwordMatch = await bcrypt.compare(password, admin.password)
    if(admin && passwordMatch){
        const token = jwt.sign({
            id: admin._id,
        }, JWT_ADMIN_PASSWORD);
        res.json({
        token: token
    })
    }else{
        res.json({
        message: "Incorrect Credential"
    })
    }
    
})

adminRouter.post("/course", function(req,res){
    res.json({
        message: "admin is on course"
    })
})

module.exports = {
    adminRouter : adminRouter
}