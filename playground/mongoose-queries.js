const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('../server/models/todo');

var id = '5acbb8473aa465ffc835de68';

if (!ObjectId.isValid(id)) {
    console.log("Id not valid");
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log(todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log(todo);
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('id not found');
    }
    console.log(todo);
});