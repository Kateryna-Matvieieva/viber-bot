import bot, { BotMessage } from '../botSetUp';
import UserRepository from '../UserRepository';
import samples from '../viberDataSamples';

const port = process.env.PORT;

const userRepository = new UserRepository(bot);


const initUserSession = async (req, res) => {
  res.send(`Bot session is started`);

  const userProfile = await userRepository.saveLastMember();

  bot.sendMessage(userProfile, [
    new BotMessage.Text(`Hi, ${userProfile.name}, please click Start to proceed`),
    new BotMessage.RichMedia(samples.startButton)
  ]);
};

export default initUserSession;
