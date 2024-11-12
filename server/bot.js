require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

// Отримуємо токен з .env
const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

// Перевіряємо, чи встановлено токен
if (!token) {
  console.error('Telegram token is not set in .env file.');
  process.exit(1);
}

// Створюємо бота
const bot = new TelegramBot(token, { polling: true });

// Логіка обробки повідомлень
bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Форма замовлення внизу', {
      reply_markup: {
        keyboard: [[{ text: 'Заповнити форму', web_app: { url: webAppUrl + '/form' } }]],
      }
    });

    await bot.sendMessage(chatId, 'Пeреходь за посиланням', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Замовити', web_app: { url: webAppUrl } }]],
      },
    });
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data.data)
console.log(data)
      await bot.sendMessage(chatId, 'Thanks for feedback!');
      await bot.sendMessage(chatId, 'your country:' + data?.country);
      await bot.sendMessage(chatId, 'your street:' + data?.street);

      setTimeout( async () => {
await bot.sendMessage('Thats all info!')
      },3000)
    } catch (e) {
      console.log(e)
    }

  }

});

console.log('Telegram Bot is running...');
