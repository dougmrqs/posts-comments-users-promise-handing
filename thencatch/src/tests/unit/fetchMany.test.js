const FetchMany = require('../../app/services/fetchMany');

describe('Fetch Many [comments, users]', () => {
    describe('Fetch many comments', () => {
        it('should return a list of many comments in parallel', done => {
            const fetchMany = new FetchMany();

            fetchMany.loadComments([1, 2, 3])
                .then(res => {
                    expect(res.length).toBe(3);
                    expect(res[0][0]).toHaveProperty('body');
                    expect(res[0][0]).toHaveProperty('name');
                    done();
                })
                .catch(error => {
                    console.log(error);
                    done(error);
                });
        });
    });

    describe('Fetch many users', () => {
        it('should load all users from the post list in parallel', done => {
            const fetchMany = new FetchMany();

            fetchMany.loadUsers([1, 2, 3])
                .then(res => {
                    expect(res.length).toBe(3);
                    expect(res[0]).toHaveProperty('name');
                    done();
                })
                .catch(error => {
                    console.log(error);
                    done(error);
                });
        });
    });

});