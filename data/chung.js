/* Câu đố, tìm nhóm, xếp thứ tự, Việt Nam quê em và tiếng Anh dùng cho nhiều lớp.
   Tiếng Anh: lớp 1, 2 là làm quen tự chọn; lớp 3 bám theo mạch từ vựng và mẫu câu của Tiếng Anh 3 (Global Success). */
window.CAU_HOI = window.CAU_HOI || {};

/* câu đố có hình: a [hình, tên]; w các đáp án nhiễu. Nhiều câu là câu đố dân gian */
CAU_HOI.do1 = [
  {lv:1,q:"Con gì sừng cong cong,\nkéo cày trên ruộng đồng,\nnông dân thường gọi là bạn?",a:["🐃","Con trâu"],w:[["🐶","Con chó"],["🐔","Con gà"],["🐄","Con bò"]],why:"Trâu kéo cày giúp bác nông dân. Câu tục ngữ có nói “con trâu là đầu cơ nghiệp”."},
  {lv:1,q:"Cái gì dùng để viết,\nvỏ gỗ ruột đen,\ncàng gọt càng ngắn?",a:["✏️","Bút chì"],w:[["📏","Cái thước"],["📖","Quyển sách"],["🖍️","Bút sáp"]],why:"Bút chì càng gọt càng ngắn đi."},
  {lv:1,q:"Bé đeo cái gì trên lưng\nđể đựng sách vở đến trường?",a:["🎒","Cái cặp"],w:[["🧢","Cái mũ"],["👟","Đôi giày"],["🧸","Gấu bông"]],why:"Cặp sách đựng sách vở và đồ dùng học tập."},
  {lv:1,q:"Cái gì kêu “tùng tùng tùng”\nbáo giờ vào lớp, giờ ra chơi?",a:["🥁","Cái trống"],w:[["🎸","Cây đàn"],["📺","Ti vi"],["🚗","Xe hơi"]],why:"Tiếng trống trường báo giờ học và giờ ra chơi."},
  {lv:1,q:"Xe gì màu đỏ,\ncó thang thật dài,\nchở các chú đi dập lửa?",a:["🚒","Xe cứu hoả"],w:[["🚑","Xe cứu thương"],["🚌","Xe buýt"],["🚜","Máy cày"]],why:"Xe cứu hoả chở các chú lính đi dập lửa."},
  {lv:2,q:"Hoa gì mọc ở dưới đầm,\nlá xanh tròn tròn,\ngần bùn mà chẳng hôi tanh?",a:["🪷","Hoa sen"],w:[["🌹","Hoa hồng"],["🌻","Hoa hướng dương"],["🌷","Hoa tulip"]],why:"Hoa sen mọc dưới đầm và là loài hoa rất đẹp của Việt Nam."},
  {lv:2,q:"Quả gì nhiều mắt,\nđầu đội vương miện xanh,\nvỏ sần sùi, ruột vàng?",a:["🍍","Quả dứa"],w:[["🥭","Quả xoài"],["🍌","Quả chuối"],["🍊","Quả cam"]],why:"Quả dứa có nhiều mắt và chùm lá trên đầu."},
  {lv:2,q:"Bánh gì gói lá dong,\nvuông vắn, màu xanh,\nnhà nhà làm ngày Tết?",a:["🟩","Bánh chưng"],w:[["🎂","Bánh kem"],["🥮","Bánh trung thu"],["🥖","Bánh mì"]],why:"Bánh chưng gói lá dong là món quen thuộc ngày Tết."},
  {lv:3,q:"Con gì nhỏ xíu mà chăm chỉ,\nxếp hàng dài đi tha mồi về tổ?",a:["🐜","Con kiến"],w:[["🐝","Con ong"],["🐛","Con sâu"],["🪳","Con gián"]],why:"Đàn kiến xếp hàng tha mồi về tổ, rất chăm chỉ."},
  {lv:3,q:"Đèn gì đỏ, vàng, xanh,\ncó ở ngã tư,\nbáo cho xe biết khi nào dừng, khi nào đi?",a:["🚦","Đèn giao thông"],w:[["💡","Bóng đèn"],["🔦","Đèn pin"],["🕯️","Cây nến"]],why:"Đèn giao thông giúp mọi người đi lại an toàn."}
];

