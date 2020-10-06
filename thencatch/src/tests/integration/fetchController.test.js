const FetchController = require('../../app/controllers/FetchController');

describe('Integration tests', () => {
    describe('Business rule #1', () => {
        it('should return 20 posts', done => {
            const fetchController = new FetchController();

            fetchController.fetchTwenty(1)
                .then(res => {
                    expect(res.length).toBe(20);
                    done();
                })
                .catch(error => {
                    console.log(error);
                    done(error);
                })
        });
    });

    describe('Business rule #2', () => {
        it('should return a list of many comments in parallel', done => {
            const fetchController = new FetchController();

            fetchController.loadComments([1, 2, 3])
                .then(res => {
                    expect(res.length).toBeGreaterThanOrEqual(1);
                    done();
                })
                .catch(error => {
                    console.log(error);
                    done(error);

                });
        });
    });

    describe('Business rule #3', () => {
        it('should load all users from the post list in parallel', done => {
            const fetchController = new FetchController();

            fetchController.loadUsers([1, 2, 3])
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

    describe('Appending logic', () => {
        it('should append a comments object to post object', () => {
            const fetchController = new FetchController();

            appendedObject = fetchController.appendComments(
                { 'title': 'foo', 'body': 'bar' }, [{ 'name': 'Foolish', 'body': 'bar' }]);

            expect(appendedObject).toHaveProperty('comments');
        });

        it('should append multiple comments lists to multiple posts', done => {
            const fetchController = new FetchController();

            fetchController.fetchTwenty(1)
                .then(posts => {
                    const postIdSet = fetchController.getPostIdSet(posts);
                    fetchController.loadComments(postIdSet)
                        .then(comments => fetchController.appendCommentsToPosts(posts, comments))
                        .then(res => {
                            expect(res[0]).toHaveProperty('comments');
                            expect(res[0].comments[0]).toHaveProperty('id');
                            expect(res[0].comments[0]).toHaveProperty('postId');
                            done();
                        })
                        .catch(error => done(error));
                })
                .catch(error => done(error));
        });

        it('should append a user to a post', () => {
            const fetchController = new FetchController();
            posts = [{id: 1, userId: 1}, {id: 2, userId: 1}, {id: 3, userId: 2}];
            users = [{id: 1, name: 'Foo'}, {id: 2, name: 'Bar'}]

            postList = fetchController.appendUsersToPosts(posts, users);

            expect(postList[0]).toHaveProperty('user');
            expect(postList[0].user).toHaveProperty('name', 'Foo');
            expect(postList[2].user).toHaveProperty('name', 'Bar');

        });
    });

    describe('Supportive functions', () => {
        it('should return a Set of author Ids of a given post list', () => {
            const fetchController = new FetchController();
            const postList = [{ userId: 1 }, { userId: 1 }, { userId: 2 }, { userId: 3 }]

            const userIdSet = fetchController.getUserIdSet(postList);

            expect(userIdSet.size).toBe(3);
        });

        it('should return a Set of post Ids of a given post list', () => {
            const fetchController = new FetchController();
            const postList = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }]

            const userIdSet = fetchController.getPostIdSet(postList);

            expect(userIdSet.size).toBe(3);
        });
    });
});