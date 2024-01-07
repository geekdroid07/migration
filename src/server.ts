import Logger from './infrastructure/core/Logger';
import { port, environment } from './config';
import app from './app';

app
  .listen(port, (err, address) => {
    if (err) {
      Logger.error(err)
    }
    Logger.info(`
    Alfa is running at ${address}:${port}
    Environment: ${environment}
  `);
  });
