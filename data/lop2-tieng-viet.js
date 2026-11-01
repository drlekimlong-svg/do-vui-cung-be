/* Ngân hàng câu hỏi Tiếng Việt lớp 2, theo các chủ điểm của sách Tiếng Việt 2 (Kết nối tri thức):
   từ chỉ sự vật, hoạt động, đặc điểm; câu giới thiệu, câu nêu hoạt động, câu nêu đặc điểm; dấu câu; chính tả. */
window.CAU_HOI = window.CAU_HOI || {};

/* chính tả: [từ đúng, từ sai, lưu ý] */
CAU_HOI.chinhta2 = [
  ["cây tre","cây che","tr/ch"],["con trâu","con châu","tr/ch"],["quả chanh","quả tranh","ch/tr"],["chăm chỉ","trăm chỉ","ch/tr"],
  ["trang sách","chang sách","tr/ch"],["che ô","tre ô","ch/tr"],["trường học","chường học","tr/ch"],["chú mèo","trú mèo","ch/tr"],
  ["hoa sen","hoa xen","s/x"],["xe đạp","se đạp","x/s"],["ngôi sao","ngôi xao","s/x"],["màu xanh","màu sanh","x/s"],
  ["quyển sách","quyển xách","s/x"],["sông nước","xông nước","s/x"],["xinh đẹp","sinh đẹp","x/s"],["xem phim","sem phim","x/s"],
  ["con dê","con rê","d/r"],["rổ rá","dổ rá","r/d"],["giáo viên","dáo viên","gi/d"],["dòng sông","giòng sông","d/gi"],
  ["cơn gió","cơn dó","gi/d"],["quả dừa","quả giừa","d/gi"],["cái rổ","cái giổ","r/gi"],["gia đình","da đình","gi/d"],
  ["lá cây","ná cây","l/n"],["nón lá","lón lá","n/l"],["con nai","con lai","n/l"],["lạnh giá","nạnh giá","l/n"],
  ["nấu cơm","lấu cơm","n/l"],["bàn làm việc","bàn nàm việc","l/n"],["nước mắt","lước mắt","n/l"],["quả na","quả la","n/l"],
  ["bàn tay","bàn tai","ay/ai"],["cái tai","cái tay","ai/ay"],["máy bay","máy bai","ay/ai"],["thứ hai","thứ hay","ai/ay"],
  ["bay cao","bay cau","ao/au"],["cây cau","cây cao","au/ao"],["màu sắc","mào sắc","au/ao"],["ngôi sao","ngôi sau","ao/au"],
  ["chim sáo","chim sáu","ao/au"],["số sáu","số sáo","au/ao"],["cái rìu","cái riêu","iu/iêu"],["nhiều bạn","nhìu bạn","iêu/iu"],
  ["núi cao","nuối cao","ui/uôi"],["con muỗi","con mũi","uôi/ui"],["cái mũi","cái muỗi","ui/uôi"],["tuổi thơ","tủi thơ","uôi/ui"],
  ["con lươn","con lương","ươn/ương"],["cái giường","cái giườn","ương/ươn"],["bàn chân","bàn châng","ân/âng"],["nâng niu","nân niu","âng/ân"]
];

/* phân loại từ */
CAU_HOI.rho2 = [
  {t:"Từ chỉ sự vật hay từ chỉ hoạt động?",a:"Sự vật",ea:"📦",ia:["bàn ghế","con mèo","quyển vở","cây bút","mặt trời","cô giáo","bông hoa"],b:"Hoạt động",eb:"🏃",ib:["chạy","đọc","viết","quét nhà","nhảy dây","hát","tưới cây"]},
  {t:"Từ chỉ hoạt động hay từ chỉ đặc điểm?",a:"Hoạt động",ea:"🏃",ia:["ăn","bơi","vẽ","học bài","trồng cây","đá bóng","nấu cơm"],b:"Đặc điểm",eb:"🌈",ib:["cao","xinh đẹp","đỏ thắm","chăm chỉ","hiền lành","nhanh nhẹn","mềm mại"]},
  {t:"Từ chỉ sự vật hay từ chỉ đặc điểm?",a:"Sự vật",ea:"📦",ia:["dòng sông","cái thước","chú chó","bác sĩ","áo mưa","mái nhà","cánh đồng"],b:"Đặc điểm",eb:"🌈",ib:["trong xanh","dài","vàng óng","thông minh","to lớn","ngọt","lấp lánh"]},
  {t:"Việc ở nhà hay việc ở trường?",a:"Ở nhà",ea:"🏠",ia:["quét nhà","rửa bát","gấp quần áo","tưới rau","trông em"],b:"Ở trường",eb:"🏫",ib:["chào cờ","làm bài kiểm tra","trực nhật lớp","mượn sách thư viện","xếp hàng vào lớp"]}
];

