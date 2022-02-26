import { OpineRequest, OpineResponse, NextFunction } from "https://deno.land/x/opine@2.1.1/mod.ts"
import { verify, create } from "https://deno.land/x/djwt@v2.2/mod.ts"

export default async function authMiddleware(req: OpineRequest, res: OpineResponse, next: NextFunction) {
    try {
        let jwt = req.headers.get("auth") as string
        await verify(jwt, Deno.env.get("JWT_SECRET") as string, "HS512")
    } catch (e) {
        res.setStatus(401).send()
        return
    }
    next()
}

