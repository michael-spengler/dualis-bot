import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { sendMessage, sendSticker } from '../../../notifications/telegram.ts';
 
import {
    Request
} from "../../mocks/request.mock.ts";

import {
    assertSpyCall
  } from "https://deno.land/x/mock@0.13.0/mod.ts";

Deno.test("test sendMessage", async ()=>{
    const telegramBotToken = "testtoken";
    const targetID = "testTragetID";
    const message = "testmessage";

    const testURL = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${targetID}&text=${message}&disable_web_page_preview=true`;

    await sendMessage(targetID, message, telegramBotToken)
    assertSpyCall(Request.get, 0, { args: [ testURL ] });
});

Deno.test("test sendSticker", async ()=>{
    const telegramBotToken = "testtoken";
    const targetID = "testTragetID";
    const sticker = "teststicker";

    const stickerURL = `https://api.telegram.org/bot${telegramBotToken}/sendSticker?chat_id=${targetID}&sticker=${sticker}`;

    await sendSticker(targetID, sticker, telegramBotToken)
    assertSpyCall(Request.get, 1, { args: [ stickerURL ] })
});