/* kiểu câu */
CAU_HOI.kieucau2 = [
  {lv:1,q:"“Bác An là nông dân.” là câu gì?",a:"Câu giới thiệu",w:["Câu nêu hoạt động","Câu nêu đặc điểm"],why:"Câu giới thiệu cho biết người đó là ai."},
  {lv:1,q:"“Em đang đọc sách.” là câu gì?",a:"Câu nêu hoạt động",w:["Câu giới thiệu","Câu nêu đặc điểm"],why:"“Đọc sách” là hoạt động."},
  {lv:1,q:"“Bông hoa rất đỏ.” là câu gì?",a:"Câu nêu đặc điểm",w:["Câu giới thiệu","Câu nêu hoạt động"],why:"“Rất đỏ” nêu đặc điểm của bông hoa."},
  {lv:1,q:"“Đây là cô giáo của em.” là câu gì?",a:"Câu giới thiệu",w:["Câu nêu hoạt động","Câu nêu đặc điểm"],why:"Câu này giới thiệu cô giáo."},
  {lv:1,q:"“Đàn cò bay trên đồng.” là câu gì?",a:"Câu nêu hoạt động",w:["Câu nêu đặc điểm","Câu giới thiệu"],why:"“Bay” là hoạt động của đàn cò."},
  {lv:1,q:"“Mái tóc của bà bạc trắng.” là câu gì?",a:"Câu nêu đặc điểm",w:["Câu nêu hoạt động","Câu giới thiệu"],why:"“Bạc trắng” là đặc điểm."},
  {lv:2,q:"Câu nào là câu giới thiệu?",a:"Bố em là bác sĩ.",w:["Bố em đang khám bệnh.","Bố em rất cao."],why:"“Là bác sĩ” giới thiệu về bố."},
  {lv:2,q:"Câu nào là câu nêu hoạt động?",a:"Các bạn đang nhảy dây.",w:["Các bạn rất vui.","Đây là các bạn của em."],why:"“Nhảy dây” là hoạt động."},
  {lv:2,q:"Câu nào là câu nêu đặc điểm?",a:"Dòng sông trong xanh.",w:["Dòng sông chảy qua làng.","Đây là sông Hồng."],why:"“Trong xanh” là đặc điểm."},
  {lv:2,q:"Câu “Con mèo nhà em rất hiền.” trả lời câu hỏi nào?",a:"Con mèo thế nào?",w:["Con mèo làm gì?","Con mèo là gì?"],why:"“Rất hiền” cho biết mèo thế nào."},
  {lv:2,q:"Câu “Chim sâu bắt sâu cho lá.” trả lời câu hỏi nào?",a:"Chim sâu làm gì?",w:["Chim sâu thế nào?","Chim sâu là gì?"],why:"Câu nêu hoạt động của chim sâu."},
  {lv:3,q:"Từ nào điền vào “Bạn Hoa rất ___.” để có câu nêu đặc điểm?",a:"chăm chỉ",w:["quét nhà","cái bàn"],why:"“Chăm chỉ” là từ chỉ đặc điểm."},
  {lv:3,q:"Từ nào điền vào “Bé ___ cho mẹ.” để có câu nêu hoạt động?",a:"lấy nước",w:["ngoan","cái cốc"],why:"“Lấy nước” là từ chỉ hoạt động."},
  {lv:3,q:"Trong câu “Lúa chín vàng trên đồng.”, từ nào chỉ đặc điểm?",a:"vàng",w:["lúa","đồng"],why:"“Vàng” chỉ màu sắc của lúa chín."},
  {lv:3,q:"Trong câu “Mẹ đan áo cho em.”, từ nào chỉ hoạt động?",a:"đan",w:["mẹ","áo"],why:"“Đan” là hoạt động."},
  {lv:3,q:"Trong câu “Thỏ con nhảy trên cỏ.”, từ nào chỉ sự vật?",a:"thỏ con",w:["nhảy","trên"],why:"“Thỏ con” chỉ con vật."},
  {lv:3,q:"Từ nào dùng để nói về sự thân thiết của bạn bè?",a:"thân thiết",w:["cao vút","chua ngọt"],why:"Bạn bè thân thiết, gắn bó với nhau."}
];

