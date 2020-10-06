const FetchController = require('./app/controllers/FetchController');

async function main() {
    const fetchController = new FetchController();

    await fetchController.work(115);

    console.log(fetchController.postList);
};

main();