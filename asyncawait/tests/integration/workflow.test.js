const Workflow = require('../../src/app/useCases/workflow');

describe('Business Rules Test', () => {

    it('should work 115 documents', async () => {
        const workflow = new Workflow();
        await workflow.work(115);

        expect(workflow.postList[0]).toHaveProperty('comments');
        expect(workflow.postList[0]).toHaveProperty('user');
        expect(workflow.postList[0].user).not.toBe(null);
        expect(workflow.postList.length).toBe(115);
    });
});