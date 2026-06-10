import React, { useState } from "react";
import { Search, BookOpen, Clock, Lightbulb, MapPin, Milestone, CheckCircle2, ChevronRight } from "lucide-react";
import { MODULES, Module } from "../data/curriculum";

interface ModuleListProps {
  onSelectModule: (module: Module) => void;
  selectedModule: Module | null;
  onAskAIAboutModule: (module: Module) => void;
  onLaunchQuiz: (module: Module) => void;
}

export function ModuleList({ 
  onSelectModule, 
  selectedModule, 
  onAskAIAboutModule, 
  onLaunchQuiz 
}: ModuleListProps) {
  const [searchTerm, setSearchString] = useState("");
  const [filterType, setFilterType] = useState<"all" | "basic" | "practice" | "tech">("all");

  const filteredModules = MODULES.filter((m) => {
    const matchesSearch = 
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterType === "all") return true;
    if (filterType === "basic") return ["MH07", "MH08", "MH09", "MH21"].includes(m.id);
    if (filterType === "tech") return ["MH10", "MH14", "MH20"].includes(m.id);
    if (filterType === "practice") return ["MH11", "MH12", "MH13", "MH15", "MH16", "MH17", "MH18", "MH19", "MH22"].includes(m.id);
    
    return true;
  });

  return (
    <div className="bg-white border border-[#e6e2dc] rounded-2xl p-5 flex flex-col h-full shadow-sm" id="curriculum-search-panel">
      {/* Search Header banner */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-800" />
          <span>Liên thông Cao đẳng nghề Khoa học trồng trọt</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Tuyển hợp chi tiết 16 học phần đào tạo chính thức chuẩn HCEM. Click chọn môn để học quy trình lý thuyết & thực hành tích hợp.
        </p>
      </div>

      {/* Search Box */}
      <div className="relative mb-3.5">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Nhập mã mh hoặc tên môn (Ví dụ: MH11, bảo vệ thực vật...)"
          value={searchTerm}
          onChange={(e) => setSearchString(e.target.value)}
          className="w-full bg-[#fcfbf9] border border-[#e2dfd9] rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4 border-b border-[#f2efeb] pb-3">
        <button
          onClick={() => setFilterType("all")}
          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
            filterType === "all"
              ? "bg-slate-900 text-white font-medium"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          Tất cả ({MODULES.length})
        </button>
        <button
          onClick={() => setFilterType("basic")}
          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
            filterType === "basic"
              ? "bg-emerald-800 text-white font-medium"
              : "bg-emerald-50/50 text-emerald-800 hover:bg-emerald-100/50"
          }`}
        >
          Cơ sở & Sinh thái
        </button>
        <button
          onClick={() => setFilterType("tech")}
          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
            filterType === "tech"
              ? "bg-blue-800 text-white font-medium"
              : "bg-blue-50/50 text-blue-800 hover:bg-blue-100/50"
          }`}
        >
          Công nghệ cao
        </button>
        <button
          onClick={() => setFilterType("practice")}
          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
            filterType === "practice"
              ? "bg-amber-800 text-white font-medium"
              : "bg-amber-50/50 text-amber-800 hover:bg-amber-100/50"
          }`}
        >
          Chuyên ngành & Kỹ thuật
        </button>
      </div>

      {/* Dynamic List Container */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[580px]">
        {filteredModules.length === 0 ? (
          <div className="py-12 text-center bg-[#fdfdfc] border border-dashed border-[#e6e2dc] rounded-xl">
            <span className="text-slate-400 text-3xl">🌱</span>
            <p className="text-sm text-slate-500 font-medium mt-2">Không tìm thấy môn học phù hợp</p>
            <p className="text-xs text-slate-400 mt-1">Hãy thử nhập từ khóa tìm kiếm hay phân loại khác.</p>
          </div>
        ) : (
          filteredModules.map((m) => {
            const isSelected = selectedModule?.id === m.id;
            return (
              <div
                key={m.id}
                className={`transition-all rounded-xl border p-3.5 flex flex-col ${
                  isSelected 
                    ? "bg-emerald-50/30 border-emerald-600 ring-1 ring-emerald-600/30 shadow-sm" 
                    : "bg-white border-[#e6e2dc] hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer"
                }`}
                onClick={() => onSelectModule(m)}
                id={`module-item-${m.id}`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100/60 text-emerald-900 border border-emerald-200.5 px-2 py-0.5 rounded font-mono text-xs font-semibold">
                      {m.id}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">{m.title}</h3>
                  </div>
                  <div className="flex items-center text-[10px] text-slate-500 font-mono gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>LĐ: {m.theoryHours + m.practicalHours}h</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {m.shortDesc}
                </p>

                {/* Sub details when selected */}
                {isSelected && (
                  <div className="mt-3.5 pt-3 border-t border-emerald-100 space-y-3 animate-fadeIn">
                    <div className="text-xs">
                      <span className="font-bold text-slate-800 block mb-1">Mục tiêu tóm tắt:</span>
                      <p className="text-slate-600 leading-relaxed">{m.description}</p>
                    </div>

                    <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/70 text-xs">
                      <span className="font-bold text-emerald-900 flex items-center gap-1 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        Trọng tâm thực hành thao tác:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{m.practicalFocus}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-800 text-xs block mb-1">Liên hệ sản xuất Việt Nam:</span>
                      <ul className="space-y-1">
                        {m.vietnamExamples.map((ex, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick action buttons */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAskAIAboutModule(m);
                        }}
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-medium px-2 py-1.5 rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Hỏi Kỹ thuật AI</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLaunchQuiz(m);
                        }}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-bold px-2 py-1.5 rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all"
                      >
                        <Milestone className="w-3.5 h-3.5" />
                        <span>Trắc nghiệm ôn ({m.id})</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Indicator icon */}
                {!isSelected && (
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-emerald-800 font-medium">
                    <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-900 px-1.5 py-0.5 rounded font-mono">
                      Thực hành: {m.practicalHours}h ({Math.round((m.practicalHours/(m.theoryHours+m.practicalHours))*100)}%)
                    </span>
                    <span className="flex items-center hover:translate-x-0.5 transition-all">
                      Xem chi tiết <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
