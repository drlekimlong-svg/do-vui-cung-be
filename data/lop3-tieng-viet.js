/* Ngân hàng câu hỏi Tiếng Việt lớp 3, theo các chủ điểm của sách Tiếng Việt 3 (Kết nối tri thức):
   từ chỉ đặc điểm, hoạt động, trạng thái; so sánh; câu kể, câu hỏi, câu khiến, câu cảm; dấu hai chấm, ngoặc kép, gạch ngang. */
window.CAU_HOI = window.CAU_HOI || {};

CAU_HOI.chinhta3 = [
  ["chăm chút","trăm chút","ch/tr"],["trung thực","chung thực","tr/ch"],["trong trẻo","chong chẻo","tr/ch"],["chia sẻ","tria sẻ","ch/tr"],
  ["sương sớm","xương xớm","s/x"],["xôn xao","sôn sao","x/s"],["san sẻ","xan xẻ","s/x"],["sáng suốt","xáng xuốt","s/x"],
  ["rì rào","dì dào","r/d"],["dịu dàng","rịu ràng","d/r"],["gia đình","da đình","gi/d"],["giữ gìn","dữ dìn","gi/d"],
  ["reo hò","deo hò","r/d"],["dồi dào","giồi giào","d/gi"],["giòn tan","dòn tan","gi/d"],["rực rỡ","dực dỡ","r/d"],
  ["lung linh","nung ninh","l/n"],["nồng nàn","lồng làn","n/l"],["lấp lánh","nấp nánh","l/n"],["nề nếp","lề lếp","n/l"],
  ["lo lắng","no nắng","l/n"],["nóng nực","lóng lực","n/l"],["long lanh","nong nanh","l/n"],["năng nổ","lăng lổ","n/l"],
  ["khăn quàng","khăng quàng","ăn/ăng"],["trăng rằm","trăn rằm","ăng/ăn"],["ngẩng đầu","ngẩn đầu","âng/ân"],["sân trường","sâng trường","ân/âng"],
  ["cuốn sách","cuống sách","uôn/uông"],["chuồng gà","chuồn gà","uông/uôn"],["con lươn","con lương","ươn/ương"],["vườn cây","vường cây","ươn/ương"],
  ["hiểu biết","hiểu biếc","iêt/iêc"],["xanh biếc","xanh biết","iêc/iêt"],["tuốt lúa","tuốc lúa","uôt/uôc"],["cuộc thi","cuột thi","uôc/uôt"],
  ["thắc mắc","thắt mắt","ăc/ăt"],["sạch sẽ","sạch xẽ","s/x"],["quả xoài","quả xoày","oai/oay"],["xoay tròn","xoai tròn","oay/oai"],
  ["kiên trì","kiêng trì","iên/iêng"],["siêng năng","siên năng","iêng/iên"],["bay lượn","bay lượng","ươn/ương"],["mượt mà","mược mà","ươt/ươc"]
];

