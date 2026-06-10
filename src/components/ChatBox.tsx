import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, BookOpen, Clock, Play, HelpCircle, Activity } from "lucide-react";
import { Module } from "../data/curriculum";
import { MarkdownView } from "./MarkdownView";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  loading: boolean;
  selectedModule: Module | null;
}

export function ChatBox({ messages, onSendMessage, loading, selectedModule }: ChatBoxProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to latest response
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input.trim());
    setInput("");
  }

  // Quick suggestion chips based on selected module or general horticulture
  const defaultSeeds = [
    { label: "Quy trình hãm đào Nhật Tân đón Tết", query: "Hãy chỉ cho tôi quy trình thực hành hãm cho hoa Đào Nhật Tân nở hoa đúng dịp Tết Âm lịch Việt Nam." },
    { label: "Nguyên tắc bón phân '4 đúng' trồng rau", query: "Hãy giải thích chi tiết nguyên tắc '4 đúng' trong bón phân thâm canh rau màu an toàn VietGAP tại Việt Nam." },
    { label: "Công nghệ tưới nhỏ giọt fertigation", query: "Giải thích rõ tóm tắt công nghệ tưới dinh dưỡng nhỏ giọt Fertigation trong nhà kính trồng dưa lưới." }
  ];

  const moduleSeeds = selectedModule ? [
    { label: `Quy trình thực hành cốt lõi môn ${selectedModule.id}`, query: `Hãy hướng dẫn rõ từng bước quy trình kỹ thuật cốt lõi môn ${selectedModule.id} - ${selectedModule.title} bám sát cấu trúc thực hành 11 điểm đã học.` },
    { label: `Liên hệ thực tế sản xuất của môn ${selectedModule.id}`, query: `Môn học ${selectedModule.id} - ${selectedModule.title} có những ví dụ thực hành hoặc ứng dụng thực tế sản xuất nổi tiếng nào tại Việt Nam?` },
    { label: "Hỏi tóm tắt cốt lõi kiến thức", query: `Tóm tắt cho em 5 điều cốt lõi nhất cần ghi nhớ thuộc môn học ${selectedModule.id} - ${selectedModule.title} trình độ Trung cấp Trồng trọt.` }
  ] : defaultSeeds;

  return (
    <div className="bg-white border border-[#e6e2dc] rounded-2xl flex flex-col h-[670px] shadow-sm overflow-hidden" id="ai-chat-assistant-container">
      {/* Dynamic Header */}
      <div className="bg-[#fcfbf9] border-b border-[#e6e2dc] px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center shadow-inner font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>Trợ Lý Sư Phạm AI • Trồng Trọt</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </h3>
            {selectedModule ? (
              <p className="text-[11px] text-slate-500 font-medium">
                Đang hỗ trợ trọng tâm: <strong className="text-emerald-800">{selectedModule.id} - {selectedModule.title}</strong>
              </p>
            ) : (
              <p className="text-[11px] text-slate-500">Môi trường hỏi đáp tổng quan các môn học/ mô đun chuyên ngành</p>
            )}
          </div>
        </div>

        {/* Indicator icon */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 bg-[#f1eeea] px-2.5 py-1.5 rounded-lg border border-[#e6e2dc]">
          <Clock className="w-3.5 h-3.5" />
          <span>Hỏi đáp 24/7</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#faf9f6]/40 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 border border-emerald-100 mb-4 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Khởi Động</h4>
            <p className="text-xs text-slate-500 mt-2 max-w-md leading-relaxed">
              Em chào anh/chị sinh viên! Em là Trợ lý AI đặc biệt chuyên hỗ trợ ôn tập học tập và quy trình thực hành cho các chương trình môn học từ <strong className="text-emerald-800">MH07 đến MH22</strong> ngành <strong className="text-emerald-800">Liên thông Cao đẳng nghề Khoa học trồng trọt</strong> HCEM.
            </p>
            
            {/* Quick action suggest beads */}
            <div className="mt-6 w-full max-w-lg">
              <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block mb-3 uppercase">
                Gợi ý câu hỏi ôn tập
              </span>
              <div className="space-y-2 text-left">
                {moduleSeeds.map((seed, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onSendMessage(seed.query)}
                    className="w-full text-left bg-white border border-[#e6e2dc] hover:border-emerald-600 hover:bg-emerald-50/20  px-4 py-2.5 rounded-xl text-xs text-slate-700 font-medium transition-all shadow-sm flex items-center justify-between gap-2 group"
                  >
                    <span>{seed.label}</span>
                    <Play className="w-3 h-3 text-slate-400 group-hover:text-emerald-700 shrink-0 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => {
              const isAI = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isAI ? "justify-start" : "justify-end"} animate-fadeIn`}
                  id={`chat-msg-${msg.id}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      isAI
                        ? "bg-white border border-[#e8e4de] text-slate-800"
                        : "bg-emerald-800 text-white rounded-tr-none font-medium"
                    }`}
                  >
                    {/* Role header */}
                    <div className="flex items-center gap-1.5 mb-1.5 text-[10px] tracking-tight opacity-75 font-mono">
                      <span>{isAI ? "SƯ PHẠM AI" : "HỌC VIÊN HCEM"}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Content view with markdown rendering and bold formatting */}
                    {isAI ? (
                      <MarkdownView text={msg.content} />
                    ) : (
                      <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* AI thinking indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#e8e4de] rounded-2xl px-4 py-3 shadow-sm max-w-[80%]">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-800 font-bold mb-1.5">
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>HỆ THỐNG AI ĐANG PHÂN TÍCH QUY TRÌNH Kỹ THUẬT...</span>
                  </div>
                  <div className="flex items-center gap-1 py-1.5">
                    <div className="w-2.5 h-2.5 bg-emerald-700 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce delay-200"></div>
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Suggestion rail beside active conversation to quick ask */}
      {messages.length > 0 && (
        <div className="px-4 py-2 bg-[#fcfbf9] border-t border-[#e6e2dc] flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider shrink-0 uppercase">
            HỎI NHANH:
          </span>
          {moduleSeeds.map((seed, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSendMessage(seed.query)}
              disabled={loading}
              className="bg-white border border-[#e6e2dc] hover:border-emerald-600 hover:bg-emerald-50/10 px-2.5 py-1 rounded-full text-[10px] text-slate-700 font-bold transition-all shrink-0 shadow-sm disabled:opacity-50"
            >
              # {seed.label}
            </button>
          ))}
        </div>
      )}

      {/* Input action form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-[#e6e2dc] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={loading ? "Vui lòng chờ AI trả lời..." : "Hỏi AI về kỹ thuật bảo vệ thực vật, hãm đào, cắt tỉa..."}
          disabled={loading}
          className="flex-1 bg-[#fcfbf9] border border-[#e2dfd9] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 disabled:opacity-50"
          id="chat-user-input"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-emerald-800 hover:bg-emerald-900 border border-emerald-950 text-white p-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50 shrink-0"
          id="chat-send-btn"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
}
