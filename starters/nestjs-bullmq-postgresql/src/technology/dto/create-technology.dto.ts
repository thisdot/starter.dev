import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTechnologyDto {
	@ApiProperty({
		type: String,
		description: 'This is a required property',
	})
	displayName: string;
	@ApiProperty({
		type: String,
		description: 'This is a required property',
	})
	description: string;
	@ApiProperty({
		type: String,
		description: 'This is a required property',
	})
	url: string;
}
