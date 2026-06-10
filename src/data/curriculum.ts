export interface Module {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  theoryHours: number;
  practicalHours: number;
  practicalFocus: string;
  vietnamExamples: string[];
}

export const MODULES: Module[] = [
  {
    id: "MH07",
    title: "Thực vật học",
    shortDesc: "Kiến thức cơ bản nhất về cấu tạo tế bào, rễ, thân, lá, hoa, quả, hạt và các nguyên lý phân loại thực vật học phổ thông trong sản xuất trồng trọt.",
    description: "Trình bày cấu tạo giải phẫu thực vật, rễ bám dinh dưỡng, thân cây dẫn truyền, cơ chế quang hợp hô hấp của lá. Nhận biết và định danh các họ thực vật cây trồng phổ biến qua tiếng Việt và danh pháp Latinh học.",
    theoryHours: 15,
    practicalHours: 27,
    practicalFocus: "Quan sát tế bào rễ hành dưới kính hiển vi; phân loại rễ cọc, rễ chùm và các biến thái củ; tách hạt dưa hấu, quan sát mầm hạt và phân biệt rọ họ một lá mầm (Lúa, ngô) với hai lá mầm (Đỗ, cà).",
    vietnamExamples: [
      "Ứng dụng phân biệt hình thái bộ rễ lúa nước Đông Xuân tại vùng đồng bằng sông Hồng.",
      "Quan sát sự biến thái của thân rễ nghệ, củ gừng tại các ruộng thâm canh nếp cổ truyền Sơn Tây."
    ]
  },
  {
    id: "MH08",
    title: "Di truyền thực vật",
    shortDesc: "Nền tảng di truyền học ở cấp độ phân tử và tế bào, các quy luật lai Mendel, tính trạng số lượng chất lượng và ứng dụng bất dục đực trong chọn giống lúa lai.",
    description: "Giới thiệu cấu trúc phân tử ADN, quy luật nhân đôi, quá trình nguyên phân giảm phân, tương tác gen và ứng dụng thực tiễn của ưu thế lai và hiện tượng dị hợp tử trong bảo tồn nguồn gen thụ phấn chéo.",
    theoryHours: 15,
    practicalHours: 27,
    practicalFocus: "Đánh giá mức độ phân ly kiểu hình thực tiễn; phân biệt lúa lai hai dòng dùng dòng bất dục đực nhạy cảm nhiệt độ (TGMS), lai tạo các tổ hợp dòng ưu thế lai trên ruộng thực nghiệm liên thông.",
    vietnamExamples: [
      "Ứng dụng dòng lúa lai hai dòng F1 chất lượng cao kháng bạc lá tại Trâu Quỳ (Gia Lâm).",
      "Lai tạo tuyển chọn các dòng ngô lai hạt màu vàng cam thích nghi hạn tại vùng núi gò đồi Ba Vì."
    ]
  },
  {
    id: "MH09",
    title: "Hóa sinh thực vật",
    shortDesc: "Các thành phần hóa học cơ bản gồm Enzyme, Vitamin, Gluxit, Protein, Lipit và các con đường chuyển hóa năng lượng hô hấp của mô thực vật sống.",
    description: "Khám phá bản chất xúc tác sinh học của enzyme Amilase phân giải tinh bột, các vitamin hòa tan trong nước rễ và dầu béo, cơ chế quang hợp tích lũy đường bột của các loại rau quả, hạt lương thực sau thu hoạch.",
    theoryHours: 15,
    practicalHours: 27,
    practicalFocus: "Tách chiết Enzyme Amilase từ hạt thóc nảy mầm; kiểm nghiệm hoạt tính Amilase phân giải lớp tinh bột ở các nhiệt độ đun nóng khác nhau; định tính nhận biết sự có mặt glucide và protein lát cắt khoai tây.",
    vietnamExamples: [
      "Ứng dụng Amilase thóc mầm trong sản xuất kẹo mạch nha truyền sành cổ truyền làng Đường Lâm.",
      "Sự chuyển hóa tinh bột thành đường fructoza ngọt lịm khi ủ chín chuối tiêu Hồng xuất khẩu tại Khoái Châu."
    ]
  },
  {
    id: "MH10",
    title: "Chuyển đổi số trong nông nghiệp",
    shortDesc: "Ứng dụng hạ tầng số, các hệ thống cảm biến IOT tự động hóa tưới bón, hệ thống cơ sở truy xuất nguồn gốc nông sản mã QR hiện đại.",
    description: "Tiếp cận nông nghiệp thông minh thời kỳ 4.0; cấu tạo và cách vận hành lập trình cơ bản cổng cảm biến đo độ ẩm đất, thiết bị điều khiển cường độ chiếu sáng trong nhà màng tự động.",
    theoryHours: 15,
    practicalHours: 27,
    practicalFocus: "Đăng nhập phần mềm nhật ký số hợp tác xã; thực hành lắp đặt và kiểm tra các cảm biến ẩm độ đất tưới nhỏ giọt thông minh bù áp; xuất mã QR truy xuất chuỗi hành trình dưa lưới, chè VietGAP.",
    vietnamExamples: [
      "Hệ thống giám sát điều khiển vi khí hậu nhà kính trồng hoa cúc công nghệ cao tại Mộc Châu.",
      "Ứng dụng quét mã QR truy xuất nguồn gốc nhãn muộn chín muộn đặc sản Khoái Châu, Hưng Yên."
    ]
  },
  {
    id: "MH11",
    title: "Bảo vệ thực vật",
    shortDesc: "Nhận diện hình thái, sinh học côn trùng hại, triệu chứng bệnh cây do nấm hại, vi khuẩn gây thối và các phương pháp quản lý dịch hại tổng hợp IPM.",
    description: "Học phần trang bị kiến thức phân loại côn trùng (cánh phấn, cánh cứng, hai cánh), chẩn đoán triệu chứng biến màu, chảy gôm, mụn mủ bệnh hại, nguyên tắc '4 đúng' sử dụng thuốc an toàn.",
    theoryHours: 15,
    practicalHours: 27,
    practicalFocus: "Bắt sâu, làm kính vi phẫu cánh côn trùng; phân biệt vết bệnh sinh học thối nhũn với rầy nâu gây cháy lá; dán nhãn thuốc bảo vệ thực vật; bảo hộ lao động và thao tác đo đếm nồng độ phun béc ngô.",
    vietnamExamples: [
      "Quản lý tổng hợp IPM phòng trừ rầy hại cánh mềm hại xoài cát hữu cơ vùng Hoài Đức.",
      "Sử dụng thuốc trừ sâu sinh học chế phẩm từ tỏi ớt để dập rầy cánh phấn trên rau sạch Đông Anh."
    ]
  },
  {
    id: "MH12",
    title: "Chuyển giao tiến bộ KHKT",
    shortDesc: "Xây dựng các lớp học hiện trường cho nông dân (FFS), thiết kế giáo án tập huấn lấy người học làm trung tâm, nhân rộng mô hình trình diễn nông nghiệp.",
    description: "Cung cấp phương pháp kỹ năng truyền thông khuyến nông viên, lắng nghe tích cực học viên, sử dụng vòng tròn trải nghiệm thực hành nông nghiệp xanh, biên soạn tờ rơi hướng dẫn bón phân.",
    theoryHours: 15,
    practicalHours: 27,
    practicalFocus: "Thiết kế giáo án buổi thảo luận nhóm; lập sơ đồ tư duy chu trình tập huấn FFS tại nhà văn hóa thôn; đóng vai khuyến nông viên tư vấn trực tiếp cho xã viên về ứng phó hạn sương muối dốc.",
    vietnamExamples: [
      "Lớp học hiện trường nông dân FFS phòng trừ hữu cơ sâu róm hại chè Thái Nguyên xanh sạch.",
      "Tổ chức ngày hội trình diễn bón phân bón vi sinh cho khoai tây vụ đông tại Nam Sách, Hải Dương."
    ]
  },
  {
    id: "MH13",
    title: "Thực tập nghề nghiệp",
    shortDesc: "Vận dụng tổng hợp toàn bộ quy trình chăm bón, gieo trồng thực tế một loại cây ngắn ngày ngoài ruộng kết hợp bố trí nghiên cứu khoa học đơn yếu tố.",
    description: "Thực hành dọn đất, lên luống liếp vuông vắn, bón lót phân lân sinh học, gieo hạt theo quy chuẩn khoảng cách mật độ, theo dõi tỷ lệ nảy mầm rễ non, thu hoạch hạch toán hiệu quả kinh tế.",
    theoryHours: 0,
    practicalHours: 475,
    practicalFocus: "Tự lập liếp trồng dưa chuột hoặc rau cải sạch; chia ô thí nghiệm bón 3 mức phân hữu cơ vi sinh so sánh; ghi chép chỉ tiêu sinh trưởng (chiều cao, số lá); viết báo cáo khoa học thuyết trình.",
    vietnamExamples: [
      "Bố trí thí nghiệm đánh giá ảnh hưởng mật độ trồng đến năng suất cải bắp lùn tại vườn thực nghiệm HCEM.",
      "Thực tế chăm sóc theo dõi sâu xanh da láng hại hành hoa vụ đông tại Đông Triều, Quảng Ninh."
    ]
  },
  {
    id: "MH14",
    title: "Ứng dụng công nghệ cao trong nông nghiệp",
    shortDesc: "Trang bị các kiến thức làm nhà màng nhà kính che chắn sâu cơ học, công nghệ tưới dinh dưỡng fertigation, thủy canh dinh dưỡng động, nuôi cấy mô.",
    description: "Nắm vững nguyên lý vận hành tưới nhỏ giọt bù áp Israel, phối trộn dung dịch thủy canh đa trung vi lượng, kỹ thuật vô trùng nuôi cấy mô nhân giống rễ lan, khoai tây sạch bệnh nhân nhanh.",
    theoryHours: 30,
    practicalHours: 42,
    practicalFocus: "Đo đạc EC và pH dung dịch thủy canh dưa lưới; lập bản thiết kế sơ đồ đường ống béc phun sương mái; thao tác cắt mô sẹo cấy lan hồ điệp trong buồng vô trùng tủ cấy tủ thổi khí ấm.",
    vietnamExamples: [
      "Nhà màng Israel trồng dưa lưới công nghệ tưới nhỏ giọt bù áp tự động tại Đan Phượng, Hà Nội.",
      "Trung tâm nhân giống hoa lan nuôi cấy mô quy mô lớn phục vu hoa Tết tại Gia Lâm."
    ]
  },
  {
    id: "MH15",
    title: "Hoa cây cảnh",
    shortDesc: "Kỹ thuật gieo trồng, bón phân, hãm hoa nở trúng Tết, tỉa cành bấm ngọn tạo tán thế cho hoa cúc, hồng, đào Tết và cây quất cảnh phong thủy.",
    description: "Chi tiết quy trình cắm cành giâm mọc rễ cúc, cắt tỉa cành sâu bệnh hoa hồng Pháp, thao tác thiến (khoanh vỏ hãm cành dồn nhựa) và tuốt lá cho hoa đào nở đúng kỳ đón xuân, uốn tán quất phong thủy.",
    theoryHours: 7,
    practicalHours: 21,
    practicalFocus: "Thực hành bấm ngọn tạo cành cấp 2 hoa cúc; khoanh vỏ hãm nhựa đào đầu tháng 8; tuốt lá bánh tẻ đào cuối tháng 11; cắt hoa cúc gốc đều nhau dài 80cm bó gói lá chuối chống dập nát.",
    vietnamExamples: [
      "Kỹ thuật xử lý đào bích thế uốn u Nhật Tân nở rộ đúng mùng 1 Tết Âm Lịch.",
      "Thao tác cắt tỉa dặm quả chín vàng cho quất cảnh Văn Giang đón khí thế dồi dào tài lộc."
    ]
  },
  {
    id: "MH16",
    title: "Kỹ thuật trồng cây lương thực",
    shortDesc: "Quy trình thâm canh lúa cải tiến, ngô lai năng suất cao thích nghi hạn và khoai lang chất lượng tinh bột béo.",
    description: "Tìm hiểu hệ sinh thái đất bùn lúa nước, ứng phó hạn dốc vùng cao, phương pháp bón phân cân đối lân kali cho lúa đẻ bồi gốc cứng cành, chống đổ rạp bão lốc.",
    theoryHours: 15,
    practicalHours: 27,
    practicalFocus: "Thực hành ngâm ủ lúa mầm nứt nanh; gieo mạ nền cứng phủ nilon trắng lạnh; cấy lúa hàng rộng hàng hẹp tiêu chuẩn SRI bảo vệ sức đất đồng lúa.",
    vietnamExamples: [
      "Canh tác lúa nếp đặc sản Tú Lệ thơm dẻo trên ruộng bậc thang Yên Bái.",
      "Gieo trồng khoai lang tím giống Nhật Bản năng suất cao tại vùng bãi bồi ven sông Hồng."
    ]
  },
  {
    id: "MH17",
    title: "Kỹ thuật trồng cây ăn quả",
    shortDesc: "Quy chuẩn thiết kế trang trại cây ăn quả quy mô xóm HTX, kỹ thuật ghép cành cải tạo già hóa, kích hoa vụ nghịch chín vàng mọng.",
    description: "Nghiên cứu yêu cầu khí hậu á nhiệt đới đất đỏ bazan đồi xói mòn, xử lý đào hố lót phân lợn hoai rơm rạ mục, kỹ thuật cắt tỉa cành đực cành tăm thu thoáng nắng hại nhện đỏ.",
    theoryHours: 12,
    practicalHours: 28,
    practicalFocus: "Gọt mắt ghép nêm hình chữ U hoa nhãn lồng; ghép nêm đào ghép mận vùng trung du; khoanh vỏ điều tiết ra rễ múi lưởi cam bưởi chiết dồi dào dưỡng nhựa.",
    vietnamExamples: [
      "Ghép nêm cải tạo vườn bưởi Diễn kém năng suất tại vùng gò đồi Thạch Thất, Hà Nội.",
      "Quy trình xử lý ra hoa nghịch vụ chín tháng 5 cho giống xoài Đài Loan tại Mai Sơn, Sơn La."
    ]
  },
  {
    id: "MH18",
    title: "Kỹ thuật trồng cây công nghiệp",
    shortDesc: "Khoa học canh tác thâm canh đốn đồi chè VietGAP bền vững, kiến thức trồng và thu hoạch chế biến thô mủ cao su và nhân cà phê Arabica.",
    description: "Nắm vững kỹ thuật canh tác bậc thang đất dốc chống xói mòn rửa trôi, kỹ thuật đốn chè vụ đông tích luỹ dinh dưỡng mùn, phun thuốc trừ rầy xanh sinh học an toàn bảo vệ đồi chè.",
    theoryHours: 14,
    practicalHours: 26,
    practicalFocus: "Thao tác hái chè tiêu chuẩn một tôm hai lá bánh tẻ; đốn rẫy chè bằng dao kéo chuyên dụng giữ vết cắt chéo 45 độ phẳng phiu; chiết giâm cành chè cành chè sạch bệnh.",
    vietnamExamples: [
      "Canh tác chè đặc sản Tân Cương (Thái Nguyên) xuất khẩu dùng phân hữu cơ đậu tương ủ hoai.",
      "Trồng xen cây họ đậu cúc che phủ phủ đất hạn chế rửa trôi tại rẫy cà phê vùng Tây Nguyên."
    ]
  },
  {
    id: "MH19",
    title: "Kỹ thuật trồng cây rau",
    shortDesc: "Công nghệ gieo trồng các loại rau ăn lá, ăn củ ăn quả ngắn ngày theo tiêu chuẩn rau an toàn hữu cơ VietGAP và thu hái giữ độ giòn ngọt.",
    description: "Nhận biết thời kỳ bón thúc lân đỗ tương, bón đạm hữu cơ lỏng đúng quy chuẩn an toàn trước khi thu hoạch 15 ngày, quản lý cỏ dại hữu cơ không dùng hóa chất diệt cỏ hủy đất.",
    theoryHours: 10,
    practicalHours: 25,
    practicalFocus: "Thao tác làm luống dốc thoát nước trồng rau cải bắp hoa súp lơ; phủ màng bóng nông nghiệp giữ ẩm diệt cỏ dại; thu hái bắp cải chặt tay tỉa lá già cuống ngắn phẳng vỏ nhựa.",
    vietnamExamples: [
      "Hợp tác xã sản xuất rau hữu cơ sạch khép kín tại Đông Anh cung ứng chuỗi siêu thị Hà Nội.",
      "Quy trình bọc trái màng xốp tránh sâu đục quả dưa chuột giống Nhật tại Gia Lâm."
    ]
  },
  {
    id: "MH20",
    title: "Kỹ thuật sản xuất giống cây trồng",
    shortDesc: "Quy luật chọn nhân giống vô tính giâm chiết ghép gỗ hóa sừng và thụ phấn lai chéo súp lơ ngô lúa siêu nguyên chủng.",
    description: "Hình thành kiến thức nhân giống gốc, quản lý vườn ươm giống, thuốc kích thích ra rễ tơ IAA tự nhiên, kỹ thuật cấy bấc giữ ẩm giâm hom nách chè an toàn rễ.",
    theoryHours: 12,
    practicalHours: 24,
    practicalFocus: "Nhúng hom giâm thuốc kích rễ; quấn nilon mắt ghép tránh sương thấm đọng nước; khoanh bầu chiết bao cành bọc đất mùn bạt rơm hoai tơi thoáng khí.",
    vietnamExamples: [
      "Nhân giống khoai tây bằng phương pháp khí canh tơi rễ thu hoạch quả siêu củ hữu cơ tại Ba Vì.",
      "Sản xuất nhân giống cành bưởi hoàng sành hạt mập rễ khỏe cung ứng cho hệ thống vườn ươm Đông Bắc Bộ."
    ]
  },
  {
    id: "MH21",
    title: "Canh tác hữu cơ & bền vững",
    shortDesc: "Ứng dụng các quy tắc bảo nông bền vững lâu dài, hạn chế ô nhiễm dinh dưỡng đất bãi bồi sông Hồng, phân vi sinh đa dụng vi lượng khỏe cây.",
    description: "Thấu hiểu chu trình sinh địa, cơ chế bón lót mùn dừa rơm hoai tăng độ thoáng khí rễ, quy trình luân canh cây bộ đậu bù nitơ cố định đạm khí trời tự nhiên dồi dào.",
    theoryHours: 15,
    practicalHours: 25,
    practicalFocus: "U hoai phân hữu cơ nấm giống Trichoderma giải độc cellulose; trồng che phủ rơm rạ bãi ngập dâu; xử lý rác rưởi hữu cơ bã chè ủ nấm làm phân lót tơi xốp mùn cây.",
    vietnamExamples: [
      "HTX rau hữu cơ phân vi sinh luân canh luân vụ cải bắp cải ngọt tăng sức bền đất tại Sóc Sơn.",
      "Trồng xen cây cốt khí lạc dại phục hồi độ phì sa mạc hóa đất dốc Sơn La cải tạo rẫy ăn mòn."
    ]
  },
  {
    id: "MH22",
    title: "Khởi nghiệp và Khuyến nông",
    shortDesc: "Hạch toán chi phí trang trại quy chuẩn xóm xã tư nhân, tiếp thị nông sản xanh và lập các kế hoạch phát triển kinh doanh nông trang hữu dụng.",
    description: "Học cách tính chi phí giống, rơm che, điện bơm tưới bù áp,kali bón kali phun, hao hụt bão lớn, nhân lợi nhuận ròng sạch, sử dụng internet quảng bá mật ong chè hoa cúc sấy thăng hoa.",
    theoryHours: 15,
    practicalHours: 15,
    practicalFocus: "Lập bảng cân đối thu chi dưa lưới nhà màng 1000m2; viết kế hoạch khởi nghiệp kinh doanh dưa chuột xuất khẩu; thiết kế mẫu nhãn bao bì và logo maketing chè organic.",
    vietnamExamples: [
      "Học viên HCEM xây dựng dự án khởi nghiệp trồng dưa lưới hữu cơ sấy dẻo nông lâm.",
      "Kế hoạch truyền bá bao tiêu sản phẩm miến dong hữu cơ vùng núi biên giới Ba Vì tiếp cận sàn số."
    ]
  }
];
