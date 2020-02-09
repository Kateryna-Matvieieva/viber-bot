import express from 'express';
import bot from './botSetUp';
import callbacks from "./expressCallbacks";


const app = express();
const port = process.env.PORT;

if (!process.env.BOT_ACCOUNT_TOKEN) {
  console.error('Error: BOT_ACCOUNT_TOKEN is not set');
  process.exit(1);
}

app.use("/viber/webhook", bot.middleware());

app.listen(port, async () => {
  console.log(`Application running on port: ${port}`);
});

app.get('/', callbacks.initUserSession);




export default app;