CAU_HOI.sosanh3 = [
  {lv:1,q:"Câu nào có hình ảnh so sánh?",a:"Trăng tròn như quả bóng.",w:["Trăng lên cao dần.","Em ngắm trăng rằm."],why:"“Trăng” được so sánh với “quả bóng” qua từ “như”."},
  {lv:1,q:"Trong “Mặt nước sáng như gương.”, từ nào là từ so sánh?",a:"như",w:["sáng","nước"],why:"“Như” là từ dùng để so sánh."},
  {lv:1,q:"“Trẻ em như búp trên cành.” Trẻ em được so sánh với gì?",a:"Búp trên cành",w:["Cành cây","Cánh đồng"],why:"Trẻ em được so sánh với búp non."},
  {lv:1,q:"Điền từ so sánh: “Hai bàn tay em ___ hai bông hoa.”",a:"như",w:["và","của"],why:"“Như” giúp so sánh bàn tay với bông hoa."},
  {lv:2,q:"“Tiếng suối trong như tiếng hát.” Hai sự vật nào được so sánh?",a:"Tiếng suối và tiếng hát",w:["Tiếng suối và dòng sông","Tiếng hát và bài ca"],why:"Tiếng suối được so sánh với tiếng hát."},
  {lv:2,q:"Điền hình ảnh phù hợp: “Tóc bà trắng như ___.”",a:"cước",w:["than","mực"],why:"Người ta nói “trắng như cước”. Than và mực thì đen."},
  {lv:2,q:"Điền hình ảnh phù hợp: “Thỏ chạy nhanh như ___.”",a:"tên bắn",w:["rùa bò","sên bò"],why:"“Nhanh như tên bắn” là cách nói quen thuộc."},
  {lv:2,q:"Điền hình ảnh phù hợp: “Bạn ấy khoẻ như ___.”",a:"voi",w:["kiến","muỗi"],why:"“Khoẻ như voi”."},
  {lv:3,q:"“Quả bưởi tròn như chiếc đèn lồng treo trên cao.” Quả bưởi được so sánh với gì?",a:"Chiếc đèn lồng",w:["Trên cao","Cây bưởi"],why:"Quả bưởi được ví với chiếc đèn lồng qua từ “như”."},
  {lv:3,q:"Câu nào so sánh sự vật với con người?",a:"Cây đa như ông lão đứng đầu làng.",w:["Cây đa rất to và rất già.","Ông lão ngồi dưới gốc đa."],why:"Cây đa được so sánh với ông lão."},
  {lv:3,q:"Từ nào có thể thay cho “như” trong “Mặt biển như tấm lụa”?",a:"tựa",w:["trên","nhưng"],why:"“Tựa” cũng là từ so sánh."},
  {lv:3,q:"Trong “Mặt hồ là tấm gương lớn giữa trời.”, từ dùng để so sánh là từ nào?",a:"là",w:["hồ","lớn"],why:"“Là” ở đây cũng dùng để so sánh mặt hồ với tấm gương."}
];

CAU_HOI.kieucau3 = [
  {lv:1,q:"Câu nào là câu hỏi?",a:"Bạn đã làm bài chưa?",w:["Bạn hãy làm bài đi!","Bạn làm bài rồi."],why:"Câu hỏi dùng để hỏi, cuối câu có dấu chấm hỏi."},
  {lv:1,q:"Câu nào là câu khiến?",a:"Em hãy đóng cửa lại!",w:["Em đóng cửa rồi.","Cửa đóng chưa?"],why:"Câu khiến dùng để đề nghị, yêu cầu, thường có “hãy, đừng, chớ, nhé”."},
  {lv:1,q:"Câu nào là câu cảm?",a:"Ôi, cầu vồng đẹp quá!",w:["Cầu vồng có bảy màu.","Cầu vồng ở đâu thế?"],why:"Câu cảm bộc lộ cảm xúc, thường có “ôi, chà, quá”."},
  {lv:1,q:"Câu nào là câu kể?",a:"Hôm nay em đi học.",w:["Hôm nay em có đi học không?","Em đi học thôi!"],why:"Câu kể dùng để kể, tả, giới thiệu."},
  {lv:2,q:"Dấu hiệu thường gặp của câu khiến là từ nào?",a:"hãy",w:["ôi","vì sao"],why:"Câu khiến thường có các từ hãy, đừng, chớ, nên."},
  {lv:2,q:"Dấu câu nào thường đặt cuối câu cảm?",a:"Dấu chấm than",w:["Dấu chấm hỏi","Dấu hai chấm"],why:"Câu cảm thường kết thúc bằng dấu chấm than."},
  {lv:2,q:"“Chà, bạn vẽ khéo thật!” là câu gì?",a:"Câu cảm",w:["Câu kể","Câu hỏi"],why:"Câu bộc lộ sự thán phục."},
  {lv:2,q:"“Đừng vứt rác ra sân trường!” là câu gì?",a:"Câu khiến",w:["Câu cảm","Câu kể"],why:"Câu đưa ra yêu cầu, có từ “đừng”."},
  {lv:3,q:"Chuyển “Em quét lớp.” thành câu khiến:",a:"Em hãy quét lớp đi!",w:["Em quét lớp chưa?","Ôi, lớp sạch quá!"],why:"Thêm “hãy … đi” để thành câu khiến."},
  {lv:3,q:"Chuyển “Bạn hát hay.” thành câu cảm:",a:"Bạn hát hay quá!",w:["Bạn có hát không?","Bạn hát đi!"],why:"Thêm “quá” và dấu chấm than."},
  {lv:3,q:"Từ nào là từ chỉ trạng thái?",a:"buồn",w:["cái bàn","chạy"],why:"“Buồn” chỉ trạng thái của con người."},
  {lv:3,q:"Trong “Mặt trời toả nắng vàng.”, từ chỉ đặc điểm là từ nào?",a:"vàng",w:["toả","mặt trời"],why:"“Vàng” chỉ màu sắc của nắng."}
];

