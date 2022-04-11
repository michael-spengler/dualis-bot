import {
  Client,
  GatewayIntents,
  Message,
  TextChannel,
} from "https://deno.land/x/harmony@v2.6.0/mod.ts";

export function sendMessageDiscord(
  targetID: string,
  message: string,
  discordBotToken: string,
) {
  try {
    const client = new Client();
    client.on("ready", () => {
      console.log(`Ready! User: ${client.user?.tag}`);
    });

    client.connect(discordBotToken, [
      GatewayIntents.DIRECT_MESSAGES,
      GatewayIntents.GUILDS,
      GatewayIntents.GUILD_MESSAGES,
    ]);

    const channel = new TextChannel(client, { id: targetID, type: 1 });
    channel.send(message);
  } catch (e) {
    console.error(e);
  }
}
