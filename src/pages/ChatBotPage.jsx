// src/components/ChatBotPopup.jsx
import { useState } from "react";

export default function ChatBotPopup() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I can help you with plant optimization." }
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const sendMessage = () => {
    if (!input) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    let botReply = "I'm not sure. Try checking KPI trends.";
    if (input.toLowerCase().includes("co2")) {
      botReply = "🔹 CO₂ Optimization: Reduce kiln temp, optimize alternative fuel.";
    } else if (input.toLowerCase().includes("efficiency")) {
      botReply = "🔹 Efficiency: Adjust raw feed mix and grinding speed.";
    }

    setMessages(prev => [...prev, { from: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-lg z-50"
      >
        Chat
      </button>

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 flex flex-col">
          <div className="p-4 border-b border-gray-700 font-bold text-purple-400">
            Plant ChatBot
          </div>
          <div className="flex-1 p-2 overflow-y-auto h-64">
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === "user" ? "text-right mb-1" : "text-left mb-1"}>
                <span
                  className={
                    msg.from === "user"
                      ? "bg-purple-400 text-black inline-block px-2 py-1 rounded"
                      : "bg-gray-600 text-white inline-block px-2 py-1 rounded"
                  }
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex p-2 border-t border-gray-700 gap-2">
            <input
              type="text"
              className="flex-1 p-2 rounded text-black"
              placeholder="Ask about CO₂, efficiency..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button className="bg-purple-400 p-2 rounded" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
