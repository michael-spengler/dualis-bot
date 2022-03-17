import { Request } from "https://deno.land/x/request@1.3.0/request.ts";

export async function sendMessage(targetID: string, message: string, telegramBotToken: string) {
  const messageURL =
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${targetID}&text=${message}&disable_web_page_preview=true`;
  await Request.get(messageURL);
}

export async function sendSticker(targetID: string, sticker: string, telegramBotToken: string) {
  const stickerURL =
    `https://api.telegram.org/bot${telegramBotToken}/sendSticker?chat_id=${targetID}&sticker=${sticker}`;
  await Request.get(stickerURL);
}
