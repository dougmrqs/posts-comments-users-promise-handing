const Workflow = require('./app/useCases/workflow');

async function main() {
    const workflow = new Workflow();

    await workflow.work(115);

    console.log(workflow.postList);
};

main();