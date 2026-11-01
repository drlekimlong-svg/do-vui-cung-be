/* Các cơ chế chơi mới: trắc nghiệm chữ, điền chỗ trống, đúng/sai, đọc hiểu, xếp câu, phân loại, nối cặp, hái nhiều đáp án */
(function(){
"use strict";
var H=DV.h, $=H.$, rand=H.rand, shuffle=H.shuffle, pick=H.pick, esc=H.esc, tone=H.tone;
var M = DV.m = {};

function btn(cls, html, aria){
  var b=document.createElement("button"); b.type="button"; b.className=cls; b.innerHTML=html;
  if(aria) b.setAttribute("aria-label", aria);
  return b;
}
M.btn=btn;
/* đổi thứ tự cho đến khi khác đáp án, để bé không gặp sẵn câu đúng */
function shuffleDiff(arr){
  var a=shuffle(arr), k=0;
  while(a.join("|")===arr.join("|") && k++<9) a=shuffle(arr);
  return a;
}

/* ---- trắc nghiệm chữ: {e, q, a, w, why} ---- */
M.quiz=function(it, lv, label){
  var n = lv===3 ? 3 : 2;
  return {
    label:label, text:it.q, speak:it.q, stage: it.e ? '<div class="pic small">'+it.e+'</div>' : "", layout:"wcol",
    options: shuffle([{txt:it.a, correct:true}].concat(pick(it.w, Math.min(n,it.w.length)).map(function(x){ return {txt:x}; }))),
    answer: it.e||"💡", answerName:it.a, why:it.why||""
  };
};

/* ---- điền chỗ trống: {e, s:"… ___ …", a, w, why} ---- */
M.cloze=function(it, label, text){
  var p=it.s.split("___"), short=[it.a].concat(it.w).every(function(x){ return x.length<=8; });
  var t=text||"Chọn từ đúng để điền vào chỗ trống.";
  return {
    label:label, text:t, speak:t, layout: short ? "row3" : "wcol",
    stage:(it.e ? '<div class="pic small">'+it.e+'</div>' : "")+'<div class="cloze">'+esc(p[0])+'<span class="eqslot" id="eqslot">?</span>'+esc(p[1]||"")+'</div>',
    options: shuffle([{txt:it.a, correct:true}].concat(it.w.map(function(x){ return {txt:x}; }))),
    answer:"✏️", answerName:it.s.replace("___", it.a), why:it.why||"",
    onCorrect:function(){ var s=$("#eqslot"); if(s){ s.textContent=it.a; s.classList.add("filled"); } }
  };
};

/* ---- đúng hay sai: {e, s, t, why} ---- */
M.truefalse=function(it, label){
  return {
    label:label, text:"Câu này đúng hay sai?", speak:"Câu này đúng hay sai?", layout:"row2",
    stage:(it.e ? '<div class="pic small">'+it.e+'</div>' : "")+'<div class="says">'+esc(it.s)+'</div>',
    options:[{emo:"👍", label:"Đúng", correct:it.t===true},{emo:"👎", label:"Sai", correct:it.t===false}],
    answer: it.t ? "👍" : "👎", answerName: it.t ? "Đúng" : "Sai", why:it.why||""
  };
};

/* ---- đọc hiểu: mỗi đoạn văn tách thành các câu hỏi; giọng đọc chỉ đọc câu hỏi, không đọc đoạn văn ---- */
M.passages=function(bank, lv, label, count){
  var out=[], pool=H.pickLv(bank, lv, bank.length);
  pool.forEach(function(d){
    d.qs.forEach(function(x){
      if(out.length>=count) return;
      out.push({
        label:label, text:x.q, speak:x.q, layout:"wcol",
        stage:'<div class="passage"><b>'+esc(d.t)+'</b><p>'+esc(d.p)+'</p></div>',
        options: shuffle([{txt:x.a, correct:true}].concat(x.w.map(function(y){ return {txt:y}; }))),
        answer:"📖", answerName:x.a, why:"Em đọc lại đoạn “"+d.t+"” nhé."
      });
    });
  });
  return out;
};

/* ---- xếp từ thành câu: {s:"Bé|đi|học."} ---- */
M.sentence=function(it, label){
  var seq=it.s.split("|"), full=seq.join(" ");
  var q={
    label:label, text:"Chạm lần lượt các từ để xếp thành câu.", speak:"Chạm lần lượt các từ để xếp thành câu.", layout:"tiles",
    hint:"Chữ viết hoa đứng đầu câu nhé!",
    stage:'<div class="wslots">'+seq.map(function(_,k){ return '<span class="wslot" data-k="'+k+'"></span>'; }).join("")+'</div>',
    answer:"📝", answerName:full, why:"", seq:seq,
    custom:function(st, box){
      var next=0;
      shuffleDiff(seq).forEach(function(t){
        var b=btn("opt tile-word",'<span class="o-word">'+esc(t)+'</span>',t);
        b.addEventListener("click", function(){
          if(H.state().locked || b.disabled) return;
          H.unlockAudio();
          if(t===seq[next]){
            b.disabled=true; b.classList.add("used");
            var sl=st.querySelector('.wslot[data-k="'+next+'"]'); if(sl){ sl.textContent=t; sl.classList.add("filled"); }
            tone(520+Math.min(next,9)*70,0,0.12,"triangle",0.12);
            next++;
            H.setHint(next<seq.length ? "Đúng rồi, từ tiếp theo nào!" : "");
            if(next===seq.length) H.solve(q);
          } else H.miss(b, true);
        });
        box.appendChild(b);
      });
    }
  };
  return q;
};

/* ---- phân loại vào hai rổ: {t, a, ea, ia, b, eb, ib} ---- */
M.sort=function(set, lv, label){
  var k = lv===1 ? 3 : lv===2 ? 4 : 5;
  var items=shuffle(pick(set.ia,k).map(function(x){ return {x:x,g:0}; }).concat(pick(set.ib,k).map(function(x){ return {x:x,g:1}; })));
  var q={
    label:label, text:set.t, speak:set.t, hint:"Chạm vào rổ đúng cho từng mục.", layout:"row2", stage:" ",
    answer:"🧺", why:"Em đã xếp đúng cả "+items.length+" mục.", items:items,
    custom:function(st, box){
      var i=0;
      function show(){
        var cur=items[i].x, emoji=cur.length<=4 && !/[a-zà-ỹ]/i.test(cur);
        st.innerHTML='<div class="sort-count">'+(i+1)+' / '+items.length+'</div><div class="sort-item'+(emoji?" emo":"")+'">'+esc(cur)+'</div>';
      }
      [[set.a,set.ea,0],[set.b,set.eb,1]].forEach(function(g){
        var b=btn("opt",'<span class="o-emo">'+g[1]+'</span><span class="o-label">'+esc(g[0])+'</span>',g[0]);
        b.addEventListener("click", function(){
          if(H.state().locked) return;
          H.unlockAudio();
          if(items[i].g===g[2]){
            tone(620+i*50,0,0.12,"triangle",0.12);
            i++;
            if(i===items.length) H.solve(q); else { show(); H.setHint(""); }
          } else H.miss(b, true);
        });
        box.appendChild(b);
      });
      show();
    }
  };
  return q;
};

/* ---- nối cặp: {t, p:[[trái, phải],…]} ---- */
M.pairs=function(set, n, label){
  var ps=pick(set.p, Math.min(n,set.p.length));
  var q={
    label:label, text:set.t, speak:set.t, hint:"Chạm một ô bên trái, rồi chạm ô hợp với nó bên phải.", layout:"pairs",
    answer:"🔗", why:"Em đã nối đúng cả "+ps.length+" cặp.", stage:"", pairs:ps,
    custom:function(st, box){
      st.hidden=true;
      var left=document.createElement("div"), right=document.createElement("div"), sel=null, got=0;
      left.className="pair-col"; right.className="pair-col";
      function mk(text, id, side){
        var b=btn("pair",esc(text),text);
        b.addEventListener("click", function(){
          if(H.state().locked || b.disabled) return;
          H.unlockAudio();
          if(sel && sel.side===side){ sel.b.classList.remove("sel"); sel=null; }
          if(!sel){ sel={b:b,id:id,side:side}; b.classList.add("sel"); tone(620,0,0.06,"sine",0.08); return; }
          var other=sel; sel=null; other.b.classList.remove("sel");
          if(other.id===id){
            [other.b,b].forEach(function(x){ x.disabled=true; x.classList.add("matched"); });
            got++; tone(880,0,0.1,"triangle",0.12);
            if(got===ps.length) H.later(function(){ H.solve(q); }, 300);
          } else { H.miss(b, true); H.miss(other.b, true); }
        });
        return b;
      }
      shuffle(ps.map(function(p,i){ return {t:p[0],i:i}; })).forEach(function(x){ left.appendChild(mk(x.t,x.i,"L")); });
      shuffleDiff(ps.map(function(p,i){ return {t:p[1],i:i}; })).forEach(function(x){ right.appendChild(mk(x.t,x.i,"R")); });
      box.appendChild(left); box.appendChild(right);
    }
  };
  return q;
};

/* ---- hái nhiều đáp án: items [{t, ok}] ---- */
M.pickMany=function(text, items, label, why){
  var total=items.filter(function(x){ return x.ok; }).length;
  var q={
    label:label, text:text, speak:text, hint:"Có "+total+" đáp án đúng. Hãy hái đủ nhé!", layout:"grid-pick", stage:"", answer:"🧺",
    why:why||"Em đã hái đủ "+total+" đáp án đúng.", items:items,
    custom:function(st, box){
      st.hidden=true;
      var got=0;
      shuffle(items).forEach(function(it){
        var b=btn("opt pick",'<span class="o-word">'+esc(it.t)+'</span>',it.t);
        b.addEventListener("click", function(){
          if(H.state().locked || b.disabled) return;
          H.unlockAudio();
          if(it.ok){
            b.disabled=true; b.classList.add("right"); got++;
            tone(620+got*60,0,0.12,"triangle",0.12);
            H.setHint(got<total ? "Còn "+(total-got)+" đáp án nữa!" : "");
            if(got===total) H.solve(q);
          } else H.miss(b, false);
        });
        box.appendChild(b);
      });
    }
  };
  return q;
};
})();
