const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [{
    _id: userOneId,
    email: 'example@gmail.com',
    password: 'apassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'secretfirst').toString()
    }]
},{
    _id: userTwoId,
    email: 'example2@gmail.com',
    password: 'apassword2',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, 'secretfirst').toString()
    }]
}];

const dummyTodos = [{
    _id: new ObjectId(),
    text: 'First todos',
    completed: true,
    completedAt: 333,
    _creator: userOneId
}, {
    _id: new ObjectId(),
    text: 'Second todos',
    _creator: userTwoId
}, {
    _id: new ObjectId(),
    text: 'Third todos',
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos);
        
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {dummyTodos, populateTodos, users, populateUsers};