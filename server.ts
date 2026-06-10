import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Access the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

// Initialize the @google/genai SDK (lazy initialization is safer, but let's check it at request-time)
let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("CẢNH BÁO: GEMINI_API_KEY chưa được thiết lập trong biến môi trường.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

app.use(express.json());

// API route to get curriculum static data
app.get("/api/curriculum", (req, res) => {
  res.json({
    status: "ok",
    college: "Trường Cao đẳng Cơ điện Hà Nội (HCEM)",
    profession: "Liên thông Cao đẳng nghề Khoa học trồng trọt",
  });
});

// Primary API route for AI Chat Assistant
app.post("/api/chat", async (req, res) => {
  const { messages, selectedModule } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Yêu cầu danh sách tin nhắn hợp lệ." });
  }

  // Define module context if one is selected
  const modulePrompt = selectedModule 
    ? `Học sinh đang hỏi/ôn tập chuyên sâu về học phần: ${selectedModule.id} - ${selectedModule.title}.\nThông tin tóm tắt học phần: ${selectedModule.description}\nHướng thực hành cốt lõi: ${selectedModule.practicalFocus || "Chưa có quy trình cụ thể"}`
    : "Học sinh đang ở trang tổng quan và có thể hỏi bất kỳ chủ đề nào trong chương trình nông nghiệp Trồng trọt từ MH07 đến MH22.";

  const systemInstruction = `Bạn là Trợ lý Chatbot AI cốt cán hỗ trợ học tập và thực hành của LIÊN THÔNG CAO ĐẲNG NGHỀ KHOA HỌC TRỒNG TRỌT (KHOA HỌC CÂY TRỒNG) thuộc TRƯỜNG CAO ĐẲNG CƠ ĐIỆN HÀ NỘI (HCEM).

BỐI CẢNH MÔN HỌC & ĐỐI TƯỢNG PHỤC VỤ:
- Đối tượng chính: Sinh viên hệ Liên thông Cao đẳng, cán bộ kỹ thuật nông nghiệp cấp cơ sở, người học có nhu cầu thực hành.
- Chương trình đào tạo bao gồm các module cốt lõi: MH07 (Thực vật học), MH08 (Di truyền thực vật), MH09 (Hóa sinh thực vật), MH10 (Chuyển đổi số trong nông nghiệp), MH11 (Bảo vệ thực vật), MH12 (Chuyển giao tiến bộ KHKT), MH13 (Thực tập nghề nghiệp), MH14 (Ứng dụng công nghệ cao trong sản xuất nông nghiệp), MH15 (Hoa cây cảnh), đến các MH16 - MH22 (canh tác rau, hoa, cây ăn quả, cây lương thực, cây công nghiệp, canh tác hữu cơ VietGAP và khởi nghiệp nông nghiệp).

BẠN CẦN TUÂN THỦ NGHIÊM NGẶT CÁC QUY TẮC PHÁT NGÔN SAU:
1. TRÌNH ĐỘ SƯ PHẠM (CAO ĐẲNG): Giải thích kiến thức nông nghiệp khoa học chính xác, sử dụng thuật ngữ chuyên môn chính xác nhưng cực kỳ dễ hiểu, ngắn gọn, trực diện, kết hợp lý thuyết với thực tiễn sản xuất. Giải nghĩa các thuật ngữ Latinh hoặc khoa học khó khi đề cập tới (Ví dụ: bón fertigation là gì, tên bệnh nấm lây lan...).
2. THỰC TIỄN & SẢN XUẤT TẠI VIỆT NAM: Luôn lấy ví dụ sản xuất thực tế tại Việt Nam để minh họa sinh động. Ví dụ: Trồng hoa cúc ở làng nghề hoa Tây Tựu hay Mê Linh (Hà Nội), kỹ thuật xử lý đào Nhật Tân đón Tết, kỹ thuật cắt tỉa quất nghệ thuật Văn Giang (Hưng Yên), canh tác lúa cải tiến SRI ở đồng bằng sông Hồng, nhà màng trồng dưa lưới áp dụng tưới nhỏ giọt tự động bù áp ở các HTX nông nghiệp công nghệ cao vùng Đông Bắc Bộ, v.v.
3. CẤU TRÚC QUY TRÌNH KỸ THUẬT: Khi học sinh hỏi về quy trình thực hành hoặc kỹ thuật thao tác nông nghiệp nào đó, bạn PHẢI cố gắng tổ chức câu trả lời đầy đủ & mạch lạc theo form chuẩn 11 mục sau:
   - 1. Mục tiêu
   - 2. Cơ sở lý thuyết
   - 3. Chuẩn bị
   - 4. Dụng cụ, vật tư và thiết bị
   - 5. Quy trình thực hiện (chi tiết từng bước rõ ràng)
   - 6. Yêu cầu kỹ thuật đạt được
   - 7. Kết quả mong đợi
   - 8. Những lỗi thường gặp khi thao tác
   - 9. Biện pháp khắc phục lỗi
   - 10. An toàn lao động
   - 11. Tiêu chí đánh giá kết quả
4. KIỂM SOÁT THÔNG TIN CHÍNH XÁC: Nếu câu hỏi nằm ngoài kiến thức cây trồng, nông nghiệp, bảo vệ thực vật, hóa sinh hữu cơ hoặc ngoài chương trình đào tạo hiện có của HCEM, bạn bắt buộc phải thông báo nguyên văn dòng chữ sau trước khi trả lời tham khảo thêm:
   "Nội dung này chưa được tìm thấy trong các tài liệu đào tạo hiện có. Dưới đây là kiến thức tham khảo bổ sung."
   Tuyệt đối không được bịa đặt quy trình kỹ thuật nguy hiểm, liều lượng thuốc bảo vệ thực vật độc hại phi khoa học.
5. KẾT THÚC SƯ PHẠM: Cuối câu trả lời, hãy tóm tắt ngắn gọn 1-2 dòng ý chính và KHUYẾN KHÍCH học tập bằng cách LIÊN HỆ GỢI Ý 03 câu hỏi ôn tập ngắn gọn để học sinh tự làm.

Bối cảnh hiện tại:
${modulePrompt}`;

  try {
    const ai = getAiClient();
    
    // Format the messages for Gemini SDK (combining history)
    const formattedContents = messages.map(msg => ({
      role: msg.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Xin lỗi, AI tạm thời không tạo được nội dung trả lời. Hãy thử hỏi câu khác.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Lỗi khi kết nối tới Gemini API:", error);
    res.status(500).json({ 
      error: "Không thể kết nối đến máy chủ AI.",
      details: error.message 
    });
  }
});

// API endpoint to generate quiz questions dynamically about a selected module
app.post("/api/quiz", async (req, res) => {
  const { moduleId, moduleTitle, historyAnswers } = req.body;

  if (!moduleId) {
    return res.status(400).json({ error: "Thiếu mã học phần để tạo câu hỏi." });
  }

  const prompt = `Hãy sinh ra chính xác 01 câu hỏi trắc nghiệm chất lượng cao bằng tiếng Việt dành cho trình độ Trung cấp Trồng trọt, xoay quanh môn học "${moduleId} - ${moduleTitle}".
Nếu có thông tin lịch sử của học sinh đã làm trước đó, hãy cố gắng tạo câu hỏi mới mẻ hơn.

Yêu cầu xuất ra cấu trúc JSON chuẩn dưới đây. Không thêm bất kỳ ký tự nào ngoài chuỗi JSON này, tuyệt đối không bao bọc trong nhãn dán markdown \`\`\`json hay bất kỳ nhãn nào khác để đảm bảo phân tích được JSON trực tiếp:
{
  "question": "Nội dung câu hỏi trắc nghiệm tiếng Việt rõ ràng, bám sát kiến thức nghề...",
  "options": [
    "Đáp án A...",
    "Đáp án B...",
    "Đáp án C...",
    "Đáp án D..."
  ],
  "answerIndex": 0, // Vị trí đáp án đúng trong mảng options (0 đến 3)
  "explanation": "Lời giải thích cặn kẽ, khoa học nhưng dễ hiểu tại sao đáp án đó đúng, bao gồm bối cảnh thực hành và thực tế ở Việt Nam."
}`;

  try {
    const ai = getAiClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.85,
      }
    });

    const parsedData = JSON.parse(result.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Lỗi tạo câu hỏi trắc nghiệm:", error);
    // Return a fallback question in case anything fails so the user experience is flawless
    res.json({
      question: `Trong kỹ thuật bảo vệ thực vật (MH11) của Trường Cao đẳng Cơ điện Hà Nội, nguyên tắc "4 đúng" áp dụng khi sử dụng thuốc bảo vệ thực vật bao gồm những yếu tố nào?`,
      options: [
        "Đúng thuốc, đúng liều lượng nồng độ, đúng lúc, đúng cách",
        "Đúng mùa vụ, đúng giá tiền, đúng thời tiết, đúng người phun",
        "Đúng liều lượng, đúng thời kỳ bón lót, đúng hãng sản xuất, đúng kỹ sư chỉ định",
        "Đúng nhãn mác, đúng dụng cụ phun, đúng chỗ bán, đúng khuyến cáo"
      ],
      answerIndex: 0,
      explanation: `Nguyên tắc "4 đúng" kinh điển của bảo vệ thực vật tại Việt Nam bao gồm: Đúng thuốc, đúng nồng độ & liều lượng, đúng lúc, và đúng cách. Việc tuân thủ nguyên tắc này giúp tiêu diệt sâu hại chính xác, hạn chế lãng phí, giảm thiểu tồn dư chất độc sinh học trong nông sản hữu cơ (như rau muối, chè Thái Nguyên), bảo vệ sinh thái đồng ruộng và giữ an toàn tuyệt đối cho người phun thuốc.`
    });
  }
});

async function startServer() {
  // Vite integration in development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HCEM Crop Chatbot] Máy chủ đang chạy tại: http://localhost:${PORT}`);
  });
}

startServer();
