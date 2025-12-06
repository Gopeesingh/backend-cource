const { Router } = require('express')
const userRouter = Router()
const { userModel} = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { z } = require('zod')

const jwt_secret = '123456789'



userRouter.post('/signup', async function(req,res){
    const requireBody = z.object({
        email: z.string().min(5).max(50).email(),
        password: z.string().min(8).max(12),
        firstName: z.string().min(3).max(16),
        lastName: z.string().min(3).max(17)
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        return res.status(400).json({
            message: 'Incorrect formate'
        })
    }

    const{ email, password, firstName, lastName} = req.body;

    const hashPoassword = await bcrypt.hash(password, 5);

    await userModel.create({
        email: email,
        password: hashPoassword,
        firstName: firstName,
        lastName: lastName
    })
        return res.status(200).json({
        message: "signup successfully"
    })
})

userRouter.post('/signin', async function(req,res){
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email: email
    })
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(user && passwordMatch){
        const token = jwt.sign({
            id: user._id.toString()
        }, jwt_secret)
        res.json({
        token: token
    })
    }else{
        res.status(403).json({
            message: "password Inccorect"
        })
    }
})

module.exports = {
    userRouter: userRouter
}