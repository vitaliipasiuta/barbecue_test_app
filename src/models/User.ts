import { Document, Model, model, Schema, Types } from 'mongoose';

const collectionName = 'user';

export interface IUser extends Document {
  title: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
},                            {pluralize: false, collection: String(collectionName)});

type UserModel = Model<IUser> & IUser;

const User: UserModel = model<IUser>(String(collectionName), userSchema) as UserModel;

export {
  User,
};
