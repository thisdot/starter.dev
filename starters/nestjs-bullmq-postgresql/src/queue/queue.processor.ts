import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('queue')
class QueueProcessor extends WorkerHost {
	async process(job: Job<any, any, string>): Promise<any> {
		console.log(`Processing job ${job}`);
	}

	@OnWorkerEvent('completed')
	onCompleted() {
		console.log('Job Completed');
	}
}
