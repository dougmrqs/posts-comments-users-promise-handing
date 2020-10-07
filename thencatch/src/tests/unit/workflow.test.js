const work = require('../../app/useCases/workflow');

describe('Workflow test', () => {
    it('should return 115 posts with comments and users', done => {
        work(115)
            .then(res => {
                expect(res.length).toBe(115);
                expect(res[0]).toHaveProperty('user');
                expect(res[0]).toHaveProperty('comments');
                done();
            })
            .catch(error => done(error));
    });
});