import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env

const router = Router();


router.get("/", (_req, res) => {
    res.send("HelloWorld")
})

export default router;