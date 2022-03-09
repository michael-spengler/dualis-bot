import {IUser} from "../interfaces/user.interface.ts"
import {IDualisCourse} from "../interfaces/dualis.interface.ts"
import {Request} from 'https://deno.land/x/request@1.3.0/request.ts'
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env

export async function sendMessage(targetID: string, message: string) {
    //sendMessage
    const messageURL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${targetID}&text=${message}&disable_web_page_preview=true`
    console.log(messageURL)
    await Request.get(messageURL)
}

export async function sendSticker(targetID: string, sticker: string) {
    const telegramBotToken = Deno.env.get("TELEGRAM_BOT")
    //sendPanicSticker
    const stickerURL = `https://api.telegram.org/bot${telegramBotToken}/sendSticker?chat_id=${targetID}&sticker=${sticker}`
    await Request.get(stickerURL)
}