CAU_HOI.do2 = [
  {lv:1,q:"Con gì càng to càng nhỏ?",a:["🦀","Con cua"],w:[["🐘","Con voi"],["🐜","Con kiến"],["🐟","Con cá"]],why:"Đố chữ đó! “Càng” của con cua to mà thân nó lại nhỏ."},
  {lv:1,q:"Cái gì có răng mà chẳng có miệng,\ngiúp mái tóc bé gọn gàng?",a:["🪮","Cái lược"],w:[["✂️","Cái kéo"],["📏","Cái thước"],["🪥","Bàn chải"]],why:"Lược có nhiều răng để chải tóc."},
  {lv:1,q:"Cái gì càng lau càng ướt?",a:["🧻","Cái khăn lau"],w:[["🪑","Cái ghế"],["🪟","Cửa kính"],["🪣","Cái xô"]],why:"Khăn lau hút nước nên càng lau càng ướt."},
  {lv:1,q:"Cái gì có cổ mà không có đầu?",a:["👕","Cái áo"],w:[["🧢","Cái mũ"],["👟","Đôi giày"],["🎒","Cái cặp"]],why:"Áo có cổ áo, nhưng không có đầu."},
  {lv:2,q:"Da cóc mà bọc bột lọc,\nbột lọc mà bọc hòn than.\nĐó là quả gì?",a:["🟤","Quả nhãn"],w:[["🍎","Quả táo"],["🍇","Quả nho"],["🍑","Quả đào"]],why:"Vỏ nhãn sần như da cóc, cùi trắng, hạt đen như than."},
  {lv:2,q:"Vừa bằng hạt đỗ,\năn giỗ cả làng.\nĐó là con gì?",a:["🪰","Con ruồi"],w:[["🐜","Con kiến"],["🦋","Con bướm"],["🐝","Con ong"]],why:"Ruồi nhỏ bằng hạt đỗ mà bay khắp nơi kiếm ăn."},
  {lv:2,q:"Cái gì đi thì nằm,\nđứng cũng nằm,\nnhưng nằm lại đứng?",a:["🦶","Bàn chân"],w:[["🖐️","Bàn tay"],["🪑","Cái ghế"],["🛏️","Cái giường"]],why:"Khi đi và đứng, bàn chân nằm trên đất. Khi ta nằm, bàn chân dựng lên."},
  {lv:2,q:"Cái gì cứ tăng lên mãi,\nchẳng bao giờ giảm đi?",a:["🎂","Tuổi của em"],w:[["🌡️","Nhiệt độ"],["🌧️","Lượng mưa"],["💡","Độ sáng"]],why:"Mỗi năm, em thêm một tuổi."},
  {lv:3,q:"Cái gì của em\nmà người khác dùng nhiều hơn em?",a:["🏷️","Tên của em"],w:[["👟","Đôi giày"],["✏️","Cây bút"],["🎒","Cái cặp"]],why:"Mọi người gọi tên em nhiều hơn chính em."},
  {lv:3,q:"Cây gì mọc thành luỹ quanh làng,\nthân có nhiều đốt,\nlàm được đòn gánh, rổ rá?",a:["🎋","Cây tre"],w:[["🌴","Cây dừa"],["🌲","Cây thông"],["🌳","Cây bàng"]],why:"Tre gắn bó với làng quê Việt Nam."},
  {lv:3,q:"Bỏ vào nước không ướt,\nbỏ vào lửa không cháy.\nĐó là gì?",a:["👤","Cái bóng"],w:[["🧊","Cục đá"],["🪨","Hòn đá"],["🧽","Miếng bọt biển"]],why:"Cái bóng không bị ướt, cũng không bị cháy."}
];

