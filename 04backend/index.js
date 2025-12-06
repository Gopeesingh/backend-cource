const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require("./db");
const bcrypt = require("bcrypt");
const {z} = require("zod");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://gopee_db_user:I7yWmrIVWiaeaJyu@cluster0.fpmflcz.mongodb.net/Gopeesingh")


const jwt_secret = "gopee123"
const users = []


app.post("/signup", async function(req, res){
    const requireBody = z.object({
        name: z.string().min(3).max(100),
        email: z.string().min(3).max(100).email(),
        password: z.string().min(6).max(10)
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        res.json({
            message: "Incorrect formate"
        })
        return
    }
const name = req.body.name;
const email = req.body.email;
const password = req.body.password;

const hashPoassword = await bcrypt.hash(password, 5);

// users.push({
//     name: name,
//     email: email,
//     password: password
// })

await UserModel.create({
    name: name,
    email: email,
    password: hashPoassword
})

res.json({
    message: "you are Signup Successfully"
})
})

app.post("/signin", async function(req, res){
    const email = req.body.email || {};
    const password = req.body.password || {};

    const user = await UserModel.findOne({
        email: email,
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
            message: "Incorrect cred"
        })
    }

    // let foundUser = null;
    // for(let i=0; i<users.length; i++){
    //     if(users[i].name === name && users[i].password === password){
    //         foundUser = users[i];
    //     }
    // }
    // if(!foundUser){
    //     res.json({
    //         message: "Crendential wrong"
    //     })
    // }else{
    //     const token = jwt.sign({
    //         name
    //     }, jwt_secret);
    //     res.json({
    //         token: token
    //     })
    // }


})

app.post("todo", function(req, res){
    
})

app.post("todos", function(req, res){
    
})

app.listen(3000);