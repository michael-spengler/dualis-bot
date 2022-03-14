import {
    Client,
    Message,
    GatewayIntents
  } from 'https://deno.land/x/harmony/mod.ts'
  
  const client = new Client()
  
  // Listen for event when client is ready (Identified through gateway / Resumed)
  client.on('ready', () => {
    console.log(`Ready! User: ${client.user?.tag}`)
  })
  
  // Listen for event whenever a Message is sent
  client.on('messageCreate', (msg: Message): void => {
      console.log("------------------------------------------------------")
      console.log(msg.content)
      console.log("------------------------------------------------------")
    if (msg.content === '!ping') {
      msg.channel.send(`Pong! Ich sehe dich ${msg.author.username} o.O          ${client.gateway.ping}`)
      console.log("----------------")
      console.log(msg.author.username)
      console.log("Channel")
      console.log(msg.channel)
    }
  })
  
  // Connect to gateway
  client.connect('OTQ4OTc3Mjc2MTI3Njg2Njg3.YiDp9Q.vA0fJ8fLFCoxLxuLpLLXvjph5iE', [
    GatewayIntents.DIRECT_MESSAGES,
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES
  ])