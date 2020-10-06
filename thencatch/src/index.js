const work = require('./app/controllers/WorkflowController');

function main() {
    work()
        .then(res => console.log(res[0]));
};

main();