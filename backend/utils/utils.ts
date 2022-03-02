import { MongoClient } from "https://deno.land/x/mongo@v0.29.2/mod.ts"
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import {
    Bson,
  } from "https://deno.land/x/mongo@v0.29.2/mod.ts";
  import { Aes } from "https://deno.land/x/crypto/aes.ts";
import { Cbc, Padding } from "https://deno.land/x/crypto/block-modes.ts";
import { encode, encodeToString, decodeString } from "https://deno.land/std@0.95.0/encoding/hex.ts"

export default class Utils {
    static client: MongoClient;
    static async getDatabaseClient(): Promise<MongoClient> {
        if (Utils.client == undefined) {
            try {
                Utils.client = new MongoClient();
                await Utils.client.connect("mongodb+srv://dualis-bot:" + Deno.env.get("DATABASE_PASSWORD") + "@cluster0.mw4xn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1&authSource=admin")
            } catch (e) {
                console.error(e)
            }
        }
        return Utils.client;
    }

    static encrypt(plainData:string) {
        const te = new TextEncoder();
        const key = te.encode(Deno.env.get("AES_SECRET"));
        const data = te.encode(plainData);
        const iv = new Uint8Array(16);
        const cipher = new Cbc(Aes, key, iv, Padding.PKCS7);
        let bytecipher = cipher.encrypt(data)
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

    static setupCronjob () {
    }

    static notifyUser(userId:Bson.ObjectId, dualisChanges: any) {

    }

}