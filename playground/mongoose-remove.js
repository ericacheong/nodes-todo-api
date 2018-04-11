const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('../server/models/todo');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5acd89e3b89125159a436c0d'}).then((todo) => {
    
})

Todo.findByIdAndRemove('5acd89e3b89125159a436c0d').then((todo) => {
    console.log(todo);
})