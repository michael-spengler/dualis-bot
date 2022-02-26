import { opine, json } from "https://deno.land/x/opine@2.1.1/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import Routes from './routes/routes.ts';
import Utils from "./utils/utils.ts"
import authMiddleware from "./middleware/authMiddleware.ts"

const app = opine();

app.use(json())

const port = parseInt(Deno.env.get("PORT") as string);
if (Number.isNaN(port)) {
    console.error("Port must be a number")
    Deno.exit(1);
}

//setup mongodb
const client = await Utils.getDatabaseClient()

app.use('/api/v1', Routes);

app.listen(
    port,
    () => console.log(`server has started on http://localhost:${port} 🚀`),
);