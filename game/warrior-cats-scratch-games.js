(function(){
"use strict";

var CARD_COUNT = 3;
var GRID = 3;
var CELLS = GRID * GRID;
var CLEAR_THRESHOLD = 0.6;
var BRUSH_RADIUS = 22;
var RANKS = {common:0,uncommon:1,rare:2,epic:3};
var PRIZE_LABELS = {common:"Common",uncommon:"Uncommon",rare:"Rare",epic:"Legendary"};

var POOL = [
  {type:"leader",icon:"\uD83C\uDFC5",rank:"rare",items:["Bramblestar","Firestar","Leafstar","Mistystar","Tallstar","Blackstar","Rowanstar","Harestar"]},
  {type:"apprentice",icon:"\uD83E\uDD8B",rank:"common",items:["Bramblepaw","Frostpaw","Hollypaw","Lionpaw","Jaypaw","Mousepaw","Willowpaw","Alderpaw","Sparkpaw"]},
  {type:"medicine",icon:"\uD83C\uDF3F",rank:"uncommon",items:["Juniper","Chamomile","Dock","Cobwebs","Goldenrod","Marigold","Burdock","Yarrow"]},
  {type:"prey",icon:"\uD83D\uDC2D",rank:"common",items:["Mouse","Vole","Rabbit","Squirrel","Trout","Pigeon","Frog","Shrew"]},
  {type:"prophecy",icon:"\u2728",rank:"epic",items:["Fire alone","Darkness within","Four will become two","Lion and tiger","The sun still warms the stones","Stars will guide"]},
  {type:"clan",icon:"\uD83C\uDF32",rank:"common",items:["Thunder","River","Shadow","Wind","Sky"]}
];

var RARITY_RANK_LABEL = {common:1,uncommon:2,rare:3,epic:4};

var state = {
  cardsCleared:0,
  symbolsFound:0,
  rarestFind:null,
  lastPrize:null
};

var cardRow,newSetBtn,revealAllBtn,resetAllBtn,toast;
var cards = [];

function rand(arr){return arr[Math.floor(Math.random()*arr.length)]}
function pickWeighted(){
  var roll = Math.random();
  var pool = [];
  POOL.forEach(function(cat){
    var weight = cat.rank==="epic"?4:cat.rank==="rare"?10:cat.rank==="uncommon"?25:45;
    for(var i=0;i<weight;i++) pool.push(cat);
  });
  return rand(pool);
}

function buildCardSymbols(){
  var hasProphecy = Math.random()<0.35;
  var list = [];
  for(var i=0;i<CELLS;i++){
    var cat = pickWeighted();
    var item = rand(cat.items);
    list.push({icon:cat.icon,text:item,type:cat.type,rank:cat.rank});
  }
  if(hasProphecy){
    var p = POOL.find(function(c){return c.type==="prophecy"});
    var slot = Math.floor(Math.random()*CELLS);
    list[slot] = {icon:p.icon,text:rand(p.items),type:p.type,rank:p.rank};
  }
  return list;
}

function pickClanTag(){
  var clans = ["ThunderClan","RiverClan","ShadowClan","WindClan","SkyClan"];
  return rand(clans);
}

function bestRankIn(symbols){
  var best = "common";
  symbols.forEach(function(s){
    if(RARITY_RANK_LABEL[s.rank] > RARITY_RANK_LABEL[best]) best = s.rank;
  });
  return best;
}

function bestPrizeText(symbols){
  var best = symbols[0];
  symbols.forEach(function(s){
    if(RARITY_RANK_LABEL[s.rank] > RARITY_RANK_LABEL[best.rank]) best = s;
  });
  return best;
}

function starString(rank){
  var n = RARITY_RANK_LABEL[rank];
  var s = "";
  for(var i=0;i<4;i++) s += i<n?"\u2605":"\u2606";
  return s;
}

function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function(){toast.classList.remove("show")},2200);
}

