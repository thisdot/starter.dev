import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Technology } from './technology.model';
import { TechnologyController } from './technology.controller';
import { TechnologyService } from './technology.service';

@Module({
	imports: [SequelizeModule.forFeature([Technology])],
	providers: [TechnologyService],
	controllers: [TechnologyController],
})
export class TechnologyModule {}
