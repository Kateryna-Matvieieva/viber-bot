import connection from '../db/setupConnection';
import UserProfile from '../db/models/userProfile';

export default class userRepository {
  constructor(bot) {
    this.bot = bot;
  }

  async saveLastMember() {
    const users = await this.bot.getBotProfile();
    const user = users.members[users.members.length -1];

    const userExists = await UserProfile.find({id: user.id})
      .then(res => res.length);

    if(!userExists) {
      const newUser = new UserProfile(user);
      await newUser.save();
    }

    return user;
  }

  updateCurrentUser(newData) {
    UserProfile.find()
      .sort({ _id: -1 })
      .limit(1)
      .updateOne(newData);
  }

  getCurrentUser() {
    return UserProfile.find()
    .sort({ _id: -1 })
    .limit(1);
  }

}