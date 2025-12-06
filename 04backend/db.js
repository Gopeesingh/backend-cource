const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const User = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
})

const Todo = new Schema({
    userId: objectId,
    tittle: String,
    done: Boolean
})

const UserModel = mongoose.model("users", User)
const TodoModel = mongoose.model('todos', Todo)

module.exports = {
       UserModel,
       TodoModel
}