/* dấu câu */
CAU_HOI.daucau2 = [
  {lv:1,s:"Hôm nay em đi học___",a:".",w:["?","!"],why:"Câu kể kết thúc bằng dấu chấm."},
  {lv:1,s:"Bạn tên là gì___",a:"?",w:[".","!"],why:"Câu hỏi kết thúc bằng dấu chấm hỏi."},
  {lv:1,s:"Ôi, bông hoa đẹp quá___",a:"!",w:[".","?"],why:"Câu bộc lộ cảm xúc dùng dấu chấm than."},
  {lv:1,s:"Mấy giờ mẹ về___",a:"?",w:[".","!"],why:"Đây là câu hỏi."},
  {lv:1,s:"Em rất yêu bà của em___",a:".",w:["?",","],why:"Câu kể dùng dấu chấm."},
  {lv:1,s:"Hoan hô, đội mình thắng rồi___",a:"!",w:["?",","],why:"Câu thể hiện niềm vui dùng dấu chấm than."},
  {lv:2,s:"Vườn nhà em có cam___ bưởi và ổi.",a:",",w:[".","?"],why:"Dấu phẩy ngăn cách các từ cùng loại."},
  {lv:2,s:"Sáng nay___ em dậy sớm.",a:",",w:["?","!"],why:"Dấu phẩy tách phần chỉ thời gian."},
  {lv:2,s:"Mẹ em mua sách___ vở và bút mới.",a:",",w:[".","!"],why:"Dấu phẩy ngăn cách các đồ vật trong câu."},
  {lv:2,s:"Vì sao bầu trời lại xanh___",a:"?",w:[".",","],why:"Có “vì sao” nên đây là câu hỏi."},
  {lv:2,s:"Chà, chú mèo này ngộ ghê___",a:"!",w:["?",","],why:"Từ “chà” thể hiện cảm xúc."},
  {lv:3,s:"Lớp em có Nam, Hà___ Minh và Lan.",a:",",w:[".","?"],why:"Giữa các tên bạn dùng dấu phẩy."},
  {lv:3,s:"Bạn có thích đọc truyện không___",a:"?",w:[".","!"],why:"“Có … không” là câu hỏi."},
  {lv:3,s:"Mùa xuân về___ hoa đào nở rộ.",a:",",w:["?","!"],why:"Dấu phẩy tách hai vế của câu."},
  {lv:3,s:"Cả nhà ơi, em được điểm tốt rồi___",a:"!",w:["?",","],why:"Câu nói thể hiện niềm vui."}
];

/* nối cặp */
CAU_HOI.noi2 = [
  {t:"Nối từ có nghĩa trái ngược nhau.",p:[["to","nhỏ"],["cao","thấp"],["dài","ngắn"],["nóng","lạnh"],["sáng","tối"],["nhanh","chậm"],["vui","buồn"],["đầy","vơi"],["sạch","bẩn"],["khoẻ","yếu"],["mới","cũ"],["chăm","lười"]]},
  {t:"Nối từ có nghĩa giống nhau.",p:[["siêng năng","chăm chỉ"],["to lớn","khổng lồ"],["xinh đẹp","xinh xắn"],["thông minh","sáng dạ"],["nhỏ bé","tí hon"],["vui vẻ","hớn hở"],["nhanh nhẹn","lanh lợi"],["hiền lành","hiền hậu"]]},
  {t:"Nối người với công việc.",p:[["bác sĩ","khám bệnh"],["giáo viên","dạy học"],["nông dân","trồng lúa"],["thợ xây","xây nhà"],["đầu bếp","nấu ăn"],["phi công","lái máy bay"],["lính cứu hoả","dập lửa"],["thợ may","may áo"]]},
  {t:"Nối con vật với tiếng kêu.",p:[["gà trống","ò ó o"],["mèo","meo meo"],["chó","gâu gâu"],["vịt","cạc cạc"],["bò","ụm bò"],["dê","be be"],["ếch","ộp ộp"],["heo","ụt ịt"]]}
];

