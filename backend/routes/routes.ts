import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";

import UserRouter from './users.ts';

const router = Router();

router.use('/user', UserRouter);

export default router;