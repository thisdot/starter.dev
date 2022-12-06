// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { bootstrapApp } from './bootstrap-app';
import { dataSource } from './datasource';
import { LogHelper } from './utils/log-helper';

const PORT = process.env.PORT || 3333;

const app = bootstrapApp();

dataSource
  .initialize()
  .then(() => {
    LogHelper.info(`Data Source has been initialized!`);
  })
  .catch((err) => {
    LogHelper.error(`Error during Data Source initialisation:`, err);
  });

app.listen(PORT, () => {
  LogHelper.info(`Example app listening on port ${PORT}`);
});
