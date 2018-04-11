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
//  db.collection('Todos').insertOne({
//      text: 'Something to do',
//      completed: false
//  }, (err, result) => {
//     if (err) {
//         return console.log('Unable to insert a document', err);
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
//  });
 
//  db.collection('Users').insertOne({
//      name: 'Sam Hui',
//      age: 55,
//      location: 'San Francisco'
//  }, (err, result) => {
//      if (err) {
//          return console.log('Unable to insert a doc', err);
//      }
//      //console.log(JSON.stringify(result.ops, undefined, 2));
//      console.log(result.ops[0]._id.getTimestamp());
//  });
 
 client.close();
});