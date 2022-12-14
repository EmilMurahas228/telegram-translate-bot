import express, { json } from "express";
import cors from "cors";
import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

import getTranslate from "./utils/getTranslate.js";
import { options } from "./utils/options.js";

const app = express();

app.use(cors());
app.use(json());

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(async (ctx) => {
  await ctx.reply(`Selyam aleykum ${ctx.message.from.first_name} !`);
  await ctx.reply("Жду слово которое нужно перевести 😄");
});

bot.on("sticker", (ctx) =>
  ctx.replyWithPhoto(
    "https://i.pinimg.com/originals/80/59/e3/8059e336689af3fc256bf41d6d1ae4c5.jpg"
  )
);

bot.command("time", (ctx) =>
  ctx.replyWithHTML(
    `<b>${String(new Date().toLocaleDateString("ru-RU", options))}</b>`
  )
);

bot.command("help", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Если возникли вопросы,предложения 👇</b> ",
      Markup.inlineKeyboard([
        Markup.button.url("Написать", "https://t.me/Emilka22878"),
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.command("links", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Интересные группы🤗</b>",
      Markup.inlineKeyboard([
        [Markup.button.url("Красота Крыма🕌", "https://t.me/QIRIM_TOPONIMIKA")],
        [Markup.button.url("Кулинария🥐", "https://t.me/elvinaadilovna")],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.on("message", async (ctx) => {
  try {
    const res = await getTranslate(ctx.message.text);
    ctx.reply(res);
  } catch (err) {
    console.log(err);
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
