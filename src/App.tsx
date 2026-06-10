import React, { useState } from "react";
import { Header } from "./components/Header";
import { ModuleList } from "./components/ModuleList";
import { ChatBox, Message } from "./components/ChatBox";
import { QuizCard } from "./components/QuizCard";
import { MODULES, Module } from "./data/curriculum";
import { Sprout, BookOpen, Clock, Activity, Award, HelpCircle, ArrowRight } from "lucide-react";

export default function App() {
  // Set the default study module to Thực vật học (MH07) so the screen is ready with value on startup
  const [selectedModule, setSelectedModule] = useState<Module | null>(MODULES[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // Simple gamified score trackers to engage intermediate crop students
  const [correctQuizzes, setCorrectQuizzes] = useState<number>(0);
  const [totalQuizzes, setTotalQuizzes] = useState<number>(0);

  // Send content to AI Chat companion
  async function handleSendMessage(text: string) {
    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content
          })),
          selectedModule: selectedModule
        })
      });

      if (!response.ok) {
        throw new Error("Lỗi máy chủ khi kết nối đến AI.");
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: data.reply || "Xin lỗi, không có phản hồi nào.",
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: "Không thể kết nối đến máy chủ AI. Bạn hãy kiểm tra khóa API Gemini và thử lại.",
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  }

  // Quick prompt triggers
  function handleAskAIAboutModule(module: Module) {
    const prompt = `Giải thích cho em tóm tắt nội dung lý thuyết và các công việc thực hành cốt lõi có trong môn học "${module.id} - ${module.title}" trình độ trung cấp.`;
    handleSendMessage(prompt);
  }

  function handleLaunchQuiz(module: Module) {
    setSelectedModule(module);
    const triggerPrompt = `Học sinh muốn ôn luyện trắc nghiệm môn học này. Hãy chào mừng và đặt câu hỏi mở đầu về môn học "${module.id} - ${module.title}" cho em nhé.`;
    handleSendMessage(triggerPrompt);
  }

  function handleQuizCompleted(correct: boolean) {
    setTotalQuizzes((prev) => prev + 1);
    if (correct) {
      setCorrectQuizzes((prev) => prev + 1);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F4F0] text-slate-800 flex flex-col font-sans antialiased" id="hcem-crop-science-root">
      {/* Top Branding Section */}
      <Header />

      {/* Main layout container with Bento spacing */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5">
        {/* Quick progress board & current workspace details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="stats-dashboard-bar">
          {/* Badge 1: Selected workspace */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block uppercase">DƯ ĐỊA ĐANG HỌC</span>
              <strong className="text-sm text-slate-800 font-bold block truncate">
                {selectedModule ? `${selectedModule.id} - ${selectedModule.title}` : "Chọn học phần để ôn luyện"}
              </strong>
            </div>
          </div>

          {/* Badge 2: Training outline */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-800 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-blue-700" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block uppercase">CHƯƠNG TRÌNH KHUNG</span>
              <strong className="text-sm text-slate-800 font-bold block truncate">
                {selectedModule ? `Lý thuyết: ${selectedModule.theoryHours}h | Thực hành: ${selectedModule.practicalHours}h` : "Bộ module tích hợp thực hành"}
              </strong>
            </div>
          </div>

          {/* Badge 3: Gamified Quiz correct counter */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 bg-amber-50 text-amber-800 border border-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-700 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block uppercase">ĐIỂM RÈN LUYỆN TRẮC NGHIỆM</span>
              <strong className="text-sm text-slate-800 font-bold block">
                {totalQuizzes > 0 ? (
                  <span className="text-emerald-800">
                    Đúng {correctQuizzes}/{totalQuizzes} câu ({Math.round((correctQuizzes/totalQuizzes)*100)}%)
                  </span>
                ) : (
                  <span className="text-slate-500 font-normal italic">Chưa làm câu trắc nghiệm nào</span>
                )}
              </strong>
            </div>
          </div>
        </div>

        {/* Master Bento Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Bento Cell 1: Syllabus interactive search and lists (span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <ModuleList 
              onSelectModule={(m) => setSelectedModule(m)} 
              selectedModule={selectedModule}
              onAskAIAboutModule={handleAskAIAboutModule}
              onLaunchQuiz={handleLaunchQuiz}
            />

            {/* Sidebar quick visual notice box on agricultural care */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-bold text-[#166534] tracking-wider uppercase">
                🛠️ Ghi Chú Thực Hành & Bảo An
              </div>
              <div className="p-4 space-y-3.5 flex-1">
                <div className="border-l-4 border-emerald-700 pl-3">
                  <div className="font-bold text-xs text-slate-700">Kỹ thuật chiết ghép cây vụ xuân</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Thời điểm vàng cát bưởi, đào cảnh: Tháng 3 - 4 nảy lộc xuân.</div>
                </div>
                <div className="border-l-4 border-amber-500 pl-3">
                  <div className="font-bold text-xs text-slate-700">Pha chế dung dịch thuỷ canh (MH14)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Yêu cầu tuyệt đối đo đạc EC, pH cẩn thận và hiệu chỉnh định kỳ.</div>
                </div>
              </div>
              <div className="bg-amber-50 p-3 text-[11px] text-amber-900 border-t border-amber-100 flex items-center gap-1.5 font-medium">
                <span className="bg-amber-200 text-amber-950 px-1 py-0.5 rounded text-[9px] font-bold">LƯU Ý</span>
                <span>Luôn đeo đồ bảo hộ khi phun thuốc BVTV tại HCEM.</span>
              </div>
            </div>
          </div>

          {/* Bento Cell 2: Primary AI Tutor Conversation Console (span 5) */}
          <div className="lg:col-span-5">
            <ChatBox 
              messages={messages}
              onSendMessage={handleSendMessage}
              loading={chatLoading}
              selectedModule={selectedModule}
            />
          </div>

          {/* Bento Cell 3: Contextual Quiz Engine & Real-world Examples (span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Interactive automatic Q&A generator card */}
            {selectedModule && (
              <QuizCard 
                module={selectedModule} 
                onQuestionCompleted={handleQuizCompleted}
              />
            )}

            {/* Sidebar real-world Vietnam Agriculture Showcase */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-bold text-[#166534] tracking-wider uppercase">
                🌾 Điển Hình Sản Xuất Việt Nam
              </div>
              <div className="p-4 flex gap-3 items-start">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                  🍋
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-slate-800">Mô hình Chanh Leo tại Lâm Đồng</div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    Ứng dụng công nghệ tưới tiết kiệm nhỏ giọt bù áp và giàn treo chữ T giúp nâng cao tỉ trọng quả mọng, năng suất tăng rõ rệt 30%.
                  </p>
                </div>
              </div>
            </div>

            {/* Ba Vì context card for HCEM campus */}
            <div className="bg-[#FEF3C7]/40 border border-amber-200 rounded-2xl p-4 shadow-sm text-xs text-amber-900">
              <strong className="text-amber-950 font-bold block mb-1">📍 Thực Hành Ba Vì (HCEM)</strong>
              <p className="leading-relaxed">
                Các môn học lý thuyết và thực hành (MH13, MH21) có ruộng thực nghiệm rộng lớn tại cơ sở đào tạo vùng gò đồi Ba Vì, thâm canh lúa hữu cơ kết hợp VietGAP sạch.
              </p>
            </div>
          </div>
        </div>

        {/* Extra Educational Tips & HCEM Guidelines footer box */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs" id="hcem-farming-tips-footer">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-emerald-800" />
            <span>Kỹ Năng Cán Bộ Cơ Sở: Quy Định An Toàn & Chuẩn Bị Thực Hành 4.0</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed">
            <div className="bg-[#fcfbf9] border border-[#f2efeb] p-3.5 rounded-xl">
              <strong className="text-slate-800 font-bold block mb-1">Mục tiêu tay nghề cao</strong>
              <p>Nắm rõ quy cách và độ chuẩn xác của lát cắt mắt ghép, uốn dáng tạo thế đào đón gió tơ rễ khỏe mạnh. Đảm bảo an toàn sinh học.</p>
            </div>
            <div className="bg-[#fcfbf9] border border-[#f2efeb] p-3.5 rounded-xl">
              <strong className="text-slate-800 font-bold block mb-1">An toàn bảo vệ thực vật</strong>
              <p>Phải mặc đồ bảo hộ (mặt nạ lọc bụi, găng tay cao su) trước khi phun thuốc hóa học hữu cơ. Nghiêm cấm xả thải thuốc bừa bãi nguồn nước bãi sông Hồng.</p>
            </div>
            <div className="bg-[#fcfbf9] border border-[#f2efeb] p-3.5 rounded-xl">
              <strong className="text-slate-800 font-bold block mb-1">Nông nghiệp thông minh 4.0</strong>
              <p>Áp dụng thành thạo cảm biến độ ẩm dưa lưới trong nhà màng Israel, quét hành trình QR đem lại nguồn đầu ra sạch sẽ cho HTX nông sản xanh.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
