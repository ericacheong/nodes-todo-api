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

//  db.collection('Todos').deleteMany({text: 'Have supper'}).then((result) => {
//      console.log(result);
//  });

//  db.collection('Todos').deleteOne({text: 'Have supper'}).then((result) => {
//        console.log(result);
//   });

// findOneAndDelete
db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
         console.log(result);
});
 // client.close();
});