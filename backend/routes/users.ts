import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import {IUser} from "../interfaces/user.interface.ts"
import User from "../interfaces/user.interface.ts"
import { decode } from "https://deno.land/x/djwt@v2.2/mod.ts"
import {
    Bson,
  } from "https://deno.land/x/mongo@v0.29.2/mod.ts";

 interface IJWTPayload {
    userId: Bson.ObjectId
}


const router = Router();

router.get("/user", async (req, res) => {
    try {
        const payload = decode(req.headers.get("auth")as string)
        const userId = ((payload[1] as IJWTPayload).userId);
        const user = await User.findOne({_id: new Bson.ObjectId(userId)})
        if(!user) {
            res.setStatus(404).send()
            return
        }
        user.password = "";
        res.json(user)
    } catch (e) {
        res.setStatus(500).json(e)
    }
})

router.put("/user", async(req, res) => {
    try{
        const payload = decode(req.headers.get("auth")as string)
        const userId = ((payload[1] as IJWTPayload).userId);
        const user = await User.updateOne({_id: new Bson.ObjectId(userId)}, {$set: req.body})
        if (!user) {
            res.setStatus(500).send()
            return
        }
        res.setStatus(204).send()
    } catch(e) {
        console.log(e)
        res.setStatus(400).json(e)
    }
})





export default router;