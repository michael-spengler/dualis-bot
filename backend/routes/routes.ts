import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import authMiddleware from "../middleware/authMiddleware.ts"

import UserRouter from './users.ts';
import AuthRouter from './auth.ts'

const router = Router();

router.use('/', AuthRouter);
router.use('/', authMiddleware, UserRouter);

export default router;