CAU_HOI.do3 = [
  {lv:1,q:"Cái gì bằng cái vung,\nvùng xuống ao,\nđào chẳng thấy,\nlấy chẳng được?",a:["🌕","Mặt Trăng"],w:[["☀️","Mặt Trời"],["🐟","Con cá"],["🪨","Hòn đá"]],why:"Đó là bóng trăng in xuống mặt ao."},
  {lv:1,q:"Cái gì đen khi em mua,\nđỏ khi em dùng,\nxám xịt khi vứt đi?",a:["⚫","Hòn than"],w:[["🔦","Đèn pin"],["🖍️","Bút sáp"],["🕯️","Cây nến"]],why:"Than đen, khi cháy đỏ rực, rồi thành tro xám."},
  {lv:1,q:"Chân gì ở tít tận xa,\nchẳng ai đi đến,\ncó hoài trước mắt?",a:["🌅","Chân trời"],w:[["🪑","Chân ghế"],["🛏️","Chân giường"],["⛰️","Chân núi"]],why:"Chân trời luôn ở phía xa trước mắt ta."},
  {lv:1,q:"Con gì đầu dê mình ốc?",a:["⛰️","Con dốc"],w:[["🐐","Con dê"],["🐌","Con ốc"],["🐑","Con cừu"]],why:"Đố chữ đó! Lấy “d” của “dê” ghép với “ốc” thành “dốc”."},
  {lv:2,q:"Tiếng gì thêm dấu sắc\nthành con vật dưới nước,\nthêm dấu huyền\nthành một loại quả?",a:["🔤","Tiếng “ca”"],w:[["🔤","Tiếng “co”"],["🔤","Tiếng “cu”"],["🔤","Tiếng “ta”"]],why:"“ca” thêm dấu sắc là “cá”, thêm dấu huyền là “cà”."},
  {lv:2,q:"Để nguyên là trao đồ tặng bạn,\nthêm dấu sắc là con vật giữ nhà.\nĐó là tiếng gì?",a:["🔤","Tiếng “cho”"],w:[["🔤","Tiếng “cha”"],["🔤","Tiếng “che”"],["🔤","Tiếng “chu”"]],why:"“cho” thêm dấu sắc thành “chó”."},
  {lv:2,q:"Cái gì không có chân\nmà chạy quanh suốt ngày,\nkêu tích tắc không nghỉ?",a:["⏰","Kim đồng hồ"],w:[["🚲","Bánh xe"],["🌀","Cánh quạt"],["🏃","Vận động viên"]],why:"Kim đồng hồ chạy vòng quanh mặt đồng hồ."},
  {lv:3,q:"Ngày thì cuộn lại,\ntối thì buông xuống,\ngiữ cho bé không bị muỗi đốt?",a:["🛏️","Cái màn"],w:[["🚪","Cánh cửa"],["🪟","Cửa sổ"],["🧣","Cái khăn"]],why:"Màn che muỗi khi ta đi ngủ."},
  {lv:3,q:"Trên trời có giếng nước trong,\ncon kiến chẳng lọt,\ncon ong chẳng vào.\nĐó là quả gì?",a:["🥥","Quả dừa"],w:[["🍉","Dưa hấu"],["🍊","Quả cam"],["🍐","Quả lê"]],why:"Quả dừa trên cao, bên trong chứa đầy nước."},
  {lv:3,q:"Thân thì chỉ một,\ncó hàng trăm mắt,\nđầu đội lá gai?",a:["🍍","Quả dứa"],w:[["🌽","Bắp ngô"],["🍓","Quả dâu"],["🥥","Quả dừa"]],why:"Quả dứa có nhiều mắt, đầu có chùm lá gai."}
];

