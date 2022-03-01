import {
  Bson,
} from "https://deno.land/x/mongo@v0.29.2/mod.ts";
import Utils from "../utils/utils.ts"

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
}
export default (await Utils.getDatabaseClient()).database("myFirstDatabase").collection<IUser>("users");

