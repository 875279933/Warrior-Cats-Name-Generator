(function(){
var prefixes=["Sarça","Feto","Trevo","Fuligem","Leão","Tigre","Malhado","Geada","Âmbar","Neblina","Azevinho","Corvo","Tempestade","Cardo","Salgueiro","Brasa","Falcão","Crepúsculo","Papoula","Azeda","Bétula","Cedro","Freixo","Revés","Pederneira","Musgo","Lontra","Junco","Sombra","Semente","Líquen","Pinheiro","Codorniz","Ondina","Cobra","Aranha","Vento","Truta","Rato","Vespa","Losna","Grilo","Aveleira","Ácer","Chuva","Céu","Ardósia","Carriça"];
var suffixes=["pelo","garra","coração","pata","cauda","listra","salto","sombra","bigode","flor","lagoa","feto","brisa","canto","pelagem","máscara","brilho","nariz","orelha","voo","pena","tempestade","chama","riacho","amanhecer","lua","pétala","nuvem","espírito","espinho","asa","presa","topete","encrespamento","respingo","folha","galho","nascente"];
var furColors=["#C49A6C","#8B5A2B","#A5673F","#D48C54","#B87333","#6F4A2E","#AC8E68","#E3B87C","#5D4A2C","#AA7C4A","#CC9966","#9C6B3E","#7C5C3A","#3B2A1F","#808080","#2E2E2E","#F5F5F5","#E5942B","#DAB07A","#A06A3B","#CF8E5A","#84613B"];
var eyeColors=["#C9B45B","#6A9C78","#4B7BA0","#D49B3B","#B87333","#5F8B6F","#E6B422","#7F6E48","#7A9C6E"];
var patterns=["listrado","malhado","sólido"];

var currentFur=["#C49A6C","#8B5A2B","#A5673F","#84613B","#AC8E68","#808080","#DAB07A","#E3B87C"];
var currentEyes=["#C9B45B","#6A9C78","#4B7BA0","#7F6E48","#E6B422","#4B7BA0","#5F8B6F","#D49B3B"];
var currentPattern=["listrado","malhado","sólido","sólido","malhado","listrado","sólido","sólido"];

var defaultCats=[
  {name:"Estrela de Fogo",fur:"#E5942B",eyes:"#6A9C78",pattern:"sólido",role:"Guerreiro"},
  {name:"Folha Malhada",fur:"#D48C54",eyes:"#C9B45B",pattern:"malhado",role:"Curandeiro"},
  {name:"Pata de Cardo",fur:"#8B5A2B",eyes:"#C9B45B",pattern:"listrado",role:"Aprendiz"},
  {name:"Um-olho",fur:"#808080",eyes:"#4B7BA0",pattern:"sólido",role:"Ancião"},
  {name:"Filhote de Musgo",fur:"#AC8E68",eyes:"#E6B422",pattern:"malhado",role:"Filhote"},
  {name:"Estrela Azul",fur:"#808080",eyes:"#4B7BA0",pattern:"listrado",role:"Líder"},
  {name:"Sol",fur:"#DAB07A",eyes:"#5F8B6F",pattern:"sólido",role:"Solitário"},
  {name:"Flor Dourada",fur:"#E3B87C",eyes:"#D49B3B",pattern:"sólido",role:"Rainha"}
];

var kitSuffixes=["filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote"];
var leaderSuffixes=["estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela"];
var lonerNames=["Sol","Listra","Patch","Pulo","Mancha","Hattie","Jake","Fumça","Pata de Corvo","Cevada","Purdy","Corvo","Rabo de Chama","Bastão","Corvo","Falcão","Coruja","Pardal","Gaio","Carriça","Petricão","Seixo","Pedra"];
var queenSuffixes=["flor","pétala","luz","amanhecer","brisa","folha","baga","mel","sol","lua","nuvem","gota","orvalho","semente","feto","musgo","botão","flor","coração","espírito","brilho","ninho","mãe"];

var roleSuffixes={"Guerreiro":["garra","coração","listra","salto","sombra","bigode","flor","brisa","canto","pelagem","brilho","voo","pena","tempestade","chama","amanhecer","pétala","nuvem","espinho","asa","presa","folha","galho"],"Curandeiro":["lagoa","feto","máscara","nariz","orelha","riacho","lua","respingo","encrespamento","topete","baga","raiz","orvalho","neblina","sussurro","sonho","olhar","respiração","luz","ervas","pétala","sombra","corrente"],"Aprendiz":["pata","passada","passo","trilha","caminho","salto","disparo","batedor","buscador","vigia","curador","corredor","escalador","pescador","caçador","lutador","coletor","patrulha","rastreador","pista","deriva","vento"],"Ancião":["cauda","pelagem","pelo","manto","bigode","dente","garra","olho","olhar","respiração","passo","descanso","sombra","pó","pedra","casca","musgo","nuvem","geada","neve","brasа","crepúsculo","queda"],"Filhote":["filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote","filhote"],"Líder":["estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela","estrela"],"Solitário":[""],"Rainha":["flor","pétala","luz","amanhecer","brisa","folha","baga","mel","sol","lua","nuvem","gota","orvalho","semente","feto","musgo","botão","flor","coração","espírito","brilho","ninho"]};

var furMap={"#C49A6C":"marrom arenoso","#8B5A2B":"castanho quente","#A5673F":"avermelhado","#D48C54":"âmbar dourado","#B87333":"cobre","#6F4A2E":"sombra profunda","#AC8E68":"cor de cervo","#E3B87C":"mel pálido","#5D4A2C":"terra rica","#AA7C4A":"acanelado","#CC9966":"bronze claro","#9C6B3E":"casca","#7C5C3A":"lamacento","#3B2A1F":"sombra escura","#808080":"cinza ardósia","#2E2E2E":"preto carvão","#F5F5F5":"branco neve","#E5942B":"gengibre ardente","#DAB07A":"creme suave","#A06A3B":"canela","#CF8E5A":"pêssego","#84613B":"marrom poeirento"};
var eyeMap={"#C9B45B":"âmbar dourado","#6A9C78":"verde musgo profundo","#4B7BA0":"azul gelado","#D49B3B":"sol brilhante","#B87333":"cobre","#5F8B6F":"verde floresta","#E6B422":"relâmpago amarelo","#7F6E48":"avelã","#7A9C6E":"jade pálido"};

function generateName(role){
  if(role==="Solitário"){
    var lonerPool=["Sol","Listra","Patch","Pulo","Mancha","Hattie","Jake","Fumça","Pata de Corvo","Cevada","Purdy","Corvo","Rabo de Chama","Bastão","Corvo","Falcão","Coruja","Pardal","Gaio","Carriça","Petricão","Seixo","Pedra"];
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
  if(role==="Aprendiz"){headR=78;headY=145;eyeW=16;eyeH=21;pupilR=5;earH1=45;earH2=40;}
  if(role==="Ancião"){headR=82;headY=155;eyeW=12;eyeH=15;pupilR=3;earH1=48;earH2=43;}
  if(role==="Filhote"){headR=70;headY=140;eyeW=17;eyeH=23;pupilR=6;earH1=40;earH2=35;}
  if(role==="Líder"){headR=90;headY=152;eyeW=15;eyeH=19;pupilR=5;earH1=58;earH2=53;}
  if(role==="Solitário"){headR=87;headY=151;eyeW=13;eyeH=17;pupilR=3;earH1=55;earH2=50;}
  if(role==="Rainha"){headR=83;headY=149;eyeW=14;eyeH=19;pupilR=4;earH1=51;earH2=46;}

  ctx.beginPath();ctx.moveTo(70*s,headY-82*s);ctx.lineTo(45*s,(headY-82*s)-earH1*s);ctx.lineTo(100*s,(headY-82*s)-earH1*s+30*s);ctx.fillStyle=fur;ctx.fill();
  ctx.beginPath();ctx.moveTo(210*s,headY-82*s);ctx.lineTo(235*s,(headY-82*s)-earH1*s);ctx.lineTo(180*s,(headY-82*s)-earH1*s+30*s);ctx.fill();
  ctx.beginPath();ctx.moveTo(72*s,headY-84*s);ctx.lineTo(55*s,(headY-84*s)-earH2*s);ctx.lineTo(95*s,(headY-84*s)-earH2*s+20*s);ctx.fillStyle=shadeColor(fur,-25);ctx.fill();
  ctx.beginPath();ctx.moveTo(208*s,headY-84*s);ctx.lineTo(225*s,(headY-84*s)-earH2*s);ctx.lineTo(185*s,(headY-84*s)-earH2*s+20*s);ctx.fill();

  if(role==="Ancião"){
    ctx.beginPath();ctx.moveTo(68*s,headY-80*s);ctx.lineTo(50*s,(headY-80*s)-40*s);ctx.fillStyle="#b0b0b0";ctx.globalAlpha=0.3;ctx.fill();ctx.globalAlpha=1;
    ctx.beginPath();ctx.moveTo(212*s,headY-80*s);ctx.lineTo(230*s,(headY-80*s)-40*s);ctx.fill();
  }

  ctx.beginPath();ctx.arc(140*s,headY*s,headR*s,0,Math.PI*2);ctx.fillStyle=fur;ctx.fill();
  ctx.strokeStyle=shadeColor(fur,-15);ctx.lineWidth=1.5;ctx.stroke();

  if(role==="Guerreiro"){
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

  if(role==="Guerreiro"){
    ctx.beginPath();ctx.moveTo(88*s,(eyeY-10)*s);ctx.lineTo(120*s,(eyeY-6)*s);ctx.strokeStyle=shadeColor(fur,-40);ctx.lineWidth=2.5*s;ctx.stroke();
    ctx.beginPath();ctx.moveTo(192*s,(eyeY-10)*s);ctx.lineTo(160*s,(eyeY-6)*s);ctx.stroke();
    ctx.strokeStyle="#8B4513";ctx.lineWidth=2*s;
    ctx.beginPath();ctx.moveTo(93*s,(eyeY-2)*s);ctx.lineTo(115*s,eyeY*s);ctx.stroke();
  }
  if(role==="Curandeiro"){
    ctx.beginPath();ctx.arc(140*s,(eyeY-12)*s,4*s,0,Math.PI*2);ctx.fillStyle="#E6B422";ctx.globalAlpha=0.6;ctx.fill();ctx.globalAlpha=1;
    ctx.beginPath();ctx.moveTo(137*s,(eyeY-16)*s);ctx.lineTo(140*s,(eyeY-22)*s);ctx.lineTo(143*s,(eyeY-16)*s);ctx.fillStyle="#E6B422";ctx.globalAlpha=0.5;ctx.fill();ctx.globalAlpha=1;
  }
  if(role==="Aprendiz"){
    ctx.beginPath();ctx.arc(105*s,eyeY*s,(pupilR+2)*s,0,Math.PI*2);ctx.fillStyle="#fff";ctx.globalAlpha=0.3;ctx.fill();ctx.globalAlpha=1;
    ctx.beginPath();ctx.arc(175*s,eyeY*s,(pupilR+2)*s,0,Math.PI*2);ctx.fill();
  }
  if(role==="Ancião"){
    ctx.fillStyle="#C0C0C0";ctx.globalAlpha=0.35;
    ctx.beginPath();ctx.ellipse(140*s,(eyeY+30)*s,35*s,20*s,0,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
  }
  if(role==="Filhote"){
    ctx.fillStyle="#FFE4B5";ctx.globalAlpha=0.3;
    ctx.beginPath();ctx.arc(120*s,(eyeY+25)*s,8*s,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(160*s,(eyeY+25)*s,8*s,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
    ctx.beginPath();ctx.arc(140*s,(eyeY+5)*s,7*s,0,Math.PI*2);ctx.fillStyle="#FFB6C1";ctx.globalAlpha=0.4;ctx.fill();
    ctx.globalAlpha=1;
  }
  if(role==="Líder"){
    ctx.beginPath();ctx.arc(140*s,(eyeY-20)*s,6*s,0,Math.PI*2);ctx.fillStyle="#FFD700";ctx.globalAlpha=0.7;ctx.fill();
    ctx.globalAlpha=1;
    ctx.strokeStyle="#DAA520";ctx.lineWidth=2*s;
    ctx.beginPath();ctx.arc(140*s,(eyeY-20)*s,10*s,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle=shadeColor(fur,-20);
    ctx.beginPath();ctx.moveTo(130*s,(headY-90)*s);ctx.lineTo(140*s,(headY-100)*s);ctx.lineTo(150*s,(headY-90)*s);ctx.fill();
  }
  if(role==="Solitário"){
    ctx.strokeStyle="#5A5A5A";ctx.lineWidth=1.5*s;
    ctx.beginPath();ctx.moveTo(110*s,(eyeY+5)*s);ctx.lineTo(95*s,(eyeY+12)*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(170*s,(eyeY+3)*s);ctx.lineTo(185*s,(eyeY+10)*s);ctx.stroke();
    ctx.fillStyle=shadeColor(fur,-35);
    ctx.beginPath();ctx.ellipse(115*s,(headY+20)*s,8*s,6*s,0,0,Math.PI*2);ctx.fill();
  }
  if(role==="Rainha"){
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

  if(pat==="listrado"){
    ctx.fillStyle=shadeColor(fur,-30);
    ctx.beginPath();ctx.moveTo(120*s,95*s);ctx.lineTo(140*s,105*s);ctx.lineTo(130*s,115*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(155*s,97*s);ctx.lineTo(170*s,108*s);ctx.lineTo(162*s,118*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(95*s,120*s);ctx.lineTo(110*s,130*s);ctx.lineTo(90*s,137*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(185*s,120*s);ctx.lineTo(170*s,130*s);ctx.lineTo(190*s,137*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(125*s,84*s);ctx.lineTo(140*s,94*s);ctx.lineTo(132*s,102*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(155*s,84*s);ctx.lineTo(140*s,94*s);ctx.lineTo(148*s,102*s);ctx.fill();
  }else if(pat==="malhado"){
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

  if(role==="Guerreiro"){
    ctx.beginPath();ctx.moveTo(118*s,(eyeY+2)*s);ctx.lineTo(128*s,(eyeY+8)*s);ctx.lineTo(122*s,(eyeY+14)*s);ctx.strokeStyle="#8B4513";ctx.lineWidth=1.5*s;ctx.stroke();
  }
  if(role==="Curandeiro"){
    ctx.fillStyle="#4a7c3f";
    ctx.beginPath();ctx.ellipse(232*s,(headY-82*s-5)*s,6*s,10*s,0.3,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle="#3a6c2f";ctx.lineWidth=1*s;
    ctx.beginPath();ctx.moveTo(232*s,(headY-82*s-15)*s);ctx.lineTo(232*s,(headY-82*s+5)*s);ctx.stroke();
  }
  if(role==="Aprendiz"){
    ctx.fillStyle=eyes;ctx.globalAlpha=0.15;
    ctx.beginPath();ctx.arc(140*s,(eyeY+25)*s,12*s,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
  }
  if(role==="Ancião"){
    ctx.strokeStyle="#999";ctx.lineWidth=1*s;
    ctx.beginPath();ctx.moveTo(60*s,160*s);ctx.lineTo(20*s,155*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(60*s,168*s);ctx.lineTo(18*s,172*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(220*s,160*s);ctx.lineTo(260*s,155*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(220*s,168*s);ctx.lineTo(262*s,172*s);ctx.stroke();
  }
}

function getImageDescription(furHex,eyeHex,pattern,name,role){
  var furName=furMap[furHex]||"marrom terroso";
  var eyeName=eyeMap[eyeHex]||"âmbar";
  var patternPretty=pattern==="listrado"?"listras tabby escuras":(pattern==="malhado"?"pequenas manchas espalhadas":"pelagem sólida lisa");
  var roleLabel="um guerreiro";
  if(role==="Curandeiro")roleLabel="um curandeiro";
  else if(role==="Aprendiz")roleLabel="um aprendiz";
  else if(role==="Ancião")roleLabel="um ancião";
  else if(role==="Filhote")roleLabel="um pequeno filhote";
  else if(role==="Líder")roleLabel="um líder nobre";
  else if(role==="Solitário")roleLabel="um solitário misterioso";
  else if(role==="Rainha")roleLabel="uma rainha gentil";
  return name+" é "+roleLabel+" com pelo "+furName+", olhos "+eyeName+", e uma "+patternPretty+".";
}

function refreshAll(){
  var roles=["Guerreiro","Curandeiro","Aprendiz","Ancião","Filhote","Líder","Solitário","Rainha"];
  for(var i=1;i<=8;i++){
    var newName=generateName(roles[i-1]);
    document.getElementById("catNameDisplay"+i).textContent=newName;
    randomAppearance(i-1);
    drawCat(i,roles[i-1]);
    var fullDesc=getImageDescription(currentFur[i-1],currentEyes[i-1],currentPattern[i-1],newName,roles[i-1]);
    document.getElementById("imageAltText"+i).innerHTML='<span class="description-text">'+fullDesc+'</span>';
    document.getElementById("catCanvas"+i).setAttribute("aria-label","Imagem do gato: "+fullDesc);
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
    document.getElementById("catCanvas"+i).setAttribute("aria-label","Imagem do gato: "+fullDesc);
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
      alert("Falha ao copiar! Por favor copie: "+text);
    }
  }catch(e){
    alert("Falha ao copiar! Por favor copie: "+text);
  }
}

function showCopiedState(btn){
  if(!btn)return;
  btn.classList.add("copied");
  btn.textContent="Copiado!";
  setTimeout(function(){btn.classList.remove("copied");btn.textContent="Copiar";},1500);
}
})();