import { webhookCallback } from "https://deno.land/x/grammy@v1.33.0/mod.ts";
// Вы можете изменить это, чтобы правильно импортировать свой объект `Bot`.
import bot from "/bot.ts";

const handleUpdate = webhookCallback(bot, "std/http");

Deno.serve(async (req) => {
  if (req.method === "POST") {
    const url = new URL(req.url);
    if (url.pathname.slice(1) === bot.token) {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});
