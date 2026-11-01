/* Các trò Toán lớp 3: bảng nhân chia 3 đến 9, nhân chia nhiều chữ số, số đến 100 000, biểu thức, gấp giảm số lần,
   tìm thành phần, chu vi diện tích, đơn vị đo, xem đồng hồ đến phút, số La Mã, bảng số liệu */
(function(){
"use strict";
var H=DV.h, M=DV.m, rand=H.rand, shuffle=H.shuffle, pick=H.pick, any=H.any, range=H.range;
var nf=M.nf, kp=M.keypad, inl=M.inline, col=M.column;

DV.g.mul3=function(lv){ return M.mulSet(lv===1?[3,4]:lv===2?[6,7]:[6,7,8,9],lv,"✖️ Bảng nhân, chia"); };
DV.g.speed3=function(lv){
  var tables=lv===1?[3,4]:lv===2?[6,7]:[8,9,7];
  return [M.speed(function(){ var tb=any(tables), x=rand(2,10); return Math.random()<0.6 ? {t:tb+" × "+x,a:tb*x} : {t:(tb*x)+" : "+tb,a:x}; },60,lv===3?10:12)];
};
var LC="🧮 Nhân, chia lớn";
DV.g.calc3=function(lv){
  var out=[];
  for(var i=0;i<6;i++){
    var d=rand(2,9), k=i%3, q, a;
    if(k===0){ a=lv===1?rand(11,49):lv===2?rand(102,329):rand(1021,2349); if(lv===1 && d>4) d=rand(2,4); out.push(kp({label:LC,text:"Đặt tính rồi tính.",speak:"Tính rồi gõ kết quả.",stage:col(a,"×",d),ans:a*d,why:nf(a)+" × "+d+" = "+nf(a*d)+"."})); }
    else if(k===1){ q=lv===1?rand(11,24):lv===2?rand(112,246):rand(1012,3124); if(lv===1 && d>4) d=rand(2,4); a=q*d; out.push(kp({label:LC,text:"Đặt tính rồi tính.",speak:"Tính rồi gõ kết quả.",stage:inl(nf(a)+" : "+d),ans:q,why:nf(a)+" : "+d+" = "+nf(q)+"."})); }
    else { q=lv===1?rand(4,9):lv===2?rand(11,40):rand(101,240); var r=rand(1,d-1); if(d===2) r=1; a=q*d+r; out.push(kp({label:LC,text:"Phép chia có dư: số dư là mấy?",speak:"Số dư là mấy?",stage:'<div class="eq-line big">'+nf(a)+' : '+d+' = '+nf(q)+' dư <span class="eqslot" id="kpVal">?</span></div>',ans:r,why:nf(a)+" : "+d+" = "+nf(q)+" (dư "+r+"). Số dư luôn bé hơn số chia."})); }
  }
  return out;
};
var LN="🔢 Số đến 100 000";
DV.g.num3=function(lv){
  var out=[], max=lv===1?9999:lv===2?10000:99999;
  for(var i=0;i<6;i++){
    var n=rand(1001,Math.max(max,1002)), k=i%3;
    if(k===0){
      var ws=[n+1000,n-1000<1000?n+100:n-1000,n+10].filter(function(x){ return x!==n; }).slice(0,lv===3?3:2);
      out.push({label:LN,text:"Số “"+DV.docSo(n)+"” viết thế nào?",speak:"Số này viết thế nào?",stage:"",layout:"words2",options:shuffle([{txt:nf(n),correct:true}].concat(ws.map(function(x){ return {txt:nf(x)}; }))),answer:nf(n),longAnswer:true,why:DV.docSo(n)+" viết là "+nf(n)+"."});
    } else if(k===1){
      var m=n+any([-1000,-100,-10,10,100,1000]); if(m<1000) m=n+100;
      out.push(H.cmpQ('<div class="cmp">'+H.side(nf(n))+H.SLOT+H.side(nf(m))+'</div>',"Điền dấu nào vào ô trống?",n,m,"So sánh các hàng từ trái sang phải: "+nf(n)+" "+(n>m?">":"<")+" "+nf(m)+"."));
    } else {
      var base=lv===1?10:lv===2?100:any([100,1000]), r=Math.round(n/base)*base;
      out.push(kp({label:LN,text:"Làm tròn số đến hàng "+(base===10?"chục":base===100?"trăm":"nghìn")+".",stage:inl(nf(n)),ans:r,why:nf(n)+" làm tròn đến hàng "+(base===10?"chục":base===100?"trăm":"nghìn")+" là "+nf(r)+"."}));
    }
  }
  return out;
};
var LE="🧷 Biểu thức";
DV.g.expr3=function(lv){
  var out=[];
  for(var i=0;i<6;i++){
    var a=rand(2,9), b=rand(2,9), c=rand(2,9), e, ans, w;
    if(lv===1){ if(i%2){ e=(a*10)+" + "+b+" − "+c; ans=a*10+b-c; w="Tính từ trái sang phải: "+e+" = "+ans+"."; } else { e=a+" × "+b+" : "+a; ans=b; w="Tính từ trái sang phải: "+e+" = "+ans+"."; } }
    else if(lv===2){ if(i%2){ e=(a*10)+" + "+b+" × "+c; ans=a*10+b*c; w="Nhân trước, cộng sau: "+e+" = "+ans+"."; } else { e=(a*b*10)+" − "+(c*b)+" : "+b; ans=a*b*10-c; w="Chia trước, trừ sau: "+e+" = "+ans+"."; } }
    else { if(i%2){ e="("+a+" + "+b+") × "+c; ans=(a+b)*c; w="Tính trong ngoặc trước: "+e+" = "+ans+"."; } else { var s=c*b; e=(a+s)+" − ("+s+" : "+b+")"; ans=a+s-c; w="Tính trong ngoặc trước: "+e+" = "+ans+"."; } }
    out.push(kp({label:LE,text:"Tính giá trị của biểu thức.",stage:inl(e),ans:ans,why:w}));
  }
  return out;
};
var LT="🔁 Gấp, giảm số lần";
DV.g.times3=function(lv){
  var out=[];
  for(var i=0;i<6;i++){
    var n=rand(2,9), t=rand(2,9), k=i%3, big=n*t;
    if(k===0) out.push(kp({label:LT,text:"Gấp "+n+" lên "+t+" lần.",stage:inl(n+" × "+t),ans:big,why:"Muốn gấp một số lên nhiều lần, ta nhân số đó với số lần."}));
    else if(k===1) out.push(kp({label:LT,text:"Giảm "+big+" đi "+t+" lần.",stage:inl(big+" : "+t),ans:n,why:"Muốn giảm một số đi nhiều lần, ta chia số đó cho số lần."}));
    else out.push(M.mcq(LT,"Số lớn "+big+" gấp mấy lần số bé "+n+"?",'<div class="eq-line big">'+big+' : '+n+' = <span class="eqslot" id="eqslot">?</span></div>',t,1,12,"Lấy số lớn chia cho số bé: "+big+" : "+n+" = "+t+".",lv));
  }
  return out;
};
var LF="🔍 Tìm thành phần";
DV.g.find3=function(lv){
  var out=[], Q='<span class="eqslot" id="kpVal">?</span>';
  for(var i=0;i<6;i++){
    var a=rand(3,9), b=rand(2,9), s, stage, ans, why, k=lv===1?i%2:lv===2?2+i%2:i%6;
    if(k===0){ s=rand(20,90); a=rand(5,s-5); ans=s-a; stage=Q+" + "+a+" = "+s; why="Tìm số hạng: lấy tổng trừ đi số hạng kia: "+s+" − "+a+" = "+ans+"."; }
    else if(k===1){ s=rand(20,90); a=rand(5,s-5); ans=s+a; stage=Q+" − "+a+" = "+s; why="Tìm số bị trừ: lấy hiệu cộng với số trừ: "+s+" + "+a+" = "+ans+"."; }
    else if(k===2){ ans=b; stage=Q+" × "+a+" = "+(a*b); why="Tìm thừa số: lấy tích chia cho thừa số kia: "+(a*b)+" : "+a+" = "+b+"."; }
    else if(k===3){ ans=a*b; stage=Q+" : "+a+" = "+b; why="Tìm số bị chia: lấy thương nhân với số chia: "+b+" × "+a+" = "+ans+"."; }
    else if(k===4){ s=rand(30,90); a=rand(5,s-5); ans=s-a; stage=s+" − "+Q+" = "+a; why="Tìm số trừ: lấy số bị trừ trừ đi hiệu: "+s+" − "+a+" = "+ans+"."; }
    else { ans=b; stage=(a*b)+" : "+Q+" = "+a; why="Tìm số chia: lấy số bị chia chia cho thương: "+(a*b)+" : "+a+" = "+b+"."; }
    out.push(kp({label:LF,text:"Tìm số còn thiếu.",stage:'<div class="eq-line big">'+stage+'</div>',ans:ans,why:why}));
  }
  return out;
};
DV.g.frac3=function(lv){
  var pool=lv===1?[2,3,4,5]:range(2,9), out=[], i;
  for(i=0;i<3;i++) out.push(M.fracQ(pool,lv,"🍰 Một phần mấy"));
  for(i=0;i<3;i++){ var d=any(pool), x=rand(2,9); out.push(kp({label:"🍰 Một phần mấy",text:"Tìm "+M.FN[d].toLowerCase()+" của "+(d*x)+".",stage:inl("1/"+d+" của "+(d*x)),ans:x,why:(d*x)+" : "+d+" = "+x+"."})); }
  return out;
};
var LG="📐 Chu vi, diện tích";
function rectFig(w,h){ var W=Math.min(200,w*20+30), H2=Math.min(120,h*16+30); return '<div class="fig-wrap">'+M.SVG(W+60,H2+50,'<rect x="30" y="20" width="'+W+'" height="'+H2+'" fill="#E2DAFF" stroke="#7E5EE0" stroke-width="4"/><text x="'+(30+W/2)+'" y="14" text-anchor="middle" font-size="14" font-weight="800" fill="#E0577F">'+w+' cm</text><text x="24" y="'+(20+H2/2+5)+'" text-anchor="end" font-size="14" font-weight="800" fill="#E0577F">'+h+'</text>')+'</div>'; }
DV.g.geom3=function(lv){
  var out=[];
  for(var i=0;i<5;i++){
    var sq=i===4||Math.random()<0.3, w=rand(3,9), h=sq?w:rand(2,w-1||2), area=lv>1&&i%2===1, name=sq?"hình vuông":"hình chữ nhật";
    if(h===w && !sq) h=w-1;
    var ans=area?w*h:(sq?w*4:(w+h)*2), f=area?(sq?w+" × "+w:w+" × "+h)+" = "+ans+" (cm²).":(sq?w+" × 4":"("+w+" + "+h+") × 2")+" = "+ans+" (cm).";
    out.push(kp({label:LG,text:"Tính "+(area?"diện tích":"chu vi")+" "+name+" ("+(area?"cm²":"cm")+").",speak:"Tính "+(area?"diện tích":"chu vi")+" "+name+".",stage:rectFig(w,h)+'<div class="eq-line"><span class="eqslot" id="kpVal">?</span> '+(area?"cm²":"cm")+'</div>',ans:ans,why:f}));
  }
  out.push(M.quiz(any([
    {e:"⭕",q:"Đoạn thẳng nối tâm với một điểm trên đường tròn gọi là gì?",a:"Bán kính",w:["Đường kính","Trung điểm","Góc vuông"],why:"Bán kính nối tâm với một điểm trên đường tròn."},
    {e:"⭕",q:"Đường kính dài gấp mấy lần bán kính?",a:"2 lần",w:["3 lần","4 lần","1 lần"],why:"Trong một hình tròn, đường kính gấp 2 lần bán kính."},
    {e:"📐",q:"Hình chữ nhật có mấy góc vuông?",a:"4 góc",w:["2 góc","3 góc","1 góc"],why:"Hình chữ nhật có 4 góc vuông."},
    {e:"🧊",q:"Khối lập phương có mấy mặt?",a:"6 mặt",w:["4 mặt","8 mặt","12 mặt"],why:"Khối lập phương có 6 mặt là các hình vuông bằng nhau."}
  ]),lv,LG));
  return shuffle(out);
};
var LU="📏 Đơn vị đo";
DV.g.unit3=function(lv){
  var picks=[
    {e:"🍚",q:"Một gói mì nặng khoảng bao nhiêu?",a:"75 g",w:["75 kg","75 l","75 ml"]},{e:"🧃",q:"Một hộp sữa nhỏ chứa khoảng bao nhiêu?",a:"180 ml",w:["180 l","180 kg","180 mm"]},
    {e:"🌡️",q:"Nhiệt độ cơ thể người khoẻ mạnh khoảng bao nhiêu?",a:"37 °C",w:["10 °C","60 °C","100 °C"]},{e:"🧊",q:"Nước đóng băng ở nhiệt độ nào?",a:"0 °C",w:["37 °C","50 °C","100 °C"]},
    {e:"🫖",q:"Nước sôi ở nhiệt độ nào?",a:"100 °C",w:["0 °C","37 °C","50 °C"]},{e:"📎",q:"Chiếc ghim giấy dài khoảng bao nhiêu?",a:"3 cm",w:["3 m","3 km","3 mm"]}
  ];
  var conv=[
    function(){ var a=rand(2,9); return {t:a+" kg sang g",a:a*1000,w:a+" kg = "+nf(a*1000)+" g."}; },
    function(){ var a=rand(2,9); return {t:a+" l sang ml",a:a*1000,w:a+" l = "+nf(a*1000)+" ml."}; },
    function(){ var a=rand(2,9); return {t:a+" cm sang mm",a:a*10,w:a+" cm = "+(a*10)+" mm."}; },
    function(){ var a=rand(2,9); return {t:a+" m sang cm",a:a*100,w:a+" m = "+(a*100)+" cm."}; },
    function(){ var a=rand(1,9), b=rand(1,9); return {t:a+" m "+b+" dm sang dm",a:a*10+b,w:a+" m "+b+" dm = "+(a*10+b)+" dm."}; }
  ];
  var out=pick(picks,3).map(function(x){ return M.quiz(x,lv,LU); });
  pick(lv===3?conv:conv.slice(0,4),3).forEach(function(f){ var c=f(); out.push(kp({label:LU,text:"Đổi "+c.t+", rồi gõ kết quả.",stage:'<div class="eq-line"><span class="eqslot" id="kpVal">?</span></div>',ans:c.a,why:c.w})); });
  return shuffle(out);
};
var LCL="🕐 Đồng hồ, tháng, năm";
DV.g.clock3=function(lv){
  var out=[], hs=pick(range(1,12),5);
  hs.forEach(function(h){
    var m=lv===1?any([5,10,20,25,35,40,50]):lv===2?rand(1,29):any([35,40,45,50,55]);
    var sayKem=lv===3, nx=h%12+1, ans=sayKem?nx+" giờ kém "+(60-m)+" phút":h+" giờ "+m+" phút";
    var ws=sayKem?[h+" giờ kém "+(60-m)+" phút",nx+" giờ "+(60-m)+" phút"]:[h+" giờ "+((m+5)%60||5)+" phút",nx+" giờ "+m+" phút"];
    out.push({label:LCL,text:"Đồng hồ chỉ mấy giờ?",speak:"Đồng hồ chỉ mấy giờ?",stage:'<div class="big-clock">'+DV.clockSvg(h,m)+'</div>',layout:"wcol",
      options:shuffle([{txt:ans,correct:true}].concat(ws.map(function(x){ return {txt:x}; }))),answer:"🕐",answerName:ans,why:"Kim phút chỉ "+m+" phút, kim giờ đã qua số "+h+" nên là "+h+" giờ "+m+" phút"+(sayKem?", hay "+ans:"")+"."});
  });
  out.push(M.quiz(any([
    {q:"Một năm có mấy tháng?",a:"12 tháng",w:["10 tháng","24 tháng"],why:"Một năm có 12 tháng."},
    {q:"Tháng nào có 28 hoặc 29 ngày?",a:"Tháng 2",w:["Tháng 3","Tháng 4"],why:"Tháng 2 có 28 ngày, năm nhuận có 29 ngày."},
    {q:"Tháng 7 có bao nhiêu ngày?",a:"31 ngày",w:["30 ngày","28 ngày"],why:"Tháng 7 có 31 ngày."},
    {q:"Thứ Hai là ngày 5 tháng 9. Thứ Hai tuần sau là ngày nào?",a:"Ngày 12 tháng 9",w:["Ngày 6 tháng 9","Ngày 15 tháng 9"],why:"Một tuần có 7 ngày: 5 + 7 = 12."}
  ]),lv,LCL));
  return out;
};
DV.g.money3=function(lv){
  var totals=lv===1?[12000,15000,27000,30000]:lv===2?[35000,48000,60000,75000]:[56000,83000,92000,100000], notes=lv===1?[1000,2000,5000,10000,20000]:[1000,2000,5000,10000,20000,50000];
  var goods=["Em mua sách","Em mua hộp bút","Em mua cặp sách","Em mua đồ dùng học tập"];
  return pick(totals,4).map(function(t){ return M.money(t,notes,"💵 Tiền Việt Nam",any(goods)+" hết "+nf(t)+" đồng. Hãy chọn tờ tiền để trả đủ."); });
};
var ROMAN=["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];
DV.g.roman=function(lv){
  var pool=lv===1?range(1,10):lv===2?range(1,15):range(1,20);
  return pick(pool,6).map(function(n,i){
    var ds=pick(pool.filter(function(x){ return x!==n; }),lv===3?3:2);
    if(i%2) return {label:"🏛️ Số La Mã",text:"Số "+n+" viết bằng chữ số La Mã thế nào?",speak:"Số này viết bằng chữ số La Mã thế nào?",stage:"",layout:"row3",options:shuffle([{txt:ROMAN[n],correct:true}].concat(ds.map(function(x){ return {txt:ROMAN[x]}; }))),answer:ROMAN[n],why:n+" viết là "+ROMAN[n]+"."};
    return {label:"🏛️ Số La Mã",text:"Chữ số La Mã này là số mấy?",speak:"Chữ số La Mã này là số mấy?",stage:'<div class="roman">'+ROMAN[n]+'</div>',layout:"num",options:shuffle([{num:n,correct:true}].concat(ds.map(function(x){ return {num:x}; }))),answer:ROMAN[n],answerName:"Số "+n,why:ROMAN[n]+" là số "+n+"."};
  });
};
DV.g.word3=function(lv){
  var T=[
    function(){ var a=rand(12,24), t=rand(2,4); return {t:"Thùng thứ nhất có "+a+" l dầu. Thùng thứ hai có số dầu gấp "+t+" lần thùng thứ nhất. Hỏi thùng thứ hai có bao nhiêu lít dầu?",e:"🛢️",a:a*t,w:a+" × "+t+" = "+(a*t)+" (l)."}; },
    function(){ var x=rand(6,12), t=rand(3,6); return {t:"Có "+(x*t)+" quả cam, giảm đi "+t+" lần thì còn bao nhiêu quả cam?",e:"🍊",a:x,w:(x*t)+" : "+t+" = "+x+" (quả)."}; },
    function(){ var n=rand(3,9), p=rand(2,6), a=rand(5,20); return {t:"Mỗi hộp có "+p+" bút màu. Bình có "+n+" hộp và "+a+" bút lẻ. Hỏi Bình có tất cả bao nhiêu bút?",e:"🖍️",a:n*p+a,w:"Bước 1: "+n+" × "+p+" = "+(n*p)+". Bước 2: "+(n*p)+" + "+a+" = "+(n*p+a)+" (bút)."}; },
    function(){ var a=rand(40,90), b=rand(8,20), c=rand(5,15); return {t:"Cửa hàng có "+a+" kg gạo, buổi sáng bán "+b+" kg, buổi chiều bán "+c+" kg. Hỏi cửa hàng còn bao nhiêu ki-lô-gam gạo?",e:"🌾",a:a-b-c,w:a+" − "+b+" − "+c+" = "+(a-b-c)+" (kg)."}; },
    function(){ var w=rand(4,9), h=rand(2,3); return {t:"Một mảnh vườn hình chữ nhật dài "+w*h+" m, chiều rộng bằng 1/"+h+" chiều dài. Hỏi chiều rộng bao nhiêu mét?",e:"🏡",a:w,w:(w*h)+" : "+h+" = "+w+" (m)."}; },
    function(){ var p=any([2000,5000,10000]), n=rand(2,4), give=50000; var tot=p*n; return {t:"Mẹ mua "+n+" quyển vở, mỗi quyển "+nf(p)+" đồng, đưa cô bán hàng "+nf(give)+" đồng. Hỏi cô trả lại mẹ bao nhiêu tiền?",e:"📒",a:give-tot,w:"Bước 1: "+nf(p)+" × "+n+" = "+nf(tot)+". Bước 2: "+nf(give)+" − "+nf(tot)+" = "+nf(give-tot)+" (đồng)."}; }
  ];
  var pool=lv===1?T.slice(0,3):lv===2?T.slice(0,5):T;
  return shuffle(pool).slice(0,5).map(function(f){ var c=f(); return kp({label:"📝 Toán có lời văn",text:c.t,speak:c.t,stage:'<div class="pic small">'+c.e+'</div><div class="eq-line"><span class="eqslot" id="kpVal">?</span></div>',ans:c.a,why:c.w}); });
};
/* bảng số liệu và khả năng xảy ra */
DV.g.data3=function(lv){
  var cols=pick(["Cam","Xoài","Ổi","Chuối"],3), vals=cols.map(function(){ return rand(12,48); });
  var tbl='<table class="dtable"><tr><th>Loại quả</th>'+cols.map(function(c){ return '<th>'+c+'</th>'; }).join("")+'</tr><tr><th>Số quả</th>'+vals.map(function(v){ return '<td>'+v+'</td>'; }).join("")+'</tr></table>';
  var sum=vals[0]+vals[1]+vals[2], mx=Math.max.apply(null,vals), mi=vals.indexOf(mx), diff=Math.abs(vals[0]-vals[1]);
  if(vals.filter(function(v){ return v===mx; }).length>1){ vals[mi]=mx+1; mx=mx+1; sum+=1; diff=Math.abs(vals[0]-vals[1]); tbl='<table class="dtable"><tr><th>Loại quả</th>'+cols.map(function(c){ return '<th>'+c+'</th>'; }).join("")+'</tr><tr><th>Số quả</th>'+vals.map(function(v){ return '<td>'+v+'</td>'; }).join("")+'</tr></table>'; }
  var LD="📊 Bảng số liệu";
  return [
    M.mcq(LD,"Có mấy quả "+cols[0].toLowerCase()+"?",tbl,vals[0],1,60,"Đọc ở cột "+cols[0]+": "+vals[0]+" quả.",lv),
    {label:LD,text:"Loại quả nào nhiều nhất?",speak:"Loại quả nào nhiều nhất?",stage:tbl,layout:"row3",options:cols.map(function(c,i){ return {txt:c,correct:i===mi}; }),answer:"🍊",answerName:cols[mi],why:cols[mi]+" có "+mx+" quả, nhiều nhất."},
    kp({label:LD,text:"Cả ba loại có tất cả bao nhiêu quả?",stage:tbl+'<div class="eq-line"><span class="eqslot" id="kpVal">?</span></div>',ans:sum,why:vals.join(" + ")+" = "+sum+" (quả)."}),
    kp({label:LD,text:cols[0]+" và "+cols[1].toLowerCase()+" chênh nhau bao nhiêu quả?",stage:tbl+'<div class="eq-line"><span class="eqslot" id="kpVal">?</span></div>',ans:diff,why:"Lấy số lớn trừ số bé, được "+diff+" quả."})
  ].concat(M.chance(2,LD));
};
})();
