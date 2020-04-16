# viber-bot

Bot asks user questions in Viber and saves answers to MongoDB Atlas. This project satisfies reqirements from test assignment:
it works just with one user: me. But it's behavior can be easily extended for work with any quantety of users, if change this:

https://github.com/KaterynaMatvjejeva/viber-bot/blob/master/server/index.js#L27 -> replace with onSubscribe event listener from viber-bot library

And for now bot is deployed on Heroku and it will be activated for quiz after entering the link https://viber-bot6843.herokuapp.com/init_user_session

The example of quiz:
![](video_2020-04-16_15-44-58.gif)
