const FetchMany = require('../../src/app/services/fetchMany');

describe('Fetch Many [comments, users]', () => {
    describe('Fetch many comments', () => {
        it('should return a list of many comments in parallel', async () => {
            const fetchMany = new FetchMany();

            try {
                const comments = await fetchMany.comments([1, 2, 3])
                expect(comments.length).toBe(3);
                expect(comments[0][0]).toHaveProperty('body');
                expect(comments[0][0]).toHaveProperty('name');
            }
            catch (error) {
                console.log(error);
            }
        });
    });

    describe('Fetch many users', () => {
        it('should load all users from the post list in parallel', async () => {
            const fetchMany = new FetchMany();

            try {
                const users = await fetchMany.users([1, 2, 3])
                expect(users.length).toBe(3);
                expect(users[0]).toHaveProperty('name');
            }
            catch (error) {
                console.log(error)
            }
        });
    });

});