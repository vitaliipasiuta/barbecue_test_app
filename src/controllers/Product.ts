import { Request, Response } from 'express';
import { isNaN, toNumber } from 'lodash';
import { App } from '../App';
import { addBestOffer, filterKebabsOnly, filterSteaksOnly, freeDrink } from '../helpers/util';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

export class ProductController {
  public static async getAllProducts(req: Request, res: Response): Promise<void> {
    let products = await Product.find().populate('category');
    products = addBestOffer(products);
    products = freeDrink(products);
    res.json(products);
  }

  public static async getProductById(req: Request, res: Response): Promise<void> {
    const id = toNumber(req.params.id);
    if (isNaN(id)) {
      res.send('Id should be number');
    } else {
      const product = await Product.findOne({id});
      res.json(product);
    }
  }

  public static async getProductByCategory(req: Request, res: Response): Promise<void> {
    const category = await Category.findOne({title: req.params.category});
    const product = await Product.find({category: category._id});
    res.json(product);
  }

  public static async getSteaksOnly(req: Request, res: Response): Promise<void> {
    const products = await Product.find();
    res.json(filterSteaksOnly(products));
  }

  public static async getKebabsOnly(req: Request, res: Response): Promise<void> {
    const products = await Product.find();
    res.json(filterKebabsOnly(products));
  }

  public static async getBeer(req: Request, res: Response): Promise<void> {
    const uri = `${App.config.get('beercomua')}/beer`;
    const beerServiceResponse = await App.httpClient.get(uri);
    try {
      const body = JSON.parse(beerServiceResponse.body);
      res.json(body);
    } catch (e) {
      throw new Error(e);
    }
  }
}
