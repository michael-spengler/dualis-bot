import { opine, json } from "./deps.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import Routes from './routes/routes.ts';
import Utils from "./utils/utils.ts"
import { opineCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
const app = opine();

app.use(json())
app.use(opineCors())

Utils.setupCronjob()

const port = parseInt(Deno.env.get("BACKEND_PORT") as string);
if (Number.isNaN(port)) {
    console.error("Port must be a number")
    Deno.exit(1);
}

//setup mongodb
await Utils.getDatabaseClient()
app.use('/api/v1', Routes);

app.listen(
    port,
    () => console.log(`server has started on http://localhost:${port} 🚀`),
);
