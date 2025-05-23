const express = require("express");
const app = express();
const TelegramBot = require("node-telegram-bot-api");

// Enable JSON parsing for request body
app.use(express.json());

// Create a bot instance
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Express endpoint to receive messages and forward to bot
app.post('/api/send-message', async (req, res) => {
  try {
    const payload = req.body;
    
    if (!payload) {
      return res.status(400).json({ error: 'payload is required' });
    }

    console.log(payload);

    const chatId = process.env.MY_CHAT_ID;
    await bot.sendMessage(chatId, payload);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});

module.exports = { bot }; 