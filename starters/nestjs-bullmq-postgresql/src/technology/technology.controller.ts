import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { Technology } from './technology.model';
import { TechnologyService } from './technology.service';

@Controller('technology')
export class TechnologyController {
	constructor(private readonly technologyService: TechnologyService) {}

	@Post()
	create(@Body() createTechnologyDto: CreateTechnologyDto): Promise<Technology> {
		return this.technologyService.create(createTechnologyDto);
	}

	@Get()
	findAll(): Promise<Technology[]> {
		return this.technologyService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Technology> {
		return this.technologyService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.technologyService.remove(id);
	}
}
