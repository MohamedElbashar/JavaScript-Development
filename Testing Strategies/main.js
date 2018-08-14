function longRunningOp(callback) {
    setTimeout(callback, 3000);
};

function webrequest(req) {
    console.log('starting a long op for request:', req.id);
    longRunningOp(function () {
        console.log('ending a long op for request:', req.id);
    });
};

webrequest({id: 1});
webrequest({id: 2});