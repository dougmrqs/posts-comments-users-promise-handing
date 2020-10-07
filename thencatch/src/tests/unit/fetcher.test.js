const Fetcher = require('../../app/services/fetcher');

describe('Fetcher test', () => {
    describe('Posts fetcher', () => {
        it('should fetch 20 posts', done => {
            const fetcher = new Fetcher();
            fetcher.fetchPosts(1, 20)
                .then(res => {
                    expect(res.length).toBe(20);
                    expect(res[0]).toHaveProperty('title');
                    expect(res[0]).toHaveProperty('id');
                    expect(res[0]).toHaveProperty('body');
                    expect(res[0]).toHaveProperty('userId');
                    done();
                })
                .catch(e => {
                    done(e);
                    console.log(e)
                });
        });
    });

    describe('Comments fetcher', () => {
        it('should fetch a list of comments', done => {
            const fetcher = new Fetcher();

            fetcher.fetchComments(1)
                .then(res => {
                    expect(res.length).toBe(5);
                    expect(res[0]).toHaveProperty('id');
                    expect(res[0]).toHaveProperty('postId');
                    expect(res[0]).toHaveProperty('name');
                    expect(res[0]).toHaveProperty('email');
                    expect(res[0]).toHaveProperty('body');
                    done();
                })
                .catch(error => {
                    console.log(error)
                    done(error);
                });

        });
    });

    describe('Users fetcher', () => {
        it('should return a user given its id', done => {
            const fetcher = new Fetcher();

            fetcher.fetchUser(1)
                .then(res => {
                    expect(res).toHaveProperty('name');
                    expect(res).toHaveProperty('username');
                    expect(res).toHaveProperty('email');
                    expect(res).toHaveProperty(['address']);
                    done()
                })
                .catch(error => {
                    console.log(error);
                    done(error);
                });
        });
    });
});