/* bộ phận câu trả lời câu hỏi nào */
CAU_HOI.cauhoi3 = [
  {lv:1,q:"“Sáng mai, lớp em đi tham quan.” Bộ phận “Sáng mai” trả lời câu hỏi nào?",a:"Khi nào?",w:["Ở đâu?","Vì sao?"],why:"“Sáng mai” chỉ thời gian."},
  {lv:1,q:"“Trong vườn, hoa nở rộ.” Bộ phận “Trong vườn” trả lời câu hỏi nào?",a:"Ở đâu?",w:["Khi nào?","Để làm gì?"],why:"“Trong vườn” chỉ nơi chốn."},
  {lv:1,q:"“Vì trời mưa, chúng em nghỉ tập.” Bộ phận in đầu câu trả lời câu hỏi nào?",a:"Vì sao?",w:["Khi nào?","Bằng gì?"],why:"“Vì trời mưa” nêu nguyên nhân."},
  {lv:2,q:"“Em học bài để cuối năm đạt kết quả tốt.” Bộ phận sau từ “để” trả lời câu hỏi nào?",a:"Để làm gì?",w:["Ở đâu?","Khi nào?"],why:"Từ “để” nêu mục đích."},
  {lv:2,q:"“Bác nông dân cày ruộng bằng máy cày.” Bộ phận “bằng máy cày” trả lời câu hỏi nào?",a:"Bằng gì?",w:["Vì sao?","Khi nào?"],why:"“Bằng” chỉ phương tiện."},
  {lv:2,q:"“Năm nay, chị tôi lên lớp Sáu.” Hỏi về thời gian thì hỏi thế nào?",a:"Khi nào chị tôi lên lớp Sáu?",w:["Chị tôi lên lớp Sáu ở đâu?","Vì sao chị tôi lên lớp Sáu?"],why:"“Khi nào” dùng để hỏi thời gian."},
  {lv:3,q:"Câu nào trả lời cho câu hỏi “Để làm gì?”",a:"Em tiết kiệm để mua sách.",w:["Em đi học vào buổi sáng.","Em ngủ ở phòng ngủ."],why:"“Để mua sách” nêu mục đích."},
  {lv:3,q:"Câu nào trả lời cho câu hỏi “Vì sao?”",a:"Lúa tốt nhờ mưa thuận gió hoà.",w:["Lúa đang trổ bông.","Lúa trồng ngoài đồng."],why:"“Nhờ mưa thuận gió hoà” nêu nguyên nhân."},
  {lv:3,q:"Câu nào trả lời cho câu hỏi “Bằng gì?”",a:"Bạn Na đến trường bằng xe đạp.",w:["Bạn Na đến trường lúc bảy giờ.","Bạn Na đến trường vì thích học."],why:"“Bằng xe đạp” chỉ phương tiện."}
];

