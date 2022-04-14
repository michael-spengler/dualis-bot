import { Request } from "../deps.ts";

export async function sendMessage(
  targetID: string,
  message: string,
  telegramBotToken: string,
) {
  const messageURL =
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${targetID}&text=${message}&disable_web_page_preview=true`;
  await Request.get(messageURL);
}

export async function sendSticker(
  targetID: string,
  sticker: string,
  telegramBotToken: string,
) {
  const stickerURL =
    `https://api.telegram.org/bot${telegramBotToken}/sendSticker?chat_id=${targetID}&sticker=${sticker}`;
  await Request.get(stickerURL);
}

export async function sendDocument(
  targetID: string,
  document: string,
  telegramBotToken: string,
) {
  const documentURL =
    `https://api.telegram.org/bot${telegramBotToken}/sendDocument?chat_id=${targetID}&document=${document}`;
  await Request.get(documentURL);
}

export async function sendPhoto(
  targetID: string,
  photo: string,
  telegramBotToken: string,
) {
  const photoURL =
    `https://api.telegram.org/bot${telegramBotToken}/sendPhoto?chat_id=${targetID}&photo=${photo}`;
  await Request.get(photoURL);
}
