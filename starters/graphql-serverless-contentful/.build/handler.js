'use strict';
module.exports.helloWorld = function (event, context, callback) {
    var response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
        }),
    };
    callback(null, response);
};
//# sourceMappingURL=handler.js.map