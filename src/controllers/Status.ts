import {Request, Response} from 'express';

export class StatusController {

  static getStatus(req: Request, res: Response): void {
    res.json({
      status: true,
      success: true,
    });
  }
}
