(function(){
var prefixes=["Bramble","Fern","Clover","Soot","Lion","Tiger","Dapple","Frost","Amber","Mist","Holly","Raven","Storm","Thistle","Willow","Ember","Hawk","Dusk","Poppy","Sorrel","Birch","Cedar","Ash","Rowan","Flint","Moss","Otter","Reed","Shade","Seed","Lichen","Pine","Quail","Ripple","Snake","Spider","Swift","Trout","Vole","Wasp","Yarrow","Cricket","Hazel","Maple","Rain","Sky","Slate","Wren"];
var suffixes=["fur","claw","heart","foot","tail","stripe","leap","shadow","whisker","flower","pool","fern","breeze","song","pelt","mask","shine","nose","ear","flight","feather","storm","blaze","brook","dawn","moon","petal","cloud","spirit","thorn","wing","fang","tuft","ripple","splash","leaf","branch","spring"];
var furColors=["#C49A6C","#8B5A2B","#A5673F","#D48C54","#B87333","#6F4A2E","#AC8E68","#E3B87C","#5D4A2C","#AA7C4A","#CC9966","#9C6B3E","#7C5C3A","#3B2A1F","#808080","#2E2E2E","#F5F5F5","#E5942B","#DAB07A","#A06A3B","#CF8E5A","#84613B"];
var eyeColors=["#C9B45B","#6A9C78","#4B7BA0","#D49B3B","#B87333","#5F8B6F","#E6B422","#7F6E48","#7A9C6E"];
var patterns=["striped","spotted","solid"];

var currentFur=["#C49A6C","#8B5A2B","#A5673F","#84613B","#AC8E68","#808080","#DAB07A","#E3B87C"];
var currentEyes=["#C9B45B","#6A9C78","#4B7BA0","#7F6E48","#E6B422","#4B7BA0","#5F8B6F","#D49B3B"];
var currentPattern=["striped","spotted","solid","solid","spotted","striped","solid","solid"];

var defaultCats=[
  {name:"Firestar",fur:"#E5942B",eyes:"#6A9C78",pattern:"solid",role:"Warrior"},
  {name:"Spottedleaf",fur:"#D48C54",eyes:"#C9B45B",pattern:"spotted",role:"Medicine Cat"},
  {name:"Bramblepaw",fur:"#8B5A2B",eyes:"#C9B45B",pattern:"striped",role:"Apprentice"},
  {name:"One-eye",fur:"#808080",eyes:"#4B7BA0",pattern:"solid",role:"Elder"},
  {name:"Mosskit",fur:"#AC8E68",eyes:"#E6B422",pattern:"spotted",role:"Kit"},
  {name:"Bluestar",fur:"#808080",eyes:"#4B7BA0",pattern:"striped",role:"Leader"},
  {name:"Sol",fur:"#DAB07A",eyes:"#5F8B6F",pattern:"solid",role:"Loner/Rogue"},
  {name:"Goldenflower",fur:"#E3B87C",eyes:"#D49B3B",pattern:"solid",role:"Queen"}
];

var kitSuffixes=["kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit"];
var leaderSuffixes=["star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star"];
var lonerNames=["Sol","Stripe","Patch","Bounce","Smudge","Hattie","Jake","Smoky","Tigerstar","Darkstripe","Mapleshade","Silverstream","Yellowfang","Stonefur","Stormfur","Brook","Shrewpaw","Mothwing","Mudclaw","Clawface","Clawpelt","Mossfire","Ravenpaw"];
var queenSuffixes=["flower","petal","light","dawn","breeze","leaf","berry","honey","sun","moon","cloud","drop","dew","seed","fern","moss","blossom","bloom","bloom","heart","spirit","shine","nest","mother"];

var roleSuffixes={"Warrior":["claw","heart","stripe","leap","shadow","whisker","flower","breeze","song","pelt","shine","flight","feather","storm","blaze","dawn","petal","cloud","thorn","wing","fang","leaf","branch"],"Medicine Cat":["pool","fern","mask","nose","ear","brook","moon","splash","ripple","tuft","berry","root","dew","mist","whisper","dream","gaze","breath","light","herb","petal","shade","stream"],"Apprentice":["paw","stride","step","trail","path","bound","dash","scout","seeker","watcher","tender","runner","climber","fisher","hunter","fighter","gatherer","patrol","prowler","stalker","tracker","drift","swift"],"Elder":["tail","pelt","fur","coat","whisker","tooth","claw","eye","gaze","breath","step","rest","shade","dust","stone","bark","moss","cloud","frost","snow","ember","dusk","fall"],"Kit":["kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit","kit"],"Leader":["star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star"],"Loner/Rogue":[""],"Queen":["flower","petal","light","dawn","breeze","leaf","berry","honey","sun","moon","cloud","drop","dew","seed","fern","moss","blossom","bloom","heart","spirit","shine","nest"]};

var furMap={"#C49A6C":"sandy brown","#8B5A2B":"warm chestnut","#A5673F":"russet","#D48C54":"golden amber","#B87333":"copper","#6F4A2E":"deep umber","#AC8E68":"fawn","#E3B87C":"pale honey","#5D4A2C":"rich earth","#AA7C4A":"tawny","#CC9966":"light bronze","#9C6B3E":"bark","#7C5C3A":"muddy brown","#3B2A1F":"dark shadow","#808080":"slate gray","#2E2E2E":"charcoal black","#F5F5F5":"snow white","#E5942B":"fiery ginger","#DAB07A":"soft cream","#A06A3B":"cinnamon","#CF8E5A":"peach-fur","#84613B":"dusty brown"};
var eyeMap={"#C9B45B":"golden amber","#6A9C78":"deep moss green","#4B7BA0":"icy blue","#D49B3B":"bright sun","#B87333":"copper","#5F8B6F":"forest green","#E6B422":"yellow blaze","#7F6E48":"hazel","#7A9C6E":"pale jade"};

function generateName(role){
  if(role==="Loner/Rogue"){
    var lonerPool=["Sol","Stripe","Patch","Bounce","Smudge","Hattie","Jake","Smoky","Ravenpaw","Barley","Purdy","Raven","Flametail","Stick","Crow","Hawk","Owl","Sparrow","Jay","Wren","Robin","Pebble","Stone"];
    return lonerPool[Math.floor(Math.random()*lonerPool.length)];
  }
  var pool=(role && roleSuffixes[role])?roleSuffixes[role]:suffixes;
  return prefixes[Math.floor(Math.random()*prefixes.length)]+pool[Math.floor(Math.random()*pool.length)];
}

function randomAppearance(idx){
  currentFur[idx]=furColors[Math.floor(Math.random()*furColors.length)];
  currentEyes[idx]=eyeColors[Math.floor(Math.random()*eyeColors.length)];
  currentPattern[idx]=patterns[Math.floor(Math.random()*patterns.length)];
}

function shadeColor(c,p){
  var R=parseInt(c.substring(1,3),16),G=parseInt(c.substring(3,5),16),B=parseInt(c.substring(5,7),16);
  R=Math.min(255,Math.max(0,R+R*p/100));
  G=Math.min(255,Math.max(0,G+G*p/100));
  B=Math.min(255,Math.max(0,B+B*p/100));
  return "rgb("+Math.floor(R)+","+Math.floor(G)+","+Math.floor(B)+")";
}

function drawCat(idx,role){
  var canvas=document.getElementById("catCanvas"+idx);
  if(!canvas)return;
  var ctx=canvas.getContext("2d");
  var w=180,h=180;
  var s=w/280;
  var fur=currentFur[idx-1];
  var eyes=currentEyes[idx-1];
  var pat=currentPattern[idx-1];
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="#FDF8F0";ctx.fillRect(0,0,w,h);

  var headR=85,headY=150,eyeW=14,eyeH=18,pupilR=4,earH1=53,earH2=48;
  if(role==="Apprentice"){headR=78;headY=145;eyeW=16;eyeH=21;pupilR=5;earH1=45;earH2=40;}
  if(role==="Elder"){headR=82;headY=155;eyeW=12;eyeH=15;pupilR=3;earH1=48;earH2=43;}
  if(role==="Kit"){headR=70;headY=140;eyeW=17;eyeH=23;pupilR=6;earH1=40;earH2=35;}
  if(role==="Leader"){headR=90;headY=152;eyeW=15;eyeH=19;pupilR=5;earH1=58;earH2=53;}
  if(role==="Loner/Rogue"){headR=87;headY=151;eyeW=13;eyeH=17;pupilR=3;earH1=55;earH2=50;}
  if(role==="Queen"){headR=83;headY=149;eyeW=14;eyeH=19;pupilR=4;earH1=51;earH2=46;}

  ctx.beginPath();ctx.moveTo(70*s,headY-82*s);ctx.lineTo(45*s,(headY-82*s)-earH1*s);ctx.lineTo(100*s,(headY-82*s)-earH1*s+30*s);ctx.fillStyle=fur;ctx.fill();
  ctx.beginPath();ctx.moveTo(210*s,headY-82*s);ctx.lineTo(235*s,(headY-82*s)-earH1*s);ctx.lineTo(180*s,(headY-82*s)-earH1*s+30*s);ctx.fill();
  ctx.beginPath();ctx.moveTo(72*s,headY-84*s);ctx.lineTo(55*s,(headY-84*s)-earH2*s);ctx.lineTo(95*s,(headY-84*s)-earH2*s+20*s);ctx.fillStyle=shadeColor(fur,-25);ctx.fill();
  ctx.beginPath();ctx.moveTo(208*s,headY-84*s);ctx.lineTo(225*s,(headY-84*s)-earH2*s);ctx.lineTo(185*s,(headY-84*s)-earH2*s+20*s);ctx.fill();

  if(role==="Elder"){
    ctx.beginPath();ctx.moveTo(68*s,headY-80*s);ctx.lineTo(50*s,(headY-80*s)-40*s);ctx.fillStyle="#b0b0b0";ctx.globalAlpha=0.3;ctx.fill();ctx.globalAlpha=1;
    ctx.beginPath();ctx.moveTo(212*s,headY-80*s);ctx.lineTo(230*s,(headY-80*s)-40*s);ctx.fill();
  }

  ctx.beginPath();ctx.arc(140*s,headY*s,headR*s,0,Math.PI*2);ctx.fillStyle=fur;ctx.fill();
  ctx.strokeStyle=shadeColor(fur,-15);ctx.lineWidth=1.5;ctx.stroke();

  if(role==="Warrior"){
    ctx.beginPath();ctx.arc(140*s,headY*s,headR*s*0.92,0,Math.PI*2);ctx.fillStyle=shadeColor(fur,8);ctx.globalAlpha=0.15;ctx.fill();ctx.globalAlpha=1;
  }

  ctx.fillStyle=shadeColor(fur,-10);
  ctx.beginPath();ctx.ellipse(70*s,170*s,18*s,24*s,-0.2,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(210*s,170*s,18*s,24*s,0.2,0,Math.PI*2);ctx.fill();

  var eyeY=headY-15;
  ctx.beginPath();ctx.ellipse(105*s,eyeY*s,eyeW*s,eyeH*s,0,0,Math.PI*2);ctx.fillStyle="#FEF7E6";ctx.fill();
  ctx.beginPath();ctx.ellipse(175*s,eyeY*s,eyeW*s,eyeH*s,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(105*s,eyeY*s,(eyeW-5)*s,(eyeH-6)*s,0,0,Math.PI*2);ctx.fillStyle=eyes;ctx.fill();
  ctx.beginPath();ctx.ellipse(175*s,eyeY*s,(eyeW-5)*s,(eyeH-6)*s,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#111";
  ctx.beginPath();ctx.arc(105*s,eyeY*s,pupilR*s,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(175*s,eyeY*s,pupilR*s,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#fff";
  ctx.beginPath();ctx.arc((105-5)*s,(eyeY-5)*s,2*s,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc((175-5)*s,(eyeY-5)*s,2*s,0,Math.PI*2);ctx.fill();

  if(role==="Warrior"){
    ctx.beginPath();ctx.moveTo(88*s,(eyeY-10)*s);ctx.lineTo(120*s,(eyeY-6)*s);ctx.strokeStyle=shadeColor(fur,-40);ctx.lineWidth=2.5*s;ctx.stroke();
    ctx.beginPath();ctx.moveTo(192*s,(eyeY-10)*s);ctx.lineTo(160*s,(eyeY-6)*s);ctx.stroke();
    ctx.strokeStyle="#8B4513";ctx.lineWidth=2*s;
    ctx.beginPath();ctx.moveTo(93*s,(eyeY-2)*s);ctx.lineTo(115*s,eyeY*s);ctx.stroke();
  }
  if(role==="Medicine Cat"){
    ctx.beginPath();ctx.arc(140*s,(eyeY-12)*s,4*s,0,Math.PI*2);ctx.fillStyle="#E6B422";ctx.globalAlpha=0.6;ctx.fill();ctx.globalAlpha=1;
    ctx.beginPath();ctx.moveTo(137*s,(eyeY-16)*s);ctx.lineTo(140*s,(eyeY-22)*s);ctx.lineTo(143*s,(eyeY-16)*s);ctx.fillStyle="#E6B422";ctx.globalAlpha=0.5;ctx.fill();ctx.globalAlpha=1;
  }
  if(role==="Apprentice"){
    ctx.beginPath();ctx.arc(105*s,eyeY*s,(pupilR+2)*s,0,Math.PI*2);ctx.fillStyle="#fff";ctx.globalAlpha=0.3;ctx.fill();ctx.globalAlpha=1;
    ctx.beginPath();ctx.arc(175*s,eyeY*s,(pupilR+2)*s,0,Math.PI*2);ctx.fill();
  }
  if(role==="Elder"){
    ctx.fillStyle="#C0C0C0";ctx.globalAlpha=0.35;
    ctx.beginPath();ctx.ellipse(140*s,(eyeY+30)*s,35*s,20*s,0,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
  }
  if(role==="Kit"){
    ctx.fillStyle="#FFE4B5";ctx.globalAlpha=0.3;
    ctx.beginPath();ctx.arc(120*s,(eyeY+25)*s,8*s,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(160*s,(eyeY+25)*s,8*s,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
    ctx.beginPath();ctx.arc(140*s,(eyeY+5)*s,7*s,0,Math.PI*2);ctx.fillStyle="#FFB6C1";ctx.globalAlpha=0.4;ctx.fill();
    ctx.globalAlpha=1;
  }
  if(role==="Leader"){
    ctx.beginPath();ctx.arc(140*s,(eyeY-20)*s,6*s,0,Math.PI*2);ctx.fillStyle="#FFD700";ctx.globalAlpha=0.7;ctx.fill();
    ctx.globalAlpha=1;
    ctx.strokeStyle="#DAA520";ctx.lineWidth=2*s;
    ctx.beginPath();ctx.arc(140*s,(eyeY-20)*s,10*s,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle=shadeColor(fur,-20);
    ctx.beginPath();ctx.moveTo(130*s,(headY-90)*s);ctx.lineTo(140*s,(headY-100)*s);ctx.lineTo(150*s,(headY-90)*s);ctx.fill();
  }
  if(role==="Loner/Rogue"){
    ctx.strokeStyle="#5A5A5A";ctx.lineWidth=1.5*s;
    ctx.beginPath();ctx.moveTo(110*s,(eyeY+5)*s);ctx.lineTo(95*s,(eyeY+12)*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(170*s,(eyeY+3)*s);ctx.lineTo(185*s,(eyeY+10)*s);ctx.stroke();
    ctx.fillStyle=shadeColor(fur,-35);
    ctx.beginPath();ctx.ellipse(115*s,(headY+20)*s,8*s,6*s,0,0,Math.PI*2);ctx.fill();
  }
  if(role==="Queen"){
    ctx.fillStyle="#FFDAB9";ctx.globalAlpha=0.35;
    ctx.beginPath();ctx.ellipse(140*s,(eyeY+15)*s,12*s,8*s,0,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
    ctx.strokeStyle=shadeColor(fur,-15);ctx.lineWidth=1.5*s;
    ctx.beginPath();ctx.moveTo(125*s,(headY-70)*s);ctx.quadraticCurveTo(135*s,(headY-78)*s,140*s,(headY-70)*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(155*s,(headY-70)*s);ctx.quadraticCurveTo(145*s,(headY-78)*s,140*s,(headY-70)*s);ctx.stroke();
  }

  ctx.beginPath();ctx.moveTo(136*s,175*s);ctx.lineTo(144*s,175*s);ctx.lineTo(140*s,183*s);ctx.fillStyle="#D97A5C";ctx.fill();
  ctx.beginPath();ctx.moveTo(140*s,183*s);ctx.lineTo(130*s,195*s);ctx.lineTo(140*s,190*s);ctx.lineTo(150*s,195*s);ctx.lineTo(140*s,183*s);ctx.strokeStyle="#4b2f1a";ctx.lineWidth=1.8;ctx.stroke();

  ctx.beginPath();ctx.moveTo(70*s,155*s);ctx.lineTo(30*s,148*s);ctx.moveTo(70*s,165*s);ctx.lineTo(28*s,168*s);ctx.moveTo(210*s,155*s);ctx.lineTo(250*s,148*s);ctx.moveTo(210*s,165*s);ctx.lineTo(252*s,168*s);ctx.strokeStyle="#6A5A4A";ctx.lineWidth=1.2;ctx.stroke();

  if(pat==="striped"){
    ctx.fillStyle=shadeColor(fur,-30);
    ctx.beginPath();ctx.moveTo(120*s,95*s);ctx.lineTo(140*s,105*s);ctx.lineTo(130*s,115*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(155*s,97*s);ctx.lineTo(170*s,108*s);ctx.lineTo(162*s,118*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(95*s,120*s);ctx.lineTo(110*s,130*s);ctx.lineTo(90*s,137*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(185*s,120*s);ctx.lineTo(170*s,130*s);ctx.lineTo(190*s,137*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(125*s,84*s);ctx.lineTo(140*s,94*s);ctx.lineTo(132*s,102*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(155*s,84*s);ctx.lineTo(140*s,94*s);ctx.lineTo(148*s,102*s);ctx.fill();
  }else if(pat==="spotted"){
    for(var i=0;i<18;i++){
      var sx=(80+Math.random()*120)*s,sy=(100+Math.random()*100)*s;
      var dx=sx-140*s,dy=sy-headY*s;
      if(Math.sqrt(dx*dx+dy*dy)<(headR-10)*s&&sy>100*s){
        ctx.beginPath();ctx.arc(sx,sy,(3+Math.random()*4)*s,0,Math.PI*2);ctx.fillStyle=shadeColor(fur,-35);ctx.fill();
      }
    }
  }else{
    ctx.beginPath();ctx.ellipse(140*s,headY*s-2,62*s,70*s,0,0,Math.PI*2);ctx.fillStyle=shadeColor(fur,-12);ctx.globalAlpha=0.25;ctx.fill();ctx.globalAlpha=1;
  }

  ctx.globalAlpha=0.2;ctx.fillStyle="#b5725c";
  ctx.beginPath();ctx.arc(85*s,168*s,8*s,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(195*s,168*s,8*s,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=1;

  if(role==="Warrior"){
    ctx.beginPath();ctx.moveTo(118*s,(eyeY+2)*s);ctx.lineTo(128*s,(eyeY+8)*s);ctx.lineTo(122*s,(eyeY+14)*s);ctx.strokeStyle="#8B4513";ctx.lineWidth=1.5*s;ctx.stroke();
  }
  if(role==="Medicine Cat"){
    ctx.fillStyle="#4a7c3f";
    ctx.beginPath();ctx.ellipse(232*s,(headY-82*s-5)*s,6*s,10*s,0.3,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle="#3a6c2f";ctx.lineWidth=1*s;
    ctx.beginPath();ctx.moveTo(232*s,(headY-82*s-15)*s);ctx.lineTo(232*s,(headY-82*s+5)*s);ctx.stroke();
  }
  if(role==="Apprentice"){
    ctx.fillStyle=eyes;ctx.globalAlpha=0.15;
    ctx.beginPath();ctx.arc(140*s,(eyeY+25)*s,12*s,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
  }
  if(role==="Elder"){
    ctx.strokeStyle="#999";ctx.lineWidth=1*s;
    ctx.beginPath();ctx.moveTo(60*s,160*s);ctx.lineTo(20*s,155*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(60*s,168*s);ctx.lineTo(18*s,172*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(220*s,160*s);ctx.lineTo(260*s,155*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(220*s,168*s);ctx.lineTo(262*s,172*s);ctx.stroke();
  }
}

function getImageDescription(furHex,eyeHex,pattern,name,role){
  var furName=furMap[furHex]||"earthy brown";
  var eyeName=eyeMap[eyeHex]||"amber";
  var patternPretty=pattern==="striped"?"dark tabby stripes":(pattern==="spotted"?"small scattered spots":"smooth solid coat");
  var roleLabel="a warrior";
  if(role==="Medicine Cat")roleLabel="a medicine cat";
  else if(role==="Apprentice")roleLabel="an apprentice";
  else if(role==="Elder")roleLabel="an elder";
  else if(role==="Kit")roleLabel="a tiny kit";
  else if(role==="Leader")roleLabel="a noble leader";
  else if(role==="Loner/Rogue")roleLabel="a mysterious loner";
  else if(role==="Queen")roleLabel="a gentle queen";
  return name+" is "+roleLabel+" with "+furName+" fur, "+eyeName+" eyes, and a "+patternPretty+".";
}

function refreshAll(){
  var roles=["Warrior","Medicine Cat","Apprentice","Elder","Kit","Leader","Loner/Rogue","Queen"];
  for(var i=1;i<=8;i++){
    var newName=generateName(roles[i-1]);
    document.getElementById("catNameDisplay"+i).textContent=newName;
    randomAppearance(i-1);
    drawCat(i,roles[i-1]);
    var fullDesc=getImageDescription(currentFur[i-1],currentEyes[i-1],currentPattern[i-1],newName,roles[i-1]);
    document.getElementById("imageAltText"+i).innerHTML='<span class="description-text">'+fullDesc+'</span>';
    document.getElementById("catCanvas"+i).setAttribute("aria-label","Cat visual: "+fullDesc);
  }
}

function initDefault(){
  for(var i=1;i<=8;i++){
    var cat=defaultCats[i-1];
    currentFur[i-1]=cat.fur;
    currentEyes[i-1]=cat.eyes;
    currentPattern[i-1]=cat.pattern;
    document.getElementById("catNameDisplay"+i).textContent=cat.name;
    drawCat(i,cat.role);
    var fullDesc=getImageDescription(cat.fur,cat.eyes,cat.pattern,cat.name,cat.role);
    document.getElementById("imageAltText"+i).innerHTML='<span class="description-text">'+fullDesc+'</span>';
    document.getElementById("catCanvas"+i).setAttribute("aria-label","Cat visual: "+fullDesc);
  }
}

initDefault();

var generateBtn=document.getElementById("generateBtn");
if(generateBtn){
  generateBtn.addEventListener("click",function(){refreshAll();});
}

function copyCatInfo(idx){
  var name=document.getElementById("catNameDisplay"+idx).textContent;
  var btn=document.getElementById("copyBtn"+idx);

  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(name).then(function(){
      showCopiedState(btn);
    }).catch(function(){
      fallbackCopy(name,btn);
    });
  }else{
    fallbackCopy(name,btn);
  }
}
window.copyCatInfo=copyCatInfo;

function fallbackCopy(text,btn){
  try{
    var ta=document.createElement("textarea");
    ta.value=text;
    ta.style.position="fixed";
    ta.style.left="-9999px";
    document.body.appendChild(ta);
    ta.select();
    var copied=document.execCommand("copy");
    document.body.removeChild(ta);
    if(copied){
      showCopiedState(btn);
    }else{
      alert("Copy failed! Please copy: "+text);
    }
  }catch(e){
    alert("Copy failed! Please copy: "+text);
  }
}

function showCopiedState(btn){
  if(!btn)return;
  btn.classList.add("copied");
  btn.innerHTML='❤️ Copied';
  setTimeout(function(){
    if(btn){
      btn.classList.remove("copied");
      btn.innerHTML='❤️ Copy';
    }
  },1500);
}

var copyLinkBtn=document.getElementById("copyLinkBtn");
if(copyLinkBtn){
  copyLinkBtn.addEventListener("click",function(){
    var url=window.location.href;
    if(navigator.clipboard){
      navigator.clipboard.writeText(url).then(function(){
        copyLinkBtn.textContent="Copied!";
        setTimeout(function(){copyLinkBtn.textContent="Copy Link";},1500);
      }).catch(function(){
        copyLinkBtn.textContent="Failed";
        setTimeout(function(){copyLinkBtn.textContent="Copy Link";},1500);
      });
    }else{
      var ta=document.createElement("textarea");
      ta.value=url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      copyLinkBtn.textContent="Copied!";
      setTimeout(function(){copyLinkBtn.textContent="Copy Link";},1500);
    }
  });
}

var faqToggles=document.querySelectorAll(".faq-toggle");
for(var j=0;j<faqToggles.length;j++){
  (function(btn){
    btn.addEventListener("click",function(){
      var answer=btn.nextElementSibling;
      var icon=btn.querySelector(".faq-icon");
      if(answer.style.display==="block"){
        answer.style.display="none";
        icon.textContent="+";
        btn.setAttribute("aria-expanded","false");
      }else{
        answer.style.display="block";
        icon.textContent="\u2212";
        btn.setAttribute("aria-expanded","true");
      }
    });
  })(faqToggles[j]);
}
})();