function makeCard(){
  var card = document.createElement("div");
  card.className = "scratch-card";
  var symbols = buildCardSymbols();
  var clanTag = pickClanTag();
  var bestRank = bestRankIn(symbols);
  var bestPrize = bestPrizeText(symbols);
  var prizeText = PRIZE_LABELS[bestRank] + " \u00B7 " + bestPrize.text;

  var head = document.createElement("div");
  head.className = "scratch-head";
  head.innerHTML = "<span>Warrior Scratch</span><span class='clan-tag'>" + clanTag + "</span>";
  card.appendChild(head);

  var gridWrap = document.createElement("div");
  gridWrap.className = "scratch-grid";

  for(var i=0;i<CELLS;i++){
    var cell = document.createElement("div");
    cell.className = "scratch-cell";
    var s = symbols[i];
    cell.innerHTML = "<span class='cell-icon' aria-hidden='true'>" + s.icon + "</span><span class='cell-text'>" + s.text + "</span>";
    gridWrap.appendChild(cell);
  }

  var canvas = document.createElement("canvas");
  canvas.className = "scratch-canvas";
  canvas.setAttribute("aria-label","Scratch card coating for " + clanTag);
  gridWrap.appendChild(canvas);

  card.appendChild(gridWrap);

  var foot = document.createElement("div");
  foot.className = "scratch-foot";
  foot.innerHTML = "<span class='prize-name'>" + prizeText + "</span><span class='prize-stars'>" + starString(bestRank) + "</span>";
  card.appendChild(foot);

  return {el:card,canvas:canvas,symbols:symbols,prize:prizeText,rank:bestRank,cleared:false,painted:false};
}

function sizeCanvas(card){
  var rect = card.canvas.getBoundingClientRect();
  var dpr = Math.max(1, window.devicePixelRatio || 1);
  card.canvas.width = Math.floor(rect.width * dpr);
  card.canvas.height = Math.floor(rect.height * dpr);
  var ctx = card.canvas.getContext("2d");
  ctx.setTransform(dpr,0,0,dpr,0,0);
  paintCoating(ctx, rect.width, rect.height);
  card.painted = true;
}

function paintCoating(ctx,w,h){
  var grd = ctx.createLinearGradient(0,0,w,h);
  grd.addColorStop(0,"#b8b8b8");
  grd.addColorStop(0.5,"#9a9a9a");
  grd.addColorStop(1,"#7d7d7d");
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  for(var y=4;y<h;y+=8){
    ctx.fillRect(0,y,w,1);
  }
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.font = "bold " + Math.max(11,Math.floor(w*0.08)) + "px 'Segoe UI',Arial,sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SCRATCH HERE",w/2,h/2);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1,1,w-2,h-2);
}

function getPos(canvas,evt){
  var rect = canvas.getBoundingClientRect();
  var point = null;
  if(evt.touches && evt.touches.length){
    point = {x:evt.touches[0].clientX, y:evt.touches[0].clientY};
  } else if(evt.changedTouches && evt.changedTouches.length){
    point = {x:evt.changedTouches[0].clientX, y:evt.changedTouches[0].clientY};
  } else {
    point = {x:evt.clientX, y:evt.clientY};
  }
  return {x:point.x - rect.left, y:point.y - rect.top};
}

