import React from "react";
import { Leaf, GraduationCap, Award } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-[#e6e2dc] sticky top-0 z-50 shadow-sm" id="hcem-app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* College & Profession branding */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-700 text-white rounded-xl flex items-center justify-center shadow-md shadow-emerald-700/10">
            <Leaf className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-800" />
              <span className="text-xs font-mono font-bold tracking-wider text-emerald-800 uppercase">
                Trường Cao Đẳng Cơ Điện Hà Nội
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Trợ lý Học tập AI • <span className="text-emerald-700">Liên thông Cao đẳng nghề Khoa học cây trồng</span>
            </h1>
          </div>
        </div>

        {/* System info / target audience */}
        <div className="flex items-center gap-4 bg-[#f8f7f4] border border-[#e6e2dc] px-4 py-2 rounded-xl text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-slate-800">Trình độ: Liên thông Cao đẳng</span>
          </div>
          <div className="h-4 w-px bg-slate-200"></div>
          <p className="font-mono text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
            MH07 - MH22
          </p>
        </div>
      </div>
    </header>
  );
}
