const express = require("express");
const app = express();
const TelegramBot = require("node-telegram-bot-api");

// Enable JSON parsing for request body
app.use(express.json());

// Create a bot instance
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Express endpoint to receive messages and forward to bot

// {"eventName":"test","startTime":"23:00","minutesUntilStart":1}
app.post("/api/send-message", async (req, res) => {
  try {
    const payload = req.body;

    if (!payload) {
      return res.status(400).json({ error: "payload is required" });
    }

    console.log(payload);
    const data = payload;
    console.log(data);

    const message = `
🎯 *${data.eventName}*
⏰ Время начала: ${data.startTime}
⏳ До начала: ${data.minutesUntilStart} мин.
    `;

    const chatId = process.env.MY_CHAT_ID;
    
    // Send new message and store its ID
    const sentMessage = await bot.sendMessage(chatId, message, { parse_mode: "Markdown" });

    
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});

module.exports = { bot };
