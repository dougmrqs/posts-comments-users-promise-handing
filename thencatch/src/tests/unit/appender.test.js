const Appender = require('../../app/services/appender');
const Fetcher = require('../../app/services/fetcher');
const FetchMany = require('../../app/services/fetchMany');
const IdGetter = require('../../app/services/idGetter');

describe('Appending logic', () => {
    it('should append a comments object to post object', () => {

        appendedObject = Appender.appendCommentsToPosts(
            [{ 'id': 1, 'title': 'foo', 'body': 'bar' }], [{ 'postId': 1, 'name': 'Foolish', 'body': 'bar' }]);

        expect(appendedObject[0]).toHaveProperty('comments');
    });

    it('should append multiple comments lists to multiple posts', done => {
        const fetcher = new Fetcher();
        const fetchMany = new FetchMany();

        fetcher.fetchPosts(1, 20)
            .then(posts => {
                const postIdSet = IdGetter.getPostIdSet(posts);
                fetchMany.loadComments(postIdSet)
                    .then(comments => Appender.appendCommentsToPosts(posts, comments))
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

        posts = [{id: 1, userId: 1}, {id: 2, userId: 1}, {id: 3, userId: 2}];
        users = [{id: 1, name: 'Foo'}, {id: 2, name: 'Bar'}]

        postList = Appender.appendUsersToPosts(posts, users);

        expect(postList[0]).toHaveProperty('user');
        expect(postList[0].user).toHaveProperty('name', 'Foo');
        expect(postList[2].user).toHaveProperty('name', 'Bar');

    });
});