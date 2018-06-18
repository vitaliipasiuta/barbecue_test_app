import { Request, Response } from 'express';
import { Category } from '../models/Category';

export class CategoryController {
  public static async getAllCategories(req: Request, res: Response): Promise<void> {
    const categories = await Category.find();
    res.json(categories);
  }

  public static async getCategoryByTitle(req: Request, res: Response): Promise<void> {
    const title = req.params.category;
    const category = await Category.findOne({title});
    res.json(category);
  }
}
