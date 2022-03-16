import {
    Client,
    Message,
    GatewayIntents,
    TextChannel
  } from "https://deno.land/x/harmony@v2.6.0/mod.ts"

  

    
    /** Auf Channel lauschen und warten bis die ID angefragt wird und diese dann ausgeben, damit User die eintragen kann
    client.on('messageCreate', (msg: Message): void => {
        if(msg.content === 'meineID' || msg.content === 'meineid' || msg.content === 'meineId'){
            msg.channel.send(`Deine ID ist ${msg.channel.id}.`)
        }
    });
    */


export function sendMessageDiscord(targetID: string, message: string, discordBotToken: string){
    const client = new Client();
    client.on('ready', () => {
        console.log(`Ready! User: ${client.user?.tag}`)
    })

    client.connect(discordBotToken, [
        GatewayIntents.DIRECT_MESSAGES,
        GatewayIntents.GUILDS,
        GatewayIntents.GUILD_MESSAGES
    ])

    const channel = new TextChannel(client, {id: targetID, type: 1})
    channel.send(message);
}
  
  
