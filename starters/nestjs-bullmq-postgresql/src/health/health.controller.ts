import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, SequelizeHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
	constructor(private health: HealthCheckService, private db: SequelizeHealthIndicator) {}

	@Get()
	@HealthCheck()
	checkHealth() {
		return this.health.check([() => this.db.pingCheck('sequelize')]);
	}
}