function scratchAt(card,x,y){
  var ctx = card.canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x,y,BRUSH_RADIUS,0,Math.PI*2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

function getScratchedRatio(card){
  var ctx = card.canvas.getContext("2d");
  var w = card.canvas.width;
  var h = card.canvas.height;
  var data = ctx.getImageData(0,0,w,h).data;
  var cleared = 0;
  var total = w * h;
  for(var i=3;i<data.length;i+=4){
    if(data[i] === 0) cleared++;
  }
  return cleared / total;
}

function bindCardEvents(card){
  var drawing = false;
  function start(e){
    if(card.cleared) return;
    drawing = true;
    var p = getPos(card.canvas,e);
    scratchAt(card,p.x,p.y);
    e.preventDefault();
  }
  function move(e){
    if(!drawing || card.cleared) return;
    var p = getPos(card.canvas,e);
    scratchAt(card,p.x,p.y);
    e.preventDefault();
  }
  function end(){
    if(!drawing) return;
    drawing = false;
    if(card.cleared) return;
    var ratio = getScratchedRatio(card);
    if(ratio >= CLEAR_THRESHOLD){
      markCardCleared(card);
    }
  }
  card.canvas.addEventListener("mousedown",start);
  card.canvas.addEventListener("mousemove",move);
  document.addEventListener("mouseup",end);
  card.canvas.addEventListener("touchstart",start,{passive:false});
  card.canvas.addEventListener("touchmove",move,{passive:false});
  card.canvas.addEventListener("touchend",end);
  card.canvas.addEventListener("touchcancel",end);
}

function markCardCleared(card){
  if(card.cleared) return;
  card.cleared = true;
  card.el.classList.add("cleared");
  state.cardsCleared += 1;
  state.symbolsFound += card.symbols.length;
  state.lastPrize = card.prize;
  if(!state.rarestFind || RARITY_RANK_LABEL[card.rank] > RARITY_RANK_LABEL[state.rarestFind]){
    state.rarestFind = card.rank;
  }
  updateStats();
  showToast("Card cleared! " + card.prize);
}

function updateStats(){
  document.getElementById("cardsCleared").textContent = state.cardsCleared;
  document.getElementById("symbolsFound").textContent = state.symbolsFound;
  document.getElementById("rarestFind").textContent = state.rarestFind ? PRIZE_LABELS[state.rarestFind] : "—";
  document.getElementById("lastPrize").textContent = state.lastPrize || "—";
}

function dealCards(){
  cardRow.innerHTML = "";
  cards = [];
  for(var i=0;i<CARD_COUNT;i++){
    var c = makeCard();
    cards.push(c);
    cardRow.appendChild(c.el);
  }
  requestAnimationFrame(function(){
    cards.forEach(function(c){ sizeCanvas(c); });
    cards.forEach(function(c){ bindCardEvents(c); });
  });
}

function revealAll(){
  cards.forEach(function(c){
    if(c.cleared) return;
    var ctx = c.canvas.getContext("2d");
    ctx.clearRect(0,0,c.canvas.width,c.canvas.height);
    markCardCleared(c);
  });
  showToast("All cards revealed");
}

function resetCoatings(){
  cards.forEach(function(c){
    c.cleared = false;
    c.el.classList.remove("cleared");
    var ctx = c.canvas.getContext("2d");
    var rect = c.canvas.getBoundingClientRect();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,c.canvas.width,c.canvas.height);
    var dpr = Math.max(1, window.devicePixelRatio || 1);
    c.canvas.width = Math.floor(rect.width * dpr);
    c.canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    paintCoating(ctx, rect.width, rect.height);
  });
  showToast("Coatings restored");
}

function init(){
  cardRow = document.getElementById("cardRow");
  newSetBtn = document.getElementById("newSetBtn");
  revealAllBtn = document.getElementById("revealAllBtn");
  resetAllBtn = document.getElementById("resetAllBtn");
  toast = document.getElementById("toast");
  if(!cardRow) return;
  dealCards();
  newSetBtn.addEventListener("click",dealCards);
  revealAllBtn.addEventListener("click",revealAll);
  resetAllBtn.addEventListener("click",resetCoatings);
  var resizeT;
  window.addEventListener("resize",function(){
    clearTimeout(resizeT);
    resizeT = setTimeout(function(){
      cards.forEach(function(c){
        if(!c.cleared){
          var ctx = c.canvas.getContext("2d");
          var rect = c.canvas.getBoundingClientRect();
          var dpr = Math.max(1, window.devicePixelRatio || 1);
          c.canvas.width = Math.floor(rect.width * dpr);
          c.canvas.height = Math.floor(rect.height * dpr);
          ctx.setTransform(dpr,0,0,dpr,0,0);
          paintCoating(ctx, rect.width, rect.height);
        }
      });
    },150);
  });
  document.querySelectorAll(".faq-toggle").forEach(function(btn){
    btn.addEventListener("click",function(){
      var id = btn.getAttribute("aria-controls");
      var ans = document.getElementById(id);
      if(!ans) return;
      var open = ans.style.display === "block";
      ans.style.display = open ? "none" : "block";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      var ic = btn.querySelector(".faq-icon");
      if(ic) ic.textContent = open ? "+" : "\u2212";
    });
  });
}

if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded",init);
} else {
  init();
}
})();
