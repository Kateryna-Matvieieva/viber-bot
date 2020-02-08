import express from 'express';
import ngrok from 'ngrok';
import { Bot as ViberBot, Events as BotEvents, Message } from 'viber-bot';


const app = express();
const port = process.env.PORT || 3000;

if (!process.env.BOT_ACCOUNT_TOKEN) {
  console.error('Error: BOT_ACCOUNT_TOKEN is not set');
  process.exit(1);
}

const bot = new ViberBot({
	authToken: process.env.BOT_ACCOUNT_TOKEN,
	name: "EchoBot",
  avatar: "../public/chat-bot-for-social-networking.jpg"
});


bot.on(BotEvents.SUBSCRIBED, response => {
  response.send(new Message.Text(`Hi ${response.userProfile.name}.`));
});
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  response.send(new Message.Text(`Message received.`));
});

app.use("/viber/webhook", bot.middleware());
app.listen(port, async () => {
  console.log(`Application running on port: ${port}`);
  const exposeUrl = await  ngrok.connect(port);

  bot.setWebhook(`${exposeUrl}/viber/webhook`).catch(error => {
    console.error(error);
    process.exit(1);
  });
});

app.get('/', (req, res) => {
  res.send('App is running, Viber Bot is available')
})

// bot.getBotProfile().then(response => console.log(response));


export default app;
