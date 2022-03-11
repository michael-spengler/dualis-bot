import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import { MongoClient } from "../deps.ts";
import { everyMinute } from "../deps.ts";
import { Aes } from "../deps.ts";
import { Cbc, Padding } from "../deps.ts";
import { encodeToString, decodeString } from "../deps.ts";
import User from "../collections/user.collection.ts"
import IUser from "../interfaces/user.interface.ts"
import { getDualisChanges, getDualisSummary } from "../dualis/dualis.ts"
import {IDualisCourse } from "../interfaces/dualis.interface.ts"

export default class Utils {
    static client: any;
    static async getDatabaseClient(): Promise<any> {
        if (Utils.client == undefined) {
            try {
                Utils.client = await new MongoClient();
                await Utils.client.connect("mongodb+srv://dualis-bot:" + Deno.env.get("DATABASE_PASSWORD") + "@cluster0.mw4xn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1&authSource=admin")
            } catch (e) {
                console.error(e)
            }
        }
        return Utils.client;
    }

    static encrypt(plainData: string) {
        const te = new TextEncoder();
        const key = te.encode(Deno.env.get("AES_SECRET"));
        const data = te.encode(plainData);
        const iv = new Uint8Array(16);
        const cipher = new Cbc(Aes, key, iv, Padding.PKCS7);
        const bytecipher = cipher.encrypt(data)
        return encodeToString(bytecipher)
    }

    static decrypt(encryptedData: string) {
        const te = new TextEncoder();
        const td = new TextDecoder();
        const key = te.encode(Deno.env.get("AES_SECRET"));
        const iv = new Uint8Array(16);
        const decipher = new Cbc(Aes, key, iv, Padding.PKCS7);
        const decrypted = decipher.decrypt(decodeString(encryptedData));
        return td.decode(decrypted)

    }

    static setupCronjob() {
        everyMinute(async () => {
            console.log("running dualis check for every user")
            await User.find({ active: true }).forEach(async (user: IUser) => {
                try {
                    const dualisSummary = await getDualisSummary(Utils.decrypt(user.dualis_username), Utils.decrypt(user.dualis_password));
                    const changes = await getDualisChanges(user._id, dualisSummary)
                    console.log("user:" + user._id + ", changes:", changes)
                    if (changes.length > 0) {
                        await User.updateOne({ _id: user._id }, { "$set": { dualisSummary: dualisSummary } })
                        await this.notifyUser(user, changes)
                    }
                } catch (e) {
                    console.error(e)
                }
            })
        })
    }

    static notifyUser(userId: IUser, dualisChanges: IDualisCourse[]) {
        console.log("notifications not implemented yet", userId, dualisChanges)
    }

}