/* tìm từ khác nhóm: lớp 2, lớp 3 */
CAU_HOI.khac2 = [
  {lv:1,items:["chạy","nhảy","bơi","cái bàn"],odd:"cái bàn",why:"Chạy, nhảy, bơi là từ chỉ hoạt động. “Cái bàn” là từ chỉ sự vật."},
  {lv:1,items:["đỏ","xanh","vàng","con mèo"],odd:"con mèo",why:"Đỏ, xanh, vàng là từ chỉ màu sắc."},
  {lv:1,items:["bút","thước","vở","cây bàng"],odd:"cây bàng",why:"Bút, thước, vở là đồ dùng học tập."},
  {lv:1,items:["bố","mẹ","ông","bàn"],odd:"bàn",why:"Bố, mẹ, ông là người thân trong gia đình."},
  {lv:2,items:["cao","thấp","béo","đọc"],odd:"đọc",why:"Cao, thấp, béo là từ chỉ đặc điểm."},
  {lv:2,items:["bác sĩ","y tá","giáo viên","con voi"],odd:"con voi",why:"Bác sĩ, y tá, giáo viên là từ chỉ nghề nghiệp."},
  {lv:2,items:["hổ","báo","sư tử","cá chép"],odd:"cá chép",why:"Hổ, báo, sư tử là thú sống trên cạn."},
  {lv:2,items:["xuân","hạ","thu","trăng"],odd:"trăng",why:"Xuân, hạ, thu là các mùa trong năm."},
  {lv:3,items:["cộng","trừ","nhân","hình vuông"],odd:"hình vuông",why:"Cộng, trừ, nhân là các phép tính."},
  {lv:3,items:["cam","xoài","ổi","cà rốt"],odd:"cà rốt",why:"Cam, xoài, ổi là quả; cà rốt là củ."},
  {lv:3,items:["ô tô","xe máy","xe đạp","thuyền"],odd:"thuyền",why:"Ô tô, xe máy, xe đạp đi trên đường bộ."},
  {lv:3,items:["thứ Hai","thứ Ba","thứ Tư","tháng Giêng"],odd:"tháng Giêng",why:"Thứ Hai, thứ Ba, thứ Tư là các ngày trong tuần."}
];
CAU_HOI.khac3 = [
  {lv:1,items:["dũng cảm","gan dạ","can đảm","nhút nhát"],odd:"nhút nhát",why:"Ba từ kia có nghĩa giống nhau, chỉ người không sợ khó khăn."},
  {lv:1,items:["mi-li-mét","xăng-ti-mét","mét","gam"],odd:"gam",why:"Mi-li-mét, xăng-ti-mét, mét đo độ dài; gam đo khối lượng."},
  {lv:1,items:["Hà Nội","Huế","Đà Nẵng","sông Hồng"],odd:"sông Hồng",why:"Hà Nội, Huế, Đà Nẵng là thành phố; sông Hồng là dòng sông."},
  {lv:1,items:["tim","mạch máu","phổi","máu"],odd:"phổi",why:"Tim, mạch máu, máu thuộc cơ quan tuần hoàn; phổi thuộc cơ quan hô hấp."},
  {lv:2,items:["hình vuông","hình tròn","hình tam giác","khối lập phương"],odd:"khối lập phương",why:"Ba hình kia là hình phẳng; khối lập phương là hình khối."},
  {lv:2,items:["thật thà","trung thực","giữ lời hứa","nói dối"],odd:"nói dối",why:"Ba cái kia là đức tính tốt; nói dối là thói xấu."},
  {lv:2,items:["lo lắng","hồi hộp","vui mừng","nhảy múa"],odd:"nhảy múa",why:"Ba từ kia chỉ trạng thái; “nhảy múa” chỉ hoạt động."},
  {lv:2,items:["Trái Đất","Sao Hoả","Sao Kim","Mặt Trăng"],odd:"Mặt Trăng",why:"Trái Đất, Sao Hoả, Sao Kim là hành tinh; Mặt Trăng là vệ tinh."},
  {lv:3,items:["bán kính","đường kính","tâm","cạnh đáy"],odd:"cạnh đáy",why:"Tâm, bán kính, đường kính là các yếu tố của hình tròn."},
  {lv:3,items:["IV","IX","XII","15"],odd:"15",why:"Ba số kia viết bằng chữ số La Mã."},
  {lv:3,items:["Tổ quốc","giang sơn","non sông","làng xóm"],odd:"làng xóm",why:"Tổ quốc, giang sơn, non sông đều chỉ đất nước."},
  {lv:3,items:["câu kể","câu hỏi","câu cảm","dấu phẩy"],odd:"dấu phẩy",why:"Ba cái kia là kiểu câu; dấu phẩy là dấu câu."}
];

