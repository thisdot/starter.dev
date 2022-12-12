import { Job } from 'bullmq';
import { LogHelper } from '../utils/log-helper';

module.exports = async function jobProcessor(job: Job): Promise<'DONE'> {
	await job.log(`Started processing job`);
	LogHelper.info(`Job with id ${job.id}`, job.data);
	await job.updateProgress(100);
	return 'DONE';
};
