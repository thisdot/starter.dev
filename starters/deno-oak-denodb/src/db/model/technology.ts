import { DataTypes, Model } from '../../../deps.ts';

export class Technologies extends Model {
	static table = 'technologies';
	static timestamps = true;

	static fields = {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		displayName: { type: DataTypes.STRING },
		description: { type: DataTypes.STRING },
		url: { type: DataTypes.STRING },
	};
}
