import { Server } from '../../src/Server';

export class ServerInstance {
    public server: Server;

    constructor() {
      this.server = new Server();
      this.server.listen(<number> this.randomInteger(3001, 4000));
    }

    private randomInteger(min: number, max: number): number {
      const rand = min + Math.random() * (max - min);

      return Math.round(rand);
  }
}
