import mongoose, { Schema} from 'mongoose';

const userProfileScema = new Schema({
  user: Schema.ObjectId,
  id: String,
  name: String,
  avatar: String,
  role: String
});

const UserProfile = mongoose.model('UserProfile', userProfileScema);

export default UserProfile;
