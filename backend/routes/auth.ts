import { bcrypt, create, OpineRequest, OpineResponse } from "../deps.ts";
import IUser from "../interfaces/user.interface.ts";
import User from "../collections/user.collection.ts";
import userSchema from "../schemas/user.schema.ts";
import Utils from "../utils/utils.ts";
import { getDualisSummary } from "../dualis/dualis.ts";
import _sendEmail from "../notifications/email.ts";

export default class AuthController {
  static async loginUser(req: OpineRequest, res: OpineResponse) {
    try {
      const user = <
        | IUser
        | null
      > (await User.findOne({ username: Utils.encrypt(req.body.username) }));

      if (!user) {
        res.setStatus(401).send();
        return;
      }

      if (!await bcrypt.compare(req.body.password, user.password)) {
        throw new Error();
      }

      const jwt = await create({ alg: "HS512", typ: "JWT" }, {
        userId: user._id,
      }, Deno.env.get("JWT_SECRET") as string);
      res.json({ "jwt": jwt });
    } catch (_e) {
      res.setStatus(401).send();
    }
  }

  static async registerUser(req: OpineRequest, res: OpineResponse) {
    try {
      try {
        userSchema.assert(req.body);
      } catch (_e) {
        res.setStatus(400).json(userSchema.validate(req.body).toString());
        return;
      }
      const user = req.body as IUser;

      const userCheck = await User.findOne({
        username: Utils.encrypt(user.username),
      });
      if (userCheck) {
        res.setStatus(400).json({ err: "user with that name already exists" });
        return;
      }

      user.dualisSummary = await getDualisSummary(
        user.dualis_username,
        user.dualis_password,
      );
      user.password = await bcrypt.hash(user.password);
      user.username = Utils.encrypt(user.username);
      user.dualis_password = Utils.encrypt(user.dualis_password);
      user.dualis_username = Utils.encrypt(user.dualis_username);
      user.active = true;

      await User.insertOne(user);
      res.setStatus(201).send();
    } catch (e) {
      res.setStatus(400).json(e);
    }
  }
}
