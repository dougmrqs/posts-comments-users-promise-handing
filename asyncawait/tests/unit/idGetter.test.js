const idGetter = require('../../src/app/services/idGetter');

describe('ID filtering functions', () => {
    it('should return a Set of author Ids of a given post list', () => {
        const postList = [{ userId: 1 }, { userId: 1 }, { userId: 2 }, { userId: 3 }]

        const userIdSet = idGetter.getUserIds(postList);

        expect(userIdSet.length).toBe(3);
    });

    it('should return a Set of post Ids of a given post list', () => {
        const postList = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }]

        const userIdSet = idGetter.getPostIds(postList);

        expect(userIdSet.length).toBe(3);
    });
});