import { ModelFields } from 'https://deno.land/x/denodb@v1.1.0/lib/model';
import { DataTypes, Model } from '../../../deps.ts';

export class Technologies extends Model {
  static table = 'technologies';
  static timestamps = true;

  static fields: ModelFields = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
  };
}