/* xếp câu */
CAU_HOI.cau2 = [
  {lv:1,s:"Em|là|học sinh|lớp 2."},{lv:1,s:"Bố|em|là|công nhân."},{lv:1,s:"Mẹ|đang|tưới|rau."},{lv:1,s:"Bầu trời|rất|trong xanh."},
  {lv:1,s:"Chú mèo|ngủ|trên|ghế."},{lv:1,s:"Lan|chăm chỉ|đọc|sách."},
  {lv:2,s:"Buổi sáng,|em|tập thể dục|cùng|bố."},{lv:2,s:"Đàn gà|đang|mổ thóc|ngoài|sân."},{lv:2,s:"Trường|em|có|nhiều|cây xanh."},
  {lv:2,s:"Bà|kể|cho|em|nghe|truyện cổ tích."},{lv:2,s:"Các bạn|xếp hàng|ngay ngắn|vào|lớp."},{lv:2,s:"Mùa hè,|hoa phượng|nở|đỏ rực."},
  {lv:3,s:"Thư viện|trường|em|có|rất|nhiều|sách hay."},{lv:3,s:"Chủ nhật,|cả nhà|em|về|quê|thăm|ông bà."},
  {lv:3,s:"Những|đám mây|trắng|trôi|lững lờ|trên|bầu trời."},{lv:3,s:"Việt Nam|là|quê hương|yêu dấu|của|em."},
  {lv:3,s:"Chúng em|trồng|cây|để|bảo vệ|môi trường."},{lv:3,s:"Mỗi|buổi tối,|em|chuẩn bị|sách vở|cho|ngày mai."}
];

