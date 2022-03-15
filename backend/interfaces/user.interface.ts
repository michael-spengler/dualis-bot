import {
  Bson,
} from "../deps.ts";

import {IDualisCourse} from "./dualis.interface.ts"

export default interface IUser {
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
      chatId: string,
      withGrades: boolean,
      active: boolean
    },
    telegram: {
      notificationNumber: string,
      withGrades: boolean,
      active: boolean
    }
  }
  dualisSummary: IDualisCourse[]
}




