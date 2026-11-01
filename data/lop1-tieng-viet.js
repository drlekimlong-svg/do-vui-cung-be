/* Ngân hàng câu hỏi Tiếng Việt lớp 1. Bám theo mạch chủ đề của sách Tiếng Việt 1 (Kết nối tri thức).
   Toàn bộ câu và đoạn văn là bài tự viết, không chép từ sách. Muốn thêm câu: thêm một dòng cùng dạng. */
window.CAU_HOI = window.CAU_HOI || {};

/* c/k, g/gh, ng/ngh: e hình, a âm đúng, sai âm sai, duoi phần còn lại của tiếng, w cả từ */
CAU_HOI.luat1 = [
  {e:"🐟",a:"c",sai:"k",duoi:"á",w:"cá"},{e:"🍊",a:"c",sai:"k",duoi:"am",w:"cam"},{e:"🦀",a:"c",sai:"k",duoi:"ua",w:"cua"},
  {e:"🌳",a:"c",sai:"k",duoi:"ây",w:"cây"},{e:"🚩",a:"c",sai:"k",duoi:"ờ",w:"cờ"},{e:"🍚",a:"c",sai:"k",duoi:"ơm",w:"cơm"},
  {e:"🍬",a:"k",sai:"c",duoi:"ẹo",w:"kẹo"},{e:"🍦",a:"k",sai:"c",duoi:"em",w:"kem"},{e:"✂️",a:"k",sai:"c",duoi:"éo",w:"kéo"},
  {e:"🐜",a:"k",sai:"c",duoi:"iến",w:"kiến"},{e:"👓",a:"k",sai:"c",duoi:"ính",w:"kính"},{e:"🎺",a:"k",sai:"c",duoi:"èn",w:"kèn"},
  {e:"🐔",a:"g",sai:"gh",duoi:"à",w:"gà"},{e:"🐻",a:"g",sai:"gh",duoi:"ấu",w:"gấu"},{e:"🪵",a:"g",sai:"gh",duoi:"ỗ",w:"gỗ"},
  {e:"🪑",a:"gh",sai:"g",duoi:"ế",w:"ghế"},{e:"📝",a:"gh",sai:"g",duoi:"i",w:"ghi"},
  {e:"🐴",a:"ng",sai:"ngh",duoi:"ựa",w:"ngựa"},{e:"🌽",a:"ng",sai:"ngh",duoi:"ô",w:"ngô"},{e:"😴",a:"ng",sai:"ngh",duoi:"ủ",w:"ngủ"},
  {e:"🏠",a:"ng",sai:"ngh",duoi:"ôi nhà",w:"ngôi nhà"},{e:"👂",a:"ngh",sai:"ng",duoi:"e",w:"nghe"},{e:"🐃",a:"ngh",sai:"ng",duoi:"é",w:"nghé"},
  {e:"🛌",a:"ngh",sai:"ng",duoi:"ỉ",w:"nghỉ"}
];

