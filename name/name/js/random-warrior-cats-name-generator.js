(function(){
var pool={
"ThunderClan":["Brambleclaw","Hollyleaf","Lionblaze","Jayfeather","Whitewing","Spiderleg","Stormtail","Rosepetal","Cinderheart","Dawnstripe"],
"RiverClan":["Mistystar","Silverstream","Reedwhisker","Mosspaw","Minnowtail","Beachfang","Pebblefoot","Cinderstream","Lilystem","Troutleap"],
"ShadowClan":["Blackstar","Tawnypelt","Rowanclaw","Pinestar","Smokefoot","Owlpaw","Dawnpelt","Ratfang","Marshpaw","Snaketail"],
"WindClan":["Tallstar","Crowfeather","Breezepelt","Heathertail","Whitestorm","Galeclaw","Mossfoot","Featherpaw","Sandstorm","Barkstripe"],
"SkyClan":["Leafstar","Harvey","Billystorm","Sharpclaw","Patchfoot","Rockpaw","Sparrowpelt","Clovertail","Flickerface","Pinewhisker"]
};
var clans=Object.keys(pool);
var lastA=null;
var lastB=null;
function pickPair(){
var a=clans[Math.floor(Math.random()*clans.length)];
var b=clans[Math.floor(Math.random()*clans.length)];
while(b===a){
b=clans[Math.floor(Math.random()*clans.length)];
}
var nameA=pool[a][Math.floor(Math.random()*pool[a].length)];
var nameB=pool[b][Math.floor(Math.random()*pool[b].length)];
return{aClan:a,aName:nameA,bClan:b,bName:nameB};
}
function showToast(msg){
var t=document.getElementById("toast");
if(!t)return;
t.textContent=msg;
t.classList.add("show");
setTimeout(function(){t.classList.remove("show");},1800);
}
function render(pair){
var c1=document.getElementById("card1");
var c2=document.getElementById("card2");
var n1=document.getElementById("name1");
var n2=document.getElementById("name2");
var cl1=document.getElementById("clan1");
var cl2=document.getElementById("clan2");
c1.classList.remove("flip");
c2.classList.remove("flip");
void c1.offsetWidth;
void c2.offsetWidth;
n1.innerHTML=pair.aName;
n2.innerHTML=pair.bName;
cl1.innerHTML="of "+pair.aClan;
cl2.innerHTML="of "+pair.bClan;
c1.classList.add("flip");
c2.classList.add("flip");
lastA=pair.aName;
lastB=pair.bName;
}
function generate(){
var pair;
var guard=0;
do{
pair=pickPair();
guard++;
if(guard>20)break;
}while((pair.aName===lastA&&pair.bName===lastB)||(pair.aName===lastB&&pair.bName===lastA));
render(pair);
showToast(pair.aClan+" vs "+pair.bClan);
}
function bindFaq(){
document.querySelectorAll(".faq-toggle").forEach(function(btn){
btn.addEventListener("click",function(){
var id=btn.getAttribute("aria-controls");
var ans=document.getElementById(id);
var open=ans.style.display==="block";
ans.style.display=open?"none":"block";
btn.setAttribute("aria-expanded",open?"false":"true");
btn.querySelector(".faq-icon").textContent=open?"+":"\u2212";
});
});
}
document.addEventListener("DOMContentLoaded",function(){
var btn=document.getElementById("generateBtn");
if(btn){
btn.addEventListener("click",generate);
generate();
}
bindFaq();
});
})();