CAU_HOI.daucau3 = [
  {lv:1,s:"Mẹ dặn em___ “Con nhớ về sớm nhé!”",a:":",w:[".","?"],why:"Dấu hai chấm báo hiệu lời nói trực tiếp."},
  {lv:1,s:"Hộp bút của em có___ bút chì, tẩy và thước kẻ.",a:":",w:["?","!"],why:"Dấu hai chấm báo hiệu phần liệt kê."},
  {lv:1,s:"Hôm nay trời đẹp quá___",a:"!",w:[":",","],why:"Câu cảm kết thúc bằng dấu chấm than."},
  {lv:2,s:"Nam nói ___Tớ đi cùng cậu nhé!”",a:":“",w:[",“",".“"],why:"Trước lời nói trực tiếp dùng dấu hai chấm và mở ngoặc kép."},
  {lv:2,s:"Trên đồng, các bác nông dân gặt lúa___ tuốt lúa và phơi rơm.",a:",",w:[":","?"],why:"Dấu phẩy ngăn cách các hoạt động."},
  {lv:2,s:"Trong rừng có nhiều loài thú___ hổ, báo, hươu, nai.",a:":",w:["?","!"],why:"Dấu hai chấm báo hiệu phần liệt kê."},
  {lv:3,q:"Dấu gạch ngang thường dùng để làm gì?",a:"Đánh dấu lời nói của nhân vật",w:["Kết thúc câu hỏi","Bộc lộ cảm xúc"],why:"Dấu gạch ngang đặt ở đầu dòng lời đối thoại."},
  {lv:3,q:"Dấu ngoặc kép thường dùng để làm gì?",a:"Đánh dấu lời nói trực tiếp",w:["Kết thúc câu kể","Ngăn cách các từ"],why:"Lời nói trực tiếp thường đặt trong ngoặc kép."},
  {lv:3,s:"Bác nói với cháu___ “Cháu học giỏi lắm!”",a:":",w:["?",","],why:"Dấu hai chấm báo hiệu lời nói trực tiếp."}
];

CAU_HOI.tucngu3 = [
  {lv:1,s:"Ăn quả nhớ kẻ ___ cây.",a:"trồng",w:["chặt","hái"],why:"Biết ơn người đã làm ra thành quả cho mình."},
  {lv:1,s:"Uống nước nhớ ___.",a:"nguồn",w:["ao","cốc"],why:"Nhớ ơn nơi đã sinh ra mình, người đã giúp mình."},
  {lv:1,s:"Công cha như núi Thái Sơn, nghĩa mẹ như ___ trong nguồn chảy ra.",a:"nước",w:["mưa","gió"],why:"Câu ca dao nói về công ơn cha mẹ."},
  {lv:1,s:"Một con ngựa đau, cả tàu bỏ ___.",a:"cỏ",w:["rơm","lúa"],why:"Khuyên đoàn kết, thương yêu nhau."},
  {lv:2,s:"Lá lành đùm lá ___.",a:"rách",w:["xanh","non"],why:"Người có điều kiện giúp đỡ người khó khăn."},
  {lv:2,s:"Có công mài sắt, có ngày nên ___.",a:"kim",w:["búa","dao"],why:"Kiên trì thì sẽ thành công."},
  {lv:2,s:"Học ___ đi đôi với hành.",a:"phải",w:["để","mới"],why:"Học đi đôi với thực hành."},
  {lv:2,s:"Không thầy đố mày làm ___.",a:"nên",w:["sao","gì"],why:"Nhờ có thầy dạy mới thành công."},
  {lv:3,s:"Đi một ngày đàng, học một sàng ___.",a:"khôn",w:["gạo","cơm"],why:"Đi nhiều thì biết nhiều điều hay."},
  {lv:3,s:"Tốt gỗ hơn tốt ___.",a:"nước sơn",w:["cái bàn","cây xanh"],why:"Vẻ tốt bên trong quý hơn vẻ ngoài."},
  {lv:3,s:"Bán anh em xa, mua láng giềng ___.",a:"gần",w:["cao","nhiều"],why:"Hàng xóm ở gần có thể giúp nhau khi cần."},
  {lv:3,s:"Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi ___.",a:"cao",w:["xanh","nhỏ"],why:"Đoàn kết tạo nên sức mạnh."}
];

