const work = require('./app/useCases/workflow');

function main() {
    work()
        .then(res => console.log(res[0]));
};

main();