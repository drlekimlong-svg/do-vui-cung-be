/* Thực đơn trò chơi theo lớp, màn hình chính và bộ sưu tập hình dán */
(function(){
"use strict";
var H=DV.h, M=DV.m, CH=window.CAU_HOI, $=H.$, $$=H.$$, rand=H.rand, shuffle=H.shuffle, pick=H.pick, any=H.any, range=H.range, esc=H.esc, store=H.store;
var reg=DV.reg={};

H.RIDDLES.push.apply(H.RIDDLES, CH.do1);

function fromBank(bank, lv, n){ return H.pickLv(bank, lv, Math.min(n, bank.length)); }
function quiz(bank, label, n){ return function(lv){ return fromBank(bank,lv,n||8).map(function(it){ return M.quiz(it,lv,label); }); }; }
function cloze(bank, label, text, n){ return function(lv){ return fromBank(bank,lv,n||8).map(function(it){ return M.cloze(it,label,text); }); }; }
function mixedQuiz(bank, label, n){ return function(lv){ return fromBank(bank,lv,n||6).map(function(it){ return it.s ? M.cloze(it,label) : M.quiz(it,lv,label); }); }; }
function tf(bank, label){ return function(lv){ return fromBank(bank,lv,8).map(function(it){ return M.truefalse(it,label); }); }; }
function sorts(sets, label){ return function(lv){ return pick(sets,3).map(function(s){ return M.sort(s,lv,label); }); }; }
function pairsOf(sets, label){ return function(lv){ return pick(sets,3).map(function(s){ return M.pairs(s,lv===1?4:lv===2?5:6,label); }); }; }
function sentences(bank, label){ return function(lv){ return fromBank(bank,lv,6).map(function(it){ return M.sentence(it,label); }); }; }
function reads(bank, label){ return function(lv){ return M.passages(bank,lv,label,6); }; }
function riddles(bank){ return function(lv){ return fromBank(bank,lv,8).map(function(r){ return H.makeRiddle(r,lv); }); }; }
function oddWords(bank){ return function(lv){ return fromBank(bank,lv,6).map(function(o){
  return {label:"🔍 Tìm từ khác nhóm",text:"Từ nào không cùng nhóm với các từ còn lại?",speak:"Từ nào không cùng nhóm với các từ còn lại?",stage:"",layout:"words2",
    options:shuffle(o.items.map(function(e){ return {txt:e,correct:e===o.odd}; })),answer:"🔍",answerName:o.odd,why:o.why}; }); }; }
function orders(bank){ return function(lv){ return fromBank(bank,lv,5).map(function(s){ return H.makeOrder(s,false); }); }; }
function chinhTa(bank){ return function(lv){
  var n=lv===1?2:3;
  return pick(bank,8).map(function(x){
    var pool=[x[1]]; if(lv>1){ var o=any(bank.filter(function(y){ return y[2]===x[2] && y[0]!==x[0]; }));
      if(o && o[1]!==x[0]) pool.push(o[1]); }
    return {label:"✍️ Chính tả",text:"Từ nào viết đúng chính tả?",speak:"Từ nào viết đúng chính tả?",stage:'<div class="rule-pill">'+esc(x[2])+'</div>',layout:"wcol",
      options:shuffle([{txt:x[0],correct:true}].concat(pool.map(function(w){ return {txt:w}; }))).slice(0,n+1),answer:"✍️",answerName:x[0],why:"Viết đúng là “"+x[0]+"”."};
  });
}; }
/* c/k, g/gh, ng/ngh */
var LUAT={c:"c/k: “k” chỉ đứng trước e, ê, i; còn lại viết “c”.",k:"c/k: “k” chỉ đứng trước e, ê, i.",g:"g/gh: “gh” chỉ đứng trước e, ê, i; còn lại viết “g”.",gh:"g/gh: “gh” chỉ đứng trước e, ê, i.",ng:"ng/ngh: “ngh” chỉ đứng trước e, ê, i; còn lại viết “ng”.",ngh:"ng/ngh: “ngh” chỉ đứng trước e, ê, i."};
reg.luat=function(lv){ return pick(CH.luat1,8).map(function(x){
  return {label:"🔠 Luật chính tả",text:"Chọn âm đầu đúng cho từ này.",speak:"Chọn âm đầu đúng cho từ này.",layout:"row2",
    stage:'<div class="pic">'+x.e+'</div><div class="bare"><span class="eqslot" id="eqslot">?</span>'+esc(x.duoi)+'</div>',
    options:shuffle([{txt:x.a,correct:true},{txt:x.sai}]),answer:x.e,answerName:x.w,why:LUAT[x.a],
    onCorrect:function(){ var s=$("#eqslot"); if(s){ s.textContent=x.a; s.classList.add("filled"); } }};
}); };
reg.noihinh=function(lv){
  var pool=H.W1.filter(function(w){ return lv===1 ? w.w.length<=3 : lv===2 ? w.w.length<=4 : true; }), out=[];
  for(var i=0;i<3;i++) out.push(M.pairs({t:"Nối mỗi hình với từ đúng.",p:pick(pool,lv===1?4:lv===2?5:6).map(function(w){ return [w.e,w.w]; })},6,"🔗 Nối chữ với hình"));
  return out;
};
reg.haivan=function(lv){
  var by={}, out=[];
  H.W1.forEach(function(w){ var v=w.syl[0].van; (by[v]=by[v]||[]).push(w.w); });
  pick(Object.keys(by).filter(function(v){ return by[v].length>=2; }),5).forEach(function(v){
    var yes=pick(by[v],Math.min(3,by[v].length)), no=pick(H.W1.filter(function(w){ return w.syl[0].van!==v; }),lv===1?3:lv===2?4:5).map(function(w){ return w.w; });
    out.push(M.pickMany("Hái tất cả các từ có vần “"+v+"”.",yes.map(function(t){ return {t:t,ok:true}; }).concat(no.map(function(t){ return {t:t}; })),"🧺 Hái vần","Các từ có vần “"+v+"”: "+yes.join(", ")+"."));
  });
  return out;
};
var ABC=["a","ă","â","b","c","d","đ","e","ê","g","h","i","k","l","m","n","o","ô","ơ","p","q","r","s","t","u","ư","v","x","y"];
reg.abc=function(lv){
  var k=lv===1?3:lv===2?4:5, out=[];
  for(var i=0;i<5;i++){ var st=rand(0,ABC.length-k), it=ABC.slice(st,st+k); out.push(H.makeOrder({items:it,ask:"các chữ cái theo thứ tự trong bảng chữ cái",why:"Thứ tự đúng: "+it.join(", ")+"."},false)); }
  return out;
};
/* dãy số, nối phép tính */
function patternNum(steps, maxStart){ return function(lv){
  var out=[];
  for(var i=0;i<6;i++){
    var s=any(steps[lv-1]), st=rand(1,maxStart)*Math.abs(s), down=lv>1 && Math.random()<0.3, seq=[];
    if(down) st+=s*5;
    for(var k=0;k<4;k++) seq.push(down?st-k*s:st+k*s);
    var ans=down?st-4*s:st+4*s;
    out.push(M.mcq("🔁 Quy luật dãy số","Số nào tiếp theo trong dãy?",'<div class="numrow">'+seq.map(function(x){ return '<span class="nb">'+x+'</span>'; }).join("")+'<span class="nb hole">?</span></div>',ans,0,ans+Math.abs(s)*3,(down?"Mỗi số bớt đi ":"Mỗi số thêm ")+s+".",lv));
    var o=out[out.length-1];
    o.options=shuffle([{num:ans,correct:true},{num:ans+s},{num:Math.abs(ans-s)===ans?ans+2:Math.abs(ans-s)}].concat(lv===3?[{num:ans+s*2}]:[]));
  }
  return out;
}; }
function noiPhep(tables, plusMax){ return function(lv){
  var out=[], k=lv===1?4:lv===2?5:6;
  for(var r=0;r<3;r++){
    var ps=[], used={};
    while(ps.length<k){
      var tb=any(tables), x=rand(2,10), a=tb*x;
      if(used[a]) continue;
      used[a]=1; ps.push([Math.random()<0.5 ? tb+" × "+x : x+" × "+tb, String(a)]);
    }
    out.push(M.pairs({t:"Nối mỗi phép tính với kết quả đúng.",p:ps},k,"🔗 Nối phép tính"));
  }
  return out;
}; }
/* tiếng Anh */
reg.anhhinh=function(lv){
  var bank=fromBank(CH.anh1,lv,8), all=CH.anh1;
  return bank.map(function(it,i){
    var ws=pick(all.filter(function(x){ return x.w!==it.w; }),lv===3?3:2);
    if(i%2) return {label:"🔤 Tiếng Anh",text:"“"+it.w+"” là hình nào?",speak:"Từ tiếng Anh này là hình nào?",stage:"",layout:ws.length>2?"grid4":"row3",
      options:shuffle([{emo:it.e,correct:true}].concat(ws.map(function(x){ return {emo:x.e}; }))),answer:it.e,answerName:it.w+" ("+it.vi+")",why:"“"+it.w+"” nghĩa là "+it.vi+"."};
    return {label:"🔤 Tiếng Anh",text:"Hình này tiếng Anh là gì?",speak:"Hình này tiếng Anh là gì?",stage:'<div class="pic">'+it.e+'</div>',layout:"words2",
      options:shuffle([{txt:it.w,correct:true}].concat(ws.map(function(x){ return {txt:x.w}; }))),answer:it.e,answerName:it.w+" ("+it.vi+")",why:"“"+it.w+"” nghĩa là "+it.vi+"."};
  });
};
reg.anhnoi=function(lv){
  var out=[];
  for(var i=0;i<3;i++) out.push(M.pairs({t:"Nối từ tiếng Anh với nghĩa tiếng Việt.",p:pick(CH.anh1,6).map(function(x){ return [x.w,x.vi]; })},lv===1?4:lv===2?5:6,"🔗 Nối từ tiếng Anh"));
  return out;
};
/* trí nhớ và rô-bốt */
reg.simon=function(lv){ var base=lv===1?3:lv===2?4:5, np=lv===1?4:lv===3?6:4; return [0,1,2,3].map(function(i){ return M.simon(base+i,np); }); };
var GOALS=[{e:"🏠",n:"ngôi nhà"},{e:"⭐",n:"ngôi sao"},{e:"🎁",n:"hộp quà"},{e:"🔋",n:"cục pin"}];
reg.robot=function(lv){ return [0,1,2,3].map(function(){ return M.robot(lv,any(GOALS)); }); };

Object.keys(DV.g).forEach(function(k){ reg[k]=DV.g[k]; });
var P=[["#FFE0EC","#F2A3C0"],["#E0F0FF","#9CCBF2"],["#FFF0C2","#F2CF6B"],["#E6F7C8","#B5DC83"],["#E2DAFF","#B5A3F5"],["#FFDCD3","#F2A898"],["#D4F5E2","#8FDCB0"],["#CFF3F0","#86D3CC"],["#FCE1FF","#E2A6EE"],["#FFE9D1","#F2B98A"]];

/* [mã trò, biểu tượng, tên, mô tả] và phần đăng kí cách tạo câu hỏi riêng cho từng lớp */
function add(id, fn){ reg[id]=fn; return id; }
var SUBJ=[["tv","📖","Tiếng Việt"],["toan","🔢","Toán"],["tn","🌿","Khám phá"],["dd","💛","Đạo đức"],["do","🧩","Đố vui"],["anh","🔤","Tiếng Anh"]];
var CMN={memory:["🧠","Ai biến mất?","Nhớ hình, tìm hình mất"],match:["🃏","Lật hình","Tìm cặp giống nhau"],simon:["🎹","Nhớ chuỗi","Nhớ thứ tự hình sáng"],robot:["🤖","Rô-bốt tìm đường","Lên, xuống, trái, phải"],anhhinh:["🖼️","Hình và từ","Chọn đúng từ tiếng Anh"],anhnoi:["🔗","Nối từ tiếng Anh","Nối với nghĩa tiếng Việt"]};
function G(id, emo, t, s){ return {id:id,emo:emo,t:t,s:s}; }
function C(id){ var c=CMN[id]; return G(id,c[0],c[1],c[2]); }
var MENU={
  1:{tv:[G("build","🔡","Ghép chữ","Xếp chữ thành tên"),G("write","✍️","Viết đúng","Chữ nào đúng chính tả?"),G("read","🗣️","Đọc đánh vần","Đọc rồi chọn hình"),G("rhyme","🎵","Tìm vần","Hình nào có vần này?"),G("tone","🎯","Thêm dấu","Huyền, sắc, hỏi, ngã, nặng"),G("letter","🔤","Chữ cái đầu","Tên bắt đầu bằng chữ gì?"),
      G("luat","🔠","Luật chính tả","c/k, g/gh, ng/ngh"),G("abc","🅰️","Bảng chữ cái","Xếp đúng thứ tự"),G("noihinh","🔗","Nối chữ với hình","Đọc từ, nối với hình"),G("haivan","🧺","Hái vần","Hái các từ cùng vần"),
      G(add("dien1",cloze(CH.dien1,"✏️ Điền từ")),"✏️","Điền từ","Chọn từ cho chỗ trống"),G(add("xep1",sentences(CH.cau1,"📝 Xếp câu")),"📝","Xếp câu","Xếp từ thành câu"),G(add("doc1",reads(CH.doc1,"📚 Đọc hiểu")),"📚","Đọc hiểu","Đọc đoạn văn, trả lời"),G("spellmix","🌈","Trộn Tiếng Việt","Mỗi trò một ít")],
    toan:[G("count","🔢","Đếm cho đúng","Có bao nhiêu nào?"),G("math","➕","Toán hình","Cộng trừ bằng hình"),G("compare","⚖️","So sánh","Lớn hơn, bé hơn, bằng"),G("tens","🧮","Chục và đơn vị","Số có hai chữ số"),G("next100","💯","Bảng số","Liền trước, liền sau"),G("calc100","➗","Cộng trừ đến 100","Không nhớ, đặt tính"),
      G("shape1","📐","Hình học","Vuông, tròn, tam giác, khối"),G("measure1","📏","Đo độ dài","Xăng-ti-mét"),G("clock","🕐","Xem giờ","Giờ đúng trên đồng hồ"),G("week","📅","Thứ trong tuần","Hôm qua, ngày mai"),G("pos","🧭","Vị trí","Trái, phải, ở giữa"),G("speed1","🚀","Đua tính nhẩm","Tính nhanh về đích")],
    tn:[G(add("tnxh1",quiz(CH.tnxh1,"🌿 Tự nhiên và Xã hội")),"🌿","Tự nhiên và Xã hội","Gia đình, cơ thể, cây, con vật"),G(add("rho1",sorts(CH.rho1,"🧺 Phân loại")),"🧺","Phân loại","Bỏ vào đúng rổ"),G(add("ds1",tf(CH.dungsai1,"✅ Đúng hay sai")),"✅","An toàn: đúng hay sai","Giữ an toàn cho mình")],
    dd:[G(add("dd1",quiz(CH.daoduc1,"💛 Đạo đức")),"💛","Em chọn việc nào?","Ứng xử đúng, việc làm hay")],
    do:[G("riddle","🧩","Câu đố vui","Đọc đố, chọn hình"),G("shadow","🌑","Đoán bóng","Bóng của ai đây?"),G("odd","🔍","Tìm hình lạ","Hình nào khác nhóm?"),G("pattern","🔁","Hình tiếp theo","Tìm quy luật"),G("order","🪜","Xếp thứ tự","Nhỏ đến lớn, trước đến sau"),C("memory"),C("match"),C("simon"),C("robot")],
    anh:[C("anhhinh"),C("anhnoi")]},
  2:{tv:[G(add("ct2",chinhTa(CH.chinhta2)),"✍️","Chính tả","tr/ch, s/x, r/d/gi, l/n"),G(add("rho2",sorts(CH.rho2,"🧺 Phân loại từ")),"🧺","Phân loại từ","Sự vật, hoạt động, đặc điểm"),G(add("kc2",quiz(CH.kieucau2,"🗨️ Kiểu câu")),"🗨️","Kiểu câu","Giới thiệu, hoạt động, đặc điểm"),G(add("dc2",cloze(CH.daucau2,"❗ Dấu câu","Chọn dấu câu đúng để điền vào chỗ trống.")),"❗","Dấu câu","Chấm, phẩy, hỏi, than"),G(add("noi2",pairsOf(CH.noi2,"🔗 Nối từ")),"🔗","Nối từ","Trái nghĩa, gần nghĩa"),G(add("xep2",sentences(CH.cau2,"📝 Xếp câu")),"📝","Xếp câu","Xếp từ thành câu"),G(add("doc2",reads(CH.doc2,"📚 Đọc hiểu")),"📚","Đọc hiểu","Đọc đoạn văn, trả lời")],
    toan:[G("add2","➕","Cộng trừ có nhớ","Phạm vi 100"),G("num1000","🔟","Số đến 1000","Đọc, viết, so sánh"),G("mul2","✖️","Bảng nhân, chia","Bảng 2 và bảng 5"),G("speed2","🚀","Đua tính nhẩm","Tính nhanh về đích"),G(add("noiphep2",noiPhep([2,5])),"🔗","Nối phép tính","Nối với kết quả đúng"),G("clock2","🕐","Giờ, phút, ngày","Kim chỉ 3, chỉ 6"),G("money2","💵","Tiền Việt Nam","Trả đủ tiền"),G("unit2","📏","Đo lường","kg, lít, dm, m, km"),G("shape2","📐","Hình học","Tứ giác, khối, gấp khúc"),G("frac2","🍰","Một phần mấy","1/2, 1/3, 1/4, 1/5"),G("chart2","📊","Biểu đồ tranh","Đọc biểu đồ, khả năng"),G("word2","📝","Toán có lời văn","Nhiều hơn, ít hơn, nhân, chia"),G(add("pat2",patternNum([[2,5],[5,10],[10,100,50]],9)),"🔁","Quy luật dãy số","Số nào tiếp theo?")],
    tn:[G(add("tnxh2",quiz(CH.tnxh2,"🌿 Tự nhiên và Xã hội")),"🌿","Tự nhiên và Xã hội","Cơ thể, môi trường, bầu trời"),G(add("rho2b",sorts(CH.rho2b,"🧺 Phân loại")),"🧺","Phân loại","Bỏ vào đúng rổ"),G(add("ds2",tf(CH.dungsai2,"✅ Đúng hay sai")),"✅","Đúng hay sai","Khoa học quanh em"),G(add("vn2",quiz(CH.vn2,"🇻🇳 Việt Nam quê em")),"🇻🇳","Việt Nam quê em","Đất nước và con người")],
    dd:[G(add("dd2",quiz(CH.daoduc2,"💛 Đạo đức")),"💛","Em chọn việc nào?","Ứng xử đúng, việc làm hay")],
    do:[G(add("rid2",riddles(CH.do2)),"🧩","Câu đố dân gian","Đoán xem là gì"),G(add("odd2",oddWords(CH.khac2)),"🔍","Từ khác nhóm","Từ nào không cùng nhóm?"),G(add("ord2",orders(CH.xep2)),"🪜","Xếp thứ tự","Từ bé đến lớn"),C("memory"),C("match"),C("simon"),C("robot")],
    anh:[C("anhhinh"),C("anhnoi")]},
  3:{tv:[G(add("ct3",chinhTa(CH.chinhta3)),"✍️","Chính tả","ăn/ăng, iêt/iêc, uôt/uôc…"),G(add("rho3",sorts(CH.rho3,"🧺 Phân loại")),"🧺","Phân loại từ, câu","Hoạt động, trạng thái, đặc điểm"),G(add("ss3",quiz(CH.sosanh3,"🌟 So sánh")),"🌟","So sánh","Tìm hình ảnh so sánh"),G(add("kc3",quiz(CH.kieucau3,"🗨️ Kiểu câu")),"🗨️","Kiểu câu","Câu kể, hỏi, khiến, cảm"),G(add("ch3",quiz(CH.cauhoi3,"❓ Đặt câu hỏi")),"❓","Đặt câu hỏi","Khi nào, ở đâu, vì sao…"),G(add("dc3",mixedQuiz(CH.daucau3,"❗ Dấu câu")),"❗","Dấu câu","Hai chấm, ngoặc kép…"),G(add("tn3",cloze(CH.tucngu3,"🪷 Tục ngữ","Chọn từ đúng để hoàn thành câu.")),"🪷","Tục ngữ, ca dao","Hoàn thành câu"),G(add("noi3",pairsOf(CH.noi3,"🔗 Nối từ")),"🔗","Nối từ","Gần nghĩa, trái nghĩa"),G(add("xep3",sentences(CH.cau3,"📝 Xếp câu")),"📝","Xếp câu","Xếp từ thành câu"),G(add("doc3",reads(CH.doc3,"📚 Đọc hiểu")),"📚","Đọc hiểu","Đọc đoạn văn, trả lời")],
    toan:[G("mul3","✖️","Bảng nhân, chia","Bảng 3 đến 9"),G("speed3","🚀","Đua tính nhẩm","Tính nhanh về đích"),G(add("noiphep3",noiPhep([3,4,6,7,8,9])),"🔗","Nối phép tính","Nối với kết quả đúng"),G("calc3","🧮","Nhân, chia lớn","Có dư, nhiều chữ số"),G("num3","🔢","Số đến 100 000","Đọc, so sánh, làm tròn"),G("expr3","🧷","Biểu thức","Thứ tự thực hiện"),G("times3","🔁","Gấp, giảm số lần","Gấp lên, giảm đi"),G("find3","🔍","Tìm thành phần","Tìm số còn thiếu"),G("frac3","🍰","Một phần mấy","1/2 đến 1/9"),G("geom3","📐","Chu vi, diện tích","Chữ nhật, hình vuông"),G("unit3","📏","Đơn vị đo","mm, g, ml, độ C"),G("clock3","🕐","Đồng hồ, tháng, năm","Xem đến từng phút"),G("money3","💵","Tiền Việt Nam","Đến 100 000 đồng"),G("roman","🏛️","Số La Mã","Từ I đến XX"),G("word3","📝","Toán có lời văn","Bài toán hai bước"),G("data3","📊","Bảng số liệu","Đọc bảng, khả năng"),G(add("pat3",patternNum([[3,4],[6,7,9],[25,50,1000]],9)),"🧭","Quy luật dãy số","Số nào tiếp theo?")],
    tn:[G(add("tnxh3",quiz(CH.tnxh3,"🌿 Tự nhiên và Xã hội")),"🌿","Tự nhiên và Xã hội","Cơ thể, Trái Đất, sản xuất"),G(add("rho3b",sorts(CH.rho3b,"🧺 Phân loại")),"🧺","Phân loại","Bỏ vào đúng rổ"),G(add("ds3",tf(CH.dungsai3,"✅ Đúng hay sai")),"✅","Đúng hay sai","Khoa học quanh em"),G(add("vn3",quiz(CH.vn3,"🇻🇳 Việt Nam quê em")),"🇻🇳","Việt Nam quê em","Lịch sử, địa lí"),G(add("tin3",quiz(CH.tinhoc3,"💻 Tin học")),"💻","Tin học","Máy tính, an toàn trên mạng")],
    dd:[G(add("dd3",quiz(CH.daoduc3,"💛 Đạo đức")),"💛","Em chọn việc nào?","Ứng xử đúng, việc làm hay")],
    do:[G(add("rid3",riddles(CH.do3)),"🧩","Câu đố dân gian","Đoán xem là gì"),G(add("odd3",oddWords(CH.khac3)),"🔍","Từ khác nhóm","Từ nào không cùng nhóm?"),G(add("ord3",orders(CH.xep3)),"🪜","Xếp thứ tự","Theo trình tự đúng"),C("memory"),C("match"),C("simon"),C("robot")],
    anh:[G(add("anh3",quiz(CH.anh3,"🔤 Tiếng Anh")),"💬","Mẫu câu","Hỏi và đáp"),C("anhhinh"),C("anhnoi")]}
};
DV.MENU=MENU;
DV.mixTypes=function(){
  var m=MENU[H.grade()], out=[];
  Object.keys(m).forEach(function(s){ m[s].forEach(function(g){ if(!/^speed|spellmix|^match$|^simon$|^robot$/.test(g.id)) out.push(g.id); }); });
  return out;
};
var LV_DESC={
  1:{1:"Câu dễ, 3 lựa chọn, số đến 10, tiếng ngắn.",2:"Có hình dễ nhầm, số đến 50, có bẫy c/k, g/gh, tr/ch, s/x.",3:"4 lựa chọn, số đến 100, dấu hỏi/ngã, từ hai tiếng. Mỗi câu 2 ⭐!"},
  2:{1:"Tính trong phạm vi 20, bảng nhân 2, câu đọc ngắn.",2:"Cộng trừ có nhớ đến 100, bảng nhân 5, đoạn văn dài hơn.",3:"Có nhớ hai chữ số, bảng 2 và 5 trộn nhau, câu khó. Mỗi câu 2 ⭐!"},
  3:{1:"Bảng nhân 3, 4; số có bốn chữ số; câu kể, câu hỏi.",2:"Bảng nhân 6, 7; số lớn; so sánh, dấu câu.",3:"Bảng nhân 8, 9; bài toán hai bước; chu vi, diện tích. Mỗi câu 2 ⭐!"}
};
var TIP={1:"Đúng ngay lần đầu: 1 ⭐ (mức Khó: 2 ⭐). Bé tự đọc câu hỏi rồi chạm vào đáp án.",2:"Đúng ngay lần đầu: 1 ⭐ (mức Khó: 2 ⭐). Em tự đọc kĩ đề rồi mới chọn đáp án.",3:"Đúng ngay lần đầu: 1 ⭐ (mức Khó: 2 ⭐). Em tự đọc kĩ đề rồi mới chọn đáp án."};

/* ---- hình dán: cứ 10 ⭐ được một hình ---- */
var STK="🐣 🐶 🐱 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🐔 🐧 🐦 🦉 🦋 🐝 🐞 🐢 🐙 🦀 🐠 🐬 🐳 🦒 🐘 🦓 🦄 🌻 🌈 ⭐ 🌙 ⛄ 🍉 🍓 🍰 🍦 🎈 🎁 🎨 🎸 🥁 ⚽ 🪁 🚲 🚀 🛸 🏰 🏕️ 🏝️ 🦖 🐉 👑 💎 🏆 🥇 🌟".split(" ");
function stickerCount(st){ return Math.min(STK.length, Math.floor(st/10)); }
function renderStickers(){
  var st=H.stars(), n=stickerCount(st);
  $("#stickerStat").textContent="Lớp "+H.grade()+": có "+st+" ⭐ và "+n+"/"+STK.length+" hình dán";
  $("#stickerBar").style.width=(n>=STK.length?100:(st%10)*10)+"%";
  $("#stickerNext").textContent=n>=STK.length?"Đã đủ cả bộ. Giỏi quá!":"Còn "+(10-st%10)+" ⭐ nữa để có hình mới";
  $("#stickerGrid").innerHTML=STK.map(function(e,i){ return '<span class="stk'+(i<n?"":" lock")+'">'+(i<n?e:"🔒")+'</span>'; }).join("");
}
function bestKey(g,lv){ return H.grade()+":"+g+":"+lv; }
DV.afterRound=function(game, lv, r){
  var all=store.get("dovui_best",{}), k=bestKey(game,lv);
  if(!(all[k]>=r)){ all[k]=r; store.set("dovui_best",all); }
  var key="dovui_stk_"+H.grade(), seen=store.get(key,0), n=stickerCount(H.stars()), el=$("#doneSticker");
  if(n>seen){ store.set(key,n); el.hidden=false; el.innerHTML='Hình dán mới: <b>'+STK[n-1]+'</b>'; } else el.hidden=true;
};
function medal(id){
  var r=store.get("dovui_best",{})[bestKey(id,H.level())];
  if(r==null) return "";
  return '<span class="g-medal" aria-label="Kết quả tốt nhất">'+(r>=0.8?"⭐⭐⭐":r>=0.5?"⭐⭐":"⭐")+'</span>';
}
DV.renderHome=function(){
  var g=H.grade(), subj=store.get("dovui_subject_"+g,"tv"), m=MENU[g];
  if(!m[subj]) subj="tv";
  document.body.setAttribute("data-grade",g);
  $$("#gradeTabs button").forEach(function(b){ var on=+b.getAttribute("data-grade")===g; b.classList.toggle("on",on); b.setAttribute("aria-pressed",on?"true":"false"); });
  $("#lvDesc").textContent=LV_DESC[g][H.level()];
  $("#homeTip").textContent=TIP[g];
  $("#heroSub").textContent="Học mà chơi cùng các bạn lớp "+g;
  var chips=$("#subjectChips"); chips.innerHTML="";
  SUBJ.forEach(function(s){
    if(!m[s[0]]) return;
    var b=M.btn("chip"+(s[0]===subj?" on":""),s[1]+" "+s[2]);
    b.setAttribute("role","tab"); b.setAttribute("aria-selected",s[0]===subj?"true":"false");
    b.addEventListener("click", function(){ store.set("dovui_subject_"+g,s[0]); DV.renderHome(); });
    chips.appendChild(b);
  });
  var list=$("#gameList"); list.innerHTML="";
  m[subj].forEach(function(x,i){
    var p=P[i%P.length], b=M.btn("game",'<span class="g-emo">'+x.emo+'</span><span class="g-title">'+esc(x.t)+'</span><span class="g-sub">'+esc(x.s)+'</span>'+medal(x.id));
    b.style.setProperty("--c",p[0]); b.style.setProperty("--cd",p[1]);
    b.addEventListener("click", function(){ H.unlockAudio(); H.startGame(x.id); });
    list.appendChild(b);
  });
};
$$("#gradeTabs button").forEach(function(b){ b.addEventListener("click", function(){ H.unlockAudio(); H.setGrade(+b.getAttribute("data-grade")); H.tone(620,0,0.1,"sine",0.1); DV.renderHome(); }); });
$$(".seg button").forEach(function(b){ b.addEventListener("click", function(){ DV.renderHome(); }); });
function openStickers(){ renderStickers(); H.showScreen("stickers"); }
$("#btnStickers").addEventListener("click",openStickers);
$("#btnStickers2").addEventListener("click",openStickers);
$("#btnStickerHome").addEventListener("click",function(){ H.showScreen("home"); });
H.renderVoice();
H.renderLevel();
DV.renderHome();
})();
