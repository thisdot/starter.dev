/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { TechnologyController } from './technology.controller';
import { TechnologyService } from './technology.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';

describe('TechnologyController Unit Tests', () => {
	let technologyController: TechnologyController;
	let spyService: TechnologyService;

	beforeAll(async () => {
		const ApiServiceProvider = {
			provide: TechnologyService,
			useFactory: () => ({
				create: jest.fn(() => []),
				findAll: jest.fn(() => []),
			}),
		};
		const app: TestingModule = await Test.createTestingModule({
			controllers: [TechnologyController],
			providers: [TechnologyService, ApiServiceProvider],
		}).compile();

		technologyController = app.get<TechnologyController>(TechnologyController);
		spyService = app.get<TechnologyService>(TechnologyService);
	});

	it('calling create technologies method', async () => {
		const dto = new CreateTechnologyDto();
		await technologyController.create(dto);

		expect(technologyController.create(dto)).not.toEqual(null);
		expect(spyService.create).toHaveBeenCalled();
		expect(spyService.create).toHaveBeenCalledWith(dto);
	});

	it('calling findAll technologies method', async () => {
		await technologyController.findAll();
		expect(spyService.findAll).toHaveBeenCalled();
	});
});