CAU_HOI.rho3 = [
  {t:"Từ chỉ hoạt động hay trạng thái?",a:"Hoạt động",ea:"🏃",ia:["chạy","viết","leo","gánh","đá bóng","cày ruộng"],b:"Trạng thái",eb:"💭",ib:["buồn","vui","lo lắng","yên tĩnh","sợ hãi","hồi hộp"]},
  {t:"Từ chỉ đặc điểm hay hoạt động?",a:"Đặc điểm",ea:"🌈",ia:["xanh biếc","mềm mại","lấp lánh","thơm ngát","vàng óng","cao vút"],b:"Hoạt động",eb:"🏃",ib:["trồng","tưới","bơi lội","đan len","đọc thơ","kéo co"]},
  {t:"Câu hỏi hay câu khiến?",a:"Câu hỏi",ea:"❓",ia:["Bạn tên gì?","Mấy giờ rồi?","Nhà bạn ở đâu?","Vì sao bạn buồn?"],b:"Câu khiến",eb:"👉",ib:["Hãy giữ trật tự!","Đừng chạy nhanh!","Đi nào!","Chớ làm ồn!"]}
];

CAU_HOI.noi3 = [
  {t:"Nối từ có nghĩa giống nhau.",p:[["tổ quốc","đất nước"],["chăm chỉ","siêng năng"],["bạn bè","bằng hữu"],["dũng cảm","gan dạ"],["ngắm nhìn","chiêm ngưỡng"],["hiếu thảo","thảo hiền"],["to lớn","vĩ đại"],["yêu thương","thương yêu"]]},
  {t:"Nối từ có nghĩa trái ngược nhau.",p:[["siêng năng","lười biếng"],["dũng cảm","hèn nhát"],["trung thực","gian dối"],["rộng rãi","chật hẹp"],["ồn ào","yên tĩnh"],["vội vàng","thong thả"],["gọn gàng","bừa bộn"],["mạnh mẽ","yếu đuối"]]},
  {t:"Nối tên người với lĩnh vực.",p:[["kiến trúc sư","thiết kế nhà"],["nhạc sĩ","sáng tác nhạc"],["hoạ sĩ","vẽ tranh"],["nhà văn","viết truyện"],["kĩ sư","chế tạo máy"],["vận động viên","thi đấu thể thao"]]}
];

CAU_HOI.cau3 = [
  {lv:1,s:"Mùa hè,|em|về|quê|thăm|ông bà."},{lv:1,s:"Sông Hương|chảy|qua|thành phố Huế."},{lv:1,s:"Thư viện|là|nơi|đọc|sách."},
  {lv:1,s:"Những|bông hoa|toả|hương|thơm ngát."},{lv:1,s:"Em|tập|bơi|cùng|bố."},
  {lv:2,s:"Trong|vườn,|lũ|chim|ríu rít|gọi|nhau."},{lv:2,s:"Hai Bà Trưng|là|hai|nữ|anh hùng|của|dân tộc."},
  {lv:2,s:"Rô-bốt|có thể|giúp|con người|làm|nhiều|việc."},{lv:2,s:"Mẹ|em|tỉ mỉ|may|chiếc|áo|mới."},
  {lv:2,s:"Em|tiết kiệm|nước|để|bảo vệ|Trái Đất."},{lv:3,s:"Để|Trái Đất|xanh,|chúng ta|cần|trồng|thật|nhiều|cây."},
  {lv:3,s:"Vì|trời|mưa|to,|trận|đấu|phải|dừng|lại."},{lv:3,s:"Sáng|nay,|cả|lớp|em|đến|thăm|Bảo tàng|Lịch sử."},
  {lv:3,s:"Nhà rông|là|nét|đẹp|văn hoá|của|Tây Nguyên."},{lv:3,s:"Bằng|sự|kiên trì,|bạn|ấy|đã|học|giỏi|hơn."}
];

