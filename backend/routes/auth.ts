import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { IUser } from "../interfaces/user.interface.ts"
import User from "../interfaces/user.interface.ts"
import userSchema from "../schemas/user.schema.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { create } from "https://deno.land/x/djwt@v2.2/mod.ts"
import Utils from "../utils/utils.ts"
const router = Router();


router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.setStatus(401).send()
            return
        }
        //throws error if comparison fails
        await bcrypt.compare(req.body.password, user.password)

        let jwt = await create({ alg: "HS512", typ: "JWT" }, { userId: user._id }, Deno.env.get("JWT_SECRET") as string)
        res.json({ "jwt": jwt })

    } catch (e) {
        res.setStatus(401).send()
    }
})

router.post("/register", async (req, res) => {
    try {
        try {
            userSchema.assert(req.body)
        } catch (e) {
            res.setStatus(400).json(userSchema.validate(req.body).toString())
            return
        }
        let user = req.body;
        user.password = await bcrypt.hash(user.password)
        user.dualis_password = Utils.encrypt(user.dualis_password)
        user.dualis_username = Utils.encrypt(user.dualis_username)
        await User.insertOne(user)
        res.setStatus(201).send()
    } catch (e) {
        res.setStatus(400).json(e)
    }
})


export default router;