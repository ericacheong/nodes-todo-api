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

//  db.collection('Todos').find({
//      _id: new ObjectID('5ac9d439e59ae680d5bcc272')
//     }).toArray().then((docs) => {
//     console.log('Todos');
//     console.log(JSON.stringify(docs, undefined, 2));
//  }, (err) => {
//     console.log('Unable to fetch todos', err);
//  });

// db.collection('Todos').find().count().then((count) => {
//    console.log('Todos count:', count);
   
// }, (err) => {
//    console.log('Unable to fetch todos', err);
// });

db.collection('Users').find({name: 'Sam Hui'}).count().then((count) => {
    console.log('User count:', count);
}, (err) => {
    console.log(err);
})
 
 // client.close();
});