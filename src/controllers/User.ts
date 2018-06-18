import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserController {
  public static async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await User.find();
    res.json(users);
  }

  public static async getUserByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    const user = await User.findOne({ name });
    res.json(user);
  }
}
