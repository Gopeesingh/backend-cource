require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const {userRouter } = require('./routes/user.js')
const{ adminRouter } = require('./routes/admin.js')
const{ courseRouter } = require('./routes/course.js')


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(){
    await mongoose.connect(process.env.MONGOOSE_URL);
app.listen(3000)
console.log("app is listening on 3000")
}

main()