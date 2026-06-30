(function(){
"use strict";

var PREFIXES = [
  {p:"Fire",c:"ThunderClan",g:"A"},
  {p:"Blue",c:"ThunderClan",g:"F"},
  {p:"Bramble",c:"ThunderClan",g:"A"},
  {p:"Pine",c:"ThunderClan",g:"A"},
  {p:"Thunder",c:"ThunderClan",g:"A"},
  {p:"Oak",c:"ThunderClan",g:"A"},
  {p:"Red",c:"ThunderClan",g:"A"},
  {p:"Sun",c:"ThunderClan",g:"A"},
  {p:"Lion",c:"ThunderClan",g:"A"},
  {p:"Jay",c:"ThunderClan",g:"A"},
  {p:"Holly",c:"ThunderClan",g:"F"},
  {p:"Squirrel",c:"ThunderClan",g:"F"},
  {p:"Bracken",c:"ThunderClan",g:"A"},
  {p:"White",c:"ThunderClan",g:"A"},
  {p:"Frost",c:"ThunderClan",g:"A"},
  {p:"Long",c:"ThunderClan",g:"A"},
  {p:"Dust",c:"ThunderClan",g:"A"},
  {p:"Dark",c:"ThunderClan",g:"A"},
  {p:"Cloud",c:"ThunderClan",g:"A"},
  {p:"Cinder",c:"ThunderClan",g:"A"},
  {p:"Robin",c:"ThunderClan",g:"A"},
  {p:"Sand",c:"ThunderClan",g:"A"},
  {p:"Mouse",c:"ThunderClan",g:"A"},
  {p:"Running",c:"ThunderClan",g:"A"},
  {p:"Thorn",c:"ThunderClan",g:"A"},
  {p:"Poppy",c:"ThunderClan",g:"F"},
  {p:"Dappled",c:"ThunderClan",g:"A"},
  {p:"Golden",c:"ThunderClan",g:"A"},
  {p:"Rain",c:"ThunderClan",g:"F"},
  {p:"Daisy",c:"ThunderClan",g:"F"},
  {p:"Berry",c:"ThunderClan",g:"A"},
  {p:"Willow",c:"ThunderClan",g:"F"},
  {p:"Fern",c:"ThunderClan",g:"F"},
  {p:"Stem",c:"ThunderClan",g:"A"},
  {p:"Briar",c:"ThunderClan",g:"A"},
  {p:"Swift",c:"ThunderClan",g:"A"},
  {p:"Brindle",c:"ThunderClan",g:"A"},
  {p:"Soot",c:"ThunderClan",g:"A"},
  {p:"Patch",c:"ThunderClan",g:"A"},
  {p:"Lily",c:"ThunderClan",g:"F"},

  {p:"Tall",c:"WindClan",g:"A"},
  {p:"One",c:"WindClan",g:"A"},
  {p:"Hare",c:"WindClan",g:"A"},
  {p:"Gorse",c:"WindClan",g:"A"},
  {p:"Wind",c:"WindClan",g:"A"},
  {p:"Morning",c:"WindClan",g:"A"},
  {p:"Crow",c:"WindClan",g:"A"},
  {p:"Heather",c:"WindClan",g:"F"},
  {p:"Breeze",c:"WindClan",g:"A"},
  {p:"Gale",c:"WindClan",g:"A"},
  {p:"Moor",c:"WindClan",g:"A"},
  {p:"Rush",c:"WindClan",g:"A"},
  {p:"Torn",c:"WindClan",g:"A"},
  {p:"Mud",c:"WindClan",g:"A"},
  {p:"Owl",c:"WindClan",g:"A"},
  {p:"Eagle",c:"WindClan",g:"A"},
  {p:"Bould",c:"WindClan",g:"A"},
  {p:"Ash",c:"WindClan",g:"A"},
  {p:"White",c:"WindClan",g:"A"},
  {p:"Dead",c:"WindClan",g:"A"},
  {p:"Stag",c:"WindClan",g:"A"},
  {p:"Quail",c:"WindClan",g:"A"},
  {p:"Dawn",c:"WindClan",g:"A"},
  {p:"Hill",c:"WindClan",g:"A"},
  {p:"Crag",c:"WindClan",g:"A"},
  {p:"Fleet",c:"WindClan",g:"A"},
  {p:"Reed",c:"WindClan",g:"A"},
  {p:"Sedge",c:"WindClan",g:"A"},
  {p:"Whirl",c:"WindClan",g:"A"},
  {p:"Cloud",c:"WindClan",g:"A"},
  {p:"Slate",c:"WindClan",g:"A"},
  {p:"Bracken",c:"WindClan",g:"A"},
  {p:"Spire",c:"WindClan",g:"A"},
  {p:"Mist",c:"WindClan",g:"A"},
  {p:"Sky",c:"WindClan",g:"A"},
  {p:"Rabbit",c:"WindClan",g:"A"},
  {p:"Hazel",c:"WindClan",g:"F"},
  {p:"Ember",c:"WindClan",g:"A"},

  {p:"Misty",c:"RiverClan",g:"F"},
  {p:"Leopard",c:"RiverClan",g:"A"},
  {p:"Crooked",c:"RiverClan",g:"A"},
  {p:"Trout",c:"RiverClan",g:"A"},
  {p:"Hail",c:"RiverClan",g:"A"},
  {p:"Reed",c:"RiverClan",g:"A"},
  {p:"Stone",c:"RiverClan",g:"A"},
  {p:"Silver",c:"RiverClan",g:"A"},
  {p:"Willow",c:"RiverClan",g:"F"},
  {p:"Minnow",c:"RiverClan",g:"A"},
  {p:"Heron",c:"RiverClan",g:"A"},
  {p:"Otter",c:"RiverClan",g:"A"},
  {p:"Vole",c:"RiverClan",g:"A"},
  {p:"Shell",c:"RiverClan",g:"A"},
  {p:"Wave",c:"RiverClan",g:"A"},
  {p:"Foam",c:"RiverClan",g:"A"},
  {p:"Lily",c:"RiverClan",g:"F"},
  {p:"Splash",c:"RiverClan",g:"A"},
  {p:"Petal",c:"RiverClan",g:"F"},
  {p:"Dusk",c:"RiverClan",g:"A"},
  {p:"Owl",c:"RiverClan",g:"A"},
  {p:"Moth",c:"RiverClan",g:"F"},
  {p:"Grey",c:"RiverClan",g:"A"},
  {p:"Ripple",c:"RiverClan",g:"A"},
  {p:"Beach",c:"RiverClan",g:"A"},
  {p:"Pebble",c:"RiverClan",g:"A"},
  {p:"Moss",c:"RiverClan",g:"A"},
  {p:"Cinder",c:"RiverClan",g:"A"},
  {p:"Marsh",c:"RiverClan",g:"A"},
  {p:"Fen",c:"RiverClan",g:"A"},
  {p:"Sedge",c:"RiverClan",g:"A"},
  {p:"Brook",c:"RiverClan",g:"A"},
  {p:"Swirl",c:"RiverClan",g:"A"},
  {p:"Dawn",c:"RiverClan",g:"A"},
  {p:"Ice",c:"RiverClan",g:"A"},
  {p:"Birch",c:"RiverClan",g:"A"},
  {p:"Lichen",c:"RiverClan",g:"A"},
  {p:"Aspen",c:"RiverClan",g:"A"},
  {p:"Tide",c:"RiverClan",g:"A"},

  {p:"Black",c:"ShadowClan",g:"A"},
  {p:"Tiger",c:"ShadowClan",g:"A"},
  {p:"Broken",c:"ShadowClan",g:"A"},
  {p:"Night",c:"ShadowClan",g:"A"},
  {p:"Ragged",c:"ShadowClan",g:"A"},
  {p:"Cedar",c:"ShadowClan",g:"A"},
  {p:"Marsh",c:"ShadowClan",g:"A"},
  {p:"Smoke",c:"ShadowClan",g:"A"},
  {p:"Ash",c:"ShadowClan",g:"A"},
  {p:"Rat",c:"ShadowClan",g:"A"},
  {p:"Snake",c:"ShadowClan",g:"A"},
  {p:"Snipe",c:"ShadowClan",g:"A"},
  {p:"Toad",c:"ShadowClan",g:"A"},
  {p:"Flint",c:"ShadowClan",g:"A"},
  {p:"Wasp",c:"ShadowClan",g:"A"},
  {p:"Claw",c:"ShadowClan",g:"A"},
  {p:"Russet",c:"ShadowClan",g:"A"},
  {p:"Dusk",c:"ShadowClan",g:"A"},
  {p:"Stumpy",c:"ShadowClan",g:"A"},
  {p:"Pine",c:"ShadowClan",g:"A"},
  {p:"Rowan",c:"ShadowClan",g:"A"},
  {p:"Yellow",c:"ShadowClan",g:"F"},
  {p:"Little",c:"ShadowClan",g:"A"},
  {p:"Dark",c:"ShadowClan",g:"A"},
  {p:"Frog",c:"ShadowClan",g:"A"},
  {p:"Hollow",c:"ShadowClan",g:"A"},
  {p:"Owl",c:"ShadowClan",g:"A"},
  {p:"Tawny",c:"ShadowClan",g:"A"},
  {p:"Dawn",c:"ShadowClan",g:"F"},
  {p:"Bramble",c:"ShadowClan",g:"A"},
  {p:"Stump",c:"ShadowClan",g:"A"},
  {p:"Puddle",c:"ShadowClan",g:"A"},
  {p:"Fir",c:"ShadowClan",g:"A"},
  {p:"Crow",c:"ShadowClan",g:"A"},
  {p:"Tangle",c:"ShadowClan",g:"A"},
  {p:"Spike",c:"ShadowClan",g:"A"},
  {p:"Mud",c:"ShadowClan",g:"A"},

  {p:"Leaf",c:"SkyClan",g:"A"},
  {p:"Sky",c:"SkyClan",g:"A"},
  {p:"Cloud",c:"SkyClan",g:"A"},
  {p:"Buzzard",c:"SkyClan",g:"A"},
  {p:"Robin",c:"SkyClan",g:"A"},
  {p:"Sparrow",c:"SkyClan",g:"A"},
  {p:"Fallow",c:"SkyClan",g:"A"},
  {p:"Bird",c:"SkyClan",g:"A"},
  {p:"Creek",c:"SkyClan",g:"A"},
  {p:"Acorn",c:"SkyClan",g:"A"},
  {p:"Patch",c:"SkyClan",g:"A"},
  {p:"Mint",c:"SkyClan",g:"A"},
  {p:"Turtle",c:"SkyClan",g:"F"},
  {p:"Sharp",c:"SkyClan",g:"A"},
  {p:"Bob",c:"SkyClan",g:"A"},
  {p:"Tree",c:"SkyClan",g:"A"},
  {p:"Echo",c:"SkyClan",g:"A"},
  {p:"Dew",c:"SkyClan",g:"A"},
  {p:"Rain",c:"SkyClan",g:"F"},
  {p:"Bramble",c:"SkyClan",g:"A"},
  {p:"Pine",c:"SkyClan",g:"A"},
  {p:"Fir",c:"SkyClan",g:"A"},
  {p:"Hazel",c:"SkyClan",g:"A"},
  {p:"Violet",c:"SkyClan",g:"F"},
  {p:"Dawn",c:"SkyClan",g:"A"},
  {p:"Mist",c:"SkyClan",g:"A"},
  {p:"Rock",c:"SkyClan",g:"A"},
  {p:"Bough",c:"SkyClan",g:"A"},
  {p:"Willow",c:"SkyClan",g:"A"},
  {p:"Moss",c:"SkyClan",g:"A"},
  {p:"Sage",c:"SkyClan",g:"A"},
  {p:"Cinder",c:"SkyClan",g:"A"},
  {p:"Pebble",c:"SkyClan",g:"A"},
  {p:"Aspen",c:"SkyClan",g:"A"},
  {p:"Lark",c:"SkyClan",g:"A"},
  {p:"Fern",c:"SkyClan",g:"F"},
  {p:"Curlew",c:"SkyClan",g:"A"},
  {p:"Owl",c:"SkyClan",g:"A"}
];

var SUFFIX = "star";

var COATS = [
  "ginger-and-white","dark gray","pale silver","mottled brown",
  "jet black","snowy white","dappled tortoiseshell","smoky blue-gray",
  "warm brown tabby","speckled tortie","cream-and-ginger","striped tabby",
  "sandy ticked","flame-pointed","patched silver","ash-gray",
  "tortoiseshell","tawny","smoke","dappled gray"
];

var EYES = [
  "bright green","deep amber","pale gold","icy blue",
  "copper","dark hazel","pale gray-green","sun-yellow",
  "forest green","mossy green","warm amber","sea-green"
];

var HISTORIES = [
  "Rose from deputy after the previous leader fell ill.",
  "Won the role in a clan meeting held under a half-moon.",
  "Inherited leadership from a mentor who named her at the dawn of her ninth life.",
  "Led a single patrol into exile and returned to claim the leadership.",
  "Took over after a bitter dispute left the clan without direction.",
  "Earned nine lives young, following a warrior code the elders still question.",
  "Walked the nine-life path after a battle that changed the clan's borders.",
  "Was named leader by StarClan in a vision the medicine cat still struggles to read."
];

var STRENGTHS = [
  "hunting through undergrowth so thick other cats give up",
  "reading scent in rain and wind",
  "sensing a predator's approach before any patrol sees it",
  "commanding a battle line without a single yowl",
  "spotting sickness in a warrior before symptoms show",
  "running the longest border in a single night",
  "navigating fog and finding the way back to camp",
  "training apprentices faster than any leader before",
  "remembering territory trails after decades away",
  "calming a clan at war with a single quiet sentence",
  "picking the right deputy from a long line of candidates",
  "reading a liar in two tail flicks"
];

var TRAITS = {
  Any: [
    "quick to defend an outsider they believe in",
    "careful with words at Gatherings",
    "the first to break up a fight in the camp",
    "a cat who patrols the borders twice when no one asks",
    "soft-spoken until the clan is in danger",
    "strict about apprentice training, lenient with elders",
    "calculating in peace, reckless in battle",
    "the cat whose warriors would follow into a fox den",
    "trusts the deputy with everything but fear",
    "rules with a steady voice and sharper claws underneath",
    "the first to listen, the last to apologize",
    "hard on themselves, fair to the clan",
    "remembers every name of every cat who served under them",
    "speaks in fewer words than most, lands every one of them"
  ],
  Forest: [
    "moves through oak and bramble like part of the forest",
    "knows every trail by scent and starlight"
  ],
  Water: [
    "swims before council and arrives with fish scales on their paws",
    "reads the river's mood before reading anyone's face"
  ],
  Shadow: [
    "speaks rarely, lands every word where it counts",
    "knows a hundred ways to wait, and one way to act"
  ],
  Moor: [
    "carries the wind in their lungs and the speed in their legs",
    "runs the longest border before the sun touches the moor"
  ],
  Sky: [
    "knows the canopy the way a kit knows the nursery",
    "climbs where other leaders would call a patrol"
  ],
  Courage: [
    "first into the breach, last to leave it",
    "fights when wisdom says to wait"
  ],
  Patience: [
    "waits through three moons for the right moment",
    "lets a battle cool before moving"
  ],
  Cunning: [
    "wins with a plan, not a yowl",
    "knows a warrior's weakness in two heartbeats"
  ],
  Tracker: [
    "reads scent in rain and wind",
    "follows a trail a fox wouldn't notice"
  ]
};

var CLAN_FIT = {
  ThunderClan: [
    "fits a forest clan that prides itself on loyalty and brute courage",
    "suits a leadership that watches over apprentices and elders with equal care",
    "sits naturally at the head of a camp built around oak and bramble"
  ],
  RiverClan: [
    "matches a water-clan leadership that prizes sleek grace and a steady eye",
    "feels right for a clan that tests every leader against the river's mood",
    "carries the cool patience of a leader who swims before council"
  ],
  ShadowClan: [
    "reads as a marsh-born leader who treats silence as strategy",
    "carries the careful, watchful tone ShadowClan asks of its ruling cats",
    "suits a leadership that decides in shadows and moves before dawn"
  ],
  WindClan: [
    "belongs on the open moor, where decisions follow the wind",
    "reads as a tall, fast leader who outruns trouble on four paws",
    "sits easily at the head of a tunnel-fighter's clan"
  ],
  SkyClan: [
    "fits a tree-bound leadership that prizes climbing and trust",
    "suits a clan rebuilt from exile, where every cat knows the cost of home",
    "matches a leadership that watches the horizon for friends and threats"
  ]
};

function pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function filterPrefixes(opts){
  var list = PREFIXES.slice();
  if(opts.clan && opts.clan !== "All"){
    list = list.filter(function(x){return x.c === opts.clan;});
  }
  if(opts.gender && opts.gender !== "She-cat"){
    list = list.filter(function(x){return x.g !== "F";});
  }
  if(list.length === 0){
    list = PREFIXES.slice();
    if(opts.clan && opts.clan !== "All"){
      list = list.filter(function(x){return x.c === opts.clan;});
    }
  }
  return list;
}

function determineGender(prefix, userGender){
  if(userGender === "Tom" || userGender === "She-cat") return userGender;
  return prefix.g === "F" ? "She-cat" : "Tom";
}

function buildProfile(prefix, opts){
  var gender = determineGender(prefix, opts.gender);
  var coat = pick(COATS);
  var eyes = pick(EYES);
  var history = pick(HISTORIES);
  var strength = pick(STRENGTHS);
  var clanFit = pick(CLAN_FIT[prefix.c]);
  var traitPool = TRAITS[opts.theme] ? TRAITS[opts.theme].concat(TRAITS.Any) : TRAITS.Any;
  var trait = pick(traitPool);

  var name = prefix.p + SUFFIX;
  var pronoun = gender === "Tom" ? "he" : "she";
  var profile =
    "A " + gender.toLowerCase() + " with a " + coat + " coat and " + eyes + " eyes. " +
    "Known for being " + trait + ". " +
    history + " " +
    "Strength: " + strength + ". " +
    "Clan fit: " + clanFit + ".";

  return {
    name: name,
    prefix: prefix.p,
    clan: prefix.c,
    gender: gender,
    coat: coat,
    eyes: eyes,
    trait: trait,
    history: history,
    strength: strength,
    clanFit: clanFit,
    profile: profile,
    pronoun: pronoun
  };
}

function generateOne(opts){
  var pool = filterPrefixes(opts);
  var prefix = pick(pool);
  return buildProfile(prefix, opts);
}

function generateMany(opts, count){
  var results = [];
  var used = {};
  var guard = 0;
  while(results.length < count && guard < count * 20){
    var r = generateOne(opts);
    if(!used[r.name]){
      used[r.name] = true;
      results.push(r);
    }
    guard++;
  }
  return results;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c];
  });
}