/* xếp thứ tự (cùng cơ chế với trò Xếp thứ tự cũ) */
CAU_HOI.xep2 = [
  {lv:1,items:["sáng","trưa","chiều","tối"],ask:"các buổi trong ngày từ sớm đến muộn",why:"Một ngày có sáng, trưa, chiều, tối."},
  {lv:1,items:["mm","cm","dm","m"],ask:"các đơn vị đo từ NHỎ đến LỚN",why:"mm < cm < dm < m."},
  {lv:1,items:["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm"],ask:"các ngày liên tiếp trong tuần",why:"Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm."},
  {lv:2,items:["Tháng 1","Tháng 2","Tháng 3","Tháng 4"],ask:"các tháng liên tiếp",why:"Tháng 1, 2, 3, 4."},
  {lv:2,items:["1 đơn vị","1 chục","1 trăm","1 nghìn"],ask:"từ BÉ đến LỚN",why:"1 < 10 < 100 < 1000."},
  {lv:2,items:["🌱 gieo hạt","🌿 cây lớn","🌸 ra hoa","🍎 có quả"],ask:"theo thứ tự cây phát triển",why:"Từ hạt thành cây, ra hoa rồi kết quả."},
  {lv:3,items:["mm","cm","dm","m","km"],ask:"các đơn vị đo từ NHỎ đến LỚN",why:"mm < cm < dm < m < km."},
  {lv:3,items:["mở bài","thân bài","kết bài"],ask:"các phần của bài văn",why:"Bài văn có mở bài, thân bài, kết bài."},
  {lv:3,items:["Ngày","Tuần","Tháng","Năm"],ask:"từ ngắn đến dài",why:"Ngày < tuần < tháng < năm."}
];
CAU_HOI.xep3 = [
  {lv:1,items:["Xuân","Hạ","Thu","Đông"],ask:"các mùa trong năm",why:"Xuân, hạ, thu, đông."},
  {lv:1,items:["1 g","100 g","1 kg","2 kg"],ask:"từ NHẸ đến NẶNG",why:"1 kg = 1000 g, nên 100 g nhẹ hơn 1 kg."},
  {lv:1,items:["100 ml","500 ml","1 l","2 l"],ask:"từ ÍT đến NHIỀU",why:"1 l = 1000 ml, nên 500 ml ít hơn 1 l."},
  {lv:2,items:["miệng","thực quản","dạ dày","ruột non","ruột già"],ask:"đường đi của thức ăn",why:"Thức ăn đi từ miệng xuống ruột già."},
  {lv:2,items:["I","V","X","XX"],ask:"số La Mã từ BÉ đến LỚN",why:"I = 1, V = 5, X = 10, XX = 20."},
  {lv:2,items:["hàng đơn vị","hàng chục","hàng trăm","hàng nghìn"],ask:"các hàng từ thấp đến cao",why:"Đơn vị, chục, trăm, nghìn."},
  {lv:3,items:["trứng","nòng nọc","nòng nọc có chân","ếch con","ếch"],ask:"các giai đoạn phát triển của ếch",why:"Từ trứng nở ra nòng nọc rồi thành ếch."},
  {lv:3,items:["🌅 phương Đông","☀️ giữa trời","🌇 phương Tây"],ask:"đường đi của Mặt Trời trong ngày",why:"Mặt Trời mọc ở phương Đông và lặn ở phương Tây."},
  {lv:3,items:["ngoặc đơn","nhân, chia","cộng, trừ"],ask:"thứ tự tính biểu thức",why:"Tính trong ngoặc trước, rồi nhân chia, cuối cùng cộng trừ."}
];

