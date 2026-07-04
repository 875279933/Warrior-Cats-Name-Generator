(function(){
var pool={
"ThunderClan":["Brambleclaw","Lionblaze","Oakheart","Pinefoot","Thunderheart","Redtail","Darkstripe","Cloudtail","Dustpelt","Russetfur"],
"RiverClan":["Troutleap","Reedwhisker","Otterheart","Hailclaw","Stoneheart","Minnowtail","Heronwing","Volefoot","Foamwhisker","Crookedjaw"],
"ShadowClan":["Blackclaw","Tigerclaw","Ratfang","Spiderleg","Smokefoot","Flintfang","Waspwhisker","Rowanclaw","Nightpaw","Crowtail"],
"WindClan":["Talltail","Crowfeather","Breezepelt","Galeclaw","Moorfoot","Rushclaw","Tornwing","Boulderpaw","Eagleeye","Stagfoot"],
"SkyClan":["Buzzardclaw","Sharpclaw","Patchfoot","Rockpaw","Sparrowpelt","Pinewhisker","Bobtail","Treeclaw","Echowhisker","Creekfoot"]
};
var clans=Object.keys(pool);
var lastNames=[];
function pickSix(){
var results=[];
var used={};
var clanCounts={};
var guard=0;
while(results.length<6&&guard<100){
var clan=clans[Math.floor(Math.random()*clans.length)];
if(clanCounts[clan]>=3)continue;
var names=pool[clan];
var name=names[Math.floor(Math.random()*names.length)];
if(used[name])continue;
results.push({clan:clan,name:name});
used[name]=true;
clanCounts[clan]=(clanCounts[clan]||0)+1;
guard++;
}
return results;
}
function showToast(msg){
var t=document.getElementById("toast");
if(!t)return;
t.textContent=msg;
t.classList.add("show");
setTimeout(function(){t.classList.remove("show");},1800);
}
function render(results){
for(var i=0;i<6;i++){
var card=document.getElementById("card"+(i+1));
var nameEl=document.getElementById("name"+(i+1));
var clanEl=document.getElementById("clan"+(i+1));
card.classList.remove("flip");
if(results[i]){
nameEl.innerHTML=results[i].name;
clanEl.innerHTML="of "+results[i].clan;
}else{
nameEl.innerHTML="&nbsp;";
clanEl.innerHTML="&nbsp;";
}
void card.offsetWidth;
card.classList.add("flip");
}
lastNames=results.map(function(r){return r.name;});
}
function generate(){
var results;
var guard=0;
do{
results=pickSix();
guard++;
if(guard>20)break;
}while(results.length===6&&results.every(function(r,i){return r.name===lastNames[i];}));
render(results);
var clanMsg=results.map(function(r){return r.clan;}).join(", ");
showToast(clanMsg);
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