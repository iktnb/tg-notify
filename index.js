require("dotenv").config();
const { bot } = require("./server");

// Function to check if message is from allowed user
const isAllowedUser = (chatId) => {
  return chatId.toString() === process.env.MY_CHAT_ID;
};

// Initialize bot commands and handlers
const initializeBot = () => {
  // Handle /start command
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    if (!isAllowedUser(chatId)) return;
    
    bot.sendMessage(
      chatId,
      "Привет! Я бот для уведомлений. Используйте /help для получения списка команд."
    );
  }); 

  // Handle /help command
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    if (!isAllowedUser(chatId)) return;
    
    const helpText = `
Доступные команды:
/start - Начать работу с ботом
/help - Показать это сообщение
    `;
    bot.sendMessage(chatId, helpText);
  });

  // Handle text messages
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    console.log("Received message from chat ID:", chatId);
    
    if (!isAllowedUser(chatId)) return;
    
    if (msg.text && !msg.text.startsWith("/")) {
      bot.sendMessage(chatId, "Я получил ваше сообщение: " + msg.text);
    }
  });

  // Error handling
  bot.on("polling_error", (error) => {
    console.log(error);
  });

  console.log("Bot initialized successfully...");
};

// Main function to start the application
const startApplication = () => {
  try {
    // Initialize bot handlers
    initializeBot();
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
};

// Start the application
startApplication();
