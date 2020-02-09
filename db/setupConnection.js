import mongoose from 'mongoose';

const link = process.env.DB_LINK;

mongoose.connect(link, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "database0"
});

const connection = mongoose.connection;

connection.once('open', function () {
  console.log("Database is opened")
});

connection.on("error", err => console.error(err));

export default connection;