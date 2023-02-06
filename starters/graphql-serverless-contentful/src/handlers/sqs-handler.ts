import { SQSHandler } from 'aws-lambda';

export const handler: SQSHandler = async (event) => {
	const recordHandler = async (record: any) => {
		console.log('Job Message:', JSON.stringify(record.body));
	};

	// Ensuring we await on all the promises is super important to avoid
	// accidentally killing the lambda prior to processing being completed.
	await Promise.all(event.Records.map(recordHandler));
};
