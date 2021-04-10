import express from 'express';
import router from '@shared/infra/http/routes';

import './database';
import '@shared/container';

const app = express();
app.use(express.json());
app.use(router);

app.listen(3333, () => {
  console.log('Server started on port 3333 🎈');
});
