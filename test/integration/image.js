const chai = require('chai');
const chaiHttp = require('chai-http');
const randomstring = require('randomstring');
const fs = require('fs');
const path = require('path');

const app = require('../../app');

const should = chai.should();
chai.use(chaiHttp);

const random = (length = 10) => randomstring.generate({ length, readable: true, charset: 'alphabetic' });

describe('Image', () => {
  describe('/POST signup', () => {
    it('it should emit Unauthorized error', done => {
      chai.request(app)
        .get('/api/image')
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });

    it('it should upload image', done => {
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

            const { authToken } = res.body;

            chai.request(app)
                .post('/api/image/transform')
                .set('Authorization', `Bearer ${authToken}`)
                .attach('image', fs.readFileSync(path.join(__dirname, '..', 'assets', '1.jpg')), '1.jpg')
                .query({ width: '1024', height: '1024' })
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('originalImageId');
                  res.body.should.have.property('transformedImageId');

                  done();
                });
          });
    });
  });

  it('it should not upload image', done => {
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

          const { authToken } = res.body;

          chai.request(app)
              .post('/api/image/transform')
              .set('Authorization', `Bearer ${authToken}`)
              .attach('image', fs.readFileSync(path.join(__dirname, '..', 'assets', '1.jpg')), '1.jpg')
              .query({ width: '0', height: '0' })
              .end((err, res) => {
                res.should.have.status(406);
                res.body.should.be.a('object');
                res.body.should.have.property('message');

                done();
              });
        });
  });
});
