// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { bootstrapApp } from './bootstrap-app';
import { dataSource } from './datasource';

const PORT = process.env.PORT || 3333;

const app = bootstrapApp();

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
