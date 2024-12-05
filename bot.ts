import express from 'express';
import { Telegraf, Context } from 'telegraf';
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { Bot, InlineKeyboard, webhookCallback } from "https://deno.land/x/grammy@v1.32.0/mod.ts";
// Создайте экземпляр класса `Bot` и передайте ему токен вашего бота.
// Токен и адрес бэкенда мы спрячем, чтобы никто не смог воспользоваться нашим ботом или взломать нас. Получим их из файла .env
const { TGBOT_TOKEN, TGBOT_WEBHOOK } = config();
const bot = new Bot(TGBOT_TOKEN);
let meetingCount = 0;
bot.start((ctx: Context) => {
    ctx.reply('Добро пожаловать! Я бот, который поможет вам организовать встречи. Используйте команду /meet для добавления встречи.');
  });
  
  // Команда /meet
bot.command('meet', (ctx: Context) => {
    meetingCount++;
    ctx.reply('Встреча добавлена! Общее количество встреч:', meetingCount);
  });
  
  // Команда /count
bot.command('count', (ctx: Context) => {
    ctx.reply('Общее количество встреч: ', meetingCount);
  });
  
  // Обработка текстовых сообщений
bot.on('text', (ctx: Context) => {
    ctx.reply('Если вы хотите добавить встречу, используйте команду /meet.');
  });
  
  // Запуск бота
bot.launch()
    .then(() => console.log('Бот запущен'))
    .catch(err => console.error('Ошибка при запуске бота:', err));

// Теперь вы можете зарегистрировать слушателей на объекте вашего бота `bot`.
// grammY будет вызывать слушателей, когда пользователи будут отправлять сообщения вашему боту.
// Обработайте команду /start.
bot.command(
    "start",
    (ctx) => ctx.reply("Добро пожаловать. Запущен и работает!",{ reply_markup: keyboard }),
);
// Обработайте команду /about
bot.command(
    "about",
    (ctx) => ctx.reply("Я бот? Я бот... Я Бот!",),
);
// Обработайте другие сообщения.
bot.on("message", (ctx) => ctx.reply("Получил ваше сообщение: " + ctx.message.text + " !", ));
// Клавиатура будет отправлять в бота команду /about
const keyboard = new InlineKeyboard()
    .text("Обо мне", "/about");
// Теперь, когда вы указали, как обрабатывать сообщения, вы можете запустить своего бота.
// Он подключится к серверам Telegram и будет ждать сообщений.
//bot.start();
// Команда выше запускает бота локально на вашем компьютере, с ее помощью можно запустить бота, не имея бэкенда. Если вы запускаете бота через bot.start(), не используйте оставшиеся команды.
const server = express()
server.use(express.json())
server.post('/webhook', webhookCallback(bot, 'express'))
server.listen(5000) // Это необходимо изменить в зависимости от того, на каком порту запущено приложение
// Этой командой мы устанавливаем адрес, который будет прослушивать бот
bot.api.setWebhook(TGBOT_WEBHOOK)
