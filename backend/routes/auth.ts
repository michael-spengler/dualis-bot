import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import {IUser} from "../interfaces/user.interface.ts"
import User from "../interfaces/user.interface.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { create } from "https://deno.land/x/djwt@v2.2/mod.ts"
const router = Router();

router.post('/login', async (req, res) => {
    try{
        let user = await User.findOne({username: req.body.username})
        if (!user) {
            res.setStatus(401).send()
            return
        }
        //throws error if comparison fails
        await bcrypt.compare(req.body.password, user.password)

        let jwt = await create({alg: "HS512", typ:"JWT"}, {userId: user._id},  Deno.env.get("JWT_SECRET") as string)
        res.json({"jwt":jwt})

    } catch(e) {
        res.setStatus(401).send()
    }
})

router.post("/register", async (req, res) => {
    try {
        let user:IUser = req.body
        user.password = await bcrypt.hash(user.password)
        await User.insertOne(req.body)
        res.setStatus(201).send()
    } catch (e) {
        res.setStatus(400).json(e)
    }
})


export default router;