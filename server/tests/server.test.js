const expect = require('expect');
const request = require('supertest');

const {ObjectId} = require('mongodb');
const {app} = require('../server');
const {Todo} = require('../models/todo');

const dummyTodos = [{
    _id: new ObjectId(),
    text: 'First todos',
    completed: true,
    completedAt: 333
}, {
    _id: new ObjectId(),
    text: 'Second todos'
}, {
    _id: new ObjectId(),
    text: 'Third todos'
}];



beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos);
        
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = "test a text";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return to todo doc', (done) => {
        request(app)
            .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(dummyTodos[0].text);
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectId().toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non object id', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = dummyTodos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch(e => done(e));
            })
    });
    it('should return 404 if todo not found', (done) => {
        request(app)
        .delete(`/todos/${new ObjectId().toHexString()}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = dummyTodos[1]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)  
            .send({text: 'Updated from patch', completed:true})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe("Updated from patch");
                expect(res.body.todo.completed).toBe(true);
                // expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });
    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = dummyTodos[0]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)  
            .send({completed:false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end(done); 
    });
});