import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Technology } from './technology.model';
import { CreateTechnologyDto } from './dto/create-technology.dto';

@Injectable()
export class TechnologyService {
	constructor(
		@InjectModel(Technology)
		private technologyModel: typeof Technology
	) {}

	create(createTechnologyDto: CreateTechnologyDto): Promise<Technology> {
		return this.technologyModel.create({
			displayName: createTechnologyDto.displayName,
			description: createTechnologyDto.description,
			url: createTechnologyDto.url,
		});
	}

	async findAll(): Promise<Technology[]> {
		return this.technologyModel.findAll();
	}

	findOne(id: string): Promise<Technology> {
		return this.technologyModel.findOne({
			where: {
				id,
			},
		});
	}

	async remove(id: string): Promise<void> {
		const technology = await this.findOne(id);
		await technology.destroy();
	}
}
