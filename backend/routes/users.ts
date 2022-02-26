import { Router } from "https://deno.land/x/opine@1.3.3/mod.ts";

const router = Router();

// GET users listing.
router.get("/", (_req, res, _next) => {
  res.send("Users are coming shortly!");
});

export default router;
