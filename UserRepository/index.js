import connection from '../db/setupConnection';
import UserProfile from '../db/models/userProfile';

export default class userRepository {
  constructor(bot) {
    this.bot = bot;
    this.userId;
  }

  async saveLastMember() {
    const users = await this.bot.getBotProfile();
    const user = users.members[users.members.length -1];

    const userExists = await UserProfile.find({id: user.id})
      .then(res => res.length);

    if(!userExists) {

      const newUser = new UserProfile(user)
      await newUser.save();
    }

    this.userId = user.id;
  }

  async update(filter, update) {
    await UserProfile.findOneAndUpdate(filter, update);
  }

  async get() {
    return UserProfile.find({});
  }

}