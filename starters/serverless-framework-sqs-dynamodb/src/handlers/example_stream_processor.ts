import type { DynamoDBStreamHandler, DynamoDBRecord } from 'aws-lambda';

const recordHandler = async (record: DynamoDBRecord) => {
	if (!record.dynamodb) {
		return;
	}

	if (record.eventName === 'INSERT') {
		console.log('Inserted Record', record.dynamodb.NewImage);
	} else if (record.eventName === 'MODIFY') {
		console.log('Updated Record');
		console.log('New Values', record.dynamodb.NewImage);
		console.log('Old Values', record.dynamodb.OldImage);
	} else if (record.eventName === 'REMOVE') {
		console.log('Removed Record', record.dynamodb.OldImage);
	}
};

export const handler: DynamoDBStreamHandler = async (event) => {
	console.log('Example Stream Processor Handler initiated');

	// Ensuring we await on all the promises is super important to avoid
	// accidentally killing the lambda prior to processing being completed.
	await Promise.all(event.Records.map(recordHandler));
	console.log('Example Stream Processor Handler completed');
};
