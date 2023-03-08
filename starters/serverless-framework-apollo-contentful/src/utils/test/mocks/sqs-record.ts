import { SQSEvent, SQSRecord, SQSRecordAttributes } from 'aws-lambda';

const mockSQSRecordAttributes = (messageId: string): SQSRecordAttributes => ({
	ApproximateReceiveCount: `${messageId}__ApproximateReceiveCount`,
	SentTimestamp: `${messageId}__SentTimestamp`,
	SenderId: `${messageId}__SenderId`,
	ApproximateFirstReceiveTimestamp: `${messageId}__ApproximateFirstReceiveTimestamp`,
});

let mocksCountSQSRecord = 0;

const mockSQSRecord = (): SQSRecord => {
	const messageId = `MOCK_messageId_${mocksCountSQSRecord++}`;
	return {
		messageId,
		receiptHandle: 'MOCK_receiptHandle',
		body: 'MOCK_body',
		attributes: mockSQSRecordAttributes(messageId),
		messageAttributes: {},
		md5OfBody: 'MOCK_md5OfBody',
		eventSource: 'MOCK_eventSource',
		eventSourceARN: 'MOCK_eventSourceARN',
		awsRegion: 'MOCK_awsRegion',
	};
};

export const mockSQSEvent = (mockRecordsCount: number): SQSEvent => ({
	Records: Array(mockRecordsCount)
		.fill(undefined)
		.map(() => mockSQSRecord()),
});
