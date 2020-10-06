const { PostsFetcher, CommentsFetcher, UsersFetcher } = require('../../src/app/utils/fetcher')

describe('Fetcher', () => {
    describe('Posts fetcher', () => {
        it('should return a list of 5 documents', async () => {
            const fetcher = new PostsFetcher();
            let postsList = [];
            postsList = await fetcher.fetchPosts(1, 5);
            // console.log(postsList);
            expect(postsList.length).toBe(5);
        });
    });

    describe('Comments fetcher', () => {
        it('should return a list of comments', async () => {
            let commentsList = [];
            const fetcher = new CommentsFetcher();
            commentsList = await fetcher.commentsByList([1, 2, 3]);

            expect(commentsList.length).not.toBe(null);
        });
    });

    describe('Users fetcher', () => {
        it('should return a list of users', async () => {
            usersFetcher = new UsersFetcher();

            let users = await usersFetcher.usersByList([1, 2, 3])

            expect(users[0]).toHaveProperty('name');
            expect(users[0]).toHaveProperty('id');
        });
    });

});