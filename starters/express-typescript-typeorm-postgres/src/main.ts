// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { bootstrapApp } from './bootstrap-app';
import { initialiseDataSource } from './db/datasource';
import { LogHelper } from './utils/log-helper';

const PORT = process.env.PORT || 3333;

const app = bootstrapApp();

initialiseDataSource().then((isInitialised: boolean) => {
  if (isInitialised) {
    LogHelper.log(`DataSource has been initialised!`);
  } else {
    LogHelper.error(`Could not initialise database connection`);
  }
});

app.listen(PORT, () => {
  LogHelper.info(`Example app listening on port ${PORT}`);
});
