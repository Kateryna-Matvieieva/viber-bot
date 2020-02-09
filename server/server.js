import express from 'express';
import ngrok from 'ngrok';
import { Bot as ViberBot, Events as BotEvents, Message } from 'viber-bot';
import UserRepository from '../UserRepository'


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


const userRepository = new UserRepository(bot);


app.get('/', async (req, res) => {
  await userRepository.saveLastMember();
  const users = await userRepository.get();
  console.log(users)
  res.send('App is running, Viber Bot is available!!!'+ users[0].name)
});




export default app;