/* điền từ vào chỗ trống */
CAU_HOI.dien1 = [
  {lv:1,e:"🐱",s:"Con mèo ___ chuột.",a:"bắt",w:["bay","bơi"],why:"Mèo bắt chuột."},
  {lv:1,e:"🐶",s:"Con chó ___ gâu gâu.",a:"sủa",w:["hót","gáy"],why:"Chó sủa gâu gâu."},
  {lv:1,e:"🐦",s:"Chim ___ trên cành.",a:"hót",w:["sủa","bò"],why:"Chim hót líu lo trên cành."},
  {lv:1,e:"🐟",s:"Cá ___ dưới ao.",a:"bơi",w:["bay","chạy"],why:"Cá bơi dưới nước."},
  {lv:1,e:"🏫",s:"Bé đi ___.",a:"học",w:["nón","bàn"],why:"Bé đi học."},
  {lv:1,e:"📖",s:"Em đọc ___.",a:"sách",w:["cơm","gió"],why:"Sách để đọc."},
  {lv:1,e:"🍚",s:"Cả nhà ăn ___.",a:"cơm",w:["ghế","mây"],why:"Cả nhà cùng ăn cơm."},
  {lv:1,e:"☀️",s:"Trời ___ to.",a:"nắng",w:["bút","bàn"],why:"Trời nắng to."},
  {lv:1,e:"🌧️",s:"Trời đổ ___.",a:"mưa",w:["cá","ghế"],why:"Trời đổ mưa."},
  {lv:1,e:"🌸",s:"Hoa nở thật ___.",a:"đẹp",w:["cao","xa"],why:"Hoa nở thật đẹp."},
  {lv:1,e:"🪥",s:"Bé đánh ___ mỗi sáng.",a:"răng",w:["tóc","áo"],why:"Mỗi sáng bé đánh răng."},
  {lv:1,e:"🧼",s:"Bé rửa ___ trước khi ăn.",a:"tay",w:["ghế","mũ"],why:"Rửa tay sạch rồi mới ăn."},
  {lv:2,e:"👩‍🏫",s:"Cô giáo ___ bài cho cả lớp.",a:"giảng",w:["hái","trồng"],why:"Cô giáo giảng bài."},
  {lv:2,e:"👨‍🌾",s:"Bác nông dân ___ lúa ngoài đồng.",a:"gặt",w:["đọc","vẽ"],why:"Lúa chín, bác nông dân gặt lúa."},
  {lv:2,e:"🚒",s:"Chú lính cứu hoả ___ đám cháy.",a:"dập",w:["nấu","may"],why:"Lính cứu hoả dập tắt đám cháy."},
  {lv:2,e:"🐝",s:"Đàn ong đang hút ___ hoa.",a:"mật",w:["sữa","cát"],why:"Ong hút mật hoa."},
  {lv:2,e:"🚦",s:"Đèn đỏ thì mọi người phải ___ lại.",a:"dừng",w:["chạy","nhảy"],why:"Đèn đỏ phải dừng lại."},
  {lv:2,e:"🌞",s:"Mặt trời mọc ở đằng ___.",a:"đông",w:["tây","sau"],why:"Mặt trời mọc ở đằng đông."},
  {lv:2,e:"👵",s:"Bé quạt mát cho ___ ngủ.",a:"bà",w:["bàn","bút"],why:"Bé thương bà nên quạt cho bà ngủ."},
  {lv:2,e:"🌈",s:"Sau cơn mưa, trên trời có ___ bảy sắc.",a:"cầu vồng",w:["mặt trăng","cái cầu"],why:"Cầu vồng có bảy sắc."},
  {lv:2,e:"🐢",s:"Rùa bò rất ___.",a:"chậm",w:["nhanh","cao"],why:"Rùa bò rất chậm."},
  {lv:2,e:"🐇",s:"Thỏ chạy rất ___.",a:"nhanh",w:["chậm","thấp"],why:"Thỏ chạy rất nhanh."},
  {lv:3,e:"🏞️",s:"Ruộng bậc thang trông như những ___ thang khổng lồ.",a:"bậc",w:["bạc","bật"],why:"Từ đúng là “bậc thang”."},
  {lv:3,e:"🦅",s:"Hải âu là loài chim của ___ cả.",a:"biển",w:["biến","bến"],why:"Hải âu sống ở biển. “Biển cả” là biển rộng."},
  {lv:3,e:"🔔",s:"Trống trường ___ báo giờ vào lớp.",a:"vang lên",w:["bay đi","rơi xuống"],why:"Tiếng trống vang lên báo giờ vào lớp."},
  {lv:3,e:"🤝",s:"Gặp người lớn, em lễ phép ___ hỏi.",a:"chào",w:["chạy","chơi"],why:"Lời chào đi trước, em lễ phép chào hỏi."},
  {lv:3,e:"🌳",s:"Rễ cây giúp cây đứng ___ trước gió.",a:"vững",w:["vui","vàng"],why:"Rễ bám sâu nên cây đứng vững."},
  {lv:3,e:"🧒",s:"Em ___ giúp mẹ quét nhà.",a:"tự giác",w:["tự hỏi","tự do"],why:"Tự giác là tự mình làm, không cần ai nhắc."},
  {lv:3,e:"🌺",s:"Mùa hè, hoa phượng nở đỏ ___ sân trường.",a:"rực",w:["lực","giật"],why:"Đỏ rực là đỏ thắm và rất tươi."},
  {lv:3,e:"🐑",s:"Cậu bé chăn cừu nói dối nên không ai ___ nữa.",a:"tin",w:["tím","tiên"],why:"Nói dối nhiều lần thì không ai còn tin."}
];

