import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import { MongoClient } from "../deps.ts";
import { Bson } from "../deps.ts";
import { everyMinute } from "../deps.ts";
import { Aes } from "../deps.ts";
import { Cbc, Padding } from "../deps.ts";
import { encodeToString, decodeString } from "../deps.ts";
import User from "../interfaces/user.interface.ts"
import {IUser} from "../interfaces/user.interface.ts"
import { getDualisChanges, getDualisSummary } from "../dualis/dualis.ts"
import {IDualisCourse } from "../interfaces/dualis.interface.ts"

import * as telegram from "../notifications/telegram.ts"
import * as msg from "../notifications/message.ts"
import * as discord from "../notifications/discord.ts"


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
            await User.find({ active: true }).forEach(async (user) => {
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

    static notifyUser(user: IUser, dualisChanges: IDualisCourse[]) {
        console.log("notifications not implemented complete yet", user, dualisChanges)

        //Telegram Notification
        const telegramBotToken = Deno.env.get("TELEGRAM_BOT") || ""
        const targetID = user.notifications.telegram.notificationNumber //Id of user or chat https://www.alphr.com/find-chat-id-telegram/  RawDataBot
        const personalMessage = user.notifications.telegram.withGrades  //check if personal message is necessary for msg function
        //send funny sticker before serious message
        telegram.sendSticker(targetID, "CAACAgIAAxkBAAMhYiiuBKoE0HYsdRMUzs_vWVShJH0AArkQAAIlbhhJi3IrcMj-D6YjBA", telegramBotToken)
        telegram.sendMessage(targetID, msg.getMessageFromChanges(dualisChanges, personalMessage, "%0A"), telegramBotToken) 
        
        //Discord Notification
        const discordBotToken = Deno.env.get("DISCORD_TOKEN") || ""
        const chatID = user.notifications.discord.chatID //chatID fehlt noch
        const personalMessageDiscord = user.notifications.discord.withGrades;
        discord.sendMessageDis(chatID, msg.getMessageFromChanges(dualisChanges, personalMessageDiscord, "%0A"), discordBotToken);
    }

}