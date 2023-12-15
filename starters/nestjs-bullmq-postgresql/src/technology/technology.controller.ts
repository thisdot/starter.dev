import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { Technology } from './technology.model';
import { TechnologyService } from './technology.service';
import {
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('technology')
@Controller('technology')
export class TechnologyController {
	constructor(private readonly technologyService: TechnologyService) {}

	@Post()
	@ApiCreatedResponse({ description: 'Created Successfully' })
	@ApiUnprocessableEntityResponse({ description: 'Bad Request' })
	@ApiForbiddenResponse({ description: 'Unauthorized Request' })
	create(@Body() createTechnologyDto: CreateTechnologyDto): Promise<Technology> {
		return this.technologyService.create(createTechnologyDto);
	}

	@Get()
	@ApiOkResponse({ description: 'The resources were returned successfully' })
	@ApiForbiddenResponse({ description: 'Unauthorized Request' })
	findAll(): Promise<Technology[]> {
		return this.technologyService.findAll();
	}

	@Get(':id')
	@ApiOkResponse({ description: 'The resource was returned successfully' })
	@ApiForbiddenResponse({ description: 'Unauthorized Request' })
	@ApiNotFoundResponse({ description: 'Resource not found' })
	findOne(@Param('id') id: string): Promise<Technology> {
		return this.technologyService.findOne(id);
	}

	@Delete(':id')
	@ApiOkResponse({ description: 'The resource was returned successfully' })
	@ApiForbiddenResponse({ description: 'Unauthorized Request' })
	@ApiNotFoundResponse({ description: 'Resource not found' })
	remove(@Param('id') id: string): Promise<void> {
		return this.technologyService.remove(id);
	}
}
