import { MongoClient } from "https://deno.land/x/mongo@v0.29.2/mod.ts"
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env

export default class Utils {
    static client: MongoClient;
    static async getDatabaseClient(): Promise<MongoClient> {
        if (Utils.client == undefined) {
            try {
                Utils.client = new MongoClient();
                await Utils.client.connect("mongodb+srv://dualis-bot:" + Deno.env.get("DATABASE_PASSWORD") + "@cluster0.mw4xn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1&authSource=admin")
               /*
                await Utils.client.connect({
                    db: "myFirstDatabase",
                    tls: true,
                    servers: [
                        {
                            host: "cluster0-shard-00-00.mw4xn.mongodb.net",
                            port: 27017,
                        },
                        {
                            host: "cluster0-shard-00-01.mw4xn.mongodb.net",
                            port: 27017,
                        },
                        {
                            host: "cluster0-shard-00-02.mw4xn.mongodb.net",
                            port: 27017,
                        },
                    ],
                    credential: {
                        username: "dualis-bot",
                        password: Deno.env.get("DATABASE_PASSWORD"),
                        db: "myFirstDatabase",
                        mechanism: "SCRAM-SHA-1",
                    },
                });
                */
            } catch (e) {
                console.error(e)
            }
        }
        return Utils.client;
    }

}