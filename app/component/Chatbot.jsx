"use client";

import React, { useState, useEffect } from "react";
import { Send, Bot, User, Trash2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`AIzaSyD7QkI0e_P1igH4Cjdp3ZKoACFr5EcRDgU`);

const predefinedPrompts = [
  "Những yếu tố văn hóa truyền thống ảnh hưởng đến tư tưởng Hồ Chí Minh",
  "Các yếu tố thời đại tác động đến sự hình thành tư tưởng Hồ Chí Minh",
  "Vai trò của chủ nghĩa Marx-Lenin trong tư tưởng Hồ Chí Minh",
  "Quá trình hình thành tư tưởng yêu nước và cách mạng của Hồ Chí Minh",
];

const Button = ({ children, type, disabled, className, onClick }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors ${className}`}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, className }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>{children}</div>
);

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    // Khởi tạo chat model
    initChat();
  }, []);

  const initChat = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const newChat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
        topP: 0.9,
      },
    });
    setChat(newChat);
  };

  const handlePredefinedPrompt = async (prompt) => {
    if (isLoading) return;
    setInput(prompt);
    setMessages((prev) => [...prev, { text: prompt, isUser: true }]);

    const botResponse = await sendMessage(prompt);
    setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
  };

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      if (!chat) {
        throw new Error("Chat chưa được khởi tạo");
      }

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error:", error);
      return "Xin lỗi, đã có lỗi xảy ra khi xử lý tin nhắn của bạn.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setInput("");

    const botResponse = await sendMessage(userMessage);
    setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
  };

  const handleReset = () => {
    setMessages([]);
    initChat();
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg">
      <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Hỏi đáp về Tư tưởng Hồ Chí Minh
        </h1>
        <Button onClick={handleReset} className="bg-red-700 hover:bg-red-800">
          <Trash2 size={20} />
        </Button>
      </div>
      <Card className="flex-1 overflow-y-auto p-4 max-h-[500px] space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Bot size={40} className="mx-auto mb-2" />
            <p>
              Chọn câu hỏi hoặc nhập câu hỏi của bạn về Tư tưởng Hồ Chí Minh
            </p>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {predefinedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePredefinedPrompt(prompt)}
                  className="text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              message.isUser ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
                ${message.isUser ? "bg-red-100" : "bg-gray-100"}`}
            >
              {message.isUser ? <User size={24} /> : <Bot size={24} />}
            </div>
            <div
              className={`rounded-lg p-4 max-w-[80%] shadow-sm ${
                message.isUser
                  ? "bg-red-600 text-white"
                  : "bg-gray-50 text-gray-800"
              }`}
            >
              <div className="prose prose-sm max-w-none">
                {message.text.split("\n").map((line, i) => {
                  if (line.startsWith("**")) {
                    return (
                      <h3 key={i} className="font-bold text-lg mb-2">
                        {line.replace(/\*\*/g, "")}
                      </h3>
                    );
                  } else if (line.startsWith("*")) {
                    return (
                      <li key={i} className="ml-4 mb-2">
                        {line.replace(/\*/g, "")}
                      </li>
                    );
                  }
                  return (
                    <p key={i} className="mb-2">
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex gap-2">
                <span className="animate-bounce">●</span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  ●
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  ●
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>

      <form onSubmit={handleSubmit} className="p-4 border-t w-full">
        <div className="flex gap-2 w-full">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            <Send size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatApp;
