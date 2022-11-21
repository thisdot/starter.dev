import { bootstrapApp } from './bootstrap-app';

const port = 3000;

const app = bootstrapApp();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
