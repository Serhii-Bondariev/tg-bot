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
        keyboard: [[{ text: 'Заповнити форму' }]],
      },
    });

    await bot.sendMessage(chatId, 'ПЕреходь за посиланням', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Замовити', web_app: { url: webAppUrl } }]],
      },
    });
  }
});

console.log('Telegram Bot is running...');
