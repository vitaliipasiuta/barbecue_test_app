import { App } from './App';
import { Server } from './Server';

App.INIT();

const server = new Server();
server.listen(<number> App.config.get('server:port'));

server.onError((error: NodeJS.ErrnoException) => {
  App.logger.error(error.stack);
  process.exit(1);
});

export {
  server,
};
