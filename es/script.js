(function(){
var prefixes=["Zarza","Helecho","Trébol","Hollín","León","Tigre","Moteado","Escarcha","Ámbar","Niebla","Acebo","Cuervo","Tormenta","Cardo","Sauce","Ascua","Halcón","Crepúsculo","Amapola","Acedera","Abedul","Cedro","Fresno","Serbal","Pedernal","Musgo","Nutria","Caña","Sombra","Semilla","Liquen","Pino","Codorniz","Rizoso","Serpiente","Araña","Viento","Trucha","Ratón","Avispa","Artemisa","Grillo","Avellano","Arce","Lluvia","Cielo","Pizarra","Reyezuelo"];
var suffixes=["pelo","garra","corazón","pata","cola","raya","salto","sombra","bigote","flor","poza","helecho","brisa","canto","pelaje","máscara","resplandor","nariz","oreja","vuelo","pluma","tormenta","llama","arroyo","amanecer","luna","pétalo","nube","espíritu","espina","ala","colmillo","moño","rizo","salpicadura","hoja","rama","fuente"];
var furColors=["#C49A6C","#8B5A2B","#A5673F","#D48C54","#B87333","#6F4A2E","#AC8E68","#E3B87C","#5D4A2C","#AA7C4A","#CC9966","#9C6B3E","#7C5C3A","#3B2A1F","#808080","#2E2E2E","#F5F5F5","#E5942B","#DAB07A","#A06A3B","#CF8E5A","#84613B"];
var eyeColors=["#C9B45B","#6A9C78","#4B7BA0","#D49B3B","#B87333","#5F8B6F","#E6B422","#7F6E48","#7A9C6E"];
var patterns=["rayado","moteado","sólido"];

var currentFur=["#C49A6C","#8B5A2B","#A5673F","#84613B","#AC8E68","#808080","#DAB07A","#E3B87C"];
var currentEyes=["#C9B45B","#6A9C78","#4B7BA0","#7F6E48","#E6B422","#4B7BA0","#5F8B6F","#D49B3B"];
var currentPattern=["rayado","moteado","sólido","sólido","moteado","rayado","sólido","sólido"];

var defaultCats=[
  {name:"Estrella de Fuego",fur:"#E5942B",eyes:"#6A9C78",pattern:"sólido",role:"Guerrero"},
  {name:"Hoja Moteada",fur:"#D48C54",eyes:"#C9B45B",pattern:"moteado",role:"Médico"},
  {name:"Pata de Cardo",fur:"#8B5A2B",eyes:"#C9B45B",pattern:"rayado",role:"Aprendiz"},
  {name:"Un-ojo",fur:"#808080",eyes:"#4B7BA0",pattern:"sólido",role:"Anciano"},
  {name:"Cachorro de Musgo",fur:"#AC8E68",eyes:"#E6B422",pattern:"moteado",role:"Cachorro"},
  {name:"Estrella Azul",fur:"#808080",eyes:"#4B7BA0",pattern:"rayado",role:"Líder"},
  {name:"Sol",fur:"#DAB07A",eyes:"#5F8B6F",pattern:"sólido",role:"Solitario"},
  {name:"Flor Dorada",fur:"#E3B87C",eyes:"#D49B3B",pattern:"sólido",role:"Reina"}
];

var kitSuffixes=["cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro"];
var leaderSuffixes=["estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella"];
var lonerNames=["Sol","Raya","Parche","Salto","Mancha","Hattie","Jake","Humo","Pata de Cuervo","Cebada","Purdy","Cuervo","Cola de Llama","Palo","Cuervo","Halcón","Búho","Gorrón","Arrendajo","Reyezuelo","Petirrojo","Guijarro","Piedra"];
var queenSuffixes=["flor","pétalo","luz","amanecer","brisa","hoja","baya","miel","sol","luna","nube","gota","rocío","semilla","helecho","musgo","botón","floración","corazón","espíritu","resplandor","nido","madre"];

var roleSuffixes={"Guerrero":["garra","corazón","raya","salto","sombra","bigote","flor","brisa","canto","pelaje","resplandor","vuelo","pluma","tormenta","llama","amanecer","pétalo","nube","espina","ala","colmillo","hoja","rama"],"Médico":["poza","helecho","máscara","nariz","oreja","arroyo","luna","salpicadura","rizo","moño","baya","raíz","rocío","niebla","susurro","sueño","mirada","aliento","luz","hierba","pétalo","sombra","corriente"],"Aprendiz":["pata","zancada","paso","sendero","camino","salto","esprint","explorador","buscador","vigía","cuidador","corredor","escalador","pescador","cazador","luchador","recolector","patrulla","rastreador","pista","deriva","veloz"],"Anciano":["cola","pelaje","pelo","manto","bigote","diente","garra","ojo","mirada","aliento","paso","descanso","sombra","polvo","piedra","corteza","musgo","nube","escarcha","nieve","ascua","crepúsculo","caída"],"Cachorro":["cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro","cachorro"],"Líder":["estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella","estrella"],"Solitario":[""],"Reina":["flor","pétalo","luz","amanecer","brisa","hoja","baya","miel","sol","luna","nube","gota","rocío","semilla","helecho","musgo","botón","floración","corazón","espíritu","resplandor","nido"]};

var furMap={"#C49A6C":"marrón arenoso","#8B5A2B":"castaño cálido","#A5673F":"rojillo","#D48C54":"ámbar dorado","#B87333":"cobre","#6F4A2E":"sombra profunda","#AC8E68":"color ciervo","#E3B87C":"miel pálido","#5D4A2C":"tierra rica","#AA7C4A":"canoso","#CC9966":"bronce claro","#9C6B3E":"corteza","#7C5C3A":"fangoso","#3B2A1F":"sombra oscura","#808080":"gris pizarra","#2E2E2E":"negro carbón","#F5F5F5":"blanco nieve","#E5942B":"jengibre ardiente","#DAB07A":"crema suave","#A06A3B":"canela","#CF8E5A":"melocotón","#84613B":"marrón polvoriento"};
var eyeMap={"#C9B45B":"ámbar dorado","#6A9C78":"verde musgo profundo","#4B7BA0":"azul helado","#D49B3B":"sol brillante","#B87333":"cobre","#5F8B6F":"verde bosque","#E6B422":"relámpago amarillo","#7F6E48":"avellana","#7A9C6E":"jade pálido"};

function generateName(role){
  if(role==="Solitario"){
    var lonerPool=["Sol","Raya","Parche","Salto","Mancha","Hattie","Jake","Humo","Pata de Cuervo","Cebada","Purdy","Cuervo","Cola de Llama","Palo","Cuervo","Halcón","Búho","Gorrón","Arrendajo","Reyezuelo","Petirrojo","Guijarro","Piedra"];
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
  if(role==="Anciano"){headR=82;headY=155;eyeW=12;eyeH=15;pupilR=3;earH1=48;earH2=43;}
  if(role==="Cachorro"){headR=70;headY=140;eyeW=17;eyeH=23;pupilR=6;earH1=40;earH2=35;}
  if(role==="Líder"){headR=90;headY=152;eyeW=15;eyeH=19;pupilR=5;earH1=58;earH2=53;}
  if(role==="Solitario"){headR=87;headY=151;eyeW=13;eyeH=17;pupilR=3;earH1=55;earH2=50;}
  if(role==="Reina"){headR=83;headY=149;eyeW=14;eyeH=19;pupilR=4;earH1=51;earH2=46;}

  ctx.beginPath();ctx.moveTo(70*s,headY-82*s);ctx.lineTo(45*s,(headY-82*s)-earH1*s);ctx.lineTo(100*s,(headY-82*s)-earH1*s+30*s);ctx.fillStyle=fur;ctx.fill();
  ctx.beginPath();ctx.moveTo(210*s,headY-82*s);ctx.lineTo(235*s,(headY-82*s)-earH1*s);ctx.lineTo(180*s,(headY-82*s)-earH1*s+30*s);ctx.fill();
  ctx.beginPath();ctx.moveTo(72*s,headY-84*s);ctx.lineTo(55*s,(headY-84*s)-earH2*s);ctx.lineTo(95*s,(headY-84*s)-earH2*s+20*s);ctx.fillStyle=shadeColor(fur,-25);ctx.fill();
  ctx.beginPath();ctx.moveTo(208*s,headY-84*s);ctx.lineTo(225*s,(headY-84*s)-earH2*s);ctx.lineTo(185*s,(headY-84*s)-earH2*s+20*s);ctx.fill();

  if(role==="Anciano"){
    ctx.beginPath();ctx.moveTo(68*s,headY-80*s);ctx.lineTo(50*s,(headY-80*s)-40*s);ctx.fillStyle="#b0b0b0";ctx.globalAlpha=0.3;ctx.fill();ctx.globalAlpha=1;
    ctx.beginPath();ctx.moveTo(212*s,headY-80*s);ctx.lineTo(230*s,(headY-80*s)-40*s);ctx.fill();
  }

  ctx.beginPath();ctx.arc(140*s,headY*s,headR*s,0,Math.PI*2);ctx.fillStyle=fur;ctx.fill();
  ctx.strokeStyle=shadeColor(fur,-15);ctx.lineWidth=1.5;ctx.stroke();

  if(role==="Guerrero"){
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

  if(role==="Guerrero"){
    ctx.beginPath();ctx.moveTo(88*s,(eyeY-10)*s);ctx.lineTo(120*s,(eyeY-6)*s);ctx.strokeStyle=shadeColor(fur,-40);ctx.lineWidth=2.5*s;ctx.stroke();
    ctx.beginPath();ctx.moveTo(192*s,(eyeY-10)*s);ctx.lineTo(160*s,(eyeY-6)*s);ctx.stroke();
    ctx.strokeStyle="#8B4513";ctx.lineWidth=2*s;
    ctx.beginPath();ctx.moveTo(93*s,(eyeY-2)*s);ctx.lineTo(115*s,eyeY*s);ctx.stroke();
  }
  if(role==="Médico"){
    ctx.beginPath();ctx.arc(140*s,(eyeY-12)*s,4*s,0,Math.PI*2);ctx.fillStyle="#E6B422";ctx.globalAlpha=0.6;ctx.fill();ctx.globalAlpha=1;
    ctx.beginPath();ctx.moveTo(137*s,(eyeY-16)*s);ctx.lineTo(140*s,(eyeY-22)*s);ctx.lineTo(143*s,(eyeY-16)*s);ctx.fillStyle="#E6B422";ctx.globalAlpha=0.5;ctx.fill();ctx.globalAlpha=1;
  }
  if(role==="Aprendiz"){
    ctx.beginPath();ctx.arc(105*s,eyeY*s,(pupilR+2)*s,0,Math.PI*2);ctx.fillStyle="#fff";ctx.globalAlpha=0.3;ctx.fill();ctx.globalAlpha=1;
    ctx.beginPath();ctx.arc(175*s,eyeY*s,(pupilR+2)*s,0,Math.PI*2);ctx.fill();
  }
  if(role==="Anciano"){
    ctx.fillStyle="#C0C0C0";ctx.globalAlpha=0.35;
    ctx.beginPath();ctx.ellipse(140*s,(eyeY+30)*s,35*s,20*s,0,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
  }
  if(role==="Cachorro"){
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
  if(role==="Solitario"){
    ctx.strokeStyle="#5A5A5A";ctx.lineWidth=1.5*s;
    ctx.beginPath();ctx.moveTo(110*s,(eyeY+5)*s);ctx.lineTo(95*s,(eyeY+12)*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(170*s,(eyeY+3)*s);ctx.lineTo(185*s,(eyeY+10)*s);ctx.stroke();
    ctx.fillStyle=shadeColor(fur,-35);
    ctx.beginPath();ctx.ellipse(115*s,(headY+20)*s,8*s,6*s,0,0,Math.PI*2);ctx.fill();
  }
  if(role==="Reina"){
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

  if(pat==="rayado"){
    ctx.fillStyle=shadeColor(fur,-30);
    ctx.beginPath();ctx.moveTo(120*s,95*s);ctx.lineTo(140*s,105*s);ctx.lineTo(130*s,115*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(155*s,97*s);ctx.lineTo(170*s,108*s);ctx.lineTo(162*s,118*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(95*s,120*s);ctx.lineTo(110*s,130*s);ctx.lineTo(90*s,137*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(185*s,120*s);ctx.lineTo(170*s,130*s);ctx.lineTo(190*s,137*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(125*s,84*s);ctx.lineTo(140*s,94*s);ctx.lineTo(132*s,102*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(155*s,84*s);ctx.lineTo(140*s,94*s);ctx.lineTo(148*s,102*s);ctx.fill();
  }else if(pat==="moteado"){
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

  if(role==="Guerrero"){
    ctx.beginPath();ctx.moveTo(118*s,(eyeY+2)*s);ctx.lineTo(128*s,(eyeY+8)*s);ctx.lineTo(122*s,(eyeY+14)*s);ctx.strokeStyle="#8B4513";ctx.lineWidth=1.5*s;ctx.stroke();
  }
  if(role==="Médico"){
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
  if(role==="Anciano"){
    ctx.strokeStyle="#999";ctx.lineWidth=1*s;
    ctx.beginPath();ctx.moveTo(60*s,160*s);ctx.lineTo(20*s,155*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(60*s,168*s);ctx.lineTo(18*s,172*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(220*s,160*s);ctx.lineTo(260*s,155*s);ctx.stroke();
    ctx.beginPath();ctx.moveTo(220*s,168*s);ctx.lineTo(262*s,172*s);ctx.stroke();
  }
}

function getImageDescription(furHex,eyeHex,pattern,name,role){
  var furName=furMap[furHex]||"marrón terroso";
  var eyeName=eyeMap[eyeHex]||"ámbar";
  var patternPretty=pattern==="rayado"?"rayas tabby oscuras":(pattern==="moteado"?"pequeñas manchas dispersas":"pelaje sólido liso");
  var roleLabel="un guerrero";
  if(role==="Médico")roleLabel="un médico";
  else if(role==="Aprendiz")roleLabel="un aprendiz";
  else if(role==="Anciano")roleLabel="un anciano";
  else if(role==="Cachorro")roleLabel="un pequeño cachorro";
  else if(role==="Líder")roleLabel="un noble líder";
  else if(role==="Solitario")roleLabel="un misterioso solitario";
  else if(role==="Reina")roleLabel="una gentil reina";
  return name+" es "+roleLabel+" con pelaje "+furName+", ojos "+eyeName+", y un "+patternPretty+".";
}

function refreshAll(){
  var roles=["Guerrero","Médico","Aprendiz","Anciano","Cachorro","Líder","Solitario","Reina"];
  for(var i=1;i<=8;i++){
    var newName=generateName(roles[i-1]);
    document.getElementById("catNameDisplay"+i).textContent=newName;
    randomAppearance(i-1);
    drawCat(i,roles[i-1]);
    var fullDesc=getImageDescription(currentFur[i-1],currentEyes[i-1],currentPattern[i-1],newName,roles[i-1]);
    document.getElementById("imageAltText"+i).innerHTML='<span class="description-text">'+fullDesc+'</span>';
    document.getElementById("catCanvas"+i).setAttribute("aria-label","Imagen de gato: "+fullDesc);
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
    document.getElementById("catCanvas"+i).setAttribute("aria-label","Imagen de gato: "+fullDesc);
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
      alert("¡Error al copiar! Por favor copie: "+text);
    }
  }catch(e){
    alert("¡Error al copiar! Por favor copie: "+text);
  }
}

function showCopiedState(btn){
  if(!btn)return;
  btn.classList.add("copied");
  btn.textContent="¡Copiado!";
  setTimeout(function(){btn.classList.remove("copied");btn.textContent="Copiar";},1500);
}
})();