/* Việt Nam quê hương em */
CAU_HOI.vn2 = [
  {lv:1,e:"🇻🇳",q:"Quốc kì Việt Nam có màu gì?",a:"Nền đỏ, sao vàng",w:["Nền xanh, sao trắng","Nền vàng, sao đỏ","Nền trắng, sao xanh"],why:"Quốc kì Việt Nam là cờ đỏ sao vàng."},
  {lv:1,e:"🏙️",q:"Thủ đô của Việt Nam là thành phố nào?",a:"Hà Nội",w:["Huế","Đà Nẵng","Cần Thơ"],why:"Hà Nội là Thủ đô nước ta."},
  {lv:1,e:"🎈",q:"Ngày Quốc tế Thiếu nhi là ngày nào?",a:"Ngày 1 tháng 6",w:["Ngày 2 tháng 9","Ngày 20 tháng 11","Ngày 8 tháng 3"],why:"Ngày 1 tháng 6 là ngày của các bạn nhỏ."},
  {lv:2,e:"🎆",q:"Ngày Quốc khánh của Việt Nam là ngày nào?",a:"Ngày 2 tháng 9",w:["Ngày 1 tháng 6","Ngày 30 tháng 4","Ngày 1 tháng 5"],why:"Ngày 2 tháng 9 năm 1945, Bác Hồ đọc Tuyên ngôn Độc lập."},
  {lv:2,e:"👴",q:"Bác Hồ tên thật khi còn nhỏ là gì?",a:"Nguyễn Sinh Cung",w:["Nguyễn Trãi","Trần Hưng Đạo","Lê Lợi"],why:"Lúc nhỏ, Bác Hồ tên là Nguyễn Sinh Cung."},
  {lv:2,e:"🌄",q:"Ruộng bậc thang nổi tiếng thường thấy ở đâu?",a:"Vùng núi phía Bắc như Sa Pa",w:["Giữa biển","Trong thành phố","Trên sa mạc"],why:"Người dân vùng núi làm ruộng bậc thang trên sườn núi."},
  {lv:3,e:"🏞️",q:"Vịnh nổi tiếng nào của Việt Nam ở Quảng Ninh?",a:"Vịnh Hạ Long",w:["Vịnh Nha Trang","Vịnh Cam Ranh","Vịnh Xuân Đài"],why:"Vịnh Hạ Long là Di sản Thiên nhiên Thế giới."},
  {lv:3,e:"🏯",q:"Cố đô Huế nằm bên dòng sông nào?",a:"Sông Hương",w:["Sông Hồng","Sông Cửu Long","Sông Đà"],why:"Sông Hương chảy qua thành phố Huế."},
  {lv:3,e:"🧺",q:"Khu vực nào được gọi là vựa lúa lớn nhất nước ta?",a:"Đồng bằng sông Cửu Long",w:["Tây Bắc","Trường Sa","Tây Nguyên"],why:"Đồng bằng sông Cửu Long trồng rất nhiều lúa."}
];
CAU_HOI.vn3 = [
  {lv:1,e:"⛰️",q:"Đỉnh núi cao nhất Việt Nam tên là gì?",a:"Phan-xi-păng",w:["Bà Đen","Ngự Bình","Tản Viên"],why:"Phan-xi-păng ở Tây Bắc, cao hơn 3 100 m."},
  {lv:1,e:"🏙️",q:"Thành phố nào mang tên Bác Hồ?",a:"Thành phố Hồ Chí Minh",w:["Thành phố Hải Phòng","Thành phố Huế","Thành phố Cần Thơ"],why:"Thành phố mang tên Bác nằm ở miền Nam."},
  {lv:1,e:"🪘",q:"Nhà rông là ngôi nhà chung của buôn làng vùng nào?",a:"Tây Nguyên",w:["Đồng bằng sông Hồng","Hải đảo","Đồng bằng sông Cửu Long"],why:"Nhà rông là nét đẹp văn hoá của Tây Nguyên."},
  {lv:2,e:"🌊",q:"Hai quần đảo xa bờ của Việt Nam là gì?",a:"Hoàng Sa và Trường Sa",w:["Cát Bà và Phú Quốc","Cô Tô và Côn Đảo","Lý Sơn và Bạch Long Vĩ"],why:"Hoàng Sa và Trường Sa là hai quần đảo của Việt Nam."},
  {lv:2,e:"⚔️",q:"Ai là vị tướng đánh tan quân Nam Hán trên sông Bạch Đằng năm 938?",a:"Ngô Quyền",w:["Lê Lợi","Quang Trung","Phan Bội Châu"],why:"Ngô Quyền dùng cọc gỗ trên sông Bạch Đằng đánh thắng quân Nam Hán."},
  {lv:2,e:"👧",q:"Ai đã khởi nghĩa ở Mê Linh chống giặc phương Bắc?",a:"Hai Bà Trưng",w:["Bà Triệu","Lê Lợi","Ngô Quyền"],why:"Hai Bà Trưng dựng cờ khởi nghĩa ở Mê Linh."},
  {lv:3,e:"🎐",q:"Dòng sông nào gắn với thành phố Hà Nội?",a:"Sông Hồng",w:["Sông Hương","Sông Hàn","Sông Sài Gòn"],why:"Sông Hồng chảy qua Hà Nội."},
  {lv:3,e:"🧧",q:"Ngày Giỗ Tổ Hùng Vương là ngày nào?",a:"Ngày 10 tháng 3 âm lịch",w:["Ngày 15 tháng 8 âm lịch","Ngày 1 tháng 1 dương lịch","Ngày 2 tháng 9"],why:"“Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mùng Mười tháng Ba”."},
  {lv:3,e:"🌉",q:"Thành phố Đà Nẵng có dòng sông nào với cây cầu Rồng?",a:"Sông Hàn",w:["Sông Hương","Sông Tiền","Sông Mã"],why:"Cầu Rồng bắc qua sông Hàn ở Đà Nẵng."}
];

