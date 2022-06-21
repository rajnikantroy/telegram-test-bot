const TelegramBot = require('node-telegram-bot-api');
const jsforce = require('jsforce');

const token = process.env.SECRET_KEY_TOKEN;
const bot = new TelegramBot(token, {polling: true});

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
