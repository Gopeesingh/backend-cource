const express = require('express')
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const {userRouter } = require('./routes/user.js')
const{ adminRouter } = require('./routes/admin.js')
const{ courceRouter } = require('./routes/cource.js')


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/cource", courceRouter);

async function main(){
    await mongoose.connect('mongodb+srv://gopee_db_user:I7yWmrIVWiaeaJyu@cluster0.fpmflcz.mongodb.net/coursera');
app.listen(3000)
console.log("app is listening on 3000")
}

main()