import { Bot as ViberBot, Message } from 'viber-bot';
import UserRepository from '../UserRepository';
import samples from '../viberDataSamples';
import { months } from '../viberDataSamples/monthsKeyBoard';

export const BotMessage = Message;
const userRepository = new UserRepository(bot);

const expects = ['firstName', 'lastName', 'gender'];
let currentExpect;
let date = {};

const bot = new ViberBot({
	authToken: process.env.BOT_ACCOUNT_TOKEN,
	name: "EchoBot",
  avatar: "../public/chat-bot-for-social-networking.jpg"
});

//Store all callbacks into separate files with one entry point for all of them
//each module has `regex`, `order number` and `callback`

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

bot.onTextMessage(/^Day$/, (message, response) => {
  response.send(new BotMessage.Keyboard(samples.daysKeyBoard));
});

bot.onTextMessage(/^Month$/, (message, response) => {
  response.send(new BotMessage.Keyboard(samples.monthsKeyBoard));
});

bot.onTextMessage(/^Year$/, (message, response) => {
  response.send(new BotMessage.Keyboard(samples.yearsKeyBoard));
});

bot.onTextMessage(/^\d\d?(st|nd|rd|th)$/, (message, response) => {
  date.day = message.text;
});

bot.onTextMessage(new RegExp(months.join('|')), (message, response) => {
  date.month = message.text;
});

bot.onTextMessage(/^\d{4,}$/, (message, response) => {
  date.year = message.text;
});

bot.onTextMessage(/^Submit$/,
  async (message, response) => {
    const newDate = Object.values(date);
    if (newDate.length === 3) {
      userRepository.updateCurrentUser({ date: newDate.join(' ')});
      date = {};
      const userInfo = await userRepository.getCurrentUser();

      delete userInfo.id;
      delete userInfo.avatar;

      response.send([
        new BotMessage.Text(`Your info:\n ${JSON.stringify(userInfo)}`),
      ])
    }
  }
);

bot.onTextMessage(/[\w-]{2,}/i, (message, response) => { //should be the last as has the most 'general' regex
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
