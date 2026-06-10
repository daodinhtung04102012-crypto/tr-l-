import React from "react";
import { Check, Leaf, ChevronRight, Activity } from "lucide-react";

interface MarkdownViewProps {
  text: string;
}

export function MarkdownView({ text }: MarkdownViewProps) {
  if (!text) return null;

  // Split lines and parse basic structures
  const lines = text.split("\n");

  return (
    <div className="space-y-2 text-slate-800 leading-relaxed font-sans text-xs sm:text-sm">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // 1. Check for special notification quote block about missing info
        if (trimmed.includes("Nội dung này chưa được tìm thấy trong các tài liệu đào tạo hiện có")) {
          return (
            <div 
              key={idx} 
              className="my-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-900 font-bold text-xs flex items-start gap-2 shadow-sm animate-fadeIn"
            >
              <Activity className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>Nội dung này chưa được tìm thấy trong các tài liệu đào tạo hiện có. Dưới đây là kiến thức tham khảo bổ sung:</span>
            </div>
          );
        }

        // 2. Headings (e.g. ###, ##, # or bold lines ending with :)
        if (trimmed.startsWith("###")) {
          const content = trimmed.substring(3).trim().replace(/\*/g, "");
          return (
            <h4 key={idx} className="text-sm font-bold text-emerald-900 tracking-tight mt-3 mb-1 first:mt-0 flex items-center gap-1.5 border-b border-emerald-50 pb-1">
              <span className="w-1.5 h-3 bg-emerald-700 rounded-sm"></span>
              {content}
            </h4>
          );
        }
        if (trimmed.startsWith("##") || trimmed.startsWith("#")) {
          const content = trimmed.replace(/^#+\s*/, "").replace(/\*/g, "");
          return (
            <h3 key={idx} className="text-base font-bold text-slate-900 tracking-tight mt-4 mb-2 first:mt-0">
              {content}
            </h3>
          );
        }

        // 3. Step indicator formatted like "1. Mục tiêu", "2. Cơ sở lý thuyết", etc.
        const stepMatch = trimmed.match(/^(\d+)\.\s+(\*?[^*]+\*?)(:.*)?$/);
        if (stepMatch) {
          const stepNum = stepMatch[1];
          const stepTitle = stepMatch[2].replace(/\*/g, "");
          const stepRest = stepMatch[3] ? stepMatch[3] : "";
          return (
            <div key={idx} className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-3 my-2 text-xs">
              <span className="font-mono bg-emerald-700 text-white font-bold w-5 h-5 rounded-md inline-flex items-center justify-center mr-2 text-[10px]">
                {stepNum}
              </span>
              <strong className="text-emerald-950 font-bold text-xs">{stepTitle}</strong>
              <span className="text-slate-700">{stepRest}</span>
            </div>
          );
        }

        // 4. Bullet lists (starting with *, -, or •)
        if (trimmed.startsWith("*") || trimmed.startsWith("-") || trimmed.startsWith("•")) {
          // Remove prefix and any bold marks
          const cleanLine = trimmed.replace(/^[*•-]\s*/, "");
          
          // Bold formatting inside lists
          return (
            <div key={idx} className="pl-4 py-0.5 flex items-start gap-2 text-xs sm:text-sm text-slate-700">
              <span className="inline-block mt-1.5 size-1.5 bg-emerald-600 rounded-full shrink-0" />
              <span>{parseBoldText(cleanLine)}</span>
            </div>
          );
        }

        // 5. Standard line - Render normally with Bold check
        if (trimmed === "") {
          return <div key={idx} className="h-2"></div>;
        }

        return (
          <p key={idx} className="leading-relaxed">
            {parseBoldText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Inline helper to split text and render **text** as <strong>
function parseBoldText(text: string) {
  if (!text.includes("**")) return text;

  const parts = text.split("**");
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-bold text-slate-950">
          {part}
        </strong>
      );
    }
    return part;
  });
}