/* đọc hiểu */
CAU_HOI.doc2 = [
  {lv:1,t:"Ngày đầu năm học",p:"Lên lớp Hai, Na được ngồi cạnh bạn Tuấn. Cô giáo mới rất hiền. Cô phát cho mỗi bạn một quyển vở màu xanh. Na viết thật cẩn thận tên mình lên nhãn vở.",
   qs:[{q:"Na học lớp mấy?",a:"Lớp Hai",w:["Lớp Một","Lớp Ba"]},{q:"Cô giáo phát cho các bạn gì?",a:"Quyển vở",w:["Chiếc bút","Cái thước"]},{q:"Na viết gì lên nhãn vở?",a:"Tên của mình",w:["Tên cô giáo","Tên bạn Tuấn"]}]},
  {lv:1,t:"Ông em",p:"Ông em năm nay đã bảy mươi tuổi. Sáng nào ông cũng ra vườn tưới cây. Ông trồng cam, ổi và nhiều loại hoa. Em thích nhất là được theo ông ra vườn.",
   qs:[{q:"Ông em bao nhiêu tuổi?",a:"Bảy mươi tuổi",w:["Năm mươi tuổi","Tám mươi tuổi"]},{q:"Sáng nào ông cũng làm gì?",a:"Tưới cây",w:["Đọc báo","Đi chợ"]}]},
  {lv:1,t:"Bức tranh của Hà",p:"Hà vẽ một bức tranh về mùa xuân. Trong tranh có cây đào nở hoa và đàn chim én. Cô giáo khen tranh của Hà rất đẹp. Hà vui lắm.",
   qs:[{q:"Hà vẽ về mùa nào?",a:"Mùa xuân",w:["Mùa hè","Mùa đông"]},{q:"Trong tranh có con vật gì?",a:"Chim én",w:["Con trâu","Cá vàng"]}]},
  {lv:2,t:"Chú ong nhỏ",p:"Trời vừa hửng nắng, chú ong nhỏ đã bay đi tìm mật. Chú bay qua vườn cải, ghé vào từng bông hoa vàng. Đến chiều, chú mang đầy mật về tổ. Cả đàn ong đều vui vì có thêm nhiều mật ngọt.",
   qs:[{q:"Ong đi tìm mật khi nào?",a:"Khi trời vừa hửng nắng",w:["Khi trời tối","Khi có mưa to"]},{q:"Ong ghé vào hoa gì?",a:"Hoa cải vàng",w:["Hoa hồng đỏ","Hoa sen hồng"]},{q:"Từ nào nói đúng về chú ong?",a:"Chăm chỉ",w:["Lười biếng","Hay ngủ"]}]},
  {lv:2,t:"Cuộc điện thoại",p:"Bà nội ở quê gọi điện cho Bình. Bình cầm máy và lễ phép chào bà. Bình kể với bà rằng mình vừa được cô giáo khen. Bà dặn Bình nhớ ăn ngoan, học giỏi.",
   qs:[{q:"Ai gọi điện cho Bình?",a:"Bà nội",w:["Cô giáo","Bố của Bình"]},{q:"Bình kể với bà chuyện gì?",a:"Được cô giáo khen",w:["Bị ngã xe","Mới mua cặp sách"]},{q:"Bình có điểm gì đáng khen?",a:"Lễ phép",w:["Nghịch ngợm","Hay quên"]}]},
  {lv:2,t:"Hành tinh xanh",p:"Sau giờ học, lớp 2A cùng nhặt rác quanh sân trường. Các bạn để riêng chai nhựa vào một túi để tái chế. Cô giáo nói: “Mỗi việc nhỏ của các em đều giúp Trái Đất xanh hơn”.",
   qs:[{q:"Lớp 2A đã làm gì?",a:"Nhặt rác quanh sân trường",w:["Đá bóng","Đi xem phim"]},{q:"Chai nhựa được để riêng để làm gì?",a:"Để tái chế",w:["Để chơi","Để đựng nước uống"]},{q:"Việc nhỏ của các bạn giúp gì?",a:"Trái Đất xanh hơn",w:["Trời mưa nhiều hơn","Lớp học to hơn"]}]},
  {lv:3,t:"Quê em",p:"Quê em ở ven sông Hồng. Mùa này, bãi ngô xanh mướt trải dài theo bờ sông. Buổi chiều, lũ trẻ thả diều trên đê, tiếng sáo vi vu nghe thật thích. Dù đi đâu, em vẫn nhớ con đê và cánh diều ở quê.",
   qs:[{q:"Quê em ở đâu?",a:"Ven sông Hồng",w:["Trên núi cao","Ngoài đảo xa"]},{q:"Lũ trẻ thả diều ở đâu?",a:"Trên đê",w:["Trong sân trường","Trên mái nhà"]},{q:"Từ “xanh mướt” nói về cái gì?",a:"Bãi ngô",w:["Con đê","Cánh diều"]},{q:"Đoạn văn nói lên tình cảm gì của em?",a:"Yêu và nhớ quê hương",w:["Sợ về quê","Không thích thả diều"]}]},
  {lv:3,t:"Người thợ gốm",p:"Bác Tư là thợ gốm ở làng nghề. Từ khối đất sét, đôi tay bác nhào nặn thành chiếc bình thật đẹp. Bác nói nghề gốm cần tỉ mỉ và kiên nhẫn. Nhờ những người như bác, các sản phẩm của làng được nhiều nơi biết đến.",
   qs:[{q:"Bác Tư làm nghề gì?",a:"Thợ gốm",w:["Thợ mộc","Thợ may"]},{q:"Chiếc bình làm từ gì?",a:"Đất sét",w:["Gỗ","Sắt"]},{q:"Nghề gốm cần điều gì?",a:"Tỉ mỉ và kiên nhẫn",w:["Chạy thật nhanh","Nói thật to"]}]},
  {lv:3,t:"Sự tích hoa cúc",p:"Ngày xưa có một cô bé rất thương mẹ. Mẹ ốm nặng, cô đi tìm thuốc. Một cụ già bảo: “Bông hoa có bao nhiêu cánh, mẹ cháu sống bấy nhiêu năm”. Cô bé xé mỗi cánh hoa thành nhiều cánh nhỏ để mẹ sống thật lâu.",
   qs:[{q:"Vì sao cô bé đi tìm thuốc?",a:"Vì mẹ ốm nặng",w:["Vì em bé khóc","Vì bố đi xa"]},{q:"Cô bé xé cánh hoa để làm gì?",a:"Để mẹ sống thật lâu",w:["Để hoa đẹp hơn","Để làm đồ chơi"]},{q:"Câu chuyện ca ngợi điều gì?",a:"Lòng hiếu thảo",w:["Sự lười biếng","Tính tham lam"]}]}
];
