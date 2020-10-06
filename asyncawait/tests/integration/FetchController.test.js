const FetchController = require('../../src/app/controllers/FetchController');
const { PostsFetcher }= require('../../src/app/utils/fetcher');

describe('Business Rules Test', () => {

    it('should return a list containing 20 ids', async () => {
        const fetchController = new FetchController();
        const postsFetcher = new PostsFetcher();

        let res = await (postsFetcher.fetchPosts(1, 20));
        res = fetchController.getPostIds(res);

        expect(res.length).toBe(20);
    });

    it('should return a list containing userIds from posts', async () => {
        const fetchController = new FetchController();
        const postsFetcher = new PostsFetcher();

        let res = await (postsFetcher.fetchPosts(1, 20));
        res = fetchController.getUserIds(res);

        expect(res.length).not.toBe(null);
        expect(res.length).toBeGreaterThan(1);
    });

    it('should work 115 documents', async () => {
        const fetchController = new FetchController();
        await fetchController.work(115);

        expect(fetchController.postList[0]).toHaveProperty('comments');
        expect(fetchController.postList[0]).toHaveProperty('user');
        expect(fetchController.postList[0].user).not.toBe(null);
        expect(fetchController.postList.length).toBe(115);
    });
});