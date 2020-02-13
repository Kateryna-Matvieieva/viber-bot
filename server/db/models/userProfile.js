import mongoose, { Schema} from 'mongoose';

const userProfileScema = new Schema({
  _id: Schema.ObjectId,
  id: String,
  name: String,
  avatar: String,
  role: String,
  firstName: String,
  lastName: String,
  gender: { type: String, enum: ['Male', 'Female', 'Developer']},
  date: String
});

const UserProfile = mongoose.model('UserProfile', userProfileScema);

export default UserProfile;
