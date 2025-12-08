const { Router } = require('express')
const adminRouter = Router()
const { adminModel, courseModel } = require('../db')
const bcrypt = require('bcrypt')
const { z } = require('zod')
const jwt = require('jsonwebtoken')
const { adminMiddleware } = require('../middleware/admin.js')

const {JWT_ADMIN_PASSWORD} = require('../config')

adminRouter.post("/signup", async function(req,res){
    // add zod schema validation here too
    const requireBody = z.object({
        email: z.string().min(5).max(50).email(),
        password: z.string().min(6).max(20),
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
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "admin signup successfully"
    })
})

adminRouter.post("/signin", async function(req,res){
    const {email, password} = req.body;
    const admin = await adminModel.findOne({
        email
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

adminRouter.post("/course", adminMiddleware, async function(req,res){
    const adminId = req.userId;
    console.log("Admin ID:", adminId); // Debugging line
    const {title, description, imageUrl, price} = req.body;

    const courses = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        createOrId: adminId
    })
     res.json({
        message: "Course created",
        courseId: courses._id
    })
})

adminRouter.put("/course", adminMiddleware, async function(req,res){
    const adminId = req.userId;
    const {title, description, imageUrl, price, courseId} = req.body;

    const courses = await courseModel.updateOne({
        _id: courseId,
        createOrId: adminId
        },
        {
        title,
        description,
        imageUrl,
        price,
    })
    res.json({
        message: "Course updated",
        courseId: courses._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async function(req,res){
    const adminId = req.userId;

    const courses = await courseModel.find({
        createOrId: adminId
    })
    res.json({
        message: "Course updated",
        courses
    })
})

module.exports = {
    adminRouter : adminRouter
}