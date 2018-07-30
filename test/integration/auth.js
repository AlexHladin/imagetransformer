const chai = require('chai');
const chaiHttp = require('chai-http');
const randomstring = require('randomstring');

const app = require('../../app');

const should = chai.should();
chai.use(chaiHttp);

const random = (length = 10) => randomstring.generate({ length, readable: true, charset: 'alphabetic' });

describe('Users', () => {
  /*
   * Test the signup route
   */
  describe('/POST signup', () => {
    it('it should signup user', done => {
      const user = {
        password: random(),
        email: `${random()}@${random(5)}.${random(3)}`
      };

      chai.request(app)
          .post('/api/auth/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('authToken');

            done();
          });
    });

    it('it should not signup user', done => {
      chai.request(app)
          .post('/api/auth/signup')
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');

            done();
          });
    });
  });

  /*
   * Test the signin route
   */
  describe('/POST signin', () => {
    it('it should not signin user', done => {
      const user = {
        password: random(),
        email: `${random()}@${random(5)}.${random(3)}`
      };

      chai.request(app)
          .post('/api/auth/signin')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');

            done();
          });
    });

    /*
     * Test the signin route
     */
    it('it should not signin user', done => {
      const user = {
        password: random(),
        email: `${random()}@${random()}.${random(3)}`
      };

      console.log(user);

      chai.request(app)
          .post('/api/auth/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('authToken');

            chai.request(app)
                .post('/api/auth/signin')
                .send(user)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('authToken');

                  done();
                });
          });
    });
  });
});