/* xếp từ thành câu: các mảnh cách nhau bằng | */
CAU_HOI.cau1 = [
  {lv:1,s:"Bé|đi|học."},{lv:1,s:"Mẹ|nấu|cơm."},{lv:1,s:"Mèo|bắt|chuột."},{lv:1,s:"Bố|đọc|báo."},
  {lv:1,s:"Bà|kể|chuyện."},{lv:1,s:"Chim|hót|hay."},{lv:1,s:"Em|yêu|mẹ."},{lv:1,s:"Cá|bơi|lội."},
  {lv:2,s:"Bé|tưới|cây|cho|bà."},{lv:2,s:"Em|chào|cô|giáo."},{lv:2,s:"Lớp|em|rất|vui."},{lv:2,s:"Mẹ|mua|cho|bé|áo|mới."},
  {lv:2,s:"Đàn|cá|bơi|trong|hồ."},{lv:2,s:"Bé|rửa|tay|trước|khi|ăn."},{lv:2,s:"Hoa|phượng|nở|đỏ|sân|trường."},{lv:2,s:"Em|giúp|bố|quét|nhà."},
  {lv:3,s:"Sáng|nay|em|đến|lớp|đúng|giờ."},{lv:3,s:"Khi|đèn|đỏ|bật,|xe|phải|dừng|lại."},{lv:3,s:"Trên|cành|cây,|đàn|chim|hót|líu|lo."},
  {lv:3,s:"Cả|nhà|em|cùng|ăn|cơm|tối."},{lv:3,s:"Bạn|Nam|cho|em|mượn|bút|chì."},{lv:3,s:"Mùa|hè,|em|được|đi|tắm|biển."},
  {lv:3,s:"Sau|cơn|mưa,|cầu|vồng|hiện|ra."},{lv:3,s:"Bác|bảo|vệ|đánh|trống|báo|giờ|học."}
];

