const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../../app/model/user');
const app = require('../../app');

const should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  /*
   * Test the /POST route
   */
  describe('/POST signup', () => {
    it('it should not POST a user without pages field', done => {
      const user = {
        password: 'asd87asd',
        email: 'asdasas12@gmail.com'
      };

      chai.request(app)
        .post('/api/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');

          done();
        });
    });
  });
});
