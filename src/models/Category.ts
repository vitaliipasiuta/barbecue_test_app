import { Document, Model, model, Schema, Types } from 'mongoose';

const collectionName = 'category';

export interface ICategory extends Document {
  title: string;
}

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
},                                {pluralize: false, collection: String(collectionName)});

type CategoryModel = Model<ICategory> & ICategory;

const Category: CategoryModel = model<ICategory>(String(collectionName), categorySchema) as CategoryModel;

export {
  Category,
};