function formatForExport(item){
  return item.name + " (" + item.clan + ", " + item.gender + ")\n" + item.profile;
}

function copyText(text){
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text).catch(function(){});
    return;
  }
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly","");
  ta.style.position = "absolute";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try{document.execCommand("copy");}catch(e){}
  document.body.removeChild(ta);
}

function showToast(msg){
  var t = document.getElementById("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function(){t.classList.remove("show");},1800);
}

function renderCard(item, idx){
  return '<div class="leader-card" data-idx="'+idx+'">'+
    '<span class="card-clan-tag">'+escapeHtml(item.clan)+'</span>'+
    '<span class="card-name">'+escapeHtml(item.name)+'</span>'+
    '<span class="card-gender">'+escapeHtml(item.gender)+'</span>'+
    '<p class="card-profile">'+escapeHtml(item.profile)+'</p>'+
    '<button class="copy-card-btn" data-idx="'+idx+'" type="button">Copy</button>'+
  '</div>';
}

function renderAll(items){
  var area = document.getElementById("resultArea");
  if(!items.length){
    area.innerHTML = '<div class="leader-card placeholder"><span class="ph-text">Press Generate to roll leaders</span></div>';
    return;
  }
  area.innerHTML = items.map(function(it,i){return renderCard(it,i);}).join("");
  area.querySelectorAll(".copy-card-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      var idx = parseInt(btn.getAttribute("data-idx"),10);
      var item = items[idx];
      copyText(formatForExport(item));
      showToast("Copied " + item.name);
    });
  });
  area.classList.remove("flip");
  void area.offsetWidth;
  area.classList.add("flip");
}

