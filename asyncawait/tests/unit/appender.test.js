const Appender = require('../../src/app/services/appender');
const Fetcher = require('../../src/app/services/fetcher');
const FetchMany = require('../../src/app/services/fetchMany');
const IdGetter = require('../../src/app/services/idGetter');

describe('Appending logic', () => {
    it('should append a comments object to post object', () => {

        appendedObject = Appender.appendCommentsToPosts(
            [{ 'id': 1, 'title': 'foo', 'body': 'bar' }], [{ 'postId': 1, 'name': 'Foolish', 'body': 'bar' }]);

        expect(appendedObject[0]).toHaveProperty('comments');
    });

    it('should append multiple comments lists to multiple posts', async () => {
        const fetcher = new Fetcher();
        const fetchMany = new FetchMany();

        const posts = await fetcher.fetchPosts(1, 20);
        const postIdSet = IdGetter.getPostIds(posts);
        const comments = await fetchMany.comments(postIdSet);
        const appendedPosts = Appender.appendCommentsToPosts(posts, comments)
        expect(appendedPosts[0]).toHaveProperty('comments');
        expect(appendedPosts[0].comments[0]).toHaveProperty('id');
        expect(appendedPosts[0].comments[0]).toHaveProperty('postId');
    });

    it('should append users to posts', () => {

        const posts = [{ id: 1, userId: 1 }, { id: 2, userId: 1 }, { id: 3, userId: 2 }];
        const users = [{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }]

        const postList = Appender.appendUsersToPosts(posts, users);
        expect(postList[0]).toHaveProperty('user');
        expect(postList[0].user).toHaveProperty('name', 'Foo');
        expect(postList[2].user).toHaveProperty('name', 'Bar');

    });
});