/* tiếng Anh: từ có hình */
CAU_HOI.anh1 = [
  {e:"🐱",w:"cat",vi:"con mèo",lv:1},{e:"🐶",w:"dog",vi:"con chó",lv:1},{e:"🐟",w:"fish",vi:"con cá",lv:1},{e:"🐦",w:"bird",vi:"con chim",lv:1},
  {e:"🐘",w:"elephant",vi:"con voi",lv:2},{e:"🐒",w:"monkey",vi:"con khỉ",lv:2},{e:"🐔",w:"chicken",vi:"con gà",lv:2},{e:"🦆",w:"duck",vi:"con vịt",lv:2},
  {e:"🍎",w:"apple",vi:"quả táo",lv:1},{e:"🍌",w:"banana",vi:"quả chuối",lv:1},{e:"🥚",w:"egg",vi:"quả trứng",lv:1},{e:"🥛",w:"milk",vi:"sữa",lv:1},
  {e:"📖",w:"book",vi:"quyển sách",lv:1},{e:"✏️",w:"pencil",vi:"bút chì",lv:1},{e:"📏",w:"ruler",vi:"cái thước",lv:2},{e:"🎒",w:"bag",vi:"cái cặp",lv:1},
  {e:"🪑",w:"chair",vi:"cái ghế",lv:2},{e:"🚪",w:"door",vi:"cánh cửa",lv:2},{e:"🪟",w:"window",vi:"cửa sổ",lv:2},{e:"🏠",w:"house",vi:"ngôi nhà",lv:2},
  {e:"⚽",w:"ball",vi:"quả bóng",lv:1},{e:"🚲",w:"bike",vi:"xe đạp",lv:1},{e:"🚗",w:"car",vi:"xe hơi",lv:1},{e:"🪁",w:"kite",vi:"con diều",lv:2},
  {e:"☀️",w:"sun",vi:"Mặt Trời",lv:2},{e:"🌙",w:"moon",vi:"Mặt Trăng",lv:2},{e:"⭐",w:"star",vi:"ngôi sao",lv:2},{e:"🌸",w:"flower",vi:"bông hoa",lv:2},
  {e:"🔴",w:"red",vi:"màu đỏ",lv:1},{e:"🔵",w:"blue",vi:"màu xanh dương",lv:1},{e:"🟡",w:"yellow",vi:"màu vàng",lv:1},{e:"🟢",w:"green",vi:"màu xanh lá",lv:1},
  {e:"👂",w:"ear",vi:"cái tai",lv:3},{e:"👃",w:"nose",vi:"cái mũi",lv:3},{e:"👁️",w:"eye",vi:"con mắt",lv:3},{e:"✋",w:"hand",vi:"bàn tay",lv:3},
  {e:"👩",w:"mother",vi:"mẹ",lv:3},{e:"👨",w:"father",vi:"bố",lv:3},{e:"👧",w:"sister",vi:"chị, em gái",lv:3},{e:"👦",w:"brother",vi:"anh, em trai",lv:3},
  {e:"🚌",w:"bus",vi:"xe buýt",lv:3},{e:"✈️",w:"plane",vi:"máy bay",lv:3},{e:"🚢",w:"ship",vi:"tàu thuỷ",lv:3},{e:"🚂",w:"train",vi:"tàu hoả",lv:3}
];

