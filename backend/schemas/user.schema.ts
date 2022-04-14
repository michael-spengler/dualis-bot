import { Schema } from "../deps.ts";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  dualis_username: { type: String, required: true },
  dualis_password: { type: String, required: true },
  active: { type: Boolean, required: true },
  notifications: {
    email: {
      notificationEmail: { type: String },
      withGrades: { type: Boolean },
      active: { type: Boolean },
    },
    discord: {
      chatId: { type: String },
      withGrades: { type: Boolean },
      active: { type: Boolean },
    },
    telegram: {
      notificationNumber: { type: String },
      withGrades: { type: Boolean },
      active: { type: Boolean },
    },
  },
});
export default userSchema;
