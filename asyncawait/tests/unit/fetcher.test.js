const Fetcher = require('../../src/app/services/fetcher');

describe('Fetcher', () => {
    describe('Posts fetcher', () => {
        it('should return a list of 5 documents', async () => {
            const fetcher = new Fetcher();
            let postsList = [];

            postsList = await fetcher.fetchPosts(1, 5);
            // console.log(postsList);
            expect(postsList.length).toBe(5);
            expect(postsList[0]).toHaveProperty('body');
        });
    });

    describe('Comments fetcher', () => {
        it('should return a list of comments', async () => {
            let commentsList = [];
            const fetcher = new Fetcher();
            commentsList = await fetcher.fetchComments(1);

            expect(commentsList[0]).toHaveProperty('body');
        });
    });

    describe('Users fetcher', () => {
        it('should return a user', async () => {
            const fetcher = new Fetcher();

            let users = await fetcher.fetchUser(1);

            expect(users).toHaveProperty('name');
            expect(users).toHaveProperty('id');
        });
    });

});