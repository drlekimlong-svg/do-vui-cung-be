/* Hai trò rèn tư duy: Nhớ chuỗi (nhớ thứ tự đèn sáng) và Rô-bốt tìm đường (trên, dưới, trái, phải) */
(function(){
"use strict";
var H=DV.h, M=DV.m, rand=H.rand, shuffle=H.shuffle, tone=H.tone;
var LABEL_SIMON="🎹 Nhớ chuỗi", LABEL_ROBOT="🤖 Rô-bốt tìm đường";

/* ---- 🎹 nhớ chuỗi ---- */
var PADS=[{e:"🍎",f:392},{e:"🌟",f:494},{e:"🐸",f:587},{e:"💧",f:698},{e:"🌸",f:784},{e:"🍊",f:880}];
M.simon=function(len, nPads){
  var pads=PADS.slice(0,nPads), seq=[], i;
  for(i=0;i<len;i++) seq.push(rand(0,nPads-1));
  var q={
    label:LABEL_SIMON, text:"Nhìn các hình sáng lên, rồi chạm lại đúng thứ tự.", speak:"Nhìn các hình sáng lên, rồi chạm lại đúng thứ tự.",
    layout:"simon", stage:" ", answer:"🎹", why:"Em đã nhớ đúng chuỗi "+len+" hình.", seq:seq,
    custom:function(st, box){
      var pos=0, busy=true, btns=[];
      st.innerHTML='<div class="simon-state" id="simonState">Hãy nhìn thật kĩ…</div>';
      pads.forEach(function(p,k){
        var b=M.btn("opt simon-pad",'<span class="o-emo">'+p.e+'</span>',"Hình "+(k+1));
        b.addEventListener("click", function(){
          if(busy || H.state().locked) return;
          H.unlockAudio();
          flash(k,180);
          if(k===seq[pos]){
            pos++;
            if(pos===seq.length){ busy=true; H.later(function(){ H.solve(q); }, 260); }
          } else { H.miss(b, true); pos=0; play(700); }
        });
        btns.push(b); box.appendChild(b);
      });
      function flash(k,ms){
        btns[k].classList.add("lit"); tone(pads[k].f,0,ms/1000,"sine",0.13);
        H.later(function(){ btns[k].classList.remove("lit"); }, ms);
      }
      function play(delay){
        busy=true;
        var el=st.querySelector("#simonState"); if(el) el.textContent="Hãy nhìn thật kĩ…";
        seq.forEach(function(k,n){ H.later(function(){ flash(k,460); }, delay+n*700); });
        H.later(function(){ busy=false; var e2=st.querySelector("#simonState"); if(e2) e2.textContent="Đến lượt em!"; }, delay+seq.length*700);
      }
      play(600);
    }
  };
  return q;
};

/* ---- 🤖 rô-bốt: tìm đường trên lưới có đá chắn ---- */
var DIRS={U:{dx:0,dy:-1,e:"⬆️",n:"lên trên"},D:{dx:0,dy:1,e:"⬇️",n:"xuống dưới"},L:{dx:-1,dy:0,e:"⬅️",n:"sang trái"},R:{dx:1,dy:0,e:"➡️",n:"sang phải"}};
/* trả về số bước ngắn nhất từ a đến b, -1 nếu không đi được */
function shortest(n, walls, a, b){
  var dist={}, qu=[a], key=function(p){ return p.x+","+p.y; };
  dist[key(a)]=0;
  while(qu.length){
    var c=qu.shift();
    if(c.x===b.x && c.y===b.y) return dist[key(c)];
    Object.keys(DIRS).forEach(function(d){
      var nx={x:c.x+DIRS[d].dx, y:c.y+DIRS[d].dy};
      if(nx.x<0||nx.y<0||nx.x>=n||nx.y>=n||walls[key(nx)]||dist[key(nx)]!=null) return;
      dist[key(nx)]=dist[key(c)]+1; qu.push(nx);
    });
  }
  return -1;
}
function makeMap(n, nWalls, minSteps){
  for(var t=0;t<200;t++){
    var walls={}, a={x:rand(0,n-1),y:rand(0,n-1)}, b={x:rand(0,n-1),y:rand(0,n-1)}, k=0;
    while(k<nWalls){
      var x=rand(0,n-1), y=rand(0,n-1), id=x+","+y;
      if((x===a.x&&y===a.y)||(x===b.x&&y===b.y)||walls[id]) continue;
      walls[id]=1; k++;
    }
    var s=shortest(n,walls,a,b);
    if(s>=minSteps) return {n:n,walls:walls,a:a,b:b,steps:s};
  }
  return {n:n,walls:{},a:{x:0,y:0},b:{x:n-1,y:n-1},steps:2*(n-1)};
}
DV.shortest=shortest;
M.robot=function(lv, goal){
  var cfg = lv===1 ? {n:4,w:2,m:3,prog:false} : lv===2 ? {n:5,w:5,m:5,prog:false} : {n:5,w:6,m:6,prog:true};
  var map=makeMap(cfg.n,cfg.w,cfg.m);
  var text = cfg.prog ? "Bấm các mũi tên để lập trình đường đi, rồi bấm “Chạy”." : "Bấm mũi tên để đưa rô-bốt đến "+goal.n+".";
  var q={
    label:LABEL_ROBOT, text:text, speak:text, layout:"robot", stage:" ", answer:goal.e, map:map,
    hint:"Đường ngắn nhất có "+map.steps+" bước.",
    why:"Đường ngắn nhất từ rô-bốt đến "+goal.n+" có "+map.steps+" bước.",
    custom:function(st, box){
      var pos={x:map.a.x,y:map.a.y}, moves=0, prog=[], running=false;
      function board(){
        var s='<div class="rgrid" style="--n:'+map.n+'">';
        for(var y=0;y<map.n;y++) for(var x=0;x<map.n;x++){
          var isR=(x===pos.x&&y===pos.y), isG=(x===map.b.x&&y===map.b.y);
          s+='<span class="rcell">'+(isR?"🤖":isG?goal.e:map.walls[x+","+y]?"🪨":"")+'</span>';
        }
        return s+'</div>';
      }
      function draw(){ st.innerHTML=board()+(cfg.prog?'<div class="rprog">'+(prog.map(function(d){ return DIRS[d].e; }).join(" ")||"Chưa có bước nào")+'</div>':""); }
      function step(d){
        var nx={x:pos.x+DIRS[d].dx,y:pos.y+DIRS[d].dy};
        if(nx.x<0||nx.y<0||nx.x>=map.n||nx.y>=map.n||map.walls[nx.x+","+nx.y]) return false;
        pos=nx; moves++; draw(); tone(520+moves*20,0,0.08,"sine",0.1);
        return true;
      }
      function reached(){ return pos.x===map.b.x && pos.y===map.b.y; }
      var pad=document.createElement("div"); pad.className="rpad";
      [["U",""],["L",""],["R",""],["D",""]].forEach(function(p){
        var d=p[0], b=M.btn("opt rkey r"+d,'<span class="o-emo">'+DIRS[d].e+'</span>',DIRS[d].n);
        b.addEventListener("click", function(){
          if(H.state().locked || running) return;
          H.unlockAudio();
          if(cfg.prog){ prog.push(d); draw(); tone(620,0,0.06,"sine",0.08); return; }
          if(!step(d)){ H.miss(b, true); return; }
          if(reached()){
            if(moves>map.steps+2) H.state().first=false;
            H.solve(q);
          }
        });
        pad.appendChild(b);
      });
      box.appendChild(pad);
      if(cfg.prog){
        var row=document.createElement("div"); row.className="rrun";
        var undo=M.btn("big-btn alt","↩ Xoá bước","Xoá bước"), run=M.btn("big-btn","▶ Chạy","Chạy");
        undo.addEventListener("click", function(){ if(!running){ prog.pop(); draw(); } });
        run.addEventListener("click", function(){
          if(running || !prog.length) return;
          running=true; H.unlockAudio();
          var i=0;
          (function go(){
            if(i<prog.length && step(prog[i])){
              i++;
              if(reached()){ running=false; if(prog.length>map.steps+2) H.state().first=false; H.solve(q); return; }
              H.later(go,320);
              return;
            }
            H.miss(null,false);
            H.later(function(){ pos={x:map.a.x,y:map.a.y}; prog=[]; moves=0; running=false; draw(); H.setHint("Chưa đến nơi rồi. Lập trình lại nhé!"); }, 500);
          })();
        });
        row.appendChild(undo); row.appendChild(run); box.appendChild(row);
      }
      draw();
    }
  };
  return q;
};
})();
