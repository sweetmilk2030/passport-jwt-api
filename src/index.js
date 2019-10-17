import debug from 'debug';
import app from './app';

const dbg = debug('BE001:main');

const port = process.env.PORT || 4200;

(async () => {
  await app.listen(port);
  dbg(`Server is listening on port ${port}`);
})();
