import { Bot as ViberBot, Events as BotEvents, Message } from 'viber-bot';
import UserRepository from '../UserRepository';
import samples from '../viberDataSamples';

export const BotMessage = Message;
const userRepository = new UserRepository(bot);

const expects = ['firstName', 'lastName', 'gender'];
let currentExpect;
const date = [];

const bot = new ViberBot({
	authToken: process.env.BOT_ACCOUNT_TOKEN,
	name: "EchoBot",
  avatar: "../public/chat-bot-for-social-networking.jpg"
});


bot.onTextMessage(/^Start$/i,
  (message, response) => {
  currentExpect = 0;
  response.send(new BotMessage.Text('Please enter your first name'));
  }
);

bot.onTextMessage(/^Male|Female|Developer$/,
  (message, response) => {
    if (currentExpect === 2) {
      userRepository.updateCurrentUser({ [expects[currentExpect]]: message.text});
      ++currentExpect;
      response.send([
        new BotMessage.Text('Please enter your date of a birth name'),
        new BotMessage.RichMedia(samples.dateButtons)
      ])
    }
  }
);

bot.onTextMessage(/Day/, (message, response) => {
  response.send(new BotMessage.Keyboard(samples.daysKeyBoard)).catch(err => console.error(err));
});

bot.onTextMessage(/\d\d?(st|nd|rd|th)/, (message, response) => {
  date.push(message.text);
  console.log(date);
});

bot.onTextMessage(/[\w-]{2,}/i, (message, response) => {
  switch(currentExpect) {
    case 0:
      userRepository.updateCurrentUser({ [expects[currentExpect]]: message.text});
      ++currentExpect;
      response.send(new BotMessage.Text('Please enter your last name'));
      break;
    case 1:
      userRepository.updateCurrentUser({ [expects[currentExpect]]: message.text});
      ++currentExpect;
      response.send([
        new BotMessage.Text('Please enter your gender'),
        new BotMessage.RichMedia(samples.genderButtons)
      ]);
      break;
  }
});

export default bot;