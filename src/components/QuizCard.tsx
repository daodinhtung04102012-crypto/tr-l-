import React, { useState, useEffect } from "react";
import { Milestone, HelpCircle, CheckCircle, XCircle, RefreshCw, Sparkles, BookOpen, AlertCircle } from "lucide-react";
import { Module } from "../data/curriculum";

interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

interface QuizCardProps {
  module: Module;
  onQuestionCompleted: (correct: boolean) => void;
}

export function QuizCard({ module, onQuestionCompleted }: QuizCardProps) {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Function to request another question
  async function fetchQuestion() {
    setLoading(true);
    setError(null);
    setSelectedOption(null);
    setShowExplanation(false);

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: module.id,
          moduleTitle: module.title
        })
      });

      if (!response.ok) {
        throw new Error("Lỗi khi kết nối đến máy chủ lấy câu hỏi.");
      }

      const data = await response.json();
      if (data && data.question) {
        setQuestion(data);
      } else {
        throw new Error("Dữ liệu câu hỏi bị rỗng.");
      }
    } catch (e: any) {
      console.error(e);
      setError("Không thể tải được câu hỏi từ AI. Hãy thử tải lại.");
    } finally {
      setLoading(false);
    }
  }

  // Reload when the chosen module shifts
  useEffect(() => {
    fetchQuestion();
  }, [module.id]);

  function handleOptionClick(optIndex: number) {
    if (selectedOption !== null) return; // Prevent clicking multiple times
    
    setSelectedOption(optIndex);
    setShowExplanation(true);
    
    const wasCorrect = optIndex === question?.answerIndex;
    onQuestionCompleted(wasCorrect);
  }

  return (
    <div className="bg-[#fdfcf9] border-2 border-emerald-700/10 rounded-2xl p-5 shadow-sm relative overflow-hidden" id="interactive-quiz-card">
      {/* Visual background badge */}
      <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-bl-full flex items-center justify-center -mr-4 -mt-4 opacity-50 z-0">
        <Milestone className="w-8 h-8 text-emerald-700/20" />
      </div>

      {/* Header info */}
      <div className="flex items-center justify-between gap-3 border-b border-emerald-100 pb-3 mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
            TRẮC NGHIỆM ĐỊA BÀN
          </span>
          <span className="text-xs font-mono font-medium text-slate-500">
            {module.id} - {module.title}
          </span>
        </div>
        <button
          onClick={fetchQuestion}
          disabled={loading}
          className="text-xs font-medium text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Tải lại câu khác
        </button>
      </div>

      {/* Main body */}
      <div className="relative z-10">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-500 font-medium mt-3">Sư phạm AI đang soạn câu hỏi trắc nghiệm mới...</p>
            <p className="text-[10px] text-slate-400 mt-1">Đúc rút quy trình kỹ thuật & liên hệ sản xuất thực địa Việt Nam...</p>
          </div>
        ) : error ? (
          <div className="py-8 flex flex-col items-center text-center text-red-800 bg-red-50 border border-red-200 rounded-xl p-4">
            <AlertCircle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-xs font-bold">{error}</p>
            <button
              onClick={fetchQuestion}
              className="mt-3 bg-red-100 hover:bg-[#ffebeb] text-red-950 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
            >
              Thử lại ngay
            </button>
          </div>
        ) : question ? (
          <div className="space-y-4">
            {/* Question Text */}
            <h4 className="text-sm font-bold text-slate-800 flex items-start gap-2 leading-relaxed">
              <HelpCircle className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <span>{question.question}</span>
            </h4>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {question.options.map((opt, idx) => {
                let optionStyle = "border-[#e6e2dc] bg-white text-slate-700 hover:bg-slate-50";
                let icon = null;

                if (selectedOption !== null) {
                  // User has chosen an option
                  const isCorrect = idx === question.answerIndex;
                  const isChosen = idx === selectedOption;

                  if (isCorrect) {
                    optionStyle = "border-emerald-600 bg-emerald-50 text-emerald-900 font-medium";
                    icon = <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />;
                  } else if (isChosen) {
                    optionStyle = "border-red-600 bg-red-50 text-red-950 text-red-900";
                    icon = <XCircle className="w-4 h-4 text-red-700 shrink-0" />;
                  } else {
                    optionStyle = "border-[#e6e2dc] bg-white text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionClick(idx)}
                    disabled={selectedOption !== null}
                    className={`transition-all rounded-xl border p-3 flex items-center justify-between text-left text-xs gap-3 w-full ${optionStyle}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono bg-slate-100 text-slate-700 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showExplanation && (
              <div className="mt-4 p-4 bg-amber-50/50 border border-amber-200.5 rounded-xl text-xs text-amber-900 leading-relaxed animate-fadeIn">
                <div className="font-bold flex items-center gap-1 mb-1.5 text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Đáp án đúng là {String.fromCharCode(65 + question.answerIndex)}: Giải Thích Sư Phạm AI</span>
                </div>
                <p className="text-slate-800">{question.explanation}</p>

                <div className="mt-4 pt-3.5 border-t border-amber-200/50 flex justify-end">
                  <button
                    type="button"
                    onClick={fetchQuestion}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs px-4 py-2 rounded-xl font-medium tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <span>Luyện Câu Tiếp Theo</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
