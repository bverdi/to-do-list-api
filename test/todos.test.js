
'use strict';

//
// dependencies
const chai    = require('chai');
const faker     = require('faker');

//
// running local
if (process.env.NODE_ENV === 'local') {
  const path      = require('path');
  var dotEnvPath  = path.resolve('.env');
  require('dotenv').config({ path: dotEnvPath});
}

//
// handler
const handler    = require('../src/controllers/todos/_handler');

let id;

const registerData = {
  description: faker.lorem.paragraph(3),
  completed: false
};

const registerDataError = {
  description: faker.lorem.paragraph(3),
  completed: 'teste'
};

describe('00 - Test Case Register Todos through endpoint /todos', () => {
  it('Should register an Todos.', (done) => {
    const event = {
      body: JSON.stringify(registerData)
    };
    handler.registerTodosRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(201);
        const body = JSON.parse(res.body);
        chai.expect(body).to.be.an('object', 'Your body is not an object!');
        id = body.id;
        done();
      }).catch(err => {
        return done(err);
      });
  });

  it('Should throw an error when user sent an invalid body.', (done) => {
    const event = {
      body: JSON.stringify(registerDataError)
    };
  
    handler.registerTodosRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(400);
        done();
      }).catch(err => {
        return done(err);
      });
  });
});


describe('01 - Test Case Edit Todos through endpoint /todos/{id}', () => {
  it('Should edit the fields passed through body.', (done) => {
    const event = {
      pathParameters: {
        id: id
      },
      body: JSON.stringify(registerData)
    };
    
    handler.editTodosRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(200);
        const body = JSON.parse(res.body);
        chai.expect(body).to.be.an('object', 'Your body is not an object!');
        done();
      }).catch(err => {
        return done(err);
      });
  });

  it(`Should throw an error because the Todos ${id} not found.`, (done) => {
    const event = {
      pathParameters: {
        id: 920
      },
      body: JSON.stringify(registerData)
    };

    handler.editTodosRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(404);
        done();
      }).catch(err => {
        return done(err);
      });
  });

  it('Should throw an error when send an invalid body.', (done) => {
    const event = {
      pathParameters: {
        id: id
      },
      body: JSON.stringify(registerDataError)
    };

    handler.editTodosRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(400);
        done();
      }).catch(err => {
        return done(err);
      });
  });
});

describe(`02 - Test Case Get Todos id ${id} through endpoint /todos/{id}`, () => {
  it('Should retrieve the register.', (done) => {
    const event = {
      pathParameters: {
        id: id
      }
    };
    
    handler.getTodosByIdRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(200);
        const body = JSON.parse(res.body);
        chai.expect(body).to.be.an('object', 'Your body is not an object!');
        done();
      }).catch(err => {
        return done(err);
      });
  });

  it(`Should throw an error because the Todos ${id} was not found.`, (done) => {
    const event = {
      pathParameters: {
        id: 0
      }
    };

    handler.getTodosByIdRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(404);
        done();
      }).catch(err => {
        return done(err);
      });
  });
});

describe('03 - Test Case Get All Todos through endpoint /todos', () => {
  it('Should retrieve all Todos.', (done) => {
    const event = {
      queryStringParameters: {}
    };
    
    handler.getAllTodosRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(200);
        const body = JSON.parse(res.body);

        chai.expect(body).to.be.an('object', 'Your body is not an object!');
        chai.expect(body.todos).to.be.an('array', 'The field todos is not an array!');
        chai.expect(body.nextPage).to.exist;
        done();
      }).catch(err => {
        return done(err);
      });
  });
});

describe(`04 - Test Case Delete Todos id ${id} through endpoint /todos/{id}`, () => {
  it('Should delete the register.', (done) => {
    const event = {
      pathParameters: {
        id: id
      }
    };
    
    handler.deleteTodosRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(200);
        done();
      }).catch(err => {
        return done(err);
      });
  });

  it(`Should throw an error because the Todos ${id} was not found.`, (done) => {
    const event = {
      pathParameters: {
        id: id
      }
    };

    handler.deleteTodosRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(404);
        done();
      }).catch(err => {
        return done(err);
      });
  });
});