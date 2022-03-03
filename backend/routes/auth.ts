import { Router } from "../deps.ts";
import { bcrypt } from "../deps.ts";
import { create } from "../deps.ts";
import { IUser } from "../interfaces/user.interface.ts"
import User from "../interfaces/user.interface.ts"
import userSchema from "../schemas/user.schema.ts"
import Utils from "../utils/utils.ts"
import { getDualisSummary } from "../dualis/dualis.ts"

const router = Router();


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: Utils.encrypt(req.body.username) })
        if (!user) {
            res.setStatus(401).send()
            return
        }
        //throws error if comparison fails
        await bcrypt.compare(req.body.password, user.password)

        const jwt = await create({ alg: "HS512", typ: "JWT" }, { userId: user._id }, Deno.env.get("JWT_SECRET") as string)
        res.json({ "jwt": jwt })

    } catch (_e) {
        res.setStatus(401).send()
    }
})

router.post("/register", async (req, res) => {
    try {
        try {
            userSchema.assert(req.body)
        } catch (_e) {
            res.setStatus(400).json(userSchema.validate(req.body).toString())
            return
        }
        const user = req.body as IUser;

        const userCheck = await User.findOne({ username: Utils.encrypt(user.username) })
        if (userCheck) {
            res.setStatus(400).json({ err: "user with that name already exists" })
            return
        }

        user.dualisSummary = await getDualisSummary(user.dualis_username, user.dualis_password)
        user.password = await bcrypt.hash(user.password)
        user.username = Utils.encrypt(user.username)
        user.dualis_password = Utils.encrypt(user.dualis_password)
        user.dualis_username = Utils.encrypt(user.dualis_username)

        await User.insertOne(user)
        res.setStatus(201).send()
    } catch (e) {
        res.setStatus(400).json(e)
    }
})


export default router;