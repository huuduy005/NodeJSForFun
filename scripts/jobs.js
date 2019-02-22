require('../mongoose')();
const JobModel = require('../models/job');

// JobModel.watch().on('change', data => {
//     console.log(new Date(), data);
// });

async function add() {
    // Insert a doc, will trigger the change stream handler above
    console.log(new Date(), 'Inserting doc');
    await JobModel.create({type: 'test', data: {}});
}

setTimeout(add, 0);
