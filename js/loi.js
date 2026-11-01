(function(){
"use strict";
var DV = window.DV = window.DV || {};

/* ================= tiện ích ================= */
var $ = function(s){ return document.querySelector(s); };
var $$ = function(s){ return Array.prototype.slice.call(document.querySelectorAll(s)); };
function rand(a,b){ return a + Math.floor(Math.random()*(b-a+1)); }
function shuffle(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function pick(arr,n){ return shuffle(arr).slice(0,n); }
function any(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function range(a,b){ var r=[]; for(var i=a;i<=b;i++) r.push(i); return r; }
function repeat(x,n){ var r=[]; for(var i=0;i<n;i++) r.push(x); return r; }
function isNum(s){ return /^\d+$/.test(String(s)); }
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
var store = {
  get:function(k,d){ try{ var v=localStorage.getItem(k); return v===null? d : JSON.parse(v); }catch(e){ return d; } },
  set:function(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

/* ================= dữ liệu cũ ================= */
/* w: [dễ, dễ, gây nhầm]. Dễ dùng 2 cái đầu, Vừa dùng cái 1 + cái gây nhầm, Khó dùng cả 3 */
var RIDDLES = [
  {lv:1, q:"Con gì mào đỏ,\nlông mượt như tơ,\nsáng sớm tinh mơ,\ngọi người thức dậy?", a:["🐓","Gà trống"], w:[["🦆","Con vịt"],["🐶","Con chó"],["🐔","Gà mái"]], why:"Gà trống gáy “ò ó o” mỗi sáng. Gà mái thì không gáy."},
  {lv:1, q:"Con gì tai dài, đuôi ngắn,\nmắt hồng, lông trắng,\nthích ăn cà rốt?", a:["🐰","Con thỏ"], w:[["🐭","Con chuột"],["🐻","Con gấu"],["🐑","Con cừu"]], why:"Thỏ có đôi tai thật dài và rất mê cà rốt 🥕."},
  {lv:1, q:"Con gì hai mắt trong veo,\nthích nằm sưởi nắng,\nthích trèo cây cau?", a:["🐱","Con mèo"], w:[["🐮","Con bò"],["🐷","Con heo"],["🐯","Con hổ"]], why:"Mèo trèo giỏi lắm, lại hay kêu “meo meo”."},
  {lv:1, q:"Con gì ăn no,\nbụng to mắt híp,\nmồm kêu ụt ịt,\nnằm thở phì phò?", a:["🐷","Con heo"], w:[["🐘","Con voi"],["🐸","Con ếch"],["🦛","Hà mã"]], why:"Heo ăn no là lăn ra ngủ, kêu “ụt ịt” nghe vui ghê."},
  {lv:1, q:"Con gì to lớn,\ncó cái vòi dài,\nhai tai như cái quạt?", a:["🐘","Con voi"], w:[["🦒","Hươu cao cổ"],["🦁","Sư tử"],["🦏","Tê giác"]], why:"Voi dùng vòi để uống nước, còn tai thì phe phẩy như quạt."},
  {lv:1, q:"Con gì nhỏ xíu,\nbay vo ve quanh hoa,\nlàm ra mật ngọt?", a:["🐝","Con ong"], w:[["🦋","Con bướm"],["🐜","Con kiến"],["🦟","Con muỗi"]], why:"Ong hút mật hoa rồi làm ra mật ong. Muỗi cũng kêu vo ve nhưng không làm mật."},
  {lv:1, q:"Quả gì vỏ xanh,\nruột đỏ, hạt đen,\nngày hè ăn mát lạnh?", a:["🍉","Dưa hấu"], w:[["🍎","Quả táo"],["🥭","Quả xoài"],["🍈","Dưa lưới"]], why:"Dưa hấu vỏ xanh, ruột đỏ, hạt đen. Dưa lưới thì ruột không đỏ."},
  {lv:1, q:"Quả gì mặc áo màu vàng,\ncong cong như trăng khuyết,\nkhỉ thích ăn nhất?", a:["🍌","Quả chuối"], w:[["🍊","Quả cam"],["🍇","Chùm nho"],["🍋","Quả chanh"]], why:"Chuối cong cong, vỏ vàng, chú khỉ 🐒 mê lắm."},
  {lv:1, q:"Cái gì ở trên trời,\nban ngày chiếu sáng,\nlàm ta ấm áp?", a:["☀️","Mặt trời"], w:[["🌙","Mặt trăng"],["☁️","Đám mây"],["⭐","Ngôi sao"]], why:"Mặt trời chiếu sáng ban ngày, còn trăng sao sáng ban đêm."},
  {lv:1, q:"Cái gì xoè ra\nkhi trời mưa,\nche cho bé khỏi ướt?", a:["☂️","Cây dù"], w:[["👓","Mắt kính"],["🎒","Cái cặp"],["🧥","Áo khoác"]], why:"Trời mưa thì bung dù ra là không bị ướt nữa."},
  {lv:1, q:"Con gì cổ dài thật dài,\năn lá trên ngọn cây cao?", a:["🦒","Hươu cao cổ"], w:[["🐴","Con ngựa"],["🐮","Con bò"],["🐫","Lạc đà"]], why:"Hươu cao cổ cao nhất, với tới cả lá trên ngọn cây."},
  {lv:1, q:"Con gì không có chân,\nsống ở dưới nước,\nbơi giỏi nhất nhà?", a:["🐠","Con cá"], w:[["🐸","Con ếch"],["🐥","Gà con"],["🦆","Con vịt"]], why:"Cá bơi bằng vây và đuôi. Vịt cũng biết bơi nhưng có chân."},
  {lv:1, q:"Cái gì mỗi sáng mỗi tối,\nbé cầm để đánh răng?", a:["🪥","Bàn chải"], w:[["🥄","Cái muỗng"],["🧸","Gấu bông"],["🧼","Xà phòng"]], why:"Bé đánh răng bằng bàn chải mỗi sáng và mỗi tối nhé."},
  {lv:1, q:"Cái gì mở ra có chữ, có hình,\nmẹ đọc cho bé nghe\nmỗi tối trước khi ngủ?", a:["📖","Quyển sách"], w:[["📺","Ti vi"],["🧸","Gấu bông"],["✉️","Lá thư"]], why:"Sách có chữ và có hình, đọc sách mỗi tối rất vui."},
  {lv:1, q:"Cái gì hiện lên sau cơn mưa,\ncong cong trên trời,\ncó bảy màu thật đẹp?", a:["🌈","Cầu vồng"], w:[["⭐","Ngôi sao"],["🌙","Mặt trăng"],["☁️","Đám mây"]], why:"Sau cơn mưa, nắng chiếu lên tạo ra cầu vồng bảy màu."},

  {lv:2, q:"Con gì tám cẳng hai càng,\nchẳng đi mà lại\nbò ngang cả ngày?", a:["🦀","Con cua"], w:[["🐢","Con rùa"],["🐌","Ốc sên"],["🦞","Tôm hùm"]], why:"Cua có hai cái càng và toàn bò ngang. Tôm hùm có càng nhưng bò thẳng."},
  {lv:2, q:"Cái gì có mặt\nmà không có miệng,\ncó kim mà chẳng khâu áo,\nkêu tích tắc cả ngày?", a:["⏰","Đồng hồ"], w:[["📱","Điện thoại"],["🪡","Kim chỉ"],["🧭","La bàn"]], why:"Đồng hồ có mặt số và kim, chạy tích tắc. La bàn có kim nhưng không kêu."},
  {lv:2, q:"Cái gì có cánh\nmà chẳng phải chim,\nbay cao chở người đi xa?", a:["✈️","Máy bay"], w:[["🐦","Con chim"],["🚢","Tàu thuỷ"],["🪁","Con diều"]], why:"Máy bay có cánh và chở người. Diều bay được nhưng không chở ai."},
  {lv:2, q:"Quả gì không ăn được,\ntròn tròn, nảy nảy,\ncác bạn thích đá chơi?", a:["⚽","Quả bóng"], w:[["🍊","Quả cam"],["🥥","Quả dừa"],["🧶","Cuộn len"]], why:"Hihi, quả bóng để đá chơi, không ăn được đâu!"},
  {lv:2, q:"Cái gì có bốn chân\nmà chẳng biết đi,\ncó lưng để tựa,\nbé ngồi lên trên?", a:["🪑","Cái ghế"], w:[["🚪","Cánh cửa"],["📺","Ti vi"],["🐕","Con chó"]], why:"Ghế có bốn chân và lưng tựa. Chó cũng bốn chân nhưng chạy nhanh lắm!"},
  {lv:2, q:"Con gì bốn chân,\nlưng mang mai cứng,\nbò chậm rì rì,\nsợ là rụt đầu?", a:["🐢","Con rùa"], w:[["🐇","Con thỏ"],["🦀","Con cua"],["🐌","Ốc sên"]], why:"Rùa có mai cứng và rụt đầu khi sợ. Ốc sên thì không có chân."},
  {lv:2, q:"Con gì không có chân,\ncứ trườn mà đi,\nhay lè lưỡi ra?", a:["🐍","Con rắn"], w:[["🐟","Con cá"],["🦎","Thằn lằn"],["🐛","Con sâu"]], why:"Rắn không có chân, trườn mình đi và hay lè lưỡi."},
  {lv:2, q:"Con gì giăng tơ làm lưới,\nnằm chờ bắt muỗi bắt ruồi?", a:["🕷️","Con nhện"], w:[["🐝","Con ong"],["🦋","Con bướm"],["🐛","Con tằm"]], why:"Nhện giăng tơ thành lưới để bắt côn trùng. Tằm cũng nhả tơ nhưng để làm kén."},
  {lv:2, q:"Con gì sống ở biển,\nto nhất thế gian,\nphun nước phì phì?", a:["🐳","Cá voi"], w:[["🐙","Bạch tuộc"],["🦀","Con cua"],["🦈","Cá mập"]], why:"Cá voi là con vật to nhất, thở ra phun nước lên cao."},
  {lv:2, q:"Cái gì rơi từ trên trời,\nlộp độp mái nhà,\ntưới cho cây xanh?", a:["🌧️","Cơn mưa"], w:[["☀️","Mặt trời"],["🍂","Lá rụng"],["❄️","Tuyết"]], why:"Mưa rơi lộp độp, tưới mát cho cây cối."},
  {lv:2, q:"Cái gì đêm đêm lấp lánh,\nnhiều ơi là nhiều,\nđếm mãi không hết?", a:["⭐","Ngôi sao"], w:[["☀️","Mặt trời"],["✈️","Máy bay"],["🌙","Mặt trăng"]], why:"Sao trên trời nhiều lắm. Mặt trăng thì chỉ có một thôi."},
  {lv:2, q:"Cái gì có hai bánh,\ncó bàn đạp,\nbé đạp đi chơi?", a:["🚲","Xe đạp"], w:[["🚗","Xe hơi"],["🚂","Tàu hoả"],["🛴","Xe trượt"]], why:"Xe đạp có hai bánh và bàn đạp. Xe trượt không có bàn đạp."},
  {lv:2, q:"Cái gì lạnh ơi là lạnh,\nngọt ơi là ngọt,\nđể lâu là tan chảy?", a:["🍦","Cây kem"], w:[["🍰","Bánh kem"],["🍭","Kẹo mút"],["🧊","Cục đá"]], why:"Kem vừa lạnh vừa ngọt. Đá cũng lạnh và tan nhưng không ngọt."},
  {lv:2, q:"Cái gì đeo lên mắt\nkhi trời nắng chang chang,\nhai mắt kính màu đen?", a:["🕶️","Kính râm"], w:[["🧢","Mũ lưỡi trai"],["🎧","Tai nghe"],["👓","Kính cận"]], why:"Kính râm có mắt kính màu đen để che nắng."},

  {lv:3, q:"Cái gì thân trắng thon thon,\nthắp lên thì sáng,\ncháy mãi ngắn dần?", a:["🕯️","Cây nến"], w:[["💡","Bóng đèn"],["🔦","Đèn pin"],["🖍️","Bút sáp"]], why:"Nến cháy sáng và ngắn dần. Bút sáp trông giống nhưng không thắp được."},
  {lv:3, q:"Con gì ngủ ngày, thức đêm,\nmắt tròn xoe,\nquay đầu ra sau được?", a:["🦉","Con cú"], w:[["🐔","Con gà"],["🦜","Con vẹt"],["🦇","Con dơi"]], why:"Cú thức đêm, mắt tròn to, quay đầu rất xa. Dơi cũng thức đêm nhưng không quay đầu được như thế."},
  {lv:3, q:"Con gì ban ngày\ntreo ngược mình ngủ,\nban đêm mới bay đi?", a:["🦇","Con dơi"], w:[["🐦","Con chim"],["🦋","Con bướm"],["🦉","Con cú"]], why:"Dơi ngủ treo ngược trên cao, đêm xuống mới bay đi kiếm ăn."},
  {lv:3, q:"Con gì lúc nhỏ có đuôi,\nbơi trong nước,\nlớn lên mất đuôi,\nnhảy ộp ộp?", a:["🐸","Con ếch"], w:[["🐟","Con cá"],["🐢","Con rùa"],["🦎","Thằn lằn"]], why:"Lúc nhỏ ếch là nòng nọc có đuôi, lớn lên mất đuôi và mọc chân."},
  {lv:3, q:"Con gì lúc nhỏ là con sâu,\nngủ trong cái kén,\nlớn lên có cánh rất đẹp?", a:["🦋","Con bướm"], w:[["🐝","Con ong"],["🐞","Bọ rùa"],["🐛","Con sâu"]], why:"Sâu làm kén, ngủ một thời gian rồi hoá thành bướm."},
  {lv:3, q:"Con gì có túi trước bụng\nđể con nằm trong,\nnhảy xa thật xa?", a:["🦘","Chuột túi"], w:[["🐸","Con ếch"],["🐰","Con thỏ"],["🐨","Gấu túi"]], why:"Chuột túi nhảy rất xa và địu con trong túi. Gấu túi có túi nhưng không nhảy."},
  {lv:3, q:"Cái gì càng dùng càng nhỏ,\nxoa lên ra bọt,\ntắm xong thì thơm?", a:["🧼","Xà phòng"], w:[["🪥","Bàn chải"],["🧽","Miếng rửa"],["🧴","Chai sữa tắm"]], why:"Cục xà phòng xoa lên ra bọt và mòn dần. Chai sữa tắm thì không nhỏ lại."},
  {lv:3, q:"Cái gì có lưỡi\nmà không biết nói,\ncó dây buộc lại,\nmang ở dưới chân?", a:["👟","Đôi giày"], w:[["🎒","Cái cặp"],["🎀","Cái nơ"],["🧢","Mũ lưỡi trai"]], why:"Giày có “lưỡi gà” và dây buộc. Mũ lưỡi trai có lưỡi nhưng đội trên đầu."},
  {lv:3, q:"Con gì cõng nhà trên lưng,\nkhông có chân,\nbò đến đâu để lại vệt nhớt?", a:["🐌","Ốc sên"], w:[["🐛","Con sâu"],["🐞","Bọ rùa"],["🐢","Con rùa"]], why:"Ốc sên cõng vỏ và để lại vệt nhớt. Rùa cũng có mai nhưng có bốn chân."},
  {lv:3, q:"Cây gì sống nơi khô cằn,\nmình đầy gai nhọn,\nchẳng cần tưới nhiều?", a:["🌵","Xương rồng"], w:[["🌴","Cây dừa"],["🍄","Cây nấm"],["🌹","Hoa hồng"]], why:"Xương rồng đầy gai và chịu khô rất giỏi. Hoa hồng có gai nhưng cần tưới nước."}
];

var SHADOWS = [
  {a:["🦒","Hươu cao cổ"], who:"chú hươu cao cổ", w:[["🐘","Con voi"],["🐇","Con thỏ"],["🦕","Khủng long cổ dài"]]},
  {a:["🐘","Con voi"], who:"chú voi", w:[["🐢","Con rùa"],["🦀","Con cua"],["🦏","Tê giác"]]},
  {a:["🦋","Con bướm"], who:"cô bướm", w:[["🐌","Ốc sên"],["🐟","Con cá"],["🦇","Con dơi"]]},
  {a:["✈️","Máy bay"], who:"chiếc máy bay", w:[["🚗","Xe hơi"],["⛵","Thuyền buồm"],["🚀","Tên lửa"]]},
  {a:["🎸","Đàn ghi-ta"], who:"cây đàn ghi-ta", w:[["🥁","Cái trống"],["🎺","Cây kèn"],["🎻","Đàn vi-ô-lông"]]},
  {a:["🦖","Khủng long"], who:"bạn khủng long", w:[["🐌","Ốc sên"],["🐦","Con chim"],["🦘","Chuột túi"]]},
  {a:["⛄","Người tuyết"], who:"chú người tuyết", w:[["🌲","Cây thông"],["🏠","Ngôi nhà"],["🧸","Gấu bông"]]},
  {a:["🐙","Bạch tuộc"], who:"bạn bạch tuộc", w:[["🦀","Con cua"],["🐳","Cá voi"],["🦑","Con mực"]]},
  {a:["🍄","Cây nấm"], who:"cây nấm", w:[["🌵","Xương rồng"],["🌻","Hướng dương"],["☂️","Cây dù"]]},
  {a:["🚲","Xe đạp"], who:"chiếc xe đạp", w:[["🚁","Trực thăng"],["🚂","Tàu hoả"],["🛵","Xe máy"]]},
  {a:["🐇","Con thỏ"], who:"chú thỏ", w:[["🐍","Con rắn"],["🦆","Con vịt"],["🐿️","Con sóc"]]},
  {a:["🌴","Cây dừa"], who:"cây dừa", w:[["🌷","Hoa tulip"],["🎈","Bóng bay"],["🌳","Cây xanh"]]},
  {a:["🐕","Con chó"], who:"chú cún", w:[["🐟","Con cá"],["🦋","Con bướm"],["🐈","Con mèo"]]},
  {a:["🦕","Khủng long cổ dài"], who:"bạn khủng long cổ dài", w:[["🚗","Xe hơi"],["🐌","Ốc sên"],["🦒","Hươu cao cổ"]]},
  {a:["🐧","Chim cánh cụt"], who:"chú chim cánh cụt", w:[["🐘","Con voi"],["🚲","Xe đạp"],["🦆","Con vịt"]]},
  {a:["🦀","Con cua"], who:"chú cua", w:[["🐍","Con rắn"],["✈️","Máy bay"],["🕷️","Con nhện"]]},
  {a:["☂️","Cây dù"], who:"cây dù", w:[["🍎","Quả táo"],["🐟","Con cá"],["🍄","Cây nấm"]]},
  {a:["🍐","Quả lê"], who:"quả lê", w:[["🍌","Quả chuối"],["🍇","Chùm nho"],["🍎","Quả táo"]]},
  {a:["🔑","Chìa khoá"], who:"chiếc chìa khoá", w:[["🎈","Bóng bay"],["🐢","Con rùa"],["🔨","Cái búa"]]}
];

var ODDS = [
  {lv:1, items:["🍎","🍌","🍇","🚗"], odd:"🚗", why:"Táo, chuối, nho là trái cây. Xe hơi thì không ăn được!"},
  {lv:1, items:["🐶","🐱","🐰","✏️"], odd:"✏️", why:"Chó, mèo, thỏ là con vật. Bút chì là đồ dùng học tập."},
  {lv:1, items:["🚗","🚌","🚲","🍦"], odd:"🍦", why:"Xe hơi, xe buýt, xe đạp là xe cộ. Cây kem là để ăn."},
  {lv:1, items:["🐟","🐙","🦀","🐔"], odd:"🐔", why:"Cá, bạch tuộc, cua sống dưới nước. Gà sống trên cạn."},
  {lv:1, items:["🌹","🌻","🌷","⚽"], odd:"⚽", why:"Hồng, hướng dương, tulip đều là hoa. Quả bóng thì không."},
  {lv:1, items:["👕","👖","👗","🍕"], odd:"🍕", why:"Áo, quần, váy để mặc. Bánh pizza để ăn."},
  {lv:1, items:["🔴","🟢","🔵","🟨"], odd:"🟨", why:"Ba hình kia là hình tròn, còn đây là hình vuông."},
  {lv:1, items:["🐦","🦋","🐝","🐢"], odd:"🐢", why:"Chim, bướm, ong đều biết bay. Rùa thì không biết bay."},
  {lv:1, items:["🥕","🥦","🌽","🧸"], odd:"🧸", why:"Cà rốt, bông cải, bắp là rau củ. Gấu bông là đồ chơi."},
  {lv:1, items:["🍦","🍰","🍭","🥦"], odd:"🥦", why:"Kem, bánh, kẹo là đồ ngọt. Bông cải là rau."},
  {lv:2, items:["🐄","🐐","🐑","🐓"], odd:"🐓", why:"Bò, dê, cừu có bốn chân. Gà chỉ có hai chân."},
  {lv:2, items:["🍋","🌻","🐥","🍆"], odd:"🍆", why:"Chanh, hoa hướng dương, gà con đều màu vàng. Cà tím màu tím."},
  {lv:2, items:["🚗","🚌","🚑","✈️"], odd:"✈️", why:"Xe hơi, xe buýt, xe cứu thương chạy trên đường. Máy bay bay trên trời."},
  {lv:2, items:["🧊","⛄","🍦","🔥"], odd:"🔥", why:"Đá, người tuyết, kem đều lạnh. Lửa thì nóng."},
  {lv:2, items:["🥛","🧃","🍵","🍞"], odd:"🍞", why:"Sữa, nước ép, trà là đồ uống. Bánh mì để ăn."},
  {lv:2, items:["⚽","🏀","🎾","🍉"], odd:"🍉", why:"Ba quả bóng để chơi thể thao. Dưa hấu cũng tròn nhưng để ăn."},
  {lv:2, items:["🌲","🌴","🌳","🌹"], odd:"🌹", why:"Ba cây kia là cây to. Hoa hồng là bông hoa."},
  {lv:2, items:["🍎","🍌","🍇","🍓","🍒","🥕"], odd:"🥕", why:"Táo, chuối, nho, dâu, anh đào là trái cây. Cà rốt là rau củ."},
  {lv:3, items:["🦅","🦜","🐦","🦆","🦉","🐧"], odd:"🐧", why:"Chim cánh cụt cũng là chim, nhưng không biết bay."},
  {lv:3, items:["🐟","🐠","🐡","🐬"], odd:"🐬", why:"Cá heo sống dưới nước nhưng thở bằng phổi, không phải là cá."},
  {lv:3, items:["🥕","🥔","🧅","🍎"], odd:"🍎", why:"Cà rốt, khoai tây, củ hành mọc dưới đất. Táo mọc trên cây."},
  {lv:3, items:["✏️","🖍️","🖊️","📏"], odd:"📏", why:"Bút chì, bút sáp, bút bi để viết và vẽ. Thước để đo và kẻ."},
  {lv:3, items:["🐝","🦋","🐞","🕷️"], odd:"🕷️", why:"Ong, bướm, bọ rùa có sáu chân và biết bay. Nhện có tám chân, không biết bay."},
  {lv:3, items:["2","4","6","7"], odd:"7", why:"2, 4, 6 là số chẵn. 7 là số lẻ."},
  {lv:3, items:["🚗","🚌","🚑","🚒","🚜","🚤"], odd:"🚤", why:"Các xe kia chạy trên đường. Ca nô chạy dưới nước."},
  {lv:3, items:["🐄","🐐","🐑","🐖","🐕","🦆"], odd:"🦆", why:"Bò, dê, cừu, heo, chó có bốn chân. Vịt chỉ có hai chân."}
];

var PATTERNS = [
  {lv:1, seq:["🔴","🔵","🔴","🔵","🔴"], a:"🔵", w:["🔴","🟡","🟢"], why:"Đỏ – xanh, đỏ – xanh… tiếp theo là màu xanh!"},
  {lv:1, seq:["🐱","🐶","🐱","🐶","🐱"], a:"🐶", w:["🐱","🐰","🐭"], why:"Mèo – cún, mèo – cún… đến lượt cún rồi!"},
  {lv:1, seq:["☀️","🌙","☀️","🌙"], a:"☀️", w:["🌙","⭐","☁️"], why:"Ngày rồi đến đêm, đêm rồi lại đến ngày."},
  {lv:1, seq:["🙂","🙃","🙂","🙃"], a:"🙂", w:["🙃","😮","😴"], why:"Xuôi – ngược, xuôi – ngược… tới lượt mặt xuôi!"},
  {lv:1, seq:["🍓","🍋","🍓","🍋","🍓"], a:"🍋", w:["🍓","🍊","🍎"], why:"Dâu – chanh, dâu – chanh… tiếp theo là chanh!"},
  {lv:1, seq:["⭐","🌸","⭐","🌸","⭐"], a:"🌸", w:["⭐","🌙","🌼"], why:"Sao – hoa, sao – hoa… tiếp theo là bông hoa!"},
  {lv:2, seq:["🍎","🍎","🍌","🍎","🍎","🍌","🍎","🍎"], a:"🍌", w:["🍎","🍇","🍐"], why:"Hai quả táo rồi một quả chuối, cứ lặp lại như thế."},
  {lv:2, seq:["🥚","🐣","🐥"], a:"🐔", w:["🥚","🐟","🦆"], why:"Trứng nở ra gà con, gà con lớn lên thành gà."},
  {lv:2, seq:["🟥","🟨","🟩","🟥","🟨"], a:"🟩", w:["🟥","🟦","🟨"], why:"Đỏ – vàng – xanh lá, rồi lại đỏ – vàng – xanh lá."},
  {lv:2, seq:["🐸","🐸","🐞","🐸","🐸","🐞","🐸"], a:"🐸", w:["🐞","🐢","🐛"], why:"Hai chú ếch rồi một bọ rùa. Ở đây mới có một chú ếch thôi!"},
  {lv:2, seq:["🐸","🐞","🐞","🐸","🐞","🐞","🐸"], a:"🐞", w:["🐸","🐢","🐛"], why:"Một chú ếch rồi hai bọ rùa, cứ lặp lại như thế."},
  {lv:2, seq:["🌰","🌱","🌿"], a:"🌳", w:["🌰","🍄","🌸"], why:"Hạt nảy mầm, mầm lớn thành cây non, rồi thành cây to."},
  {lv:2, seq:["🐶","🐱","🐭","🐶","🐱"], a:"🐭", w:["🐶","🐱","🐰"], why:"Cún – mèo – chuột, rồi lại cún – mèo – chuột."},
  {lv:2, seq:["🔟","9️⃣","8️⃣","7️⃣"], a:"6️⃣", w:["5️⃣","8️⃣","🔟"], why:"Đếm lùi: 10, 9, 8, 7, rồi đến 6."},
  {lv:3, seq:["⬆️","➡️","⬇️","⬅️","⬆️","➡️","⬇️"], a:"⬅️", w:["⬆️","➡️","⬇️"], why:"Mũi tên quay vòng: lên, phải, xuống, trái… rồi lại lên."},
  {lv:3, seq:["1️⃣","3️⃣","5️⃣","7️⃣"], a:"9️⃣", w:["8️⃣","6️⃣","🔟"], why:"Mỗi lần thêm 2: 1, 3, 5, 7, rồi 9."},
  {lv:3, seq:["2️⃣","4️⃣","6️⃣"], a:"8️⃣", w:["7️⃣","5️⃣","🔟"], why:"Mỗi lần thêm 2: 2, 4, 6, rồi 8."},
  {lv:3, seq:["🌑","🌒","🌓","🌔"], a:"🌕", w:["🌑","🌘","🌗"], why:"Mặt trăng sáng dần lên mỗi đêm cho tới khi tròn vành vạnh."},
  {lv:3, seq:["🍎","🍌","🍇","🍓","🍎","🍌","🍇"], a:"🍓", w:["🍎","🍌","🍇"], why:"Táo – chuối – nho – dâu, rồi lặp lại từ đầu."},
  {lv:3, seq:["🐶","🐶","🐱","🐱","🐶","🐶","🐱"], a:"🐱", w:["🐶","🐰","🐭"], why:"Hai cún rồi hai mèo. Ở đây mới có một chú mèo thôi!"},
  {lv:3, seq:["🕐","🕑","🕒"], a:"🕓", w:["🕐","🕔","🕛"], why:"Kim ngắn nhích thêm một giờ: 1 giờ, 2 giờ, 3 giờ, rồi 4 giờ."},
  {lv:3, seq:["🔴","🟥","🔵","🟦","🟢"], a:"🟩", w:["🟢","🔵","🟨"], why:"Mỗi màu có một hình tròn rồi đến một hình vuông cùng màu."}
];

var COUNT_SIMPLE = [
  {e:"🐥", n:"chú gà con"}, {e:"🍎", n:"quả táo"}, {e:"⭐", n:"ngôi sao"},
  {e:"🎈", n:"quả bóng bay"}, {e:"🐞", n:"con bọ rùa"}, {e:"🍓", n:"quả dâu"},
  {e:"🚗", n:"chiếc xe"}, {e:"🐠", n:"chú cá"}, {e:"🌸", n:"bông hoa"}
];
var COUNT_MIXED = [
  {e:"🍎", n:"quả táo đỏ", d:"🍏", d2:"🍅"},
  {e:"🐥", n:"chú gà con", d:"🐸", d2:"🍋"},
  {e:"🎈", n:"quả bóng bay", d:"⭐", d2:"🍎"},
  {e:"🐞", n:"con bọ rùa", d:"🍀", d2:"🍓"},
  {e:"🐶", n:"chú cún", d:"🐱", d2:"🐻"}
];
var COUNT_CAT = [
  {n:"con vật biết bay", yes:["🐦","🦋","🐝","🦉","🦜"], no:["🐶","🐱","🐟","🐢","🐌"]},
  {n:"trái cây", yes:["🍎","🍌","🍇","🍓","🍊"], no:["🥕","🥦","🍄","🧅"]},
  {n:"xe chạy trên đường", yes:["🚗","🚲","🚌","🛵"], no:["⛵","✈️","🚁","🚢"]},
  {n:"con vật sống dưới nước", yes:["🐟","🐙","🦀","🐳","🐠"], no:["🐶","🐔","🐘","🐒"]}
];

var MEM_POOL = ["🐶","🐱","🐰","🐻","🐼","🐸","🐵","🦁","🐯","🐮","🐷","🐔","🦆","🐢","🐙","🦋","🐝","🍎","🍌","🍇","🍓","🍉","🥕","🍦","🎈","⚽","🚗","🚲","✈️","⭐","🌙","☂️","🎁","🧸","🌸","🍄"];

var MATH_EMO = ["🍎","🍓","⭐","🎈","🐥","🍬","🌸","🐠"];
var WORDS_MATH = [
  {e:"🍬", op:"-", t:function(a,b){ return "Bé có "+a+" cái kẹo. Bé cho em "+b+" cái. Bé còn lại mấy cái kẹo?"; }},
  {e:"🐦", op:"-", t:function(a,b){ return "Trên cành có "+a+" con chim. "+b+" con bay đi mất. Trên cành còn mấy con chim?"; }},
  {e:"🎈", op:"-", t:function(a,b){ return "Bé có "+a+" quả bóng bay. Gió thổi bay mất "+b+" quả. Bé còn mấy quả bóng?"; }},
  {e:"🐠", op:"-", t:function(a,b){ return "Bể có "+a+" con cá. Bố vớt "+b+" con sang bể khác. Bể còn mấy con cá?"; }},
  {e:"🦆", op:"+", t:function(a,b){ return "Dưới ao có "+a+" con vịt. Thêm "+b+" con nữa xuống ao. Dưới ao có tất cả mấy con vịt?"; }},
  {e:"🍊", op:"+", t:function(a,b){ return "Rổ có "+a+" quả cam. Mẹ bỏ thêm "+b+" quả. Rổ có tất cả mấy quả cam?"; }},
  {e:"🖍️", op:"+", t:function(a,b){ return "Bé có "+a+" cây bút màu. Bố mua thêm "+b+" cây. Bé có tất cả mấy cây bút màu?"; }},
  {e:"🌸", op:"+", t:function(a,b){ return "Bé hái được "+a+" bông hoa. Chị hái thêm "+b+" bông. Hai chị em có tất cả mấy bông hoa?"; }}
];

/* alt: tên gọi khác bắt đầu bằng chữ khác — không dùng làm đáp án, và không làm hình gây nhiễu cho chữ đó */
var LETTERS = [
  {k:"B",e:"🐄",w:"Bò"},{k:"B",e:"🦋",w:"Bướm"},{k:"B",e:"✏️",w:"Bút chì"},{k:"B",e:"🍞",w:"Bánh mì"},
  {k:"C",e:"🐟",w:"Cá"},{k:"C",e:"🦀",w:"Cua"},{k:"C",e:"🍊",w:"Cam"},{k:"C",e:"🐑",w:"Cừu"},{k:"C",e:"🦉",w:"Cú"},
  {k:"D",e:"🐐",w:"Dê"},{k:"D",e:"🥥",w:"Dừa"},{k:"D",e:"🍉",w:"Dưa hấu"},
  {k:"Đ",e:"🍑",w:"Đào"},{k:"Đ",e:"⏰",w:"Đồng hồ"},{k:"Đ",e:"💡",w:"Đèn",alt:["B"]},
  {k:"G",e:"🐔",w:"Gà"},{k:"G",e:"🐻",w:"Gấu"},
  {k:"H",e:"🌸",w:"Hoa",alt:["B"]},{k:"H",e:"🦒",w:"Hươu cao cổ"},{k:"H",e:"🦛",w:"Hà mã"},
  {k:"K",e:"🍦",w:"Kem"},{k:"K",e:"🍬",w:"Kẹo"},{k:"K",e:"🐜",w:"Kiến"},
  {k:"L",e:"🍐",w:"Lê"},{k:"L",e:"🍃",w:"Lá"},
  {k:"M",e:"🐱",w:"Mèo"},{k:"M",e:"👃",w:"Mũi"},{k:"M",e:"👁️",w:"Mắt"},
  {k:"N",e:"🍄",w:"Nấm"},{k:"N",e:"🦌",w:"Nai",alt:["H"]},
  {k:"R",e:"🐢",w:"Rùa"},{k:"R",e:"🐍",w:"Rắn"},{k:"R",e:"🐉",w:"Rồng"},{k:"R",e:"🦷",w:"Răng"},
  {k:"S",e:"⭐",w:"Sao",alt:["Ng"]},{k:"S",e:"📚",w:"Sách"},{k:"S",e:"🐿️",w:"Sóc"},{k:"S",e:"🥛",w:"Sữa"},
  {k:"T",e:"🍎",w:"Táo"},{k:"T",e:"👂",w:"Tai"},{k:"T",e:"✋",w:"Tay",alt:["B"]},{k:"T",e:"🦐",w:"Tôm"},
  {k:"V",e:"🐘",w:"Voi"},{k:"V",e:"🦆",w:"Vịt"},{k:"V",e:"🦜",w:"Vẹt"},
  {k:"X",e:"🚲",w:"Xe đạp"},{k:"X",e:"🥭",w:"Xoài"},{k:"X",e:"🌵",w:"Xương rồng"},
  {k:"A",e:"👕",w:"Áo"},{k:"Ê",e:"🐸",w:"Ếch"},{k:"O",e:"🐝",w:"Ong"},{k:"Ô",e:"🐌",w:"Ốc sên"},{k:"Ơ",e:"🌶️",w:"Ớt"},
  {k:"Ch",e:"🍌",w:"Chuối"},{k:"Ch",e:"🍋",w:"Chanh"},{k:"Ch",e:"🐦",w:"Chim"},{k:"Ch",e:"🐭",w:"Chuột"},{k:"Ch",e:"🔑",w:"Chìa khoá"},{k:"Ch",e:"🦶",w:"Chân",alt:["B"]},
  {k:"Nh",e:"🍇",w:"Nho"},{k:"Nh",e:"🏠",w:"Nhà"},{k:"Nh",e:"🕷️",w:"Nhện"},
  {k:"Ng",e:"🐴",w:"Ngựa"},
  {k:"Th",e:"🐰",w:"Thỏ"},{k:"Th",e:"🦢",w:"Thiên nga"},{k:"Th",e:"🪜",w:"Thang"},
  {k:"Tr",e:"🥚",w:"Trứng"},{k:"Tr",e:"🌙",w:"Trăng",alt:["M"]},{k:"Tr",e:"🥁",w:"Trống"},{k:"Tr",e:"🐃",w:"Trâu"},
  {k:"Kh",e:"🐒",w:"Khỉ"},{k:"Kh",e:"🧣",w:"Khăn"},{k:"Kh",e:"🥔",w:"Khoai tây"},
  {k:"Gh",e:"🪑",w:"Ghế"},
  {k:"Gi",e:"👟",w:"Giày"},{k:"Gi",e:"🛏️",w:"Giường"}
];
var SAY = {B:"bờ",C:"cờ",D:"dờ","Đ":"đờ",G:"gờ",H:"hờ",K:"ca",L:"lờ",M:"mờ",N:"nờ",R:"rờ",S:"sờ",T:"tờ",V:"vờ",X:"xờ",
  A:"a","Ê":"ê",O:"o","Ô":"ô","Ơ":"ơ",Ch:"chờ",Nh:"nhờ",Ng:"ngờ",Th:"thờ",Tr:"trờ",Kh:"khờ",Gh:"gờ kép",Gi:"di"};
var CLOSE = {Tr:["T","Th"],Th:["T","Tr"],Ch:["C"],Nh:["N","Ng"],Ng:["N","Nh"],Kh:["K","C"],Gh:["G","Gi"],Gi:["G","Gh","D"],
  D:["Đ","Gi"],"Đ":["D"],O:["Ô","Ơ"],"Ô":["O","Ơ"],"Ơ":["O","Ô"]};
var DIGRAPHS = ["Ch","Nh","Ng","Th","Tr","Kh","Gh","Gi"];
var L_EASY = ["B","C","D","Đ","G","H","K","L","M","N","R","S","T","V","X"];
var L_VOWEL = ["A","Ê","O","Ô","Ơ"];
var L_HARD = ["Ch","Nh","Ng","Th","Tr","Kh","Gh","Gi","D","Đ","O","Ô","Ơ"];

var ORDERS = [
  {lv:1, items:["🐭","🐶","🐘"], ask:"từ con NHỎ nhất đến con TO nhất", rev:"từ con TO nhất đến con NHỎ nhất", why:"Chuột nhỏ nhất, voi to nhất."},
  {lv:1, items:["🍒","🍎","🍉"], ask:"từ quả NHỎ nhất đến quả TO nhất", rev:"từ quả TO nhất đến quả NHỎ nhất", why:"Anh đào nhỏ xíu, dưa hấu to nhất."},
  {lv:1, items:["👶","🧒","👴"], ask:"từ người ÍT tuổi nhất đến người NHIỀU tuổi nhất", rev:"từ người NHIỀU tuổi nhất đến người ÍT tuổi nhất", why:"Em bé ít tuổi nhất, ông nhiều tuổi nhất."},
  {lv:1, items:["🥚","🐣","🐔"], ask:"theo thứ tự cái nào có TRƯỚC, cái nào có SAU", why:"Trứng nở ra gà con, gà con lớn lên thành gà."},
  {lv:1, items:["☁️","🌧️","🌈"], ask:"theo thứ tự cái nào có TRƯỚC, cái nào có SAU", why:"Mây kéo đến, trời đổ mưa, mưa tạnh thì có cầu vồng."},
  {lv:2, items:["🐜","🐭","🐕","🐘"], ask:"từ con NHỎ nhất đến con TO nhất", rev:"từ con TO nhất đến con NHỎ nhất", why:"Kiến nhỏ xíu, rồi chuột, rồi chó, voi to nhất."},
  {lv:2, items:["🛴","🚲","🚗","🚌"], ask:"từ xe NHỎ nhất đến xe TO nhất", rev:"từ xe TO nhất đến xe NHỎ nhất", why:"Xe trượt nhỏ nhất, rồi xe đạp, xe hơi, xe buýt to nhất."},
  {lv:2, items:["🌰","🌱","🌿","🌳"], ask:"theo thứ tự cái cây lớn lên", why:"Hạt nảy mầm, mầm thành cây non, cây non lớn thành cây to."},
  {lv:2, items:["🌅","☀️","🌇","🌙"], ask:"theo thứ tự trong ngày: sáng, trưa, chiều, tối", rev:"ngược lại: tối, chiều, trưa, sáng", why:"Sáng mặt trời mọc, trưa nắng to, chiều mặt trời lặn, tối có trăng."},
  {lv:2, items:["🥚","🐛","🦋"], ask:"theo thứ tự con bướm lớn lên", why:"Bướm đẻ trứng, trứng nở ra sâu, sâu lớn lên hoá thành bướm."},
  {lv:2, items:["🍒","🍎","🥥","🍉"], ask:"từ quả NHỎ nhất đến quả TO nhất", rev:"từ quả TO nhất đến quả NHỎ nhất", why:"Anh đào nhỏ nhất, rồi táo, rồi dừa, dưa hấu to nhất."},
  {lv:2, items:["👶","🧒","🧑","👴"], ask:"từ người ÍT tuổi nhất đến người NHIỀU tuổi nhất", rev:"từ người NHIỀU tuổi nhất đến người ÍT tuổi nhất", why:"Em bé, bạn nhỏ, người lớn, rồi ông nhiều tuổi nhất."},
  {lv:3, items:["🐜","🐭","🐇","🐄","🐘"], ask:"từ con NHỎ nhất đến con TO nhất", rev:"từ con TO nhất đến con NHỎ nhất", why:"Kiến, chuột, thỏ, bò, rồi voi to nhất."},
  {lv:3, items:["🥚","🐣","🐥","🐔"], ask:"theo thứ tự con gà lớn lên", rev:"ngược lại, từ con gà về quả trứng", why:"Trứng nở ra gà con, gà con lớn dần thành gà."}
];

var PRAISE = ["Giỏi quá!","Đúng rồi!","Tuyệt vời!","Thông minh quá!","Hoan hô!","Chính xác!"];
var OOPS = ["Chưa đúng, thử lại nhé!","Gần đúng rồi, đoán lại nào!","Ồ, không phải cái này!","Nghĩ thêm chút nữa nhé!"];
var LV_NAME = {1:"🌱 Dễ",2:"🌿 Vừa",3:"🌳 Khó"};
var LV_DESC = {
  1:"Câu dễ, 3 lựa chọn. Đánh vần tiếng ngắn với dấu huyền, sắc, nặng.",
  2:"Có hình dễ nhầm, tính tới 10. Đánh vần có bẫy c/k, g/gh, tr/ch, s/x.",
  3:"4 lựa chọn, dấu hỏi/ngã, vần khó, từ hai tiếng, số tới 100. Mỗi câu 2 ⭐!"
};

/* ================= TIẾNG VIỆT: dấu thanh, âm đầu, vần ================= */
var TONE_ROWS = ["aàáảãạ","ăằắẳẵặ","âầấẩẫậ","eèéẻẽẹ","êềếểễệ","iìíỉĩị","oòóỏõọ","ôồốổỗộ","ơờớởỡợ","uùúủũụ","ưừứửữự","yỳýỷỹỵ"];
var TONE_OF={}, BASE_OF={}, WITH_TONE={};
TONE_ROWS.forEach(function(row){ var cs=Array.from(row); WITH_TONE[cs[0]]=cs; cs.forEach(function(c,t){ TONE_OF[c]=t; BASE_OF[c]=cs[0]; }); });
var TONE_NAME = ["ngang","huyền","sắc","hỏi","ngã","nặng"];
var VOW = "aăâeêioôơuưy", SPECIAL = "ăâêôơư";
var INITS = ["ngh","ng","gh","gi","kh","nh","ph","qu","th","tr","ch","b","c","d","đ","g","h","k","l","m","n","p","r","s","t","v","x"];
var SOUND = {b:"bờ",c:"cờ",k:"ca",ch:"chờ",d:"dờ","đ":"đờ",g:"gờ",gh:"gờ",gi:"di",h:"hờ",kh:"khờ",l:"lờ",m:"mờ",n:"nờ",ng:"ngờ",ngh:"ngờ",nh:"nhờ",p:"pờ",ph:"phờ",qu:"quờ",r:"rờ",s:"sờ",t:"tờ",th:"thờ",tr:"trờ",v:"vờ",x:"xờ"};

function stripTone(s){ return Array.from(s).map(function(c){ return BASE_OF[c]||c; }).join(""); }
function parseSyl(w){
  var t=0; Array.from(w).forEach(function(c){ if(TONE_OF[c]) t=TONE_OF[c]; });
  var p=stripTone(w), ini="";
  for(var i=0;i<INITS.length;i++){ if(p.indexOf(INITS[i])===0 && p.length>INITS[i].length){ ini=INITS[i]; break; } }
  return {ini:ini, van:p.slice(ini.length), tone:t};
}
/* vị trí đặt dấu thanh trong vần (quy tắc cũ, trừ oa/oe/uy mở — kho từ tránh các vần đó) */
function tonePos(van){
  var ch=Array.from(van), k=0;
  while(k<ch.length && VOW.indexOf(ch[k])>=0) k++;
  var pos=-1;
  for(var i=0;i<k;i++) if(SPECIAL.indexOf(ch[i])>=0) pos=i;
  if(pos>=0) return pos;
  if(k<ch.length) return k-1;
  if(k===1) return 0;
  var end=ch.slice(k-2,k).join("");
  return (end==="oa"||end==="oe"||end==="uy") ? k-1 : k-2;
}
function rebuild(s){
  if(!s.tone) return s.ini+s.van;
  var ch=Array.from(s.van), p=tonePos(s.van);
  if(p<0 || !WITH_TONE[ch[p]]) return s.ini+s.van;
  ch[p]=WITH_TONE[ch[p]][s.tone];
  return s.ini+ch.join("");
}
function spellSyl(s){
  var parts = s.ini ? [SOUND[s.ini], s.van, s.ini+s.van] : [s.van];
  if(s.tone) parts.push(TONE_NAME[s.tone], rebuild(s));
  return parts.join(" – ");
}
function spellPlain(word){ return word.syl.map(spellSyl).join(" · "); }
function sylTiles(s){
  var w=rebuild(s), rest=w.slice(s.ini.length), out=s.ini?[s.ini]:[];
  var m=rest.match(/(ng|nh|ch)$/), body=m?rest.slice(0,-2):rest;
  Array.from(body).forEach(function(c){ out.push(c); });
  if(m) out.push(m[1]);
  return out;
}
function flatTiles(syls){ return syls.reduce(function(a,s){ return a.concat(sylTiles(s)); },[]); }
function strSyls(str){ return str.split(" ").map(parseSyl); }

/* kho từ: một tiếng */
var W1_RAW = "🐄 bò|🐟 cá|🐔 gà|🐱 mèo|🐶 chó|🐘 voi|🦆 vịt|🐐 dê|🐑 cừu|🐻 gấu|🐒 khỉ|🐰 thỏ|🐢 rùa|🐍 rắn|🦀 cua|🦐 tôm|🐝 ong|🐜 kiến|🦋 bướm|🐸 ếch|🐌 ốc|🐭 chuột|🐴 ngựa|🐃 trâu|🦉 cú|🕷️ nhện|🦇 dơi|🐦 chim|🦜 vẹt|🐛 sâu|🦟 muỗi|🦑 mực|🦊 cáo|🐺 sói|🐿️ sóc|🦔 nhím|🦚 công|🪿 ngỗng"+
  "|🍎 táo|🍐 lê|🍊 cam|🍋 chanh|🍌 chuối|🍇 nho|🥥 dừa|🥭 xoài|🍑 đào|🥑 bơ|🍓 dâu|🥔 khoai|🌶️ ớt|🧄 tỏi|🧅 hành|🍄 nấm|🍚 cơm|🥚 trứng|🥛 sữa|🍬 kẹo|🍦 kem|🍵 trà|🧂 muối|🍖 thịt|🥬 rau|🫘 đậu|🌾 lúa|🌳 cây|🍃 lá"+
  "|🪑 ghế|🛏️ giường|🚪 cửa|🏠 nhà|📖 sách|✏️ bút|📏 thước|✂️ kéo|💡 đèn|🥁 trống|🎸 đàn|🎺 kèn|🔔 chuông|🪁 diều|🎁 quà|🎀 nơ|👕 áo|👖 quần|👟 giày|🧣 khăn|🎒 cặp|🪣 xô|🧹 chổi|🔨 búa|🪜 thang|🥢 đũa|🔪 dao|🫖 ấm|💍 nhẫn|🪵 gỗ|⛵ thuyền|🚂 tàu|🌉 cầu"+
  "|⛰️ núi|⭐ sao|🌙 trăng|☁️ mây|🌧️ mưa|❄️ tuyết|🔥 lửa|🌊 sóng|🪨 đá|💧 nước|🪺 tổ"+
  "|👂 tai|👃 mũi|👁️ mắt|👄 môi|✋ tay|🦶 chân|🦷 răng|👅 lưỡi|❤️ tim";
/* kho từ: hai tiếng (mức Khó) */
var W2_RAW = "🐬 cá heo|🐳 cá voi|🦈 cá mập|🐊 cá sấu|🐙 bạch tuộc|🦖 khủng long|🦁 sư tử|🦓 ngựa vằn|🐞 bọ rùa|🦢 thiên nga|🐼 gấu trúc|🐓 gà trống"+
  "|🌈 cầu vồng|⏰ đồng hồ|🪥 bàn chải|✈️ máy bay|🍭 kẹo mút|🎂 bánh kem|🥖 bánh mì|🍉 dưa hấu|🥕 cà rốt|🍅 cà chua|🌹 hoa hồng|🌻 hướng dương|🌵 xương rồng"+
  "|⛄ người tuyết|🏰 lâu đài|🧸 gấu bông|🚲 xe đạp|🚌 xe buýt|🚀 tên lửa|☀️ mặt trời|🏫 trường học|🛝 cầu trượt|🪆 búp bê";
function mkWord(item){ var i=item.indexOf(" "), w=item.slice(i+1).normalize("NFC"); return {e:item.slice(0,i), w:w, syl:w.split(" ").map(parseSyl)}; }
var W1 = W1_RAW.split("|").map(mkWord), W2 = W2_RAW.split("|").map(mkWord);

/* sinh lỗi chính tả để làm đáp án nhiễu */
var INI_SWAP = {c:["k"],k:["c"],g:["gh"],gh:["g"],ng:["ngh"],ngh:["ng"],tr:["ch"],ch:["tr"],s:["x"],x:["s"],d:["gi","r"],gi:["d","r"],r:["d","gi"],v:["d"],l:["n"],n:["l"],"đ":["d"]};
var FIN_SWAP = [["ng","n"],["nh","n"],["n","ng"],["ch","t"],["c","t"],["t","c"],["m","n"]];
var VAN_SWAP = [["ươ","ư"],["uô","u"],["iê","i"],["âu","au"],["ây","ay"],["ao","au"],["ông","ong"],["ưu","iu"],["ơi","ôi"],["ôi","ơi"],["oai","oi"],["ăng","ang"],["ăn","ân"],["anh","ăn"],["ô","o"],["ơ","o"],["ê","e"],["â","a"],["ư","u"]];
var BAD = ["đái","đụa","đụ","địt","đéo","lồn","cặc","buồi","dái","cứt","ỉa","đĩ","nứng","cặt"];
function okVariant(str){ return str.split(" ").every(function(x){ return BAD.indexOf(x)<0; }); }
function sylVariants(s){
  var o={tone:[],hn:[],ini:[],fin:[],van:[]};
  for(var t=0;t<6;t++){
    if(t===s.tone) continue;
    var x=rebuild({ini:s.ini,van:s.van,tone:t});
    ((s.tone===3&&t===4)||(s.tone===4&&t===3) ? o.hn : o.tone).push(x);
  }
  (INI_SWAP[s.ini]||[]).forEach(function(ni){
    if(ni==="gi" && s.van.charAt(0)==="i") return;
    o.ini.push(rebuild({ini:ni,van:s.van,tone:s.tone}));
  });
  FIN_SWAP.forEach(function(p){
    var a=p[0], v=s.van;
    if(v.length<=a.length || v.slice(-a.length)!==a) return;
    o.fin.push(rebuild({ini:s.ini,van:v.slice(0,-a.length)+p[1],tone:s.tone}));
  });
  VAN_SWAP.forEach(function(p){
    if(p[0].length===1 && /ươ|uô|iê|yê/.test(s.van)) return;
    if(s.van.indexOf(p[0])>=0) o.van.push(rebuild({ini:s.ini,van:s.van.replace(p[0],p[1]),tone:s.tone}));
  });
  return o;
}
function wordVariants(word){
  var cats={tone:[],hn:[],ini:[],fin:[],van:[]}, base=word.syl.map(rebuild);
  word.syl.forEach(function(s,i){
    var v=sylVariants(s);
    Object.keys(cats).forEach(function(k){
      v[k].forEach(function(x){
        var parts=base.slice(); parts[i]=x;
        var str=parts.join(" ");
        if(str!==word.w && okVariant(str) && cats[k].indexOf(str)<0) cats[k].push(str);
      });
    });
  });
  return cats;
}
function chooseFrom(cats, plan, avoid){
  var out=[];
  function ok(x){ return out.indexOf(x)<0 && (avoid||[]).indexOf(x)<0; }
  plan.forEach(function(group){
    var pool=[]; group.forEach(function(c){ pool=pool.concat(cats[c]); });
    pool=shuffle(pool.filter(ok));
    if(pool.length) out.push(pool[0]);
  });
  shuffle([].concat(cats.hn,cats.ini,cats.fin,cats.van,cats.tone)).forEach(function(x){ if(out.length<plan.length && ok(x)) out.push(x); });
  return out;
}

function basicV(s){ return s.replace(/[ăâ]/g,"a").replace(/ê/g,"e").replace(/[ôơ]/g,"o").replace(/ư/g,"u"); }
function finalOf(v){ var m=v.match(/(ng|nh|ch|[cmnpt])$/); return m?m[1]:""; }
function vanSim(a,b){
  var s=0, na=a.slice(0,a.length-finalOf(a).length), nb=b.slice(0,b.length-finalOf(b).length);
  if(basicV(a)===basicV(b)) s+=3;
  if(finalOf(a)===finalOf(b)) s+=1;
  if(basicV(na)===basicV(nb)) s+=2; else if(basicV(a).charAt(0)===basicV(b).charAt(0)) s+=1;
  return s;
}
function wordSim(a,b){
  var s=0;
  a.syl.forEach(function(x,i){
    var y=b.syl[i]; if(!y) return;
    if(rebuild(x)===rebuild(y)){ s+=4; return; }
    if(x.ini===y.ini) s+=1.5;
    if(x.van===y.van) s+=2; else s+=vanSim(x.van,y.van)*0.4;
    if(x.tone===y.tone) s+=0.3;
  });
  return s;
}
function isStop(s){ return /(c|ch|p|t)$/.test(s.van); }
function nTiles(w){ return flatTiles(w.syl).length; }
function isComplex(w){ return w.syl.some(function(s){ return /ươ|uô|iê|yê|oai|ưu/.test(s.van) || Array.from(s.van).length>=3; }); }
function isHardW(w){ return w.syl.some(function(s){ return s.tone===3||s.tone===4; }) || isComplex(w) || ["tr","ch","s","x","d","gi","r","l","n","k","gh","ngh"].indexOf(w.syl[0].ini)>=0; }
function pickWords(pool, n, filter){
  var c=shuffle(pool.filter(filter));
  if(c.length<n) c=c.concat(shuffle(pool.filter(function(x){ return c.indexOf(x)<0; })));
  return c.slice(0,n);
}
function ruleNote(word){
  for(var i=0;i<word.syl.length;i++){
    var ini=word.syl[i].ini;
    if(ini==="k") return "Trước e, ê, i ta viết “k”, không viết “c”.";
    if(ini==="c") return "Trước a, ă, â, o, ô, ơ, u, ư ta viết “c”, không viết “k”.";
    if(ini==="gh") return "Trước e, ê, i ta viết “gh”.";
    if(ini==="g") return "Trước a, ă, â, o, ô, ơ, u, ư ta viết “g”, không viết “gh”.";
    if(ini==="ngh") return "Trước e, ê, i ta viết “ngh”.";
    if(ini==="ng") return "Trước a, ă, â, o, ô, ơ, u, ư ta viết “ng”, không viết “ngh”.";
  }
  for(i=0;i<word.syl.length;i++){ var t=word.syl[i].tone; if(t===3||t===4) return "Tiếng “"+rebuild(word.syl[i])+"” mang dấu "+TONE_NAME[t]+"."; }
  return "Đánh vần: "+spellPlain(word)+".";
}

/* ---- 🔡 Ghép chữ ---- */
var SIMPLE_TILES = ["b","m","n","l","h","t","v","a","o","e","i","u","ô","ơ"];
function makeBuild(word, lv){
  var groups=word.syl.map(sylTiles), seq=[].concat.apply([],groups), have={}, dis=[];
  seq.forEach(function(t){ have[t]=1; });
  if(lv===1) dis=pick(SIMPLE_TILES.filter(function(t){ return !have[t]; }),1);
  else {
    var cats=wordVariants(word), plan = lv===2 ? [["tone"],["ini","fin","van"]] : [["hn","van"],["ini"],["fin","tone"]];
    var tilesOf=function(list){ var r=[]; list.forEach(function(str){ flatTiles(strSyls(str)).forEach(function(t){ if(!have[t] && r.indexOf(t)<0) r.push(t); }); }); return r; };
    plan.forEach(function(g){
      var pool=[]; g.forEach(function(c){ pool=pool.concat(tilesOf(cats[c])); });
      pool=shuffle(pool.filter(function(t){ return dis.indexOf(t)<0; }));
      if(pool.length) dis.push(pool[0]);
    });
    shuffle(tilesOf([].concat(cats.hn,cats.ini,cats.fin,cats.van,cats.tone))).forEach(function(t){ if(dis.length<plan.length && dis.indexOf(t)<0) dis.push(t); });
  }
  var k=0, slots=groups.map(function(g){ return g.map(function(){ return '<span class="wslot" data-k="'+(k++)+'"></span>'; }).join(""); }).join('<span class="wgap"></span>');
  var q = {
    label:"🔡 Ghép chữ", text:"Ghép chữ thành tên của hình này.",
    hint: word.syl.length>1 ? "Tên có "+word.syl.length+" tiếng. Chạm từng chữ theo thứ tự nhé!" : "Chạm từng chữ theo thứ tự nhé!",
    speak:"Bé ghép các chữ thành tên của hình này nhé.",
    stage:'<div class="pic">'+word.e+'</div><div class="wslots">'+slots+'</div>', layout:"tiles",
    answer:word.e, answerName:word.w, why:"Đánh vần: "+spellPlain(word)+".", seq:seq, dis:dis,
    custom:function(st, box){
      var next=0;
      shuffle(seq.concat(dis)).forEach(function(t){
        var b=document.createElement("button"); b.type="button"; b.className="opt";
        b.innerHTML='<span class="o-tile">'+esc(t)+'</span>'; b.setAttribute("aria-label", t);
        b.addEventListener("click", function(){
          if(state.locked || b.disabled) return;
          unlockAudio();
          if(t===seq[next]){
            b.disabled=true; b.classList.add("used");
            var sl=st.querySelector('.wslot[data-k="'+next+'"]'); if(sl){ sl.textContent=t; sl.classList.add("filled"); }
            tone(520+Math.min(next,9)*80,0,0.12,"triangle",0.12);
            next++;
            setHint(next<seq.length ? "Đúng rồi, chữ tiếp theo nào!" : "");
            if(next===seq.length) solve(q);
          } else miss(b, true);
        });
        box.appendChild(b);
      });
    }
  };
  return q;
}
function makeBuildSet(lv){
  var ws;
  if(lv===1) ws=pickWords(W1, 8, function(w){ return nTiles(w)<=3 && !isStop(w.syl[0]); });
  else if(lv===2) ws=pickWords(W1, 8, function(w){ var n=nTiles(w); return n>=3 && n<=4; });
  else ws=shuffle(pickWords(W2,4,function(){ return true; }).concat(pickWords(W1,4,function(w){ return nTiles(w)>=4; })));
  return ws.map(function(w){ return makeBuild(w, lv); });
}

/* ---- ✍️ Viết đúng ---- */
function makeWrite(word, lv){
  var plan = lv===1 ? [["tone"],["tone"]] : lv===2 ? [["tone"],["ini","van","fin"]] : [["hn","ini"],["van","fin"],["ini","fin","van","hn"]];
  var ds=chooseFrom(wordVariants(word), plan);
  return {
    label:"✍️ Viết đúng", text:"Tên của hình này\nviết thế nào cho đúng?", speak:"Tên của hình này viết thế nào cho đúng?",
    stage:'<div class="pic">'+word.e+'</div>', layout: ds.length>2 ? "words2" : "words",
    options: shuffle([{txt:word.w, correct:true}].concat(ds.map(function(x){ return {txt:x}; }))),
    answer:word.e, answerName:word.w, why:"Viết đúng là “"+word.w+"”. "+ruleNote(word)
  };
}
function makeWriteSet(lv){
  var ws;
  if(lv===1) ws=pickWords(W1, 8, function(w){ return nTiles(w)<=3 && !isStop(w.syl[0]); });
  else if(lv===2) ws=pickWords(W1, 8, function(w){ return ["c","k","g","gh","ng","ngh","tr","ch","s","x"].indexOf(w.syl[0].ini)>=0; });
  else ws=shuffle(pickWords(W2,4,function(){ return true; }).concat(pickWords(W1,4,isHardW)));
  return ws.map(function(w){ return makeWrite(w, lv); });
}

/* ---- 🗣️ Đọc đánh vần ---- */
function similar(word, pool, n, lv){
  var c=pool.filter(function(x){ return x.e!==word.e && x.w!==word.w; });
  if(lv===1) return pick(c, n);
  var sc=c.map(function(x){ return {x:x, s:wordSim(word,x)+Math.random()*0.6}; }).sort(function(a,b){ return b.s-a.s; });
  return (lv===2 ? pick(sc.slice(0,8), n) : sc.slice(0,n)).map(function(o){ return o.x; });
}
function makeRead(word, lv){
  var k = lv===3 ? 4 : 3, pool = word.syl.length>1 ? W2 : W1;
  var ds = similar(word, pool, k-1, lv);
  return {
    label:"🗣️ Đọc đánh vần", text:"Đọc phần đánh vần,\nrồi chọn hình đúng.", speak:"Bé đọc phần đánh vần, rồi chọn hình đúng nhé.",
    stage:'<div class="spell">'+word.syl.map(spellSyl).join("<br>")+'</div>', layout: k>3 ? "grid4" : "row3",
    options: shuffle([{emo:word.e, name:word.w, correct:true}].concat(ds.map(function(d){ return {emo:d.e, name:d.w}; }))),
    answer:word.e, answerName:word.w, why:"Đánh vần xong, ta đọc được “"+word.w+"”."
  };
}
function makeReadSet(lv){
  var ws;
  if(lv===1) ws=pickWords(W1, 8, function(w){ return w.syl[0].ini && nTiles(w)<=3; });
  else if(lv===2) ws=pickWords(W1, 8, function(w){ return w.syl[0].ini || w.syl[0].tone; });
  else ws=shuffle(pickWords(W2,4,function(){ return true; }).concat(pickWords(W1,4,function(w){ return isComplex(w) && (w.syl[0].ini || w.syl[0].tone); })));
  return ws.map(function(w){ return makeRead(w, lv); });
}

/* ---- 🎵 Tìm vần ---- */
function makeRhyme(word, lv){
  var v=word.syl[0].van, k = lv===3 ? 4 : 3;
  var c=W1.filter(function(x){ return x.syl[0].van!==v && x.syl[0].ini!=="qu"; }), ds;
  if(lv===1) ds=pick(c, k-1);
  else {
    var sc=c.map(function(x){ return {x:x, s:vanSim(v, x.syl[0].van)+Math.random()*0.8}; }).sort(function(a,b){ return b.s-a.s; });
    ds=(lv===2 ? pick(sc.slice(0,10), k-1) : sc.slice(0,k-1)).map(function(o){ return o.x; });
  }
  return {
    label:"🎵 Tìm vần", text:"Hình nào có vần “"+v+"”?", speak:"Hình nào có vần "+v+"?",
    stage:'<div class="van-pill">'+v+'</div>', layout: k>3 ? "grid4" : "row3",
    options: shuffle([{emo:word.e, name:word.w, correct:true}].concat(ds.map(function(d){ return {emo:d.e, name:d.w}; }))),
    answer:word.e, answerName:word.w, why:"“"+word.w+"” có vần “"+v+"”. Đánh vần: "+spellSyl(word.syl[0])+"."
  };
}
function makeRhymeSet(lv){
  var c=W1.filter(function(w){
    var v=w.syl[0].van, n=Array.from(v).length;
    if(w.syl[0].ini==="qu") return false;
    if(lv===1) return n<=2 && !/[ăâêôơư]/.test(v);
    if(lv===2) return n<=3;
    return /ươ|uô|iê|uyê|oai|ưu/.test(v) || (n>=3 && /[ăâêôơư]/.test(v)) || /(ng|nh|ch)$/.test(v);
  });
  var used={}, out=[];
  shuffle(c).forEach(function(w){ var v=w.syl[0].van; if(out.length<8 && !used[v]){ used[v]=1; out.push(w); } });
  shuffle(W1).forEach(function(w){ var v=w.syl[0].van; if(out.length<8 && !used[v] && w.syl[0].ini!=="qu"){ used[v]=1; out.push(w); } });
  return out.map(function(w){ return makeRhyme(w, lv); });
}

/* ---- 🎯 Thêm dấu ---- */
function makeToneQ(word, lv){
  var s=word.syl[0], vch=Array.from(s.van), p=tonePos(s.van), base=vch[p];
  var allowed = lv===1 ? [1,2,5] : lv===2 ? [0,1,2,3,5] : [0,1,2,3,4,5];
  var ts = lv===3 ? allowed.slice() : [s.tone].concat(pick(allowed.filter(function(t){ return t!==s.tone; }), lv===1 ? 2 : 3));
  ts.sort(function(a,b){ return a-b; });
  var bare = s.ini + vch.map(function(c,i){ return i===p ? "<u>"+c+"</u>" : c; }).join("");
  return {
    label:"🎯 Thêm dấu", text:"Thêm dấu gì để thành\ntên của hình này?", speak:"Thêm dấu gì để thành tên của hình này?",
    stage:'<div class="pic">'+word.e+'</div><div class="bare" id="bare">'+bare+'</div>',
    layout: ts.length===3 ? "row3" : ts.length===4 ? "tones4" : "tones6",
    options: ts.map(function(t){ return {glyph:WITH_TONE[base][t], label: t ? "dấu "+TONE_NAME[t] : "không dấu", correct:t===s.tone, key:"t"+t}; }),
    answer:word.e, answerName:word.w,
    why:"“"+word.w+"” "+(s.tone ? "mang dấu "+TONE_NAME[s.tone]+"." : "không có dấu (thanh ngang)."),
    onCorrect:function(){ var b=$("#bare"); if(b){ b.textContent=word.w; b.classList.add("done"); } }
  };
}
function makeToneSet(lv){
  var ws;
  if(lv===1) ws=pickWords(W1, 8, function(w){ return [1,2,5].indexOf(w.syl[0].tone)>=0; });
  else if(lv===2) ws=pickWords(W1, 8, function(w){ return [0,1,2,3,5].indexOf(w.syl[0].tone)>=0; });
  else ws=shuffle(pickWords(W1,5,function(w){ var t=w.syl[0].tone; return t===3||t===4; }).concat(pickWords(W1,3,function(w){ var t=w.syl[0].tone; return t!==3&&t!==4; })));
  return ws.map(function(w){ return makeToneQ(w, lv); });
}

/* ================= tạo câu hỏi (trò cũ) ================= */
function pickLv(arr, lv, n){
  var out = shuffle(arr.filter(function(x){ return x.lv===lv; }));
  [lv-1, lv+1, lv-2, lv+2].forEach(function(l){ if(out.length<n) out = out.concat(shuffle(arr.filter(function(x){ return x.lv===l; }))); });
  return out.slice(0,n);
}
function distr(w, lv){ return lv===1 ? [w[0],w[1]] : lv===2 ? [w[0],w[2]] : [w[0],w[1],w[2]]; }
function labeledOpts(a, ws){
  return shuffle([{emo:a[0], label:a[1], correct:true}].concat(ws.map(function(x){ return {emo:x[0], label:x[1]}; })));
}
function numOpts(ans, k, min, max){
  var cands = shuffle([ans-1,ans+1]).concat(shuffle([ans-2,ans+2])).concat(shuffle([ans-3,ans+3]));
  var set=[ans];
  cands.forEach(function(c){ if(set.length<k && c>=min && c<=max && set.indexOf(c)<0) set.push(c); });
  return set.sort(function(a,b){ return a-b; }).map(function(x){ return {num:x, correct:x===ans}; });
}

function makeRiddle(r, lv){
  var opts = labeledOpts(r.a, distr(r.w, lv));
  return {
    label:"🧩 Câu đố vui", text:r.q, speak:r.q,
    stage:'<div class="mystery" id="mystery">❓</div>', layout:opts.length>3?"lab4":"row3",
    options:opts, answer:r.a[0], answerName:r.a[1], why:r.why,
    onCorrect:function(){ var m=$("#mystery"); if(m){ m.textContent=r.a[0]; m.classList.add("revealed"); } }
  };
}
function makeShadow(s, lv){
  var opts = labeledOpts(s.a, distr(s.w, lv)), mirror = lv===3;
  var t = mirror ? "Bóng đã quay sang hướng khác!\nĐây là bóng của ai?" : "Cái bóng đen này là của ai?";
  return {
    label:"🌑 Đoán bóng", text:t, speak:t,
    stage:'<div class="silwrap'+(mirror?' mirror':'')+'" id="silwrap"><div class="sil" id="sil">'+s.a[0]+'</div></div>',
    layout:opts.length>3?"lab4":"row3",
    options:opts, answer:s.a[0], answerName:s.a[1], why:"Đó là bóng của "+s.who+".",
    onCorrect:function(){ var w=$("#silwrap"); if(w) w.classList.remove("mirror"); var el=$("#sil"); if(el) el.classList.add("show"); }
  };
}
function makeOdd(o){
  return {
    label:"🔍 Tìm hình lạ", text:"Hình nào không cùng nhóm\nvới các bạn còn lại?", speak:"Hình nào không cùng nhóm với các bạn còn lại?",
    stage:"", layout:o.items.length>4?"grid6":"grid4",
    options:shuffle(o.items.map(function(e){ return {emo:e, correct:e===o.odd}; })),
    answer:o.odd, why:o.why
  };
}
function makePattern(p, lv){
  var ws = lv===3 ? p.w.slice(0,3) : p.w.slice(0,2);
  var html='<div class="seq" id="seq">'+p.seq.map(function(e){ return "<span>"+e+"</span>"; }).join("")+'<span class="slot" id="slot">?</span></div>';
  return {
    label:"🔁 Hình tiếp theo", text:"Hình nào sẽ đến tiếp theo?", speak:"Hình nào sẽ đến tiếp theo?",
    stage:html, layout:ws.length>2?"grid4":"row3", seqLen:p.seq.length+1,
    options:shuffle([{emo:p.a, correct:true}].concat(ws.map(function(e){ return {emo:e}; }))),
    answer:p.a, why:p.why,
    onCorrect:function(){ var s=$("#slot"); if(s){ s.textContent=p.a; s.classList.add("filled"); } }
  };
}

/* --- đếm --- */
function countQ(arr, n, name, hint, lv){
  var small = arr.length>12;
  var stage='<div class="count-grid'+(small?' small':'')+'">'+arr.map(function(e){ return '<button type="button" class="citem" style="--r:'+rand(-12,12)+'deg"><span class="e">'+e+'</span></button>'; }).join("")+'</div>';
  var title="Có mấy "+name+"?";
  return {
    label:"🔢 Đếm cho đúng", text:title, hint:hint, speak:title+" Bé đếm thử nhé.",
    stage:stage, layout:lv===3?"num4":"num",
    options:numOpts(n, lv===3?4:3, 1, 30),
    answer:String(n), why:"Có tất cả "+n+" "+name+".",
    afterRender:function(el){
      el.querySelectorAll(".citem").forEach(function(b){
        b.addEventListener("click", function(){ unlockAudio(); b.classList.toggle("done"); tone(b.classList.contains("done")?880:660,0,0.07,"sine",0.08); });
      });
    }
  };
}
function cSimple(item, lv){
  var n = lv===1 ? rand(3,6) : lv===2 ? rand(5,10) : rand(10,15);
  return countQ(repeat(item.e,n), n, item.n, "Chạm vào từng hình để đánh dấu khi đếm nhé!", lv);
}
function cMixed(item, lv){
  var n, arr;
  if(lv===3){ n=rand(6,10); arr=shuffle(repeat(item.e,n).concat(repeat(item.d,rand(3,5))).concat(repeat(item.d2,rand(3,5)))); }
  else { n=rand(4,8); arr=shuffle(repeat(item.e,n).concat(repeat(item.d,rand(2,4)))); }
  return countQ(arr, n, item.n, "Chỉ đếm "+item.e+" thôi nhé!", lv);
}
function cCat(c, lv){
  var n=rand(4,8), yes=[], no=[], m=rand(4,7), i;
  for(i=0;i<n;i++) yes.push(any(c.yes));
  for(i=0;i<m;i++) no.push(any(c.no));
  return countQ(shuffle(yes.concat(no)), n, c.n, "Nghĩ xem hình nào là "+c.n+" rồi mới đếm nhé!", lv);
}
function makeCountSet(lv){
  if(lv===1) return pick(COUNT_SIMPLE,6).map(function(s){ return cSimple(s,1); });
  var nMix = lv===2 ? 3 : 2;
  var mx = pick(COUNT_MIXED, nMix), used = mx.map(function(m){ return m.e; });
  var sp = pick(COUNT_SIMPLE.filter(function(s){ return used.indexOf(s.e)<0; }), lv===2?3:2);
  var out = sp.map(function(s){ return cSimple(s,lv); }).concat(mx.map(function(m){ return cMixed(m,lv); }));
  if(lv===3) out = out.concat(pick(COUNT_CAT,2).map(function(c){ return cCat(c,3); }));
  return out;
}

/* --- trí nhớ: ai biến mất --- */
function makeMemory(lv){
  var cfg = lv===1 ? {n:3,t:6,k:3,mix:false} : lv===2 ? {n:5,t:5,k:3,mix:false} : {n:6,t:5,k:4,mix:true};
  var set = pick(MEM_POOL, cfg.n), mi = rand(0,cfg.n-1), missing = set[mi];
  var others = pick(MEM_POOL.filter(function(e){ return set.indexOf(e)<0; }), cfg.k-1);
  var q = {
    label:"🧠 Ai biến mất?", text:"Bé nhìn thật kĩ và nhớ các hình nhé!", speak:"Bé nhìn thật kĩ và nhớ các hình nhé!",
    hint:"Còn "+cfg.t+" giây…", stage:"", layout:cfg.k>3?"grid4":"row3",
    options:shuffle([{emo:missing, correct:true}].concat(others.map(function(e){ return {emo:e}; }))),
    answer:missing, why:"Bạn "+missing+" đã trốn mất!"+(cfg.mix?" Các hình còn lại còn đổi chỗ nữa, khó ghê.":""),
    onCorrect:function(){ var g=$("#memGone"); if(g){ g.textContent=missing; g.classList.add("back"); } },
    custom:function(st, box){
      st.hidden=false;
      st.innerHTML='<div class="mem-grid">'+set.map(function(e){ return '<span class="mem">'+e+'</span>'; }).join("")+'</div>'+
        '<div class="timebar"><i style="animation-duration:'+cfg.t+'s"></i></div>'+
        '<button type="button" class="ready-btn" id="btnReady">Bé nhớ rồi! ➜</button>';
      var hidden=false, left=cfg.t;
      function hide(){
        if(hidden || state.qs[state.i]!==q) return; hidden=true;
        var cells;
        if(cfg.mix){ var rest=set.slice(); rest.splice(mi,1); cells=shuffle(rest).map(function(e){ return '<span class="mem">'+e+'</span>'; }); }
        else { cells=set.map(function(e,k){ return k===mi ? '<span class="mem gone" id="memGone">?</span>' : '<span class="mem">'+e+'</span>'; }); }
        st.innerHTML='<div class="mem-grid">'+cells.join("")+'</div>';
        setText("Hình nào vừa biến mất?", "Hình nào vừa biến mất?");
        setHint(cfg.mix ? "Các hình đã đổi chỗ cho nhau đấy!" : "");
        renderOptions(q, box);
        tone(520,0,0.12,"sine",0.1); tone(780,0.1,0.14,"sine",0.1);
      }
      function tick(){ if(hidden) return; left--; if(left>0){ setHint("Còn "+left+" giây…"); later(tick,1000); } else hide(); }
      $("#btnReady").addEventListener("click", function(){ unlockAudio(); hide(); });
      later(tick,1000);
    }
  };
  return q;
}

/* --- 🃏 lật hình --- */
function makeMatch(lv){
  var pairs = lv===1 ? 3 : lv===2 ? 4 : 8, cols = lv===1 ? 3 : 4, allow = lv===1 ? 4 : lv===2 ? 6 : 12;
  var set = pick(MEM_POOL, pairs), deck = shuffle(set.concat(set));
  var q = {
    label:"🃏 Lật hình", text:"Lật thẻ, tìm các cặp hình giống nhau!", speak:"Lật thẻ, tìm các cặp hình giống nhau!",
    hint:"Lật sai không quá "+allow+" lần thì được sao nhé.", stage:"", layout:"match", answer:"🎉", why:"", deck:deck,
    custom:function(st, box){
      st.hidden=true;
      var board=document.createElement("div"); board.className="mboard"; board.style.setProperty("--c", cols);
      var open=[], misses=0, got=0, busy=false;
      deck.forEach(function(e){
        var c=document.createElement("button"); c.type="button"; c.className="mcard"; c.innerHTML="<span>?</span>";
        c.addEventListener("click", function(){
          if(busy || state.locked || c.classList.contains("open")) return;
          unlockAudio();
          c.classList.add("open"); c.innerHTML="<span>"+e+"</span>";
          tone(620,0,0.06,"sine",0.08);
          open.push({c:c,e:e});
          if(open.length<2) return;
          var a=open[0], b=open[1]; open=[];
          if(a.e===b.e){
            a.c.classList.add("got"); b.c.classList.add("got"); got++;
            tone(880,0,0.1,"triangle",0.12); tone(1175,0.08,0.14,"triangle",0.12);
            if(got===pairs){
              q.why="Bé tìm đủ "+pairs+" cặp hình, lật sai "+misses+" lần."+(misses>allow?" Lần sau cố lật sai ít hơn nhé!":" Trí nhớ siêu ghê!");
              later(function(){ solve(q); }, 450);
            }
          } else {
            busy=true; misses++;
            if(misses>allow && state.first){ state.first=false; toast("Không sao, tìm tiếp nào!"); }
            setHint("Lật sai: "+misses+" / "+allow+" lần");
            tone(300,0,0.12,"sine",0.08);
            later(function(){ [a,b].forEach(function(x){ x.c.classList.remove("open"); x.c.innerHTML="<span>?</span>"; }); busy=false; }, 800);
          }
        });
        board.appendChild(c);
      });
      box.appendChild(board);
    }
  };
  return q;
}

/* --- toán hình --- */
/* cộng, trừ không nhớ (Toán 1): chữ số hàng đơn vị và hàng chục không vượt qua 10 */
function noCarry(plus, maxT){
  var t1=rand(1,maxT||8), u1=rand(1,8), t2, u2;
  if(plus){ t2=rand(0,9-t1); u2=rand(1,9-u1); }
  else { t2=rand(0,t1); u2=rand(0,u1); if(t2===t1 && u2===u1) u2=u1-1; if(!t2 && !u2) u2=1; }
  return {a:t1*10+u1, b:t2*10+u2};
}
function grp(e, n, crossed){
  crossed = crossed||0;
  var cols = n<=4 ? n : (n<=8 ? 4 : 5), s='<span class="grp" style="--cols:'+cols+'">';
  for(var i=0;i<n;i++) s+='<i'+(i>=n-crossed?' class="x"':'')+'><span>'+e+'</span></i>';
  return s+'</span>';
}
function mathQ(stage, text, speak, ans, lv, why, extra){
  return {
    label:"➕ Toán hình", text:text, speak:speak, stage:stage, layout:lv===3?"num4":"num",
    options:numOpts(ans, lv===3?4:3, 0, Math.max(lv===3?25:12, ans+3)),
    answer:String(ans), why:why,
    onCorrect:function(){ var s=$("#eqslot"); if(s){ s.textContent=ans; s.classList.add("filled"); } if(extra) extra(); }
  };
}
function mathPic(lv, op){
  var e=any(MATH_EMO), a, b, ans, stage, text, speak;
  if(op==="+"){
    if(lv===1){ a=rand(1,4); b=rand(1,5-a); } else { a=rand(2,7); b=rand(1,10-a); }
    ans=a+b;
    stage='<div class="eq-pics">'+grp(e,a)+'<b class="op">+</b>'+grp(e,b)+'</div>';
    text="Gộp lại có tất cả bao nhiêu?"; speak=a+" cộng "+b+" bằng mấy?";
  } else {
    if(lv===1){ a=rand(3,5); b=rand(1,a-1); } else { a=rand(5,10); b=rand(1,a-1); }
    ans=a-b;
    stage='<div class="eq-pics">'+grp(e,a,b)+'</div>';
    text="Bớt đi "+b+", còn lại bao nhiêu?"; speak="Có "+a+", bớt đi "+b+". Còn lại mấy?";
  }
  var sym = op==="+" ? "+" : "−";
  stage+='<div class="eq-line">'+a+' '+sym+' '+b+' = <span class="eqslot" id="eqslot">?</span></div>';
  return mathQ(stage, text, speak, ans, lv, a+" "+sym+" "+b+" = "+ans+".");
}
function mathNum(lv){
  var plus=Math.random()<0.5, a, b, ans;
  var pr=noCarry(plus); a=pr.a; b=pr.b; ans=plus ? a+b : a-b;
  var sym = plus ? "+" : "−";
  var stage='<div class="eq-line big">'+a+' '+sym+' '+b+' = <span class="eqslot" id="eqslot">?</span></div>';
  return mathQ(stage, "Bé tính nhẩm nhé!", a+(plus?" cộng ":" trừ ")+b+" bằng mấy?", ans, lv, a+" "+sym+" "+b+" = "+ans+".");
}
function mathMissing(lv){
  var c=rand(5,10), a=rand(1,c-1), ans=c-a, first=Math.random()<0.5;
  var slot='<span class="eqslot" id="eqslot">?</span>';
  var stage='<div class="eq-line big">'+(first ? a+' + '+slot : slot+' + '+a)+' = '+c+'</div>';
  return mathQ(stage, "Số nào còn thiếu?", first ? a+" cộng mấy bằng "+c+"?" : "Mấy cộng "+a+" bằng "+c+"?", ans, lv,
    (first ? a+" + "+ans : ans+" + "+a)+" = "+c+".");
}
function mathWord(lv){
  var t=any(WORDS_MATH), a, b, ans;
  var pr=noCarry(t.op==="+", 3);
  if(t.op==="+"){ if(lv===3){ a=pr.a; b=pr.b; } else { a=rand(2,6); b=rand(1,10-a); } ans=a+b; }
  else { if(lv===3){ a=pr.a; b=pr.b; } else { a=rand(5,10); b=rand(1,a-1); } ans=a-b; }
  var txt=t.t(a,b), eq=a+" "+(t.op==="+"?"+":"−")+" "+b+" = "+ans;
  return mathQ('<div class="story">'+t.e+'</div>', txt, txt, ans, lv, eq+".", function(){
    var st=$("#stage"); if(st){ var d=document.createElement("div"); d.className="eq-line"; d.textContent=eq; st.appendChild(d); }
  });
}
function makeMathSet(lv){
  if(lv===1) return shuffle([mathPic(1,"+"),mathPic(1,"+"),mathPic(1,"+"),mathPic(1,"+"),mathPic(1,"-"),mathPic(1,"-")]);
  if(lv===2) return shuffle([mathPic(2,"+"),mathPic(2,"+"),mathPic(2,"+"),mathPic(2,"-"),mathPic(2,"-"),mathWord(2)]);
  return shuffle([mathNum(3),mathNum(3),mathMissing(3),mathMissing(3),mathWord(3),mathWord(3)]);
}

/* --- ⚖️ so sánh --- */
var REL_LABEL = {">":"lớn hơn","<":"bé hơn","=":"bằng"};
function relOf(a,b){ return a>b ? ">" : a<b ? "<" : "="; }
function cmpQ(stage, text, L, R, why){
  var rel=relOf(L,R);
  return {
    label:"⚖️ So sánh", text:text, speak:text, stage:stage, layout:"row3", L:L, R:R,
    options:[">","<","="].map(function(r){ return {glyph:r, label:REL_LABEL[r], correct:r===rel, key:r}; }),
    answer:rel, why: why || (L+" "+REL_LABEL[rel]+" "+R+", nên "+L+" "+rel+" "+R+"."),
    onCorrect:function(){ var s=$("#eqslot"); if(s){ s.textContent=rel; s.classList.add("filled"); } }
  };
}
function side(x){ return '<span class="side">'+x+'</span>'; }
var SLOT = '<span class="eqslot" id="eqslot">?</span>';
function makeCompare(lv, eq){
  if(lv===1){
    var e=any(MATH_EMO), a=rand(1,7), b=eq?a:rand(1,7);
    while(!eq && b===a) b=rand(1,7);
    return cmpQ('<div class="cmp">'+grp(e,a)+SLOT+grp(e,b)+'</div>', "Bên trái so với bên phải thì sao?", a, b,
      "Bên trái có "+a+", bên phải có "+b+". "+a+" "+REL_LABEL[relOf(a,b)]+" "+b+", nên "+a+" "+relOf(a,b)+" "+b+".");
  }
  if(lv===2){
    var x=rand(0,20), y=eq?x:rand(0,20);
    while(!eq && y===x) y=rand(0,20);
    return cmpQ('<div class="cmp">'+side(x)+SLOT+side(y)+'</div>', "Điền dấu nào vào ô trống?", x, y);
  }
  var kind = eq ? "expr" : any(["swap","swap","expr","expr","near"]);
  if(kind==="swap"){
    var d1=rand(1,9), d2=rand(1,9); while(d2===d1) d2=rand(1,9);
    var A=d1*10+d2, B=d2*10+d1;
    return cmpQ('<div class="cmp">'+side(A)+SLOT+side(B)+'</div>', "Điền dấu nào vào ô trống?", A, B,
      "So hàng chục trước: "+A+" có "+d1+" chục, "+B+" có "+d2+" chục. Nên "+A+" "+relOf(A,B)+" "+B+".");
  }
  if(kind==="near"){
    var P=rand(21,97), Q=P+any([-2,-1,1,2]);
    return cmpQ('<div class="cmp">'+side(P)+SLOT+side(Q)+'</div>', "Điền dấu nào vào ô trống?", P, Q);
  }
  var plus=Math.random()<0.5, m, n, val, sym;
  var pr=noCarry(plus, 4); m=pr.a; n=pr.b; val=plus ? m+n : m-n; sym=plus ? "+" : "−";
  var c = eq ? val : val+any([-2,-1,1,2]); if(c<0) c=val+1;
  var rel=relOf(val,c);
  return cmpQ('<div class="cmp">'+side(m+" "+sym+" "+n)+SLOT+side(c)+'</div>', "Tính trước, rồi điền dấu.", val, c,
    m+" "+sym+" "+n+" = "+val+". "+val+" "+REL_LABEL[rel]+" "+c+", nên "+m+" "+sym+" "+n+" "+rel+" "+c+".");
}
function makeCompareSet(lv){
  var eqAt=rand(0,5), out=[];
  for(var i=0;i<6;i++) out.push(makeCompare(lv, i===eqAt));
  return out;
}

/* --- 🕐 xem giờ --- */
function hh(h){ return ((h-1)%12+12)%12+1; }
function clockE(h, half){ return String.fromCodePoint((half?0x1F55C:0x1F550)+h-1); }
function clockSvg(h, m, size){
  var sz=size||150, marks="", nums="", i, a;
  m=m||0;
  for(i=0;i<60;i++){
    a=i*Math.PI/30;
    var big=i%5===0, r1=big?47:50, x1=60+Math.sin(a)*r1, y1=60-Math.cos(a)*r1, x2=60+Math.sin(a)*53, y2=60-Math.cos(a)*53;
    marks+='<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+(big?"#3B2F5C":"#BDB3D6")+'" stroke-width="'+(big?2:1)+'"/>';
  }
  for(i=1;i<=12;i++){
    a=i*Math.PI/6;
    nums+='<text x="'+(60+Math.sin(a)*38).toFixed(1)+'" y="'+(64-Math.cos(a)*38).toFixed(1)+'" text-anchor="middle" font-size="11" font-weight="800" fill="#3B2F5C">'+i+'</text>';
  }
  var ha=((h%12)*30+m*0.5)*Math.PI/180, ma=m*6*Math.PI/180;
  return '<svg class="clock-svg" viewBox="0 0 120 120" width="'+sz+'" height="'+sz+'" aria-hidden="true">'+
    '<circle cx="60" cy="60" r="57" fill="#fff" stroke="#A88BFF" stroke-width="5"/>'+marks+nums+
    '<line x1="60" y1="60" x2="'+(60+Math.sin(ha)*23).toFixed(1)+'" y2="'+(60-Math.cos(ha)*23).toFixed(1)+'" stroke="#E0577F" stroke-width="5" stroke-linecap="round"/>'+
    '<line x1="60" y1="60" x2="'+(60+Math.sin(ma)*36).toFixed(1)+'" y2="'+(60-Math.cos(ma)*36).toFixed(1)+'" stroke="#2F86D6" stroke-width="3.5" stroke-linecap="round"/>'+
    '<circle cx="60" cy="60" r="4" fill="#3B2F5C"/></svg>';
}
DV.clockSvg=clockSvg;
function clockName(h, half){ return h+" giờ"+(half?" rưỡi":""); }
function clockRead(lv, half, h){
  var ans=clockName(h,half), need = lv===3 ? 3 : 2, ds=[];
  var pref = half ? [clockName(hh(h+1),true), clockName(h,false), clockName(hh(h+1),false)]
                  : (lv===1 ? [] : [clockName(h===12?6:12,false), clockName(hh(h+1),false), clockName(hh(h-1),false)]);
  pref.forEach(function(x){ if(ds.length<need && x!==ans && ds.indexOf(x)<0) ds.push(x); });
  while(ds.length<need){ var x=clockName(rand(1,12), false); if(x!==ans && ds.indexOf(x)<0) ds.push(x); }
  return {
    label:"🕐 Xem giờ", text:"Đồng hồ chỉ mấy giờ?", speak:"Đồng hồ chỉ mấy giờ?",
    stage:'<div class="big-clock">'+clockSvg(h,half?30:0)+'</div>', layout: need>2 ? "words2" : "wcol",
    options: shuffle([{txt:ans, correct:true}].concat(ds.map(function(x){ return {txt:x}; }))),
    answer:clockE(h,half), answerName:ans, H:h, half:half,
    why: half ? "Kim dài chỉ số 6, kim ngắn nằm giữa số "+h+" và số "+hh(h+1)+", nên là "+ans+"."
              : "Kim dài chỉ số 12, kim ngắn chỉ số "+h+", nên là "+ans+"."
  };
}
function clockShift(){
  var h=rand(1,12), n=rand(2,4), fwd=Math.random()<0.6, tgt=hh(fwd?h+n:h-n), cs=[];
  [tgt, hh(fwd?h-n:h+n), hh(tgt+1), hh(tgt-1), h].forEach(function(x){ if(cs.length<4 && cs.indexOf(x)<0) cs.push(x); });
  var t = "Bây giờ là "+h+" giờ.\n"+(fwd ? "Thêm "+n+" tiếng nữa là mấy giờ?" : "Cách đây "+n+" tiếng là mấy giờ?");
  return {
    label:"🕐 Xem giờ", text:t, speak:t, stage:'<div class="big-clock">'+clockSvg(h,0)+'</div>', layout:"grid4",
    options: shuffle(cs.map(function(x){ return {emo:clockSvg(x,0,96), aria:x+" giờ", correct:x===tgt}; })),
    answer:clockE(tgt,false), answerName:tgt+" giờ", H:tgt,
    why:"Từ "+h+" giờ "+(fwd?"đếm thêm ":"lùi lại ")+n+" tiếng là "+tgt+" giờ."
  };
}
var DUR = [
  {t:"Bé đi học lúc 7 giờ sáng, tan học lúc 11 giờ trưa. Bé ở trường mấy tiếng?", a:7, b:11},
  {t:"Bé ngủ trưa lúc 12 giờ, thức dậy lúc 2 giờ chiều. Bé ngủ mấy tiếng?", a:12, b:2},
  {t:"Cả nhà đi công viên lúc 8 giờ sáng, về nhà lúc 11 giờ trưa. Cả nhà đi chơi mấy tiếng?", a:8, b:11},
  {t:"Mẹ luộc bánh chưng từ 5 giờ chiều đến 10 giờ tối. Mẹ luộc bánh mấy tiếng?", a:5, b:10},
  {t:"Bé tập bơi từ 3 giờ chiều đến 5 giờ chiều. Bé tập bơi mấy tiếng?", a:3, b:5},
  {t:"Bố đi làm từ 1 giờ chiều đến 5 giờ chiều. Bố đi làm mấy tiếng?", a:1, b:5}
];
function clockDur(){
  var it=any(DUR), a=it.a, b=it.b, d=hh(b-a);
  return {
    label:"🕐 Xem giờ", text:it.t, speak:it.t,
    stage:'<div class="clocks">'+clockSvg(a,0,104)+'<b>➜</b>'+clockSvg(b,0,104)+'</div>', layout:"num4",
    options:numOpts(d,4,1,11), answer:d+" tiếng", longAnswer:true, D:d,
    why:"Từ "+a+" giờ đến "+b+" giờ là "+d+" tiếng."
  };
}
function makeClockSet(lv){
  var hs=pick(range(1,12),6);
  if(lv===1) return hs.map(function(h){ return clockRead(1,false,h); });
  if(lv===2) return hs.map(function(h){ return clockRead(2,false,h); });
  return shuffle([clockRead(3,false,hs[0]), clockRead(3,false,hs[1]), clockShift(), clockShift(), clockDur(), clockDur()]);
}

/* --- chữ cái đầu --- */
function makeLetter(key, lv){
  var cands = LETTERS.filter(function(x){ return x.k===key && !x.alt; });
  if(!cands.length) return null;
  var target = any(cands), k = lv===1 ? 3 : 4, close = CLOSE[key]||[];
  var pool = LETTERS.filter(function(x){
    if(x.k===key || x.k.indexOf(key)===0) return false;
    if((x.alt||[]).some(function(a){ return a.indexOf(key)===0; })) return false;
    if(lv<3 && DIGRAPHS.indexOf(x.k)>=0) return false;
    if(lv<3 && close.indexOf(x.k)>=0) return false;
    return true;
  });
  var chosen=[], usedK={};
  if(lv===3){
    close.forEach(function(ck){
      var c = shuffle(pool.filter(function(x){ return x.k===ck; }));
      if(c.length && chosen.length<k-1){ chosen.push(c[0]); usedK[ck]=1; }
    });
  }
  shuffle(pool).forEach(function(x){ if(chosen.length<k-1 && !usedK[x.k]){ chosen.push(x); usedK[x.k]=1; } });
  var near = chosen.filter(function(x){ return close.indexOf(x.k)>=0; })[0];
  var why = "“"+target.w+"” bắt đầu bằng chữ “"+key+"”."+(near ? " Còn “"+near.w+"” bắt đầu bằng “"+near.k+"”." : "");
  return {
    label:"🔤 Chữ cái đầu", text:"Hình nào có tên bắt đầu bằng chữ “"+key+"”?", speak:"Hình nào có tên bắt đầu bằng chữ "+SAY[key]+"?",
    stage:'<div class="letter"><b>'+key+'</b><span>'+key.toLowerCase()+'</span></div>', layout:k>3?"grid4":"row3",
    options:shuffle([{emo:target.e, name:target.w, correct:true}].concat(chosen.map(function(x){ return {emo:x.e, name:x.w}; }))),
    answer:target.e, answerName:target.w, why:why
  };
}
function makeLetterSet(lv, n){
  var keys = shuffle(lv===1 ? L_EASY : lv===2 ? L_EASY.concat(L_VOWEL) : L_HARD), out=[];
  keys.forEach(function(key){ if(out.length<n){ var q=makeLetter(key, lv); if(q) out.push(q); } });
  return out;
}

/* --- xếp thứ tự --- */
function makeOrder(set, rev){
  var items = rev ? set.items.slice().reverse() : set.items.slice();
  var ask = rev ? set.rev : set.ask, numeric = isNum(items[0]), wordy = !numeric && /[a-zà-ỹ0-9]/i.test(items[0]);
  var q = {
    label:"📏 Xếp thứ tự", text:"Chạm lần lượt "+ask+".", speak:("Chạm lần lượt "+ask+".").toLowerCase(),
    hint:"Chạm vào hình đầu tiên trước nhé!",
    stage:'<div class="slots'+(wordy?" wordy":"")+'">'+items.map(function(_,k){ return '<span class="oslot" data-k="'+k+'">'+(k+1)+'</span>'; }).join("")+'</div>',
    layout:"order", answer:items.join(" "), longAnswer:true, why:set.why, items:items,
    custom:function(st, box){
      var next=0;
      shuffle(items.map(function(e,k){ return {e:e,k:k}; })).forEach(function(it){
        var b=document.createElement("button"); b.type="button"; b.className="opt";
        b.innerHTML = numeric ? '<span class="o-num">'+it.e+'</span>' : wordy ? '<span class="o-word">'+it.e+'</span>' : '<span class="o-emo">'+it.e+'</span>';
        b.setAttribute("aria-label", it.e);
        b.addEventListener("click", function(){
          if(state.locked || b.disabled) return;
          unlockAudio();
          if(it.k===next){
            b.disabled=true; b.classList.add("placed"); b.setAttribute("data-n", next+1);
            var slot=st.querySelector('.oslot[data-k="'+next+'"]');
            if(slot){ slot.textContent=it.e; slot.classList.add("filled"); if(numeric) slot.classList.add("numfill"); }
            tone(560+next*110,0,0.12,"triangle",0.12);
            next++;
            setHint(next<items.length ? "Đúng rồi, tiếp tục nào!" : "");
            if(next===items.length) solve(q);
          } else miss(b, true);
        });
        box.appendChild(b);
      });
    }
  };
  return q;
}
function makeNumOrder(lv){
  var n = lv===1 ? 3 : lv===2 ? 4 : 5, max = lv===3 ? 20 : 10;
  var nums = pick(range(1,max), n).sort(function(a,b){ return a-b; });
  var desc = lv===3 && Math.random()<0.5, items = (desc ? nums.slice().reverse() : nums).map(String);
  return makeOrder({items:items, ask: desc ? "các số từ LỚN đến BÉ" : "các số từ BÉ đến LỚN", why:"Xếp đúng rồi: "+items.join(", ")+"."}, false);
}
function makeOrderSet(lv, n){
  var sets;
  if(lv<3) sets = pickLv(ORDERS, lv, n-2).map(function(s){ return makeOrder(s,false); });
  else sets = pick(ORDERS.filter(function(s){ return s.lv>=2; }), n-2).map(function(s){ return makeOrder(s, !!s.rev && Math.random()<0.6); });
  return shuffle(sets.concat([makeNumOrder(lv), makeNumOrder(lv)]));
}

var SPELL_TYPES = ["build","write","read","rhyme","tone","letter"];
var ALL_TYPES = SPELL_TYPES.concat(["riddle","shadow","odd","pattern","memory","match","order","count","math","compare","clock"]);
function buildRound(game, lv){
  var i, m, out;
  if(DV.reg && DV.reg[game]) return DV.reg[game](lv);
  switch(game){
    case "build": return makeBuildSet(lv);
    case "write": return makeWriteSet(lv);
    case "read": return makeReadSet(lv);
    case "rhyme": return makeRhymeSet(lv);
    case "tone": return makeToneSet(lv);
    case "letter": return makeLetterSet(lv, 6);
    case "riddle": return pickLv(RIDDLES, lv, 8).map(function(r){ return makeRiddle(r, lv); });
    case "shadow": return pick(SHADOWS, 6).map(function(s){ return makeShadow(s, lv); });
    case "odd": return pickLv(ODDS, lv, 6).map(makeOdd);
    case "pattern": return pickLv(PATTERNS, lv, 6).map(function(p){ return makePattern(p, lv); });
    case "memory": m=[]; for(i=0;i<6;i++) m.push(makeMemory(lv)); return m;
    case "match": return [makeMatch(lv), makeMatch(lv), makeMatch(lv)];
    case "order": return makeOrderSet(lv, 6);
    case "count": return makeCountSet(lv);
    case "math": return makeMathSet(lv);
    case "compare": return makeCompareSet(lv);
    case "clock": return makeClockSet(lv);
    case "spellmix":
      out=[]; SPELL_TYPES.forEach(function(t){ out=out.concat(shuffle(buildRound(t, lv)).slice(0,2)); });
      return shuffle(out);
  }
  out=[]; pick(DV.mixTypes ? DV.mixTypes() : ALL_TYPES, 12).forEach(function(t){ out.push(shuffle(buildRound(t, lv))[0]); });
  return out;
}

/* ================= âm thanh ================= */
var actx=null, soundOn=store.get("dovui_sound", true);
function unlockAudio(){
  try{
    if(!actx){ var AC=window.AudioContext||window.webkitAudioContext; if(AC) actx=new AC(); }
    if(actx && actx.state==="suspended") actx.resume();
  }catch(e){}
}
function tone(freq, start, dur, type, vol){
  if(!actx || !soundOn) return;
  try{
    var t=actx.currentTime+start, o=actx.createOscillator(), g=actx.createGain();
    o.type=type||"triangle"; o.frequency.setValueAtTime(freq,t);
    g.gain.setValueAtTime(0.0001,t);
    g.gain.exponentialRampToValueAtTime(vol||0.18,t+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t+dur+0.05);
  }catch(e){}
}
function playGood(){ [523.25,659.25,783.99,1046.5].forEach(function(f,k){ tone(f,k*0.09,0.3); }); }
function playBad(){ tone(330,0,0.18,"sine",0.15); tone(247,0.17,0.3,"sine",0.15); }
function fanfare(){ [523.25,659.25,783.99,1046.5,783.99,1046.5,1318.5].forEach(function(f,k){ tone(f,k*0.13,0.32); }); }
function renderSoundBtn(){
  $("#btnSound").textContent = soundOn ? "🎵" : "🔇";
  var sw=$("#btnSoundHome"); sw.setAttribute("aria-checked", soundOn?"true":"false"); sw.classList.toggle("on", soundOn);
  $("#soundTitle").textContent = "Âm thanh trò chơi: "+(soundOn?"Bật":"Tắt");
}

/* ================= đọc to ================= */
var hasSpeech = ("speechSynthesis" in window) && ("SpeechSynthesisUtterance" in window);
/* mặc định tắt: bố mẹ muốn bé tự đọc hướng dẫn. Tắt rồi thì không đọc gì và ẩn luôn nút nghe. */
var voiceOn = hasSpeech && store.get("dovui_voice", false)===true;
if(hasSpeech){ try{ speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged=function(){}; }catch(e){} }
function speak(text){
  if(!hasSpeech || !text) return;
  try{
    speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(text.replace(/\n/g,", "));
    u.lang="vi-VN"; u.rate=0.85; u.pitch=1.1;
    var v=speechSynthesis.getVoices().filter(function(x){ return /^vi/i.test(x.lang); })[0];
    if(v) u.voice=v;
    speechSynthesis.speak(u);
  }catch(e){}
}
function stopSpeak(){ if(hasSpeech){ try{ speechSynthesis.cancel(); }catch(e){} } }

/* ================= hiệu ứng ================= */
function confetti(n){
  var layer=$("#fx"), E=["⭐","🌟","🎉","💖","🎈","✨"];
  for(var k=0;k<(n||26);k++){
    var s=document.createElement("span"); s.className="conf"; s.textContent=E[k%E.length];
    s.style.left=(Math.random()*100)+"vw";
    s.style.fontSize=(18+Math.random()*22)+"px";
    s.style.animationDuration=(1.6+Math.random()*1.4)+"s";
    s.style.animationDelay=(Math.random()*0.3)+"s";
    s.style.setProperty("--dx",(Math.random()*80-40)+"px");
    s.style.setProperty("--rot",(Math.random()*720-360)+"deg");
    layer.appendChild(s);
    (function(el){ setTimeout(function(){ el.remove(); },3600); })(s);
  }
}
var toastTimer=null;
function toast(msg){
  var t=$("#toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(function(){ t.classList.remove("show"); },1400);
}

/* ================= luồng chơi ================= */
var curGrade = store.get("dovui_grade", 1); if([1,2,3].indexOf(curGrade)<0) curGrade=1;
/* lớp 1 giữ khoá cũ để không mất số sao đã có */
function starKey(g){ return g===1 ? "dovui_total" : "dovui_total_"+g; }
var totalStars = store.get(starKey(curGrade), 0);
var curLv = store.get("dovui_lv", 2); if([1,2,3].indexOf(curLv)<0) curLv=2;
var state = {game:null, lv:curLv, qs:[], i:0, stars:0, results:[], first:true, locked:false, timers:[], speak:""};

function later(fn, ms){ state.timers.push(setTimeout(fn, ms)); }
function clearTimers(){ state.timers.forEach(clearTimeout); state.timers=[]; }
function setText(t, sp){ $("#qText").textContent=t; state.speak = sp||t; if(voiceOn) speak(state.speak); }
function setHint(h){ var el=$("#qHint"); el.textContent=h||""; el.hidden=!h; }

function renderLevel(){
  $$(".seg button").forEach(function(b){ b.classList.toggle("on", +b.getAttribute("data-lv")===curLv); });
  $("#lvDesc").textContent = LV_DESC[curLv];
}
function showScreen(id){
  clearTimers();
  $$(".screen").forEach(function(s){ s.classList.toggle("active", s.id===id); });
  $("#sheet").classList.remove("show");
  stopSpeak();
  if(id==="home"){ $("#totalStars").textContent = totalStars; renderLevel(); if(DV.renderHome) DV.renderHome(); }
  window.scrollTo(0,0);
}
function startGame(game){
  clearTimers();
  state = {game:game, grade:curGrade, lv:curLv, qs:buildRound(game, curLv), i:0, stars:0, results:[], first:true, locked:false, timers:[], speak:""};
  $("#roundStars").textContent = "0";
  showScreen("play");
  renderQ();
}
function renderProgress(){
  var p=$("#progress"); p.innerHTML="";
  state.qs.forEach(function(q,k){
    var d=document.createElement("span"), r=state.results[k];
    d.className="dot"+(k===state.i?" cur":"")+(r===2?" star":r===1?" ok":"");
    p.appendChild(d);
  });
}
function renderOptions(q, box){
  box.className="options "+(q.layout||"");
  box.innerHTML="";
  q.options.forEach(function(o){
    var b=document.createElement("button"); b.type="button"; b.className="opt";
    var v = o.num!=null ? o.num : (o.txt || o.glyph || o.emo);
    if(o.num!=null || (o.emo && isNum(o.emo))) b.innerHTML='<span class="o-num">'+esc(v)+'</span>';
    else if(o.txt) b.innerHTML='<span class="o-word">'+esc(o.txt)+'</span>';
    else if(o.glyph) b.innerHTML='<span class="o-glyph">'+esc(o.glyph)+'</span><span class="o-label">'+esc(o.label)+'</span>';
    else b.innerHTML='<span class="o-emo">'+o.emo+'</span>'+(o.label?'<span class="o-label">'+esc(o.label)+'</span>':"");
    if(o.name) b.setAttribute("data-name", o.name);
    b.setAttribute("aria-label", o.aria||o.label||o.name||String(v));
    b.addEventListener("click", function(){ choose(b,o,q); });
    box.appendChild(b);
  });
}
function revealNames(){
  $$("#options .opt").forEach(function(b){
    var nm=b.getAttribute("data-name");
    if(nm && !b.querySelector(".o-label")){ var s=document.createElement("span"); s.className="o-label"; s.textContent=nm; b.appendChild(s); }
  });
}
function renderQ(){
  clearTimers();
  var q=state.qs[state.i];
  state.first=true; state.locked=false;
  $("#qType").textContent = q.label+" · "+LV_NAME[state.lv];
  setText(q.text, q.speak); setHint(q.hint);
  $("#btnSpeak").hidden=!(hasSpeech && voiceOn);
  var st=$("#stage"); st.innerHTML=q.stage||""; st.hidden=!q.stage;
  if(q.seqLen){
    var w=Math.min(window.innerWidth,540)-72;
    var fs=Math.max(22, Math.min(46, Math.floor(w/(q.seqLen*1.35))));
    var seq=$("#seq"); if(seq) seq.style.setProperty("--fs", fs+"px");
  }
  var box=$("#options"); box.className="options "+(q.layout||""); box.innerHTML="";
  if(q.custom) q.custom(st, box, q); else renderOptions(q, box);
  if(q.afterRender) q.afterRender(st);
  renderProgress();
  var card=$("#qcard"); card.classList.remove("enter"); void card.offsetWidth; card.classList.add("enter");
  window.scrollTo(0,0);
}
function choose(btn, o, q){
  if(state.locked || btn.disabled) return;
  unlockAudio();
  if(o.correct){
    btn.classList.add("right");
    $$("#options .opt").forEach(function(b){ if(b!==btn) b.classList.add("fade"); });
    solve(q);
  } else miss(btn, false);
}
function solve(q){
  if(state.locked) return;
  state.locked=true;
  var pts = state.lv===3 ? 2 : 1;
  state.results[state.i] = state.first ? 2 : 1;
  if(state.first){ state.stars+=pts; totalStars+=pts; store.set(starKey(curGrade), totalStars); }
  $("#roundStars").textContent = state.stars;
  if(q.onCorrect) q.onCorrect();
  revealNames();
  setHint("");
  renderProgress();
  playGood(); confetti(state.first?28:16);
  showSheet(q, pts);
}
function miss(btn, keep){
  state.first=false;
  if(btn){
    if(keep){ btn.classList.remove("shake"); void btn.offsetWidth; btn.classList.add("shake"); }
    else { btn.disabled=true; btn.classList.add("wrong"); }
  }
  playBad(); toast(any(OOPS));
}
function showSheet(q, pts){
  var se=$("#sheetEmo"); se.textContent=q.answer; se.className="sheet-emo"+(q.longAnswer?" long":"");
  var nm=$("#sheetName"); nm.textContent=q.answerName||""; nm.hidden=!q.answerName;
  $("#sheetTitle").textContent = state.first ? any(PRAISE)+" +"+pts+" ⭐" : "Đúng rồi! 👏";
  $("#sheetWhy").textContent = q.why;
  $("#btnNext").textContent = state.i>=state.qs.length-1 ? "Xem kết quả 🏆" : "Câu tiếp theo ➜";
  later(function(){ $("#sheet").classList.add("show"); }, 450);
}
function next(){
  $("#sheet").classList.remove("show");
  stopSpeak(); clearTimers();
  setTimeout(function(){
    if(!$("#play").classList.contains("active")) return;
    state.i++;
    if(state.i>=state.qs.length) showDone(); else renderQ();
  }, 260);
}
function showDone(){
  var n=state.qs.length, right=state.results.filter(function(v){ return v===2; }).length, r=right/n;
  $("#doneTrophy").textContent = r>=0.8 ? "🏆" : r>=0.5 ? "🥇" : "🎖️";
  $("#doneTitle").textContent = r>=0.8 ? "Giỏi quá!" : r>=0.5 ? "Làm tốt lắm!" : "Cố gắng lắm!";
  $("#doneStars").innerHTML = state.results.map(function(v,k){ return '<span class="'+(v===2?"":"off")+'" style="animation-delay:'+(k*0.06)+'s">⭐</span>'; }).join("");
  $("#doneMsg").textContent = "Mức "+LV_NAME[state.lv]+": đúng ngay "+right+"/"+n+" câu, được "+state.stars+" ⭐. "+
    (r>=0.8 ? "Thông minh ghê!" : r>=0.5 ? "Chơi thêm lượt nữa nào!" : "Lượt sau sẽ giỏi hơn nữa!");
  var up=$("#btnUp");
  up.hidden = !(r>=0.8 && state.lv<3);
  up.textContent = "⬆️ Thử mức "+(LV_NAME[state.lv+1]||"");
  if(DV.afterRound) DV.afterRound(state.game, state.lv, r);
  showScreen("done");
  confetti(44); fanfare();
}

/* ================= gắn sự kiện ================= */
$$(".game[data-game]").forEach(function(b){ b.addEventListener("click", function(){ unlockAudio(); startGame(b.getAttribute("data-game")); }); });
$$(".seg button").forEach(function(b){ b.addEventListener("click", function(){ curLv=+b.getAttribute("data-lv"); store.set("dovui_lv", curLv); renderLevel(); unlockAudio(); tone(660+curLv*110,0,0.1,"sine",0.1); }); });
$("#btnHome").addEventListener("click", function(){
  if(state.i>0 && state.i<state.qs.length){ $("#confirmBox").hidden=false; return; }
  showScreen("home");
});
$("#btnStay").addEventListener("click", function(){ $("#confirmBox").hidden=true; });
$("#btnLeave").addEventListener("click", function(){ $("#confirmBox").hidden=true; showScreen("home"); });
$("#btnSpeak").addEventListener("click", function(){ speak(state.speak); });
$("#btnNext").addEventListener("click", next);
$("#btnAgain").addEventListener("click", function(){ unlockAudio(); startGame(state.game); });
$("#btnUp").addEventListener("click", function(){ unlockAudio(); curLv=Math.min(3, state.lv+1); store.set("dovui_lv", curLv); startGame(state.game); });
$("#btnBack").addEventListener("click", function(){ showScreen("home"); });
function toggleSound(){ soundOn=!soundOn; store.set("dovui_sound", soundOn); renderSoundBtn(); unlockAudio(); if(soundOn) tone(880,0,0.08,"sine",0.1); }
$("#btnSound").addEventListener("click", toggleSound);
$("#btnSoundHome").addEventListener("click", toggleSound);
function renderVoice(){
  var sw=$("#btnVoice"), hasVi=hasSpeech && speechSynthesis.getVoices().some(function(v){ return /^vi/i.test(v.lang); });
  sw.setAttribute("aria-checked", voiceOn?"true":"false"); sw.classList.toggle("on", voiceOn); sw.disabled=!hasSpeech;
  $("#voiceTitle").textContent = "Nghe hướng dẫn: "+(voiceOn?"Bật":"Tắt");
  $("#voiceNote").textContent = !hasSpeech ? "Trình duyệt này không có giọng đọc."
    : !voiceOn ? "Bé tự đọc hướng dẫn. Nút nghe trong trò chơi được ẩn đi."
    : hasVi ? "Máy tự đọc lời dặn, không đọc đáp án."
    : "Máy chưa có giọng tiếng Việt nên có thể đọc sai. Hãy cài thêm giọng đọc trong phần cài đặt của máy.";
}
$("#btnVoice").addEventListener("click", function(){
  voiceOn=!voiceOn; store.set("dovui_voice", voiceOn); renderVoice(); unlockAudio();
  if(voiceOn) speak("Đã bật nghe hướng dẫn."); else stopSpeak();
});
if(hasSpeech){ try{ speechSynthesis.addEventListener("voiceschanged", renderVoice); }catch(e){} }
document.addEventListener("touchend", unlockAudio, {passive:true});

renderSoundBtn();
renderLevel();
$("#totalStars").textContent = totalStars;

function setGrade(g){ curGrade=g; store.set("dovui_grade", g); totalStars=store.get(starKey(g), 0); $("#totalStars").textContent=totalStars; }
/* các file js/co-che.js, js/toan.js, js/menu.js dùng chung qua DV */
DV.h={$:$,$$:$$,rand:rand,shuffle:shuffle,pick:pick,any:any,range:range,repeat:repeat,isNum:isNum,esc:esc,store:store,
  unlockAudio:unlockAudio,tone:tone,later:later,toast:toast,setHint:setHint,setText:setText,solve:solve,miss:miss,confetti:confetti,
  renderOptions:renderOptions,renderQ:renderQ,showScreen:showScreen,startGame:startGame,buildRound:buildRound,renderLevel:renderLevel,renderVoice:renderVoice,
  setGrade:setGrade,numOpts:numOpts,grp:grp,pickLv:pickLv,makeRiddle:makeRiddle,makeOdd:makeOdd,makeOrder:makeOrder,cmpQ:cmpQ,side:side,SLOT:SLOT,REL_LABEL:REL_LABEL,
  W1:W1,W2:W2,MEM_POOL:MEM_POOL,RIDDLES:RIDDLES,noCarry:noCarry,
  grade:function(){ return curGrade; },level:function(){ return curLv; },stars:function(){ return totalStars; },state:function(){ return state; }};
})();
