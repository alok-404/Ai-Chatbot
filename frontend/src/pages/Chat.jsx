import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import "../styles/chat.scss";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null); // ref for scrolling

  const handleSend = () => {
    if (!input.trim()) return;

    setLoading(true);

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    if (socket) socket.emit("ai-message", input);
    setInput("");
  };

  useEffect(() => {
    const socketInstance = io("https://ai-chatbot-qj3i.onrender.com" , {
  transports: ["polling"]
});
    setSocket(socketInstance);

    socketInstance.on("ai-message-response", (msg) => {
      const text =
        typeof msg === "object" && msg !== null
          ? msg.response || JSON.stringify(msg)
          : msg;

      setMessages((prev) => [...prev, { from: "bot", text }]);
      setLoading(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-center bg-black/40 backdrop-blur flex-shrink-0">
        <h1 className="text-lg font-semibold">GupshupAI</h1>
      </div>

      {/* Messages Area */}
      <div className="messages-container flex-1 p-4 space-y-4 ">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm sm:text-base whitespace-pre-wrap break-words ${
                msg.from === "user"
                  ? "bg-cyan-500 text-black rounded-br-none"
                  : "bg-gray-800 text-white rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="text-gray-400 italic animate-pulse">
            <img className="h-10 w-10 mb-4" src="/giphy.gif" alt="loading" />
          </div>
        )}

        {/* Empty div to scroll into */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-black/40 backdrop-blur flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-cyan-500 text-black rounded-full hover:bg-cyan-600 transition-colors text-sm sm:text-base"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
