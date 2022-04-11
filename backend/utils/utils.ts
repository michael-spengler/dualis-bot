import {
  Aes,
  Cbc,
  decodeString,
  encodeToString,
  MongoClient,
  Padding,
} from "../deps.ts";
import IUser from "../interfaces/user.interface.ts";
import { IDualisCourse } from "../interfaces/dualis.interface.ts";

import sendEmail from "../notifications/email.ts";

import * as telegram from "../notifications/telegram.ts";
import * as msg from "../notifications/message.ts";
import * as discord from "../notifications/discord.ts";

import "https://deno.land/x/dotenv/load.ts";


export default class Utils {
  static client: any;
  static async getDatabaseClient(): Promise<any> {
    if (Utils.client == undefined) {
      try {
        Utils.client = await new MongoClient();
        await Utils.client.connect(
          "mongodb+srv://dualis-bot:" + Deno.env.get("DATABASE_PASSWORD") +
            "@cluster0.mw4xn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1&authSource=admin",
        );
      } catch (e) {
        console.error(e);
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
    const bytecipher = cipher.encrypt(data);
    return encodeToString(bytecipher);
  }

  static decrypt(encryptedData: string) {
    const te = new TextEncoder();
    const td = new TextDecoder();
    const key = te.encode(Deno.env.get("AES_SECRET"));
    const iv = new Uint8Array(16);
    const decipher = new Cbc(Aes, key, iv, Padding.PKCS7);
    const decrypted = decipher.decrypt(decodeString(encryptedData));
    return td.decode(decrypted);
  }

  static async notifyUser(user: IUser, dualisChanges: IDualisCourse[]) {
    console.log(
      "notifications not implemented complete yet",
      user,
      dualisChanges,
    );
    //Telegram Notification
    const telegramBotToken = Deno.env.get("TELEGRAM_BOT") || "";
    const targetID = user.notifications.telegram.notificationNumber; //Id of user or chat https://www.alphr.com/find-chat-id-telegram/  RawDataBot
    const personalMessage = user.notifications.telegram.withGrades; //check if personal message is necessary for msg function
    //send funny sticker before serious message
    telegram.sendSticker(
      targetID,
      "CAACAgIAAxkBAAMhYiiuBKoE0HYsdRMUzs_vWVShJH0AArkQAAIlbhhJi3IrcMj-D6YjBA",
      telegramBotToken,
    );
    telegram.sendMessage(
      targetID,
      msg.getMessageFromChanges(dualisChanges, personalMessage, "%0A"),
      telegramBotToken,
    );

    //Discord Notification
    const discordBotToken = Deno.env.get("DISCORD_TOKEN") || "";
    const chatID = user.notifications.discord.chatId;
    const personalMessageDiscord = user.notifications.discord.withGrades;
    discord.sendMessageDiscord(
      chatID,
      msg.getMessageFromChanges(dualisChanges, personalMessageDiscord, "%0A"),
      discordBotToken,
    );

    //Email Notification
    const mailTo = user.notifications.email.notificationEmail;
    const personalMessageEmail = user.notifications.email.withGrades;
    const smtpConfig = {
      hostname: Deno.env.get("SMTP_HOST") as string,
      port: 465,
      username: Deno.env.get("EMAIL") as string,
      password: Deno.env.get("EMAIL_PASS") as string,
    };
    console.log(smtpConfig)
    const emailConfig = {
      from: Deno.env.get("EMAIL") as string,
      to: mailTo,
      subject: "DHBW Dualis Bot - Notenupdate",
      content: msg.getMessageFromChanges(
        dualisChanges,
        personalMessageEmail,
        "<br>",
      ),
      html: "",
    };

    await sendEmail(smtpConfig, emailConfig);
  }
}
