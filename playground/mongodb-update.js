// const MongoClient = require('mongodb').MongoClient;

// var user = {name: 'sam', age: 24};
// var {name} = user;
// console.log(name);

const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
 if (err) {
     return console.log('Unable to connect to mongodb server');
 }
 console.log('Connected to mongodb server');
 const db = client.db('TodoApp');

 db.collection('Todos').findOneAndUpdate(
     {_id: new ObjectID('5aca3e2cb89125159a433f0b')},
     {$set: {
        completed: true 
     }},
     { returnOriginal: false }
 ).then((result) => {
     console.log(result);
 });

 // client.close();
});