/* đọc hiểu: đoạn văn ngắn tự viết theo chủ đề sách */
CAU_HOI.doc1 = [
  {lv:1,t:"Bạn mới",p:"Lan là bạn mới của lớp em. Lan hay cười. Em cho Lan mượn bút.",
   qs:[{q:"Lan là ai?",a:"Bạn mới của lớp",w:["Cô giáo","Em bé"]},{q:"Em cho Lan mượn gì?",a:"Bút",w:["Áo","Cặp"]}]},
  {lv:1,t:"Bữa cơm",p:"Tối nay mẹ nấu canh cua. Bố dọn bàn. Bé xếp bát đũa. Cả nhà ăn cơm thật vui.",
   qs:[{q:"Mẹ nấu món gì?",a:"Canh cua",w:["Cá kho","Thịt gà"]},{q:"Bé làm việc gì?",a:"Xếp bát đũa",w:["Dọn bàn","Nấu canh"]}]},
  {lv:1,t:"Giờ ra chơi",p:"Trống báo giờ ra chơi. Các bạn trai đá cầu. Các bạn gái nhảy dây. Sân trường thật vui.",
   qs:[{q:"Các bạn gái chơi gì?",a:"Nhảy dây",w:["Đá cầu","Đá bóng"]},{q:"Cái gì báo giờ ra chơi?",a:"Tiếng trống",w:["Tiếng chim","Tiếng xe"]}]},
  {lv:1,t:"Chú mèo",p:"Nhà bé có chú mèo tam thể. Ban ngày, mèo nằm sưởi nắng. Ban đêm, mèo đi bắt chuột.",
   qs:[{q:"Ban ngày mèo làm gì?",a:"Nằm sưởi nắng",w:["Bắt chuột","Đi học"]},{q:"Ban đêm mèo làm gì?",a:"Bắt chuột",w:["Ngủ say","Ăn cơm"]}]},
  {lv:2,t:"Rửa tay",p:"Trước khi ăn, Minh ra vòi nước. Minh xoa xà phòng, kì kĩ từng ngón tay rồi xả sạch. Tay sạch thì vi khuẩn không vào bụng được.",
   qs:[{q:"Khi nào Minh rửa tay?",a:"Trước khi ăn",w:["Sau khi ngủ","Khi đi học về"]},{q:"Vì sao phải rửa tay?",a:"Để vi khuẩn không vào bụng",w:["Để tay to ra","Để chơi với nước"]}]},
  {lv:2,t:"Đèn giao thông",p:"Trên đường có đèn xanh, đèn vàng và đèn đỏ. Đèn đỏ thì xe phải dừng. Đèn vàng thì đi chậm lại. Đèn xanh thì xe được đi.",
   qs:[{q:"Đèn nào báo xe phải dừng?",a:"Đèn đỏ",w:["Đèn xanh","Đèn vàng"]},{q:"Đèn xanh thì xe làm gì?",a:"Được đi",w:["Phải dừng","Quay lại"]}]},
  {lv:2,t:"Cây bàng",p:"Sân trường em có cây bàng rất to. Mùa hè, lá bàng xanh mát. Giờ ra chơi, chúng em ngồi đọc sách dưới gốc cây.",
   qs:[{q:"Cây bàng ở đâu?",a:"Ở sân trường",w:["Ở trong nhà","Ở ngoài biển"]},{q:"Chúng em làm gì dưới gốc cây?",a:"Ngồi đọc sách",w:["Nấu cơm","Tưới rau"]}]},
  {lv:2,t:"Khi mẹ vắng nhà",p:"Mẹ đi chợ, Hoa ở nhà một mình. Có người lạ gõ cửa. Hoa không mở cửa mà gọi điện cho mẹ ngay.",
   qs:[{q:"Hoa có mở cửa cho người lạ không?",a:"Không mở cửa",w:["Mở cửa ngay","Mở rồi mời vào"]},{q:"Hoa đã làm gì?",a:"Gọi điện cho mẹ",w:["Chạy ra đường","Đi ngủ"]}]},
  {lv:3,t:"Kiến và bồ câu",p:"Một chú kiến bị rơi xuống suối. Bồ câu thấy vậy liền thả chiếc lá xuống, nhờ đó kiến bò lên bờ. Hôm sau, kiến cắn vào chân người thợ săn khiến anh ta trượt tay. Bồ câu bay thoát.",
   qs:[{q:"Bồ câu đã cứu kiến bằng gì?",a:"Một chiếc lá",w:["Một cành cây","Một sợi dây"]},{q:"Vì sao bồ câu bay thoát?",a:"Kiến cắn chân người thợ săn",w:["Trời đổ mưa to","Người thợ săn đi ngủ"]},{q:"Câu chuyện khuyên em điều gì?",a:"Biết giúp đỡ lẫn nhau",w:["Không chơi với bạn","Chỉ nghĩ đến mình"]}]},
  {lv:3,t:"Cầu vồng",p:"Mưa vừa tạnh, nắng hửng lên. Trên bầu trời hiện ra một chiếc cầu vồng bảy sắc: đỏ, cam, vàng, lục, lam, chàm, tím. Bé reo lên thích thú và gọi cả nhà ra xem.",
   qs:[{q:"Cầu vồng hiện ra khi nào?",a:"Khi mưa tạnh, nắng lên",w:["Lúc nửa đêm","Khi trời đang mưa to"]},{q:"Cầu vồng có mấy sắc?",a:"Bảy sắc",w:["Ba sắc","Năm sắc"]},{q:"Màu nào có trong cầu vồng?",a:"Màu chàm",w:["Màu hồng","Màu nâu"]}]},
  {lv:3,t:"Nếu bị lạc",p:"Hôm đi chợ cùng mẹ, Tí bị lạc. Tí không khóc mà đứng yên một chỗ. Tí nhờ cô bán hàng gọi vào số điện thoại của mẹ mà Tí đã thuộc. Một lúc sau, mẹ đến đón Tí.",
   qs:[{q:"Khi bị lạc, Tí đã làm gì đầu tiên?",a:"Đứng yên một chỗ",w:["Chạy thật xa","Đi theo người lạ"]},{q:"Tí nhờ ai giúp?",a:"Cô bán hàng",w:["Một bạn nhỏ","Chú chó"]},{q:"Vì sao mẹ tìm được Tí?",a:"Tí thuộc số điện thoại của mẹ",w:["Tí tự đi về","Tí hét thật to"]}]},
  {lv:3,t:"Lớn lên làm gì?",p:"Cô giáo hỏi: “Lớn lên các em muốn làm gì?”. Nam muốn làm lính cứu hoả để giúp mọi người. An muốn làm bác sĩ để chữa bệnh. Còn Mai muốn làm cô giáo, vì Mai rất yêu các bạn nhỏ.",
   qs:[{q:"Nam muốn làm nghề gì?",a:"Lính cứu hoả",w:["Bác sĩ","Giáo viên"]},{q:"Vì sao Mai muốn làm cô giáo?",a:"Vì Mai yêu các bạn nhỏ",w:["Vì Mai thích ăn kẹo","Vì nhà Mai ở gần trường"]},{q:"Ai muốn chữa bệnh cho mọi người?",a:"An",w:["Nam","Mai"]}]}
];
