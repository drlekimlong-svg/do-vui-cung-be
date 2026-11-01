/* Công cụ Toán dùng chung (bàn phím số, đặt tính, đua tính nhẩm, trả tiền, hình vẽ) và các trò Toán lớp 1 */
(function(){
"use strict";
var H=DV.h, M=DV.m, $=H.$, rand=H.rand, shuffle=H.shuffle, pick=H.pick, any=H.any, range=H.range, esc=H.esc, tone=H.tone;
DV.g = DV.g || {};

function nf(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g," "); }
M.nf=nf;
function SVG(w,h,body,cls){ return '<svg class="fig '+(cls||"")+'" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" aria-hidden="true">'+body+'</svg>'; }
M.SVG=SVG;

/* ---- bàn phím số: q có ans, stage chứa #kpVal để hiện số đang gõ ---- */
M.keypad=function(c){
  var q={
    label:c.label, text:c.text, speak:c.speak||c.text, hint:c.hint, stage:c.stage, layout:"keypad",
    answer:String(c.show||nf(c.ans)), longAnswer:true, why:c.why, ans:c.ans,
    custom:function(st, box){
      var val="";
      function paint(){ var el=st.querySelector("#kpVal"); if(el){ el.textContent=val||"?"; el.classList.toggle("typing",!!val); } }
      ["1","2","3","4","5","6","7","8","9","⌫","0","✓"].forEach(function(k){
        var b=M.btn("opt key"+(k==="✓"?" ok":k==="⌫"?" del":""),'<span class="o-num">'+k+'</span>',k==="⌫"?"Xoá":k==="✓"?"Kiểm tra":k);
        b.addEventListener("click", function(){
          if(H.state().locked) return;
          H.unlockAudio();
          if(k==="⌫"){ val=val.slice(0,-1); paint(); return; }
          if(k==="✓"){
            if(!val) return;
            if(+val===c.ans){ var el=st.querySelector("#kpVal"); if(el){ el.classList.add("filled"); } H.solve(q); }
            else { H.miss(b, true); val=""; paint(); }
            return;
          }
          if(val.length<7){ val+=k; paint(); tone(640,0,0.05,"sine",0.06); }
        });
        box.appendChild(b);
      });
      paint();
    }
  };
  return q;
};
/* đặt tính theo cột: hai số thẳng hàng phải, kết quả gõ ở dòng dưới */
M.column=function(a, sym, b){
  return '<div class="colmath"><span class="c-sym">'+sym+'</span><span class="c-a">'+a+'</span><span class="c-b">'+b+'</span><span class="c-line"></span><span class="eqslot c-r" id="kpVal">?</span></div>';
};
M.inline=function(expr){ return '<div class="eq-line big">'+expr+' = <span class="eqslot" id="kpVal">?</span></div>'; };

/* ---- 🚀 đua tính nhẩm: gen() trả về {t:"3 + 4", a:7} ---- */
M.speed=function(gen, secs, target, label){
  var q={
    label:label||"🚀 Đua tính nhẩm", text:"Tính thật nhanh! Được "+target+" câu đúng trong "+secs+" giây thì rô-bốt đến đích.", speak:"Tính thật nhanh trước khi hết giờ nhé!",
    layout:"num", stage:" ", answer:"🚀", why:"", target:target,
    custom:function(st, box){
      var ok=0, left=secs, cur=null;
      function next(){
        cur=gen();
        var el=st.querySelector("#spQ"); if(el) el.textContent=cur.t;
        box.innerHTML="";
        H.numOpts(cur.a,3,0,Math.max(cur.a+6,12)).forEach(function(o){
          var b=M.btn("opt",'<span class="o-num">'+o.num+'</span>',String(o.num));
          b.addEventListener("click", function(){
            if(H.state().locked) return;
            H.unlockAudio();
            if(o.correct){ ok++; paintBar(); tone(760+ok*20,0,0.08,"triangle",0.1); next(); }
            else { H.miss(b,true); H.state().first=true; }
          });
          box.appendChild(b);
        });
      }
      function paintBar(){ var i=st.querySelector("#spBar"), c=st.querySelector("#spOk"); if(i) i.style.left=Math.min(100,ok/target*100)+"%"; if(c) c.textContent=ok; }
      function tick(){
        left--;
        var t=st.querySelector("#spTime"); if(t) t.textContent=left;
        if(left>0){ H.later(tick,1000); return; }
        finish();
      }
      function finish(){
        var st8=H.state(); st8.first=ok>=target;
        q.why = ok>=target ? "Em làm đúng "+ok+" phép tính, về đích rồi!" : "Em làm đúng "+ok+" phép tính. Thử lại để về đích nhé!";
        H.solve(q);
      }
      st.innerHTML='<div class="race"><i id="spBar">🤖</i><b>🏁</b></div><div class="sp-row"><span>⏱️ <b id="spTime">'+secs+'</b> giây</span><span>✅ <b id="spOk">0</b> / '+target+'</span></div><div class="eq-line big" id="spQ"></div>';
      next();
      H.later(tick,1000);
    }
  };
  return q;
};

/* ---- 💵 trả tiền: chạm các tờ tiền cho đủ số tiền ---- */
M.money=function(total, notes, label, story){
  var q={
    label:label, text:story, speak:story, hint:"Chạm tờ tiền để trả. Chạm “Làm lại” nếu thừa tiền.", layout:"money",
    stage:'<div class="wallet">Đã trả: <b id="paid">0</b> đồng</div>', answer:nf(total)+" đồng", longAnswer:true,
    why:"Em đã trả đúng "+nf(total)+" đồng.", total:total, notes:notes,
    custom:function(st, box){
      var paid=0;
      function show(){ var e=st.querySelector("#paid"); if(e) e.textContent=nf(paid); }
      notes.forEach(function(v){
        var b=M.btn("bill b"+v,'<span>'+nf(v)+'</span><small>đồng</small>',nf(v)+" đồng");
        b.addEventListener("click", function(){
          if(H.state().locked) return;
          H.unlockAudio();
          paid+=v; show(); tone(620,0,0.06,"sine",0.08);
          if(paid===total) H.solve(q);
          else if(paid>total){ H.miss(b,true); H.setHint("Thừa tiền rồi. Trả lại từ đầu nhé!"); paid=0; H.later(show,500); }
        });
        box.appendChild(b);
      });
      var r=M.btn("big-btn alt","↩ Làm lại","Làm lại");
      r.addEventListener("click", function(){ paid=0; show(); });
      box.appendChild(r);
    }
  };
  return q;
};

/* ---- hình vẽ ---- */
var C="#7E5EE0", F="#E2DAFF";
var SHAPES={
  tròn:function(){ return SVG(96,96,'<circle cx="48" cy="48" r="42" fill="'+F+'" stroke="'+C+'" stroke-width="4"/>'); },
  vuông:function(){ return SVG(96,96,'<rect x="8" y="8" width="80" height="80" fill="'+F+'" stroke="'+C+'" stroke-width="4"/>'); },
  "tam giác":function(){ return SVG(96,96,'<polygon points="48,8 90,88 6,88" fill="'+F+'" stroke="'+C+'" stroke-width="4"/>'); },
  "chữ nhật":function(){ return SVG(120,80,'<rect x="6" y="14" width="108" height="56" fill="'+F+'" stroke="'+C+'" stroke-width="4"/>'); },
  "tứ giác":function(){ return SVG(110,90,'<polygon points="18,14 96,6 104,80 6,70" fill="'+F+'" stroke="'+C+'" stroke-width="4"/>'); },
  "lập phương":function(){ return SVG(100,100,'<polygon points="12,32 62,32 62,88 12,88" fill="'+F+'" stroke="'+C+'" stroke-width="3"/><polygon points="12,32 36,10 88,10 62,32" fill="#F1ECFF" stroke="'+C+'" stroke-width="3"/><polygon points="62,32 88,10 88,66 62,88" fill="#CDBFFB" stroke="'+C+'" stroke-width="3"/>'); },
  "hộp chữ nhật":function(){ return SVG(130,90,'<polygon points="8,34 92,34 92,82 8,82" fill="'+F+'" stroke="'+C+'" stroke-width="3"/><polygon points="8,34 34,10 120,10 92,34" fill="#F1ECFF" stroke="'+C+'" stroke-width="3"/><polygon points="92,34 120,10 120,58 92,82" fill="#CDBFFB" stroke="'+C+'" stroke-width="3"/>'); },
  "khối trụ":function(){ return SVG(90,110,'<rect x="12" y="18" width="66" height="74" fill="'+F+'"/><ellipse cx="45" cy="92" rx="33" ry="12" fill="'+F+'" stroke="'+C+'" stroke-width="3"/><rect x="13" y="18" width="64" height="74" fill="'+F+'"/><line x1="12" y1="18" x2="12" y2="92" stroke="'+C+'" stroke-width="3"/><line x1="78" y1="18" x2="78" y2="92" stroke="'+C+'" stroke-width="3"/><ellipse cx="45" cy="18" rx="33" ry="12" fill="#F1ECFF" stroke="'+C+'" stroke-width="3"/>'); },
  "khối cầu":function(){ return SVG(96,96,'<circle cx="48" cy="48" r="42" fill="'+F+'" stroke="'+C+'" stroke-width="3"/><ellipse cx="48" cy="48" rx="42" ry="13" fill="none" stroke="'+C+'" stroke-width="2" stroke-dasharray="5 4"/>'); }
};
M.SHAPES=SHAPES;
function shapeName(k){ return /khối/.test(k) ? k : k==="lập phương" ? "khối lập phương" : k==="hộp chữ nhật" ? "khối hộp chữ nhật" : "hình "+k; }
M.shapeName=shapeName;
M.shapeQ=function(keys, ans, lv, label){
  var ws=pick(keys.filter(function(k){ return k!==ans; }), lv===3?3:2);
  if(Math.random()<0.5) return {
    label:label, text:"Đây là hình gì?", speak:"Đây là hình gì?", stage:'<div class="fig-wrap">'+SHAPES[ans]()+'</div>', layout:"wcol",
    options:shuffle([{txt:shapeName(ans), correct:true}].concat(ws.map(function(k){ return {txt:shapeName(k)}; }))),
    answer:"📐", answerName:shapeName(ans), why:"Đây là "+shapeName(ans)+"."
  };
  var t="Hình nào là "+shapeName(ans)+"?";
  return {
    label:label, text:t, speak:t, layout:"grid-fig", stage:"",
    options:shuffle([{emo:SHAPES[ans](), aria:shapeName(ans), correct:true}].concat(ws.map(function(k){ return {emo:SHAPES[k](), aria:shapeName(k)}; }))),
    answer:"📐", answerName:shapeName(ans), why:"Em đã chọn đúng "+shapeName(ans)+"."
  };
};

/* ---- trò Toán lớp 1 ---- */
var L1="🔢 Toán";
function tensFig(n){
  var t=Math.floor(n/10), u=n%10, s='<div class="tens">', i;
  for(i=0;i<t;i++) s+='<span class="ten-bar" title="1 chục"></span>';
  s+='<span class="units">';
  for(i=0;i<u;i++) s+='<span class="unit"></span>';
  return s+'</span></div>';
}
DV.g.tens=function(lv){
  var max = lv===1 ? 20 : lv===2 ? 50 : 99, out=[];
  pick(range(11,max),6).forEach(function(n,i){
    var t=Math.floor(n/10), u=n%10, k=i%3;
    if(k===0) out.push(mcq("🧮 Chục và đơn vị","Có tất cả bao nhiêu khối?",tensFig(n),n,0,99,n+" gồm "+t+" chục và "+u+" đơn vị.",lv));
    else if(k===1) out.push(mcq("🧮 Chục và đơn vị","Số "+n+" có mấy chục?",'<div class="eq-line big">'+n+'</div>',t,0,9,n+" gồm "+t+" chục và "+u+" đơn vị.",lv));
    else out.push(M.keypad({label:"🧮 Chục và đơn vị",text:"Viết số gồm "+t+" chục và "+u+" đơn vị.",stage:M.inline(t+" chục, "+u+" đơn vị"),ans:n,why:t+" chục và "+u+" đơn vị là số "+n+"."}));
  });
  return out;
};
function mcq(label, text, stage, ans, min, max, why, lv){
  return {label:label, text:text, speak:text, stage:stage, layout: lv===3 ? "num4" : "num",
    options:H.numOpts(ans, lv===3?4:3, min, max), answer:String(ans), longAnswer:String(ans).length>4, why:why};
}
M.mcq=mcq;
DV.g.next100=function(lv){
  var max = lv===1 ? 30 : lv===2 ? 70 : 100, out=[];
  for(var i=0;i<6;i++){
    var n=rand(2,max-1), mode=i%3;
    if(mode===0) out.push(mcq("💯 Bảng số","Số liền sau của "+n+" là số nào?",'<div class="eq-line big">'+n+' ➜ <span class="eqslot" id="eqslot">?</span></div>',n+1,1,100,"Số liền sau của "+n+" là "+(n+1)+".",lv));
    else if(mode===1) out.push(mcq("💯 Bảng số","Số liền trước của "+n+" là số nào?",'<div class="eq-line big"><span class="eqslot" id="eqslot">?</span> ➜ '+n+'</div>',n-1,1,100,"Số liền trước của "+n+" là "+(n-1)+".",lv));
    else {
      var st=rand(1,max-5), miss=rand(1,3), row=range(st,st+4).map(function(x,k){ return k===miss ? '<span class="nb hole">?</span>' : '<span class="nb">'+x+'</span>'; }).join("");
      out.push(mcq("💯 Bảng số","Số nào còn thiếu?",'<div class="numrow">'+row+'</div>',st+miss,1,100,"Các số đếm thêm 1: "+range(st,st+4).join(", ")+".",lv));
    }
  }
  return out;
};
DV.g.calc100=function(lv){
  var out=[], n=6;
  for(var i=0;i<n;i++){
    var plus=i%2===0, a, b, ans;
    if(lv===1){ if(plus){ a=rand(1,8); b=rand(1,10-a); } else { a=rand(2,10); b=rand(1,a); } }
    else { var p=H.noCarry(plus, lv===2?3:8); if(lv===2){ p.b=p.b%10||1; if(!plus && p.b>p.a%10) p.b=p.a%10||1; if(plus && (p.a%10)+p.b>9) p.b=9-(p.a%10)||1; } a=p.a; b=p.b; }
    ans=plus ? a+b : a-b;
    var sym=plus?"+":"−", say=a+(plus?" cộng ":" trừ ")+b;
    out.push(M.keypad({label:"➕ Cộng trừ đến 100",text: lv===3 ? "Đặt tính rồi tính." : "Tính rồi gõ kết quả.",speak:"Tính rồi gõ kết quả.",
      stage: lv===1 ? M.inline(a+" "+sym+" "+b) : M.column(a,sym,b), ans:ans, why:say+" bằng "+ans+"."}));
  }
  return out;
};
DV.g.shape1=function(lv){
  var keys = lv===1 ? ["tròn","vuông","tam giác","chữ nhật"] : ["tròn","vuông","tam giác","chữ nhật","lập phương","hộp chữ nhật"];
  return pick(keys,keys.length).concat(pick(keys,2)).slice(0,6).map(function(k){ return M.shapeQ(keys,k,lv,"📐 Hình học"); });
};
/* thước đo cm */
function rulerFig(len, max, color, label){
  var unit=26, w=(max+1)*unit, s='';
  s+='<rect x="'+(unit/2)+'" y="6" width="'+(len*unit)+'" height="22" rx="6" fill="'+(color||"#FF9A4D")+'"/>';
  if(label) s+='<text x="'+(unit/2+6)+'" y="22" font-size="13" font-weight="800" fill="#fff">'+label+'</text>';
  s+='<rect x="0" y="34" width="'+w+'" height="34" fill="#FFF3C9" stroke="#D9B44A" stroke-width="2" rx="4"/>';
  for(var i=0;i<=max;i++){ var x=unit/2+i*unit; s+='<line x1="'+x+'" y1="34" x2="'+x+'" y2="46" stroke="#3B2F5C" stroke-width="2"/><text x="'+x+'" y="62" text-anchor="middle" font-size="12" font-weight="700" fill="#3B2F5C">'+i+'</text>'; }
  return '<div class="fig-wrap scroll">'+SVG(w,72,s,"ruler")+'</div>';
}
M.rulerFig=rulerFig;
DV.g.measure1=function(lv){
  var out=[], max=lv===1?10:15;
  for(var i=0;i<6;i++){
    var len=rand(2,max);
    if(lv===3 && i%2){
      var a=rand(5,15), b=rand(2,a-1);
      out.push(mcq("📏 Đo độ dài","Thước kẻ dài "+a+" cm, bút chì dài "+b+" cm. Thước kẻ dài hơn bút chì mấy xăng-ti-mét?","<div class='pic small'>📏 ✏️</div>",a-b,1,15,a+" − "+b+" = "+(a-b)+" (cm).",lv));
    } else out.push(mcq("📏 Đo độ dài","Thanh màu cam dài mấy xăng-ti-mét?",rulerFig(len,max),len,1,max,"Thanh màu cam bắt đầu từ vạch 0 và kết thúc ở vạch "+len+", nên dài "+len+" cm.",lv));
  }
  return out;
};
var DAYS=["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy","Chủ nhật"];
M.DAYS=DAYS;
DV.g.week=function(lv){
  var out=[];
  for(var i=0;i<6;i++){
    var d=rand(0,6), step = lv===1 ? 1 : lv===2 ? (i%2?-1:1) : any([-2,2,3,-1]), t=DAYS[(d+step+7)%7], ws=pick(DAYS.filter(function(x){ return x!==t; }), lv===3?3:2);
    var txt = step===1 ? "Hôm nay là "+DAYS[d]+". Ngày mai là thứ mấy?" : step===-1 ? "Hôm nay là "+DAYS[d]+". Hôm qua là thứ mấy?"
      : step>0 ? "Hôm nay là "+DAYS[d]+". "+step+" ngày nữa là thứ mấy?" : "Hôm nay là "+DAYS[d]+". Cách đây "+(-step)+" ngày là thứ mấy?";
    out.push({label:"📅 Thứ trong tuần",text:txt,speak:txt,stage:"",layout:"words2",
      options:shuffle([{txt:t,correct:true}].concat(ws.map(function(x){ return {txt:x}; }))),answer:"📅",answerName:t,why:"Các ngày trong tuần: "+DAYS.join(", ")+"."});
  }
  return out;
};
var POS=["🐱","🐶","🐰","🐻","🐸","🐵","🐼","🦊"];
DV.g.pos=function(lv){
  var out=[];
  for(var i=0;i<6;i++){
    var k=lv===1?3:lv===2?4:5, row=pick(POS,k), j=rand(0,k-2), txt, ans;
    var kind=i%3;
    if(kind===0 && k%2===1){ ans=row[(k-1)/2]; txt="Bạn nào đứng ở giữa?"; }
    else if(kind===1){ ans=row[j]; txt="Bạn nào đứng ngay bên trái bạn "+row[j+1]+"?"; }
    else { ans=row[j+1]; txt="Bạn nào đứng ngay bên phải bạn "+row[j]+"?"; }
    out.push({label:"🧭 Vị trí",text:txt,speak:"Nhìn hàng các bạn rồi chọn đúng bạn nhé.",stage:'<div class="row-pos">'+row.join(" ")+'</div>',layout:k>3?"grid4":"row3",
      options:shuffle(row.filter(function(x){ return x!==ans; }).slice(0,k>3?3:2).concat([ans])).map(function(e){ return {emo:e,correct:e===ans}; }),answer:ans,why:"Em nhìn từ trái sang phải, bạn "+ans+" đúng là vị trí cần tìm."});
  }
  return out;
};
DV.g.speed1=function(lv){
  var gen=function(){
    var plus=Math.random()<0.5, a,b;
    if(lv===1){ if(plus){ a=rand(1,5); b=rand(1,5); } else { a=rand(2,10); b=rand(1,a); } }
    else if(lv===2){ if(plus){ a=rand(1,9); b=rand(1,10-a); } else { a=rand(2,10); b=rand(0,a); } }
    else { var p=H.noCarry(plus,8); a=p.a; b=p.b; }
    return {t:a+(plus?" + ":" − ")+b, a:plus?a+b:a-b};
  };
  return [M.speed(gen,60,lv===1?6:lv===2?8:8)];
};
})();
