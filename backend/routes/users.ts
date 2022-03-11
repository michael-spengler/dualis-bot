import { decode } from "../deps.ts"
import { bcrypt } from "../deps.ts";
import { Bson, Collection } from "../deps.ts";
import { OpineRequest, OpineResponse } from "../deps.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import User from "../collections/user.collection.ts"
import IUser from "../interfaces/user.interface.ts"
import userSchema from "../schemas/user.schema.ts"
import Utils from "../utils/utils.ts"

interface IJWTPayload {
    userId: Bson.ObjectId
}

export default class UserController {
    

    static async getLoggedInUser(req: OpineRequest, res: OpineResponse) {
        try {
            const payload = decode(req.headers.get("auth") as string)
            const userId = ((payload[1] as IJWTPayload).userId);
            const user = await User.findOne({ _id: new Bson.ObjectId(userId) })
            if (!user) {
                res.setStatus(404).send()
                return
            }
            user.password = "";
            user.dualis_password = "";
            user.dualis_username = "";
            user.username = Utils.decrypt(user.username)


            res.json(user)
        } catch (err) {
            res.setStatus(500).json({ err: err })
        }
    }



    static async updateLoggedInUser(req: OpineRequest, res: OpineResponse) {
        try {
            const payload = decode(req.headers.get("auth") as string)
            const userId = ((payload[1] as IJWTPayload).userId);

            const user = await User.findOne({ _id: new Bson.ObjectId(userId) })
            const updatedUser = { ...user, ...req.body }
            try {
                userSchema.assert(updatedUser)
            } catch (_e) {
                res.setStatus(400).json(userSchema.validate(updatedUser).toString())
                return
            }

            if (req.body.username) {
                res.setStatus(400).json({ err: "username cannot be changed" })
                return
            }

            if (req.body.password) {
                updatedUser.password = await bcrypt.hash(updatedUser.password)
            }
            if (req.body.dualis_password) {
                updatedUser.dualis_password = Utils.encrypt(updatedUser.dualis_password)
            }
            if (req.body.dualis_username) {
                updatedUser.dualis_username = Utils.encrypt(updatedUser.dualis_username)
            }

            await User.updateOne({ _id: new Bson.ObjectId(userId) }, { $set: updatedUser })
            res.setStatus(204).send()
        } catch (err) {
            res.setStatus(400).json({ err })
        }
    }


}

