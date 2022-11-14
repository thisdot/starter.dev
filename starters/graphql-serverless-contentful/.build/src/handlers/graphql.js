"use strict";
module.exports.server = function (event, context, callback) {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({
            message: "Go GraphQL Serverless v1.0! Your function executed successfully!",
            input: event,
        }),
    };
    callback(null, response);
};
//# sourceMappingURL=graphql.js.map