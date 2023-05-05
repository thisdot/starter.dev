import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
	constructor(private health: HealthCheckService, private http: HttpHealthIndicator) {}

	@Get()
	@HealthCheck()
	check() {
		return this.health.check([
			() => this.http.pingCheck('health check', 'http://localhost:3000/health'),
		]);
	}
}