function getFormOpts(){
  var f = document.getElementById("genForm");
  return {
    clan: f.elements["clan"].value,
    gender: f.elements["gender"].value,
    theme: f.elements["theme"].value
  };
}

function onGenerate(){
  var opts = getFormOpts();
  var count = parseInt(document.getElementById("countSel").value,10) || 3;
  var items = generateMany(opts, count);
  window.__lastResults = items;
  renderAll(items);
  showToast("Generated " + items.length + " leader name" + (items.length>1?"s":""));
}

function onExport(){
  var items = window.__lastResults || [];
  if(!items.length){
    showToast("Generate first");
    return;
  }
  var text = items.map(formatForExport).join("\n\n");
  copyText(text);
  showToast("Exported " + items.length + " name" + (items.length>1?"s":""));
}

function bindEvents(){
  var gen = document.getElementById("generateBtn");
  var exp = document.getElementById("exportBtn");
  if(gen) gen.addEventListener("click", onGenerate);
  if(exp) exp.addEventListener("click", onExport);
  document.querySelectorAll(".faq-toggle").forEach(function(btn){
    btn.addEventListener("click", function(){
      var id = btn.getAttribute("aria-controls");
      var ans = document.getElementById(id);
      var open = ans.style.display === "block";
      ans.style.display = open ? "none" : "block";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      btn.querySelector(".faq-icon").textContent = open ? "+" : "\u2212";
    });
  });
}

document.addEventListener("DOMContentLoaded", function(){
  bindEvents();
  onGenerate();
});
})();
