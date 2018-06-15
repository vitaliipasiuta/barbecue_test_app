import { resolve } from 'path';
import { BaseApp, Config, HttpClient, Logger } from 'tc-nodejs-core-services';

/**
 * Access point for modules/services in the application
 */
export class App extends BaseApp {

  public static get config(): Config {
    return BaseApp.config;
  }

  public static get logger(): Logger {
    return BaseApp.logger;
  }

  public static get httpClient(): HttpClient {
    return BaseApp.httpClient;
  }

  public static get appDir(): string {
    return __dirname;
  }

  public static INIT() {
    BaseApp.config = new Config(resolve(__dirname, '../config/app.json'));
    BaseApp.logger = new Logger(BaseApp.config.get('logger:level'), {application: 'price-ticket'});
    BaseApp.httpClient = new HttpClient(BaseApp.config, BaseApp.logger);
  }
}