CAU_HOI.doc3 = [
  {lv:1,t:"Về quê",p:"Hè năm nay, Minh về thăm quê nội. Sáng sớm, Minh theo ông ra đồng, nghe tiếng gà gáy và ngửi mùi lúa chín. Chiều đến, Minh cùng các bạn thả diều trên đê. Minh thấy quê hương thật đẹp và đáng nhớ.",
   qs:[{q:"Minh về quê vào dịp nào?",a:"Kì nghỉ hè",w:["Tết Nguyên đán","Ngày khai giảng"]},{q:"Buổi chiều Minh làm gì?",a:"Thả diều trên đê",w:["Đi gặt lúa","Làm bài tập"]},{q:"Minh cảm thấy thế nào về quê?",a:"Đẹp và đáng nhớ",w:["Buồn và chán","Xa lạ và sợ hãi"]}]},
  {lv:1,t:"Thư viện lớp",p:"Lớp 3B có một góc thư viện nhỏ. Mỗi bạn mang đến một cuốn sách để đọc chung. Giờ ra chơi, nhiều bạn ngồi đọc rất say sưa. Bạn Hoa còn giúp cô xếp sách lại gọn gàng.",
   qs:[{q:"Sách ở góc thư viện từ đâu mà có?",a:"Mỗi bạn mang đến một cuốn",w:["Cửa hàng tặng","Mua ở chợ"]},{q:"Bạn Hoa đã giúp cô làm gì?",a:"Xếp sách gọn gàng",w:["Lau bảng","Phát vở"]},{q:"“Say sưa” có nghĩa là gì?",a:"Rất tập trung và thích thú",w:["Rất buồn ngủ","Rất vội vàng"]}]},
  {lv:1,t:"Ngọn hải đăng",p:"Ngoài đảo xa có một ngọn hải đăng cao vút. Đêm đêm, đèn hải đăng quay đều, chiếu sáng cả một vùng biển. Nhờ có ánh sáng ấy, tàu thuyền biết đường đi an toàn. Các chú canh giữ hải đăng rất vất vả nhưng luôn vui vẻ.",
   qs:[{q:"Hải đăng dùng để làm gì?",a:"Chỉ đường cho tàu thuyền",w:["Bắt cá","Tạo ra gió"]},{q:"Đèn hải đăng sáng khi nào?",a:"Ban đêm",w:["Buổi trưa","Chỉ ngày Tết"]}]},
  {lv:2,t:"Câu cá",p:"Mèo con theo mẹ đi câu cá. Thấy chuồn chuồn bay qua, mèo con bỏ cần câu chạy theo. Lát sau lại thấy bướm vàng, nó lại đuổi theo bướm. Đến trưa, mèo mẹ câu được nhiều cá, còn mèo con chẳng có con nào. Mẹ bảo: “Làm việc gì cũng phải tập trung, con ạ”.",
   qs:[{q:"Vì sao mèo con không câu được cá?",a:"Vì không tập trung",w:["Vì cần câu bị gãy","Vì hồ không có cá"]},{q:"Mèo con đã đuổi theo những con gì?",a:"Chuồn chuồn và bướm",w:["Chim và sóc","Ong và kiến"]},{q:"Câu chuyện khuyên em điều gì?",a:"Làm việc phải tập trung",w:["Nên đi câu mỗi ngày","Không nên nuôi mèo"]}]},
  {lv:2,t:"Sông quê",p:"Con sông quê em uốn lượn như một dải lụa mềm. Sáng sớm, mặt sông phủ một lớp sương mỏng. Đến trưa, nước sông lấp lánh ánh nắng. Chiều về, những chiếc thuyền nhỏ nối đuôi nhau trở về bến.",
   qs:[{q:"Con sông được so sánh với gì?",a:"Dải lụa mềm",w:["Tấm gương","Con đường"]},{q:"Buổi sáng, mặt sông thế nào?",a:"Phủ sương mỏng",w:["Lấp lánh nắng","Tối đen"]},{q:"Những chiếc thuyền về bến khi nào?",a:"Buổi chiều",w:["Sáng sớm","Giữa trưa"]}]},
  {lv:2,t:"Thư gửi Trái Đất",p:"Trái Đất thân mến! Con biết bạn đang rất mệt vì khói bụi và rác thải. Từ hôm nay, con sẽ tắt đèn khi ra khỏi phòng, tiết kiệm nước và mang túi vải khi đi chợ. Con mong bầu trời của bạn lúc nào cũng xanh.",
   qs:[{q:"Vì sao Trái Đất mệt?",a:"Vì khói bụi và rác thải",w:["Vì quay quá nhanh","Vì thiếu đèn"]},{q:"Bạn nhỏ sẽ mang gì khi đi chợ?",a:"Túi vải",w:["Túi ni lông","Hộp nhựa"]},{q:"Việc nào bạn nhỏ hứa sẽ làm?",a:"Tắt đèn khi ra khỏi phòng",w:["Đốt rác trong sân","Bật quạt cả ngày"]}]},
  {lv:3,t:"Hai Bà Trưng",p:"Ngày xưa, giặc phương Bắc cai trị nước ta rất tàn ác. Hai chị em Trưng Trắc và Trưng Nhị đã dựng cờ khởi nghĩa ở Mê Linh. Nghĩa quân đánh đuổi quân giặc, giành lại non sông. Đến nay, nhân dân vẫn lập đền thờ và tưởng nhớ công ơn của Hai Bà.",
   qs:[{q:"Hai Bà Trưng khởi nghĩa ở đâu?",a:"Mê Linh",w:["Thăng Long","Huế"]},{q:"Vì sao Hai Bà khởi nghĩa?",a:"Vì giặc cai trị tàn ác",w:["Vì muốn đi chơi xa","Vì thiếu nhà để ở"]},{q:"Nhân dân tưởng nhớ Hai Bà bằng cách nào?",a:"Lập đền thờ",w:["Xây sân bóng","Mở cửa hàng"]},{q:"Từ nào nói đúng về Hai Bà Trưng?",a:"Anh hùng",w:["Nhút nhát","Lười biếng"]}]},
  {lv:3,t:"Rô-bốt quanh ta",p:"Ngày nay, rô-bốt xuất hiện ở nhiều nơi. Trong nhà máy, rô-bốt lắp ráp ô tô rất nhanh. Trong nhà, rô-bốt hút bụi giúp bố mẹ. Ở nơi nguy hiểm như vùng cháy, rô-bốt thay con người làm việc. Tuy vậy, chính con người mới là người tạo ra và điều khiển rô-bốt.",
   qs:[{q:"Trong nhà máy, rô-bốt làm gì?",a:"Lắp ráp ô tô",w:["Hút bụi","Dạy học"]},{q:"Vì sao ở vùng cháy lại cần rô-bốt?",a:"Vì nơi đó nguy hiểm cho con người",w:["Vì rô-bốt thích lửa","Vì rô-bốt rẻ tiền"]},{q:"Ai tạo ra và điều khiển rô-bốt?",a:"Con người",w:["Động vật","Mặt Trời"]},{q:"Ý chính của đoạn văn là gì?",a:"Rô-bốt giúp ích cho con người",w:["Rô-bốt sẽ thay thế hết mọi người","Rô-bốt rất nguy hiểm"]}]}
];
