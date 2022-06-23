const TelegramBot = require('node-telegram-bot-api');
const jsforce = require('jsforce');
const Promise = require('bluebird');

function prepare() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 2000);
  });
}

function build() {
  return prepare().then(() => console.log('it was built'));
}

function run() {
  return build()
    .timeout(1000)
    .catch(Promise.TimeoutError, err => console.log('there was an error'));
}

run();
/*var express = require('express');
var app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
*/
const options = {
  webHook: {
    port: process.env.PORT,
    polling: true
  }
};
const token = process.env.SECRET_KEY_TOKEN;
const bot = new TelegramBot(token, {polling: true});

//const hook = process.env.HOOK_URL;
//bot.setWebHook(hook);

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  try {
    var res = 'Recieved text '+msg.text+', from user '+msg.chat.first_name+', UserId = '+msg.chat.id;
    bot.sendMessage(chatId, res);
  }
  catch (e) {
    bot.sendMessage(chatId, e);
  }
});
