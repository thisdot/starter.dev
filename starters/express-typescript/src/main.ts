import { bootstrapApp } from './bootstrap-app';

const PORT = process.env.PORT || 3000;

const app = bootstrapApp();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
