import type { SQSHandler, SQSRecord } from 'aws-lambda';

const recordHandler = async (record: SQSRecord) => {
	console.log(JSON.stringify(record.body));
};

export const handler: SQSHandler = async (event) => {
	console.log('Example Job Processor Handler initiated');

	// Ensuring we await on all the promises is super important to avoid
	// accidentally killing the lambda prior to processing being completed.
	await Promise.all(event.Records.map(recordHandler));

	console.log('Example Job Processor Handler completed');
};
