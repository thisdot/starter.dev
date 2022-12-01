// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { bootstrapApp } from './bootstrap-app';
import { dataSource } from './datasource';
import cors from 'cors';

const PORT = process.env.PORT || 3333;

const app = bootstrapApp();

const whitelist: string[] = JSON.parse(process.env.CORS_ALLOWED_ORIGINS || []);

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
};

app.use(cors(corsOptions));

dataSource
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized!`);
  })
  .catch((err) => {
    console.error(`Error during Data Source initialisation:`, err);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
