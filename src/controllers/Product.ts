import {Request, Response} from 'express';
import {filterSteaksOnly, filterKebabsOnly} from '../helpers/util';
import {Product} from "../models/Product";
import {Category} from "../models/Category";
import {App} from "../App";

export class ProductController {
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    const categories = await Product.find().populate('category');
    res.json(categories);
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const product = await Product.findOne({ id });
    res.json(product);
  };

  static async getProductByCategory(req: Request, res: Response): Promise<void> {
    const category = await Category.findOne({ title: req.params.category });
    const product = await Product.find({ category: category._id });
    res.json(product);
  };

  static async getSteaksOnly(req: Request, res: Response): Promise<void> {
    const products = await Product.find();
    res.json(filterSteaksOnly(products));
  };

  static async getKebabsOnly(req: Request, res: Response): Promise<void> {
    const products = await Product.find();
    res.json(filterKebabsOnly(products));
  };

  static async getBeer(req: Request, res: Response): Promise<void> {
    const uri = `${App.config.get('beercomua')}/beer`;
    const beerServiceResponse = await App.httpClient.get(uri);
    try {
      const body = JSON.parse(beerServiceResponse.body);
      res.json(body);
    } catch (e) {
      throw new Error(e);
    }
  };
}
