import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import { App } from './App';
import { router } from './routes';

export class Server {

  private readonly expressApp: express.Application;
  private httpServer: http.Server;

  constructor() {
    this.expressApp = express();
    this.initMiddlewares();
    this.initRoutes();
    this.connectToDB()
      .then(() => console.log("Successfully connected to DB"))
      .catch((err) => console.log("Connection to db has been failed", err));
  }

  get express(): express.Application {
    return this.expressApp;
  }

  public listen(port: number): void {
    this.expressApp.on('listening', () => {
      App.logger.info(`Listening on ${port}`);
    });

    this.httpServer = this.expressApp.listen(port);
  }

  public onError(callback: (error: NodeJS.ErrnoException) => void) {
    this.expressApp.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      callback(error);
    });
  }

  public close(callback?: Function): void {
    this.httpServer.close(callback);
  }

  /**
   * http(s) request middleware
   */
  private initMiddlewares(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.disable('etag');
    this.express.use((req, res, next) => {
      App.logger.info('request');

      res.header('Access-Control-Allow-Origin', '*'); // dev only
      res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if (req.method === 'OPTIONS') {
        res.status(200).send();
      } else {
        next();
      }
    });
  }

  /**
   * API main routes
   */
  private initRoutes(): void {
    this.express.use(router);
    this.express.use('/', (req, res) => {
      res.status(404).send({error: `path doesn't exist`});
    });
  }

  private connectToDB(): Promise<void> {
    const name = App.config.get('db:name');
    const host = App.config.get('db:host');
    const port = App.config.get('db:port');

    console.log("Connecting to Database");

    return new Promise((resolve, reject) => {
      mongoose.connect(`mongodb://${host}:${port}/${name}`);
      mongoose.connection.on("error", () => {
        console.log("MongoDB connection error. Please make sure MongoDB is running.");
        process.exit();
      });

      resolve();
    });
  }
}
