import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import { IUser } from "../interfaces/user.interface.ts"
import User from "../interfaces/user.interface.ts"
import userSchema from "../schemas/user.schema.ts"
import { decode } from "https://deno.land/x/djwt@v2.2/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import Utils from "../utils/utils.ts"
import {
    Bson,
} from "https://deno.land/x/mongo@v0.29.2/mod.ts";

interface IJWTPayload {
    userId: Bson.ObjectId
}


const router = Router();

router.get("/user", async (req, res) => {
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


        res.json(user)
    } catch (err) {
        res.setStatus(500).json({ err: err })
    }
})

//add validation
router.put("/user", async (req, res) => {
    try {
        const payload = decode(req.headers.get("auth") as string)
        const userId = ((payload[1] as IJWTPayload).userId);

        let user = await User.findOne({ _id: new Bson.ObjectId(userId) })
        let updatedUser = { ...user, ...req.body }
        try {
            userSchema.assert(updatedUser)
        } catch (e) {
            res.setStatus(400).json(userSchema.validate(updatedUser).toString())
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
})





export default router;