import { Column, Model, Table, DataType, PrimaryKey } from 'sequelize-typescript';

@Table
export class Technology extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	public id;

	@Column
	displayName: string;

	@Column
	description: string;

	@Column
	url: string;
}
