require('dotenv').config()
const app = require("./src/app")
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/ai.service')

const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: [
      "http://localhost:5173",
      "https://gupshupai.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: [ "polling"]
});



// Short Term Memory
let chatHistory = [];

io.on("connection", (socket) => {
  console.log("A user Connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("ai-message", async (data) => {
    console.log("Received ai-message -", data);

    // user ka message memory me store karo
    chatHistory.push({
      role: "user",
      parts: [{ text: data }]
    });

    // AI se response lo
    const response = await generateResponse(chatHistory);

    // AI ka response bhi memory me store karo
    chatHistory.push({
      role: "model",
      parts: [{ text: response }]
    });

    // client ko bhejo
    console.log(response);

    socket.emit("ai-message-response", { response });
    
    
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

