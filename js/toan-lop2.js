/* Các trò Toán lớp 2: cộng trừ có nhớ, số đến 1000, bảng nhân chia 2 và 5, đo lường, giờ phút, tiền Việt Nam, một phần mấy, biểu đồ tranh */
(function(){
"use strict";
var H=DV.h, M=DV.m, rand=H.rand, shuffle=H.shuffle, pick=H.pick, any=H.any, range=H.range;

/* đọc số theo cách đọc trong sách giáo khoa */
var CS=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"];
function read3(n, full){
  var t=Math.floor(n/100), c=Math.floor(n/10)%10, u=n%10, p=[];
  if(t>0 || full) p.push(CS[t]+" trăm");
  if(c===0){ if(u>0 && (t>0||full)) p.push("linh"); }
  else if(c===1) p.push("mười");
  else p.push(CS[c]+" mươi");
  if(u>0){
    if(u===1 && c>1) p.push("mốt");
    else if(u===4 && c>1) p.push("tư");
    else if(u===5 && c>0) p.push("lăm");
    else p.push(CS[u]);
  }
  return p.join(" ");
}
function docSo(n){
  if(n===0) return "không";
  if(n===100000) return "Một trăm nghìn";
  var k=Math.floor(n/1000), r=n%1000, s="";
  if(k>0){ s=read3(k,false)+" nghìn"; if(r>0) s+=" "+read3(r,true); }
  else s=read3(r,false);
  return s.charAt(0).toUpperCase()+s.slice(1);
}
M.docSo=docSo;
DV.docSo=docSo;

var LB="➕ Cộng trừ có nhớ";
DV.g.add2=function(lv){
  var out=[];
  for(var i=0;i<6;i++){
    var plus=i%2===0, a,b;
    if(lv===1){ if(plus){ a=rand(6,9); b=rand(11-a,9); } else { a=rand(11,18); b=rand(a-9,9); if(b>=10) b=9; } }
    else if(lv===2){ if(plus){ a=rand(2,8)*10+rand(5,9); b=rand(10-(a%10),9); } else { a=rand(2,9)*10+rand(0,4); b=rand((a%10)+1,9); } }
    else { if(plus){ a=rand(1,6)*10+rand(5,9); b=rand(1,8-Math.floor(a/10))*10+rand(10-(a%10),9); } else { a=rand(3,9)*10+rand(0,4); b=rand(1,Math.floor(a/10)-1)*10+rand((a%10)+1,9); } }
    var ans=plus?a+b:a-b, sym=plus?"+":"−";
    out.push(M.keypad({label:LB,text:lv===1?"Tính nhẩm rồi gõ kết quả.":"Đặt tính rồi tính.",speak:"Tính rồi gõ kết quả.",stage:lv===1?M.inline(a+" "+sym+" "+b):M.column(a,sym,b),ans:ans,why:a+" "+sym+" "+b+" = "+ans+"."}));
  }
  return out;
};
var LN="🔟 Số đến 1000";
DV.g.num1000=function(lv){
  var out=[], max=lv===1?199:lv===2?599:999;
  for(var i=0;i<6;i++){
    var n=rand(101,max), t=Math.floor(n/100), c=Math.floor(n/10)%10, u=n%10, k=i%3;
    if(k===0){
      var ws=[n+100>999?n-100:n+100, t*100+u*10+c, u>0&&c>0?u*100+c*10+t:n+10].filter(function(x){ return x!==n && x>99; });
      out.push({label:LN,text:"Số “"+docSo(n)+"” viết thế nào?",speak:"Số này viết thế nào?",stage:"",layout:"num",
        options:shuffle([{num:n,correct:true}].concat(pick(ws.filter(function(x,j){ return ws.indexOf(x)===j; }),2).map(function(x){ return {num:x}; }))),answer:String(n),why:docSo(n)+" viết là "+n+"."});
    } else if(k===1) out.push(M.keypad({label:LN,text:"Viết số gồm "+t+" trăm, "+c+" chục, "+u+" đơn vị.",stage:M.inline(t+" trăm "+c+" chục "+u+" đơn vị"),ans:n,why:t+" trăm, "+c+" chục, "+u+" đơn vị là số "+n+"."}));
    else {
      var m=lv===1?rand(101,max):rand(n-20>100?n-20:101,Math.min(n+20,999));
      while(m===n) m=rand(101,max);
      var rel=m>n?"<":">";
      out.push(H.cmpQ('<div class="cmp">'+H.side(n)+H.SLOT+H.side(m)+'</div>',"Điền dấu nào vào ô trống?",n,m,"So sánh hàng trăm, rồi hàng chục, rồi hàng đơn vị: "+n+" "+rel+" "+m+"."));
    }
  }
  return out;
};
var LM="✖️ Bảng nhân, chia";
function mulSet(tables, lv, label){
  var out=[], i, count=6;
  for(i=0;i<count;i++){
    var tb=any(tables), x=rand(lv===1?1:2,10), mul=lv===1?true:i%2===0, ans=mul?tb*x:x, expr=mul?tb+" × "+x:(tb*x)+" : "+tb;
    if(lv===3 || i%3===2) out.push(M.keypad({label:label,text:"Tính rồi gõ kết quả.",stage:M.inline(expr),ans:ans,why:expr+" = "+ans+"."}));
    else out.push(M.mcq(label,"Tính nhẩm nhé!",'<div class="eq-line big">'+expr+' = <span class="eqslot" id="eqslot">?</span></div>',ans,0,100,expr+" = "+ans+".",lv));
  }
  return out;
}
M.mulSet=mulSet;
DV.g.mul2=function(lv){
  var out=mulSet(lv===1?[2]:lv===2?[5]:[2,5],lv,LM);
  if(lv>1){
    var n=rand(3,6), g=any([2,5]);
    out[0]=M.mcq(LM,"Viết thành phép nhân: có mấy nhóm, mỗi nhóm có mấy?",'<div class="eq-pics">'+H.repeat(H.grp("🍎",g),n).join("")+'</div>',g*n,0,60,n+" nhóm, mỗi nhóm "+g+" quả: "+g+" × "+n+" = "+(g*n)+".",lv);
    out[0].text="Có tất cả bao nhiêu quả táo?"; out[0].speak=out[0].text;
  }
  return out;
};
DV.g.speed2=function(lv){
  var gen=function(){
    if(lv===1){ var p=Math.random()<0.5, a=p?rand(6,9):rand(11,18), b=p?rand(11-a,9):rand(Math.max(a-9,2),9); return {t:a+(p?" + ":" − ")+b,a:p?a+b:a-b}; }
    var tb=lv===2?any([2,5]):any([2,5]), x=rand(1,10), m=Math.random()<0.6;
    return m ? {t:tb+" × "+x,a:tb*x} : {t:(tb*x)+" : "+tb,a:x};
  };
  return [M.speed(gen,60,lv===1?8:10)];
};
var LC="🕐 Giờ, phút, ngày";
DV.g.clock2=function(lv){
  var mins=lv===1?[0,30]:[0,15,30], out=[], hs=pick(range(1,12),5);
  hs.forEach(function(h){
    var m=any(mins), nm=function(hh,mm){ return hh+" giờ"+(mm?" "+mm+" phút":""); };
    var ans=nm(h,m), set=[], cand=[nm(h,m===30?15:30),nm(h%12+1,m),nm(h,m===0?15:0),nm(((h+10)%12)+1,m)];
    cand.forEach(function(x){ if(x!==ans && set.indexOf(x)<0 && set.length<(lv===3?3:2)) set.push(x); });
    out.push({label:LC,text:"Đồng hồ chỉ mấy giờ?",speak:"Đồng hồ chỉ mấy giờ?",stage:'<div class="big-clock">'+DV.clockSvg(h,m)+'</div>',layout:"words2",
      options:shuffle([{txt:ans,correct:true}].concat(set.map(function(x){ return {txt:x}; }))),answer:"🕐",answerName:ans,
      why:m===0?"Kim dài chỉ số 12, kim ngắn chỉ số "+h+".":m===15?"Kim dài chỉ số 3 là 15 phút, kim ngắn đã qua số "+h+".":"Kim dài chỉ số 6 là 30 phút, kim ngắn nằm giữa số "+h+" và số "+(h%12+1)+"."});
  });
  var facts=[
    {q:"1 ngày có bao nhiêu giờ?",a:"24 giờ",w:["12 giờ","60 giờ"]},{q:"1 giờ có bao nhiêu phút?",a:"60 phút",w:["30 phút","100 phút"]},
    {q:"Tháng 6 có bao nhiêu ngày?",a:"30 ngày",w:["31 ngày","28 ngày"]},{q:"Tháng 1 có bao nhiêu ngày?",a:"31 ngày",w:["30 ngày","28 ngày"]},
    {q:"Một tuần có bao nhiêu ngày?",a:"7 ngày",w:["5 ngày","10 ngày"]}
  ];
  out.push(M.quiz(any(facts),lv,LC));
  return shuffle(out);
};
var STORY=["Em mua một quyển vở","Em mua một chiếc bút","Em mua một gói kẹo","Em mua một cái thước","Em mua một quả bóng nhỏ"];
DV.g.money2=function(lv){
  var out=[], totals = lv===1 ? [2000,3000,5000,6000,7000] : lv===2 ? [8000,12000,15000,17000,20000] : [23000,26000,35000,45000,52000];
  var notes = lv===1 ? [1000,2000,5000] : lv===2 ? [1000,2000,5000,10000] : [1000,2000,5000,10000,20000,50000];
  pick(totals,4).forEach(function(t){ out.push(M.money(t,notes,"💵 Tiền Việt Nam",any(STORY)+" giá "+M.nf(t)+" đồng. Hãy chọn tờ tiền để trả đủ.")); });
  return out;
};
var LU="📏 Đo lường";
DV.g.unit2=function(lv){
  var conv=[
    function(){ var a=rand(1,9); return {t:a+" dm = ? cm",a:a*10,w:a+" dm = "+(a*10)+" cm, vì 1 dm = 10 cm."}; },
    function(){ var a=rand(1,9); return {t:a+" m = ? dm",a:a*10,w:a+" m = "+(a*10)+" dm, vì 1 m = 10 dm."}; },
    function(){ var a=rand(1,9); return {t:a+" m = ? cm",a:a*100,w:a+" m = "+(a*100)+" cm, vì 1 m = 100 cm."}; },
    function(){ var a=rand(1,9); return {t:a+" cm = ? mm",a:a*10,w:a+" cm = "+(a*10)+" mm, vì 1 cm = 10 mm."}; },
    function(){ var a=rand(1,9); return {t:a+" km = ? m",a:a*1000,w:a+" km = "+(a*1000)+" m, vì 1 km = 1000 m."}; }
  ];
  var picks=[
    {e:"🍉",q:"Quả dưa hấu nặng khoảng bao nhiêu?",a:"3 kg",w:["3 l","3 m","3 cm"]},{e:"🥛",q:"Chai sữa to chứa khoảng bao nhiêu?",a:"1 l",w:["1 kg","1 m","1 km"]},
    {e:"📏",q:"Chiếc thước kẻ dài khoảng bao nhiêu?",a:"2 dm",w:["2 m","2 km","2 kg"]},{e:"🏠",q:"Từ nhà đến thành phố khác cách nhau khoảng bao nhiêu?",a:"50 km",w:["50 cm","50 dm","50 mm"]},
    {e:"🧒",q:"Bạn nhỏ lớp 2 cao khoảng bao nhiêu?",a:"120 cm",w:["120 km","120 mm","120 m"]},{e:"🐜",q:"Con kiến dài khoảng bao nhiêu?",a:"5 mm",w:["5 m","5 km","5 dm"]},
    {e:"🎒",q:"Em nên đeo cặp nặng khoảng bao nhiêu?",a:"3 kg",w:["30 kg","300 kg","3 l"]}
  ];
  var out=pick(picks,lv===1?4:3).map(function(x){ return M.quiz(x,lv,LU); });
  var n=lv===1?2:3;
  pick(lv===1?conv.slice(0,3):conv,n).forEach(function(f){ var c=f(); out.push(M.keypad({label:LU,text:"Đổi đơn vị rồi gõ kết quả.",stage:M.inline(c.t.replace(" = ?","")),ans:c.a,why:c.w})); });
  return shuffle(out);
};
var LS="📐 Hình học";
function zigzag(ls){
  var x=14, y=70, pts=[[x,y]], s="", i;
  ls.forEach(function(l,k){ x+=l*11+22; y=k%2?70:18; pts.push([x,y]); });
  s='<polyline points="'+pts.map(function(p){ return p.join(","); }).join(" ")+'" fill="none" stroke="#7E5EE0" stroke-width="4"/>';
  for(i=1;i<pts.length;i++){ var mx=(pts[i][0]+pts[i-1][0])/2, my=(pts[i][1]+pts[i-1][1])/2; s+='<text x="'+mx+'" y="'+(my-6)+'" font-size="13" font-weight="800" fill="#E0577F" text-anchor="middle">'+ls[i-1]+' cm</text>'; }
  pts.forEach(function(p){ s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" fill="#3B2F5C"/>'; });
  return '<div class="fig-wrap scroll">'+M.SVG(x+18,92,s)+'</div>';
}
DV.g.shape2=function(lv){
  var keys=["vuông","tam giác","chữ nhật","tứ giác","lập phương","hộp chữ nhật","khối trụ","khối cầu"], out=[];
  pick(lv===1?keys.slice(0,4):keys,3).forEach(function(k){ out.push(M.shapeQ(lv===1?keys.slice(0,4):keys,k,lv,LS)); });
  for(var i=0;i<3;i++){
    var n=lv===1?2:3, ls=[]; for(var j=0;j<n;j++) ls.push(rand(2,9));
    var sum=ls.reduce(function(a,b){ return a+b; },0);
    out.push(M.keypad({label:LS,text:"Tính độ dài đường gấp khúc (cm).",speak:"Tính độ dài đường gấp khúc.",stage:zigzag(ls)+'<div class="eq-line"><span class="eqslot" id="kpVal">?</span> cm</div>',ans:sum,why:"Độ dài đường gấp khúc: "+ls.join(" + ")+" = "+sum+" (cm)."}));
  }
  return shuffle(out);
};
function pie(n, k){
  var s="", i, cx=60, cy=60, r=52;
  for(i=0;i<n;i++){
    var a1=i*2*Math.PI/n-Math.PI/2, a2=(i+1)*2*Math.PI/n-Math.PI/2;
    s+='<path d="M'+cx+','+cy+' L'+(cx+r*Math.cos(a1)).toFixed(1)+','+(cy+r*Math.sin(a1)).toFixed(1)+' A'+r+','+r+' 0 0 1 '+(cx+r*Math.cos(a2)).toFixed(1)+','+(cy+r*Math.sin(a2)).toFixed(1)+' Z" fill="'+(i<k?"#FF9A4D":"#FFF3C9")+'" stroke="#3B2F5C" stroke-width="2.5"/>';
  }
  return M.SVG(120,120,s);
}
M.pie=pie;
function fracName(n){ return "1/"+n; }
var FN={2:"Một phần hai",3:"Một phần ba",4:"Một phần tư",5:"Một phần năm",6:"Một phần sáu",7:"Một phần bảy",8:"Một phần tám",9:"Một phần chín"};
M.FN=FN;
M.fracQ=function(pool, lv, label){
  var n=any(pool), ws=pick(pool.filter(function(x){ return x!==n; }), lv===3?Math.min(3,pool.length-1):Math.min(2,pool.length-1));
  return {label:label,text:"Phần tô màu là mấy phần của hình tròn?",speak:"Phần tô màu là mấy phần của hình tròn?",stage:'<div class="fig-wrap">'+pie(n,1)+'</div>',layout:"words2",
    options:shuffle([{txt:FN[n]+" ("+fracName(n)+")",correct:true}].concat(ws.map(function(x){ return {txt:FN[x]+" ("+fracName(x)+")"}; }))),answer:"🍰",answerName:fracName(n),why:"Hình được chia thành "+n+" phần bằng nhau, tô màu 1 phần."};
};
DV.g.frac2=function(lv){
  var pool=lv===1?[2,3,4]:[2,3,4,5], out=[];
  for(var i=0;i<4;i++) out.push(M.fracQ(pool,lv,"🍰 Một phần mấy"));
  var d=any([2,5]), x=rand(2,9);
  out.push(M.keypad({label:"🍰 Một phần mấy",text:"Tìm "+FN[d].toLowerCase()+" của "+(d*x)+".",stage:M.inline(fracName(d)+" của "+(d*x)),ans:x,why:(d*x)+" : "+d+" = "+x+"."}));
  return out;
};
/* biểu đồ tranh, khả năng xảy ra */
M.chart=function(lv, label){
  var pool=[["🐶","Chó"],["🐱","Mèo"],["🐰","Thỏ"],["🐔","Gà"],["🐟","Cá"]], rows=pick(pool,lv===1?3:4).map(function(x){ return {e:x[0],n:x[1],c:rand(1,lv===1?5:7)}; });
  var maxc=Math.max.apply(null,rows.map(function(r){ return r.c; })), best=rows.filter(function(r){ return r.c===maxc; });
  while(best.length>1){ best[0].c=maxc+1; maxc++; best=rows.filter(function(r){ return r.c===maxc; }); }
  var fig='<div class="chart">'+rows.map(function(r){ return '<div class="ch-row"><b>'+r.n+'</b><span>'+H.repeat(r.e,r.c).join("")+'</span></div>'; }).join("")+'</div>';
  var a=rows[0], b=rows[1];
  if(a.c===b.c) b.c=a.c+1;
  fig='<div class="chart">'+rows.map(function(r){ return '<div class="ch-row"><b>'+r.n+'</b><span>'+H.repeat(r.e,r.c).join("")+'</span></div>'; }).join("")+'</div>';
  maxc=Math.max.apply(null,rows.map(function(r){ return r.c; }));
  var top=rows.filter(function(r){ return r.c===maxc; })[0], many=a.c>b.c?a:b, few=a.c>b.c?b:a;
  return [
    M.mcq(label,"Có mấy con "+a.n.toLowerCase()+"?",fig,a.c,0,12,"Đếm hàng "+a.n+" được "+a.c+" con.",lv),
    {label:label,text:"Con vật nào nhiều nhất?",speak:"Con vật nào nhiều nhất?",stage:fig,layout:"words2",options:shuffle(rows.map(function(r){ return {txt:r.n,correct:r===top}; })),answer:top.e,answerName:top.n,why:"Hàng "+top.n+" có "+top.c+" con, nhiều nhất."},
    M.mcq(label,many.n+" nhiều hơn "+few.n.toLowerCase()+" mấy con?",fig,many.c-few.c,0,12,many.c+" − "+few.c+" = "+(many.c-few.c)+".",lv)
  ];
};
var CHANCE=[
  {q:"Trong hộp chỉ có bóng đỏ. Em lấy được bóng đỏ. Việc này là:",a:"Chắc chắn"},{q:"Trong hộp chỉ có bóng đỏ. Em lấy được bóng xanh. Việc này là:",a:"Không thể"},
  {q:"Trong hộp có bóng đỏ và bóng xanh. Em lấy được bóng xanh. Việc này là:",a:"Có thể"},{q:"Tung đồng xu, đồng xu ra mặt sấp. Việc này là:",a:"Có thể"},
  {q:"Ngày mai Mặt Trời sẽ mọc ở phía Tây. Việc này là:",a:"Không thể"},{q:"Sau thứ Hai là thứ Ba. Việc này là:",a:"Chắc chắn"},{q:"Con mèo biết bay như chim. Việc này là:",a:"Không thể"},{q:"Chiều nay trời có mưa. Việc này là:",a:"Có thể"}
];
M.chance=function(n,label){ return pick(CHANCE,n).map(function(c){ return {label:label,text:c.q,speak:c.q,stage:'<div class="pic small">🎲</div>',layout:"row3",options:["Chắc chắn","Có thể","Không thể"].map(function(x){ return {txt:x,correct:x===c.a}; }),answer:"🎲",answerName:c.a,why:"Việc này được gọi là “"+c.a.toLowerCase()+"”."}; }); };
DV.g.chart2=function(lv){ return M.chart(lv,"📊 Biểu đồ tranh").concat(M.chance(3,"📊 Biểu đồ tranh")); };
/* toán có lời văn */
var NAME=["Mai","Nam","Lan","Hùng","An","Hoa","Tú","Vy"];
DV.g.word2=function(lv){
  var T=[
    function(){ var a=rand(15,50), b=rand(5,30); return {t:"Cây cam có "+a+" quả. Cây quýt có nhiều hơn cây cam "+b+" quả. Hỏi cây quýt có bao nhiêu quả?",e:"🍊",a:a+b,w:a+" + "+b+" = "+(a+b)+" (quả)."}; },
    function(){ var a=rand(30,90), b=rand(5,a-10); return {t:"Thùng thứ nhất có "+a+" l nước. Thùng thứ hai ít hơn thùng thứ nhất "+b+" l. Hỏi thùng thứ hai có bao nhiêu lít nước?",e:"🪣",a:a-b,w:a+" − "+b+" = "+(a-b)+" (l)."}; },
    function(){ var a=rand(20,60), b=rand(15,35), n=any(NAME); return {t:n+" có "+a+" viên bi, được cho thêm "+b+" viên. Hỏi "+n+" có tất cả bao nhiêu viên bi?",e:"🔵",a:a+b,w:a+" + "+b+" = "+(a+b)+" (viên)."}; },
    function(){ var x=rand(2,9); return {t:"Mỗi túi có 5 quả cam. Hỏi "+x+" túi có bao nhiêu quả cam?",e:"🍊",a:5*x,w:"5 × "+x+" = "+(5*x)+" (quả)."}; },
    function(){ var x=rand(2,10); return {t:"Có "+(2*x)+" bạn chia đều thành 2 đội. Hỏi mỗi đội có bao nhiêu bạn?",e:"👫",a:x,w:(2*x)+" : 2 = "+x+" (bạn)."}; },
    function(){ var x=rand(2,10); return {t:"Mỗi bạn có 2 chiếc đũa. Hỏi "+x+" bạn có bao nhiêu chiếc đũa?",e:"🥢",a:2*x,w:"2 × "+x+" = "+(2*x)+" (chiếc)."}; },
    function(){ var x=rand(2,10); return {t:"Có "+(5*x)+" kg gạo chia đều vào 5 túi. Hỏi mỗi túi có bao nhiêu ki-lô-gam gạo?",e:"🌾",a:x,w:(5*x)+" : 5 = "+x+" (kg)."}; }
  ];
  var pool=lv===1?T.slice(0,3):lv===2?T.slice(0,5):T;
  return shuffle(pool).slice(0,5).map(function(f){ var c=f(); return M.keypad({label:"📝 Toán có lời văn",text:c.t,speak:c.t,stage:'<div class="pic small">'+c.e+'</div><div class="eq-line"><span class="eqslot" id="kpVal">?</span></div>',ans:c.a,why:c.w}); });
};
})();