/* tiếng Anh lớp 3: mẫu câu */
CAU_HOI.anh3 = [
  {lv:1,q:"Bạn nói gì khi gặp ai đó buổi sáng?",a:"Good morning!",w:["Good night!","Goodbye!","Thank you!"],why:"“Good morning” là chào buổi sáng."},
  {lv:1,q:"Hỏi tên bạn thế nào?",a:"What's your name?",w:["How old are you?","Where are you?","What's this?"],why:"“What's your name?” nghĩa là “Bạn tên gì?”."},
  {lv:1,q:"“How old are you?” hỏi về điều gì?",a:"Tuổi",w:["Tên","Màu sắc","Đồ vật"],why:"“How old are you?” nghĩa là “Bạn bao nhiêu tuổi?”."},
  {lv:1,q:"Trả lời “How are you?” thế nào?",a:"I'm fine, thank you.",w:["I'm nine.","It's a book.","Goodbye."],why:"“I'm fine, thank you” nghĩa là “Mình khoẻ, cảm ơn”."},
  {lv:1,q:"“Goodbye!” có nghĩa là gì?",a:"Tạm biệt",w:["Xin chào","Cảm ơn","Xin lỗi"],why:"“Goodbye” là lời chào tạm biệt."},
  {lv:1,q:"“This is my father.” có nghĩa là gì?",a:"Đây là bố của tớ.",w:["Đây là mẹ của tớ.","Bố tớ đang đọc sách.","Đây là ông của tớ."],why:"“Father” là bố."},
  {lv:2,q:"Hỏi “Đây là cái gì?” thế nào?",a:"What's this?",w:["Who's this?","How are you?","Where's it?"],why:"“What's this?” dùng để hỏi về đồ vật."},
  {lv:2,q:"Hỏi về màu sắc thế nào?",a:"What colour is it?",w:["How old is it?","Where is it?","Who is it?"],why:"“What colour is it?” nghĩa là “Nó màu gì?”."},
  {lv:2,q:"Chọn câu đúng: “___ is my teacher.”",a:"She",w:["They","We","I"],why:"Cô giáo là một người, ta dùng “She”."},
  {lv:2,q:"“I like milk.” có nghĩa là gì?",a:"Mình thích sữa.",w:["Mình có sữa.","Mình uống cà phê.","Mình không thích sữa."],why:"“Like” nghĩa là “thích”."},
  {lv:2,q:"Chọn câu đúng: “I have ___ pencils.”",a:"two",w:["one","a","an"],why:"“Pencils” là nhiều cái, nên đi với “two”."},
  {lv:2,q:"Muốn xin phép vào lớp, em nói:",a:"May I come in?",w:["Sit down, please.","Close your book.","Goodbye, teacher."],why:"“May I come in?” nghĩa là “Em vào được không ạ?”."},
  {lv:3,q:"“Where's the school bag?” Câu trả lời đúng là:",a:"It's on the desk.",w:["It's blue.","I'm eight.","Yes, I do."],why:"“Where” hỏi về vị trí, “on the desk” là “ở trên bàn”."},
  {lv:3,q:"“What do you do at break time?” Câu trả lời đúng là:",a:"I play football.",w:["It's a ruler.","I'm fine.","My name is Nam."],why:"Câu hỏi về việc em làm trong giờ ra chơi."},
  {lv:3,q:"“How many cats?” Câu trả lời đúng là:",a:"Three cats.",w:["Yes, it is.","It's a cat.","Good morning."],why:"“How many” hỏi về số lượng."},
  {lv:3,q:"“Is this your book?” Trả lời đồng ý thế nào?",a:"Yes, it is.",w:["Yes, I am.","No, I don't.","It's blue."],why:"“Is this …?” trả lời “Yes, it is” hoặc “No, it isn't”."},
  {lv:3,q:"“Stand up, please.” có nghĩa là gì?",a:"Mời em đứng lên.",w:["Mời em ngồi xuống.","Mời em mở sách.","Mời em đi ra."],why:"“Stand up” nghĩa là “đứng lên”."},
  {lv:3,q:"Ngày nào là “Sunday”?",a:"Chủ nhật",w:["Thứ Hai","Thứ Tư","Thứ Bảy"],why:"“Sunday” là Chủ nhật."}
];
