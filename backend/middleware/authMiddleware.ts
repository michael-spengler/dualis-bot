import { OpineRequest, OpineResponse, NextFunction } from "../deps.ts";
import { verify } from "../deps.ts";

export default async function authMiddleware(req: OpineRequest, res: OpineResponse, next: NextFunction) {
    try {
        const jwt = req.headers.get("auth") as string
        await verify(jwt, Deno.env.get("JWT_SECRET") as string, "HS512")
    } catch (_e) {
        res.setStatus(401).send()
        return
    }
    next()
}

