import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Technology } from '../entities/technology.entity';

export default class TechnologySeeder implements Seeder {
	public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
		const repository = dataSource.getRepository(Technology);

		await repository.insert([
			{
				displayName: 'Express',
				description:
					'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. APIs.',
			},
			{
				displayName: 'TypeOrm',
				description:
					'TypeORM is a TypeScript ORM (object-relational mapper) library that makes it easy to link your TypeScript application up to a relational database database.',
			},
			{
				displayName: 'Postgres',
				description:
					'PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance.',
			},
		]);
	}
}
