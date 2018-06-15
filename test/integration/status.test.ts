import * as supertest from 'supertest';
import { server } from '../../src';

describe('#Integration / status', () => {

  it('should return 200 status', (done) => {
    const expectedAnswer = {
      status: true,
      success: true,
    };

    supertest(server.express)
      .get('/status')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(expectedAnswer);
        server.close(done);
      });
  });
});
