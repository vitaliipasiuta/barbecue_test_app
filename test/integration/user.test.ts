import * as supertest from 'supertest';
import { server } from '../../src';

describe('#Integration / user', () => {

  describe('Route: "/"', () => {
    it('should return 3 users from db', (done) => {
      const expectedAnswer = {
        status: true,
        success: true,
      };

      supertest(server.express)
        .get('/user')
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.statusCode).toEqual(200);
          expect(res.body).toMatchObject(expectedAnswer);
          server.close(done);
        });
    });

  });

});
