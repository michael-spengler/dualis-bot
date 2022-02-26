
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.95.0/path/mod.ts";
import {
  json,
  opine,
  Router,
  serveStatic,
  urlencoded,
} from "https://deno.land/x/opine@1.3.3/mod.ts";

import usersRouter from "./routes/users.ts";

const __dirname = fromFileUrl(dirname(import.meta.url));

const app = opine();

// Handle different incoming body types
app.use(json());
app.use(urlencoded());

// Serve our static assets
app.use(serveStatic(join(__dirname, "public")));

// Mount our routers
app.use("/users", usersRouter);  

export default app;
