(function(){
"use strict";

var CATS = {
  firestar:{name:"Firestar",clan:"ThunderClan",emoji:"&#x1F981;",traits:["Brave","Loyal","Stubborn","Honest"],
    bio:"The fire-touched kittypet who walked into a forest he didn't belong to and ended up leading it. Firestar runs on the kind of stubborn, do-the-right-thing loyalty that breaks before it bends.",
    why:"Your answers kept landing on the loud, public, stand-in-front moves. That is Firestar's whole thing: see a wrong, call it out, take the hit, lead the way anyway. Quiet patience is not your first gear, and the page is reading you that way."},
  bramblestar:{name:"Bramblestar",clan:"ThunderClan",emoji:"&#x1F408;",traits:["Fair","Patient","Steady","Self-doubting"],
    bio:"The deputy who learned the job by being wrong about it first. Bramblestar is fair, patient, and willing to put the clan ahead of his own pride, even when the cost runs high.",
    why:"Your answers leaned on patience, fairness, and the slow, plan-it-out moves. The page is reading you as the cat who would rather get it right than be the first to shout, which is exactly how Bramblestar leads ThunderClan."},
  squirrelflight:{name:"Squirrelflight",clan:"ThunderClan",emoji:"&#x1F63A;",traits:["Sharp","Loyal","Blunt","Warm"],
    bio:"Sharp tongue, soft heart, and a loyalty that does not crack. Squirrelflight says the thing nobody in camp wants to say out loud, then shows up to help afterwards.",
    why:"You picked the answers that said the hard thing first, then turned around and took care of the cat who got hurt. That mix of blunt honesty and soft loyalty is Squirrelflight in a sentence."},
  yellowfang:{name:"Yellowfang",clan:"ShadowClan (later ThunderClan)",emoji:"&#x1F989;",traits:["Gruff","Wise","Tough","Loyal underneath"],
    bio:"Gruff, blunt, and grumpier than a wet pinecone. Underneath it all, Yellowfang is a medicine cat who never stopped caring about her clan even after the clan stopped caring about her.",
    why:"Your answers kept picking the quiet, observant, hold-the-line moves. Yellowfang is the cat who grumbles about everyone and still brings them the right herb at the right time. The page is reading that energy in you."},
  leafstar:{name:"Leafstar",clan:"SkyClan",emoji:"&#x1F63B;",traits:["Calm","Patient","Steady","Quiet"],
    bio:"Calm, quiet, and the first leader SkyClan had in generations. Leafstar holds the clan together with the kind of steady patience most cats only pretend to have.",
    why:"You picked the calm, low-key, long-game answers more than the loud ones. That is Leafstar's leadership style: show up steady, hold the line, and trust the clan to figure itself out under a quiet paw."},
  crookedstar:{name:"Crookedstar",clan:"RiverClan",emoji:"&#x1F42F;",traits:["Loyal","Carries grief","Determined","Kind"],
    bio:"Once a soft kit, then a lost apprentice, then the leader RiverClan needed. Crookedstar carries grief the way other cats carry prey, and he still gets back up to lead the next day.",
    why:"Your answers leaned on loyalty, loss, and the kind of determination that comes from a hard past. That is Crookedstar's whole arc: a cat shaped by grief who still leads the clan with a kind, steady paw."},
  hawkfrost:{name:"Hawkfrost",clan:"RiverClan",emoji:"&#x1F985;",traits:["Charming","Ambitious","Sharp","Calculating"],
    bio:"Charming, sharp, and ambitious in a way that does not stay friendly. Hawkfrost is the dark mirror to every heroic choice, the kind of cat you respect and keep at the edge of your eye.",
    why:"You picked the strategic, watch-and-wait, take-the-right-moment answers more than the loud heroic ones. Hawkfrost is the cat who plans three moves ahead and respects the move, even when the move is not friendly."},
  blackstar:{name:"Blackstar",clan:"ShadowClan",emoji:"&#x1F988;",traits:["Stoic","Stern","Loyal","Heavy crown"],
    bio:"Stoic, a little grim, and the cat every other leader watches when things get political. Blackstar carries the weight of ShadowClan the way a thick pine carries snow.",
    why:"Your answers carried a quiet weight: stern, stoic, slow-to-act, big-picture. That is Blackstar's whole job. The page is reading you as the cat who would rather be right and alone than loud and surrounded."}
};

var SCORE_MAP = {
  "1":{a:["bramblestar","firestar","squirrelflight"],b:["hawkfrost","blackstar"],c:["squirrelflight","leafstar","crookedstar"],d:["yellowfang","leafstar"]},
  "2":{a:["firestar","squirrelflight"],b:["hawkfrost","blackstar","yellowfang"],c:["crookedstar","bramblestar","leafstar"],d:["squirrelflight","yellowfang"]},
  "3":{a:["firestar","squirrelflight","bramblestar"],b:["hawkfrost","bramblestar","blackstar"],c:["squirrelflight","crookedstar","leafstar"],d:["hawkfrost","blackstar","yellowfang"]},
  "4":{a:["firestar","bramblestar","blackstar"],b:["leafstar","squirrelflight","bramblestar"],c:["crookedstar","yellowfang","leafstar"],d:["hawkfrost","bramblestar","blackstar"]},
  "5":{a:["bramblestar","leafstar","firestar"],b:["crookedstar","squirrelflight"],c:["hawkfrost","blackstar","yellowfang"],d:["blackstar","leafstar","crookedstar"]},
  "6":{a:["firestar","bramblestar","squirrelflight"],b:["crookedstar","leafstar","yellowfang"],c:["hawkfrost","blackstar","yellowfang"],d:["hawkfrost","bramblestar","squirrelflight"]},
  "7":{a:["firestar","bramblestar","squirrelflight"],b:["yellowfang","leafstar","crookedstar"],c:["squirrelflight","crookedstar","bramblestar"],d:["hawkfrost","blackstar"]}
};

var TOTAL_Q = 7;
var state = {answers:{},current:1,finished:false};

var stage,progressBar,progressLabel,answeredCount,resultCard;
var retakeBtn,copyResultBtn,resetBtn,toastEl;

function $(id){return document.getElementById(id)}
function pickScore(catId){return state.answers.__scores[catId]||0}

function init(){
  stage = $("quizStage");
  progressBar = $("progressBar");
  progressLabel = $("progressLabel");
  answeredCount = $("answeredCount");
  resultCard = $("quizResult");
  retakeBtn = $("retakeBtn");
  copyResultBtn = $("copyResultBtn");
  resetBtn = $("resetBtn");
  toastEl = $("toast");

  document.querySelectorAll(".quiz-option").forEach(function(btn){
    btn.addEventListener("click",function(){
      if(state.finished) return;
      var q = btn.getAttribute("data-q");
      var a = btn.getAttribute("data-a");
      if(state.answers[q]) return;
      state.answers[q] = a;
      btn.classList.add("selected");
      var parent = btn.parentElement;
      parent.querySelectorAll(".quiz-option").forEach(function(b){b.disabled=true});
      setTimeout(function(){goNext(parseInt(q,10))},280);
    });
  });

  retakeBtn.addEventListener("click",reset);
  resetBtn.addEventListener("click",reset);
  copyResultBtn.addEventListener("click",copyResult);

  document.querySelectorAll("[data-share]").forEach(function(btn){
    btn.addEventListener("click",function(){
      var platform = btn.getAttribute("data-share");
      handleShare(platform);
    });
  });

  document.querySelectorAll(".faq-toggle").forEach(function(btn){
    btn.addEventListener("click",function(){
      var id = btn.getAttribute("aria-controls");
      var ans = document.getElementById(id);
      var open = ans.style.display==="block";
      ans.style.display = open?"none":"block";
      btn.setAttribute("aria-expanded",open?"false":"true");
      btn.querySelector(".faq-icon").textContent = open?"+":"\u2212";
    });
  });

  updateProgress();
}

function goNext(q){
  if(q >= TOTAL_Q){
    showResult();
    return;
  }
  state.current = q + 1;
  var cards = document.querySelectorAll(".quiz-card");
  cards.forEach(function(c){c.classList.remove("active")});
  var nextCard = document.querySelector('.quiz-card[data-q="'+state.current+'"]');
  if(nextCard) nextCard.classList.add("active");
  updateProgress();
}

function updateProgress(){
  var answered = Object.keys(state.answers).length;
  answeredCount.textContent = answered;
  var pct = state.finished?100:Math.max(14,Math.round((answered/TOTAL_Q)*100));
  progressBar.style.width = pct+"%";
  if(state.finished){
    progressLabel.textContent = "Match ready";
  } else {
    var nextQ = Math.min(answered+1,TOTAL_Q);
    progressLabel.textContent = "Question "+nextQ+" of "+TOTAL_Q;
  }
}

function computeScores(){
  var scores = {};
  Object.keys(CATS).forEach(function(k){scores[k]=0});
  for(var q=1;q<=TOTAL_Q;q++){
    var a = state.answers[q];
    if(!a) continue;
    var list = SCORE_MAP[q][a] || [];
    list.forEach(function(catId){
      scores[catId] = (scores[catId]||0) + 1;
    });
  }
  return scores;
}

function pickWinner(scores){
  var best = -1, tied = [];
  Object.keys(scores).forEach(function(k){
    if(scores[k] > best){best = scores[k]; tied = [k]}
    else if(scores[k] === best){tied.push(k)}
  });
  if(tied.length === 1) return tied[0];
  return tied[Math.floor(Math.random()*tied.length)];
}

function showResult(){
  state.finished = true;
  var scores = computeScores();
  state.answers.__scores = scores;
  var winnerId = pickWinner(scores);
  var cat = CATS[winnerId];
  var cards = document.querySelectorAll(".quiz-card");
  cards.forEach(function(c){c.classList.remove("active")});
  resultCard.classList.add("active");

  $("resultEmoji").innerHTML = cat.emoji;
  $("resultName").textContent = cat.name;
  $("resultClanLine").textContent = "of "+cat.clan;
  $("resultBio").textContent = cat.bio;
  $("resultWhy").textContent = cat.why;

  var traitsBox = $("resultTraits");
  traitsBox.innerHTML = "";
  cat.traits.forEach(function(t){
    var s = document.createElement("span");
    s.className = "trait-pill";
    s.textContent = t;
    traitsBox.appendChild(s);
  });

  updateProgress();
  resultCard.scrollIntoView({behavior:"smooth",block:"start"});
}

function reset(){
  state = {answers:{},current:1,finished:false};
  document.querySelectorAll(".quiz-card").forEach(function(c){c.classList.remove("active")});
  var firstCard = document.querySelector('.quiz-card[data-q="1"]');
  if(firstCard) firstCard.classList.add("active");
  document.querySelectorAll(".quiz-option").forEach(function(b){
    b.classList.remove("selected");
    b.disabled = false;
  });
  updateProgress();
  stage.scrollIntoView({behavior:"smooth",block:"start"});
}

function copyResult(){
  var name = $("resultName").textContent;
  var clan = $("resultClanLine").textContent;
  var text = "I took the warrior cats quiz what cat are you and got "+name+" "+clan+". Take it at warriorcatsnamegenerator.net and see who you get.";
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){showToast("Result copied")},function(){fallbackCopy(text)});
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text){
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position="fixed";ta.style.opacity="0";
  document.body.appendChild(ta);
  ta.select();
  try{document.execCommand("copy");showToast("Result copied")}catch(e){showToast("Copy failed")}
  document.body.removeChild(ta);
}

function handleShare(platform){
  var name = $("resultName").textContent;
  var url = "https://warriorcatsnamegenerator.net/game/warrior-cats-quiz-what-cat-are-you.html";
  var text = "I got "+name+" on the warrior cats quiz what cat are you. Take it and see who you get.";
  if(platform === "twitter"){
    window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(text)+"&url="+encodeURIComponent(url),"_blank","noopener");
  } else if(platform === "facebook"){
    window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url)+"&quote="+encodeURIComponent(text),"_blank","noopener");
  } else if(platform === "reddit"){
    window.open("https://www.reddit.com/submit?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(text),"_blank","noopener");
  } else if(platform === "copy-text"){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text+" "+url).then(function(){showToast("Copied to clipboard")});
    } else {
      fallbackCopy(text+" "+url);
    }
  }
}

function showToast(msg){
  if(!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(function(){toastEl.classList.remove("show")},1800);
}

if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded",init);
} else {
  init();
}
})();
