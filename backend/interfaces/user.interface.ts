import {
  Bson,
} from "../deps.ts";
import Utils from "../utils/utils.ts"
import {IDualisCourse} from "./dualis.interface.ts"

export interface IUser {
  _id: Bson.ObjectId;
  username: string;
  password: string;
  dualis_username: string;
  dualis_password: string;
  active: boolean,
  notifications: {
    email: {
      notificationEmail: string,
      withGrades: boolean,
      active: boolean
    },
    discord: {
      notificationEmail: string,
      withGrades: boolean,
      active: boolean
    },
    telegram: {
      notificationEmail: string,
      withGrades: boolean,
      active: boolean
    }
  }
  dualisSummary: IDualisCourse[]
}


export default (await Utils.getDatabaseClient()).database("myFirstDatabase").collection<IUser>("users");

