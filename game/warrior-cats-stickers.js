(function(){
'use strict';
var CATS=[
{id:'firestar',name:'Firestar',clan:'thunder',color:'#e87a3e',accent:'#fff',motto:'Leader of ThunderClan'},
{id:'bluestar',name:'Bluestar',clan:'thunder',color:'#3a7ca5',accent:'#fff',motto:'ThunderClan leader'},
{id:'sandstorm',name:'Sandstorm',clan:'thunder',color:'#d4a574',accent:'#2c3e2f',motto:'Pale ginger she-cat'},
{id:'lionheart',name:'Lionheart',clan:'thunder',color:'#c97a3e',accent:'#fff',motto:'Brave ThunderClan warrior'},
{id:'brightheart',name:'Brightheart',clan:'thunder',color:'#e8a896',accent:'#2c3e2f',motto:'Courageous ThunderClan warrior'},
{id:'yellowfang',name:'Yellowfang',clan:'shadow',color:'#a8a083',accent:'#2c3e2f',motto:'ShadowClan medicine cat'},
{id:'blackstar',name:'Blackstar',clan:'shadow',color:'#2a2a2a',accent:'#fff',motto:'ShadowClan leader'},
{id:'crookedstar',name:'Crookedstar',clan:'river',color:'#4a89b8',accent:'#fff',motto:'RiverClan leader'},
{id:'hawkfrost',name:'Hawkfrost',clan:'river',color:'#5a6e7a',accent:'#fff',motto:'Dark RiverClan warrior'},
{id:'leafstar',name:'Leafstar',clan:'sky',color:'#7c5e9c',accent:'#fff',motto:'SkyClan leader'},
{id:'hollyleaf',name:'Hollyleaf',clan:'thunder',color:'#3d5a3d',accent:'#fff',motto:'ThunderClan warrior'},
{id:'ivypool',name:'Ivypool',clan:'thunder',color:'#8a9a3a',accent:'#fff',motto:'ThunderClan warrior'}
];
var CLAN_NAMES={thunder:'ThunderClan',river:'RiverClan',shadow:'ShadowClan',sky:'SkyClan',wind:'WindClan'};
var QUOTES=['HISS!','Hi!','Stay sharp','ThunderClan!','Hunting patrol','Mouse-brain!','Brave heart','Watch the border','StarClan','Follow me'];

var state={cat:CATS[0],text:'',style:'round',bg:'transparent'};

function catById(id){for(var i=0;i<CATS.length;i++){if(CATS[i].id===id)return CATS[i]}return CATS[0]}

function drawSticker(canvas,opts){
if(!canvas)return;
var ctx=canvas.getContext('2d');
var W=canvas.width,H=canvas.height;
ctx.clearRect(0,0,W,H);
var cat=opts.cat,style=opts.style,bg=opts.bg,text=opts.text||'';

ctx.save();
var clipFn=null;
if(style==='round'){clipFn=function(c){c.beginPath();c.arc(W/2,H/2,Math.min(W,H)/2-12,0,Math.PI*2);c.closePath()}}
else if(style==='square'){var m=24;clipFn=function(c){c.beginPath();c.moveTo(m,m);c.lineTo(W-m,m);c.lineTo(W-m,H-m);c.lineTo(m,H-m);c.closePath()}}
else if(style==='heart'){clipFn=function(c){var x=W/2,y=H/2+30,s=Math.min(W,H)/2.3;c.beginPath();c.moveTo(x,y-s*0.6);c.bezierCurveTo(x,y-s*1.1,x-s,y-s*0.4,x-s,y);c.bezierCurveTo(x-s,y+s*0.6,x,y+s*1.2,x,y+s*0.6);c.bezierCurveTo(x,y+s*1.2,x+s,y+s*0.6,x+s,y);c.bezierCurveTo(x+s,y-s*0.4,x,y-s*1.1,x,y-s*0.6);c.closePath()}}
else if(style==='diecut'){clipFn=function(c){var cx=W/2,cy=H/2,r=Math.min(W,H)/2-14;for(var i=0;i<24;i++){var a1=(i/24)*Math.PI*2,a2=((i+0.5)/24)*Math.PI*2;var r1=r,r2=r-6;var x1=cx+Math.cos(a1)*r1,y1=cy+Math.sin(a1)*r1;var x2=cx+Math.cos(a2)*r2,y2=cy+Math.sin(a2)*r2;if(i===0)c.moveTo(x1,y1);c.lineTo(x1,y1);c.lineTo(x2,y2)}c.closePath()}}

if(bg==='pastel'){ctx.fillStyle='#fdf6e3';ctx.fillRect(0,0,W,H)}
else if(bg==='dark'){ctx.fillStyle='#1a251c';ctx.fillRect(0,0,W,H)}

ctx.save();
clipFn(ctx);
if(bg==='transparent'){ctx.fillStyle=cat.color;ctx.fillRect(0,0,W,H)}
else{ctx.fillStyle=cat.color;ctx.fillRect(0,0,W,H)}

var grad=ctx.createRadialGradient(W*0.35,H*0.3,20,W/2,H/2,W*0.7);
grad.addColorStop(0,'rgba(255,255,255,0.25)');
grad.addColorStop(1,'rgba(0,0,0,0.15)');
ctx.fillStyle=grad;
ctx.fillRect(0,0,W,H);

drawCatIllustration(ctx,W,H,cat,text);
ctx.restore();

ctx.save();
clipFn(ctx);
ctx.lineWidth=18;
if(style==='diecut'){
ctx.strokeStyle='#fff';
ctx.lineJoin='round';
ctx.stroke();
}else{
ctx.strokeStyle='#fff';
ctx.lineJoin='round';
ctx.stroke();
}
ctx.restore();

ctx.save();
clipFn(ctx);
ctx.lineWidth=4;
ctx.strokeStyle='rgba(0,0,0,0.15)';
ctx.stroke();
ctx.restore();
}

function drawCatIllustration(ctx,W,H,cat,text){
var cx=W/2,cy=H/2-10;
ctx.save();

ctx.fillStyle='rgba(0,0,0,0.12)';
ctx.beginPath();
ctx.ellipse(cx,cy+H*0.32,W*0.3,H*0.06,0,0,Math.PI*2);
ctx.fill();

var bodyColor=shade(cat.color,-15);
var darkColor=shade(cat.color,-30);

ctx.fillStyle=bodyColor;
ctx.beginPath();
ctx.ellipse(cx,cy+H*0.15,W*0.22,H*0.16,0,0,Math.PI*2);
ctx.fill();

ctx.fillStyle=darkColor;
ctx.beginPath();
ctx.ellipse(cx-W*0.02,cy-H*0.02,W*0.18,H*0.16,-0.1,0,Math.PI*2);
ctx.fill();

ctx.fillStyle=bodyColor;
ctx.beginPath();
ctx.moveTo(cx-W*0.13,cy+H*0.05);
ctx.lineTo(cx-W*0.28,cy+H*0.3);
ctx.lineTo(cx-W*0.18,cy+H*0.32);
ctx.lineTo(cx-W*0.05,cy+H*0.1);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.moveTo(cx+W*0.13,cy+H*0.05);
ctx.lineTo(cx+W*0.28,cy+H*0.3);
ctx.lineTo(cx+W*0.18,cy+H*0.32);
ctx.lineTo(cx+W*0.05,cy+H*0.1);
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.moveTo(cx-W*0.05,cy+H*0.27);
ctx.lineTo(cx-W*0.08,cy+H*0.42);
ctx.lineTo(cx-W*0.02,cy+H*0.42);
ctx.lineTo(cx-W*0.01,cy+H*0.27);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.moveTo(cx+W*0.05,cy+H*0.27);
ctx.lineTo(cx+W*0.08,cy+H*0.42);
ctx.lineTo(cx+W*0.02,cy+H*0.42);
ctx.lineTo(cx+W*0.01,cy+H*0.27);
ctx.closePath();
ctx.fill();

var tailColor=shade(cat.color,10);
ctx.fillStyle=tailColor;
ctx.beginPath();
ctx.moveTo(cx-W*0.2,cy+H*0.15);
ctx.quadraticCurveTo(cx-W*0.45,cy-H*0.05,cx-W*0.35,cy-H*0.25);
ctx.quadraticCurveTo(cx-W*0.28,cy-H*0.18,cx-W*0.22,cy-H*0.05);
ctx.closePath();
ctx.fill();

ctx.fillStyle=bodyColor;
ctx.beginPath();
ctx.arc(cx,cy-H*0.18,W*0.16,0,Math.PI*2);
ctx.fill();

var earColor=shade(cat.color,-5);
ctx.beginPath();
ctx.moveTo(cx-W*0.13,cy-H*0.28);
ctx.lineTo(cx-W*0.05,cy-H*0.42);
ctx.lineTo(cx-W*0.02,cy-H*0.28);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.moveTo(cx+W*0.13,cy-H*0.28);
ctx.lineTo(cx+W*0.05,cy-H*0.42);
ctx.lineTo(cx+W*0.02,cy-H*0.28);
ctx.closePath();
ctx.fill();
ctx.fillStyle=cat.accent;
ctx.beginPath();
ctx.moveTo(cx-W*0.1,cy-H*0.3);
ctx.lineTo(cx-W*0.06,cy-H*0.38);
ctx.lineTo(cx-W*0.04,cy-H*0.3);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.moveTo(cx+W*0.1,cy-H*0.3);
ctx.lineTo(cx+W*0.06,cy-H*0.38);
ctx.lineTo(cx+W*0.04,cy-H*0.3);
ctx.closePath();
ctx.fill();

var eyeColor=cat.clan==='shadow'||cat.clan==='sky'?'#a8d04a':'#7ab843';
ctx.fillStyle=eyeColor;
ctx.beginPath();
ctx.ellipse(cx-W*0.05,cy-H*0.2,W*0.025,W*0.035,0,0,Math.PI*2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(cx+W*0.05,cy-H*0.2,W*0.025,W*0.035,0,0,Math.PI*2);
ctx.fill();
ctx.fillStyle='#000';
ctx.beginPath();
ctx.ellipse(cx-W*0.05,cy-H*0.2,W*0.008,W*0.025,0,0,Math.PI*2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(cx+W*0.05,cy-H*0.2,W*0.008,W*0.025,0,0,Math.PI*2);
ctx.fill();

ctx.fillStyle=cat.accent;
ctx.beginPath();
ctx.moveTo(cx,cy-H*0.13);
ctx.lineTo(cx-3,cy-H*0.1);
ctx.lineTo(cx+3,cy-H*0.1);
ctx.closePath();
ctx.fill();

ctx.strokeStyle=cat.accent;
ctx.lineWidth=1.5;
ctx.beginPath();
ctx.moveTo(cx,cy-H*0.1);
ctx.lineTo(cx-12,cy-H*0.07);
ctx.moveTo(cx,cy-H*0.1);
ctx.lineTo(cx+12,cy-H*0.07);
ctx.moveTo(cx,cy-H*0.1);
ctx.lineTo(cx-12,cy-H*0.04);
ctx.moveTo(cx,cy-H*0.1);
ctx.lineTo(cx+12,cy-H*0.04);
ctx.stroke();

ctx.fillStyle='#fff';
ctx.font='bold '+(W*0.075)+'px Helvetica, Arial, sans-serif';
ctx.textAlign='center';
ctx.textBaseline='middle';
var nameY=H-44;
ctx.fillStyle='rgba(0,0,0,0.4)';
ctx.fillText(cat.name,cx+1,nameY+1);
ctx.fillStyle='#fff';
ctx.fillText(cat.name,cx,nameY);

if(text){
ctx.font='bold '+(W*0.06)+'px Helvetica, Arial, sans-serif';
var tagY=H-22;
var textWidth=ctx.measureText(text).width;
ctx.fillStyle='rgba(0,0,0,0.6)';
ctx.fillRect(cx-textWidth/2-10,tagY-12,textWidth+20,24);
ctx.fillStyle='#fff';
ctx.fillText(text,cx,tagY);
}
ctx.restore();
}

function shade(hex,pct){
var n=parseInt(hex.slice(1),16);
var r=(n>>16)&255,g=(n>>8)&255,b=n&255;
r=Math.max(0,Math.min(255,r+Math.floor(r*pct/100)));
g=Math.max(0,Math.min(255,g+Math.floor(g*pct/100)));
b=Math.max(0,Math.min(255,b+Math.floor(b*pct/100)));
return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

function renderBuilder(){
var c=document.getElementById('stickerCanvas');
if(c){drawSticker(c,state);
var cap=document.getElementById('stickerCaption');
if(cap){cap.textContent=state.cat.name+' \u00B7 '+capitalize(state.style)+' \u00B7 '+capitalize(state.bg)}}
}

function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1)}

function renderGrid(){
var grid=document.getElementById('stickerGrid');
if(!grid)return;
grid.innerHTML='';
CATS.forEach(function(cat){
var card=document.createElement('div');
card.className='sticker-card';
var cw=document.createElement('div');
cw.className='sticker-canvas-wrap';
var c=document.createElement('canvas');
c.width=300;c.height=300;
c.setAttribute('aria-label','Warrior cats sticker of '+cat.name);
cw.appendChild(c);
cw.addEventListener('click',function(){openLightbox(cat)});
var info=document.createElement('div');
info.className='sticker-info';
var h3=document.createElement('h3');h3.textContent=cat.name;
var clan=document.createElement('p');
var tag=document.createElement('span');
tag.className='sticker-clan-tag '+cat.clan;
tag.textContent=CLAN_NAMES[cat.clan]||cat.clan;
clan.appendChild(tag);
clan.appendChild(document.createTextNode(' \u00B7 '+cat.motto));
var actions=document.createElement('div');
actions.className='sticker-actions';
var dBtn=document.createElement('button');
dBtn.type='button';
dBtn.innerHTML='&#x2B07; PNG';
dBtn.setAttribute('aria-label','Download '+cat.name+' sticker as PNG');
dBtn.addEventListener('click',function(e){e.stopPropagation();downloadCat(cat)});
actions.appendChild(dBtn);
info.appendChild(h3);
info.appendChild(clan);
info.appendChild(actions);
card.appendChild(cw);
card.appendChild(info);
grid.appendChild(card);
drawSticker(c,{cat:cat,style:'round',bg:'transparent',text:''});
});
}

function renderCatPicker(){
var wrap=document.getElementById('catPicker');
if(!wrap)return;
wrap.innerHTML='';
CATS.forEach(function(cat){
var chip=document.createElement('button');
chip.type='button';
chip.className='cat-chip';
if(cat.id===state.cat.id)chip.classList.add('active');
chip.setAttribute('data-cat',cat.id);
chip.setAttribute('aria-label','Choose '+cat.name);
var av=document.createElement('div');
av.className='cat-chip-avatar';
av.style.background=cat.color;
av.textContent=cat.name.charAt(0);
var nm=document.createElement('span');
nm.textContent=cat.name;
chip.appendChild(av);
chip.appendChild(nm);
chip.addEventListener('click',function(){
state.cat=cat;
renderCatPicker();
renderBuilder();
});
wrap.appendChild(chip);
});
}

function setupStylePickers(){
var sp=document.getElementById('stylePicker');
if(sp){sp.querySelectorAll('.style-chip').forEach(function(b){
b.addEventListener('click',function(){
sp.querySelectorAll('.style-chip').forEach(function(x){x.classList.remove('active')});
b.classList.add('active');
state.style=b.getAttribute('data-style');
renderBuilder();
});
});}
var bp=document.getElementById('bgPicker');
if(bp){bp.querySelectorAll('.bg-chip').forEach(function(b){
b.addEventListener('click',function(){
bp.querySelectorAll('.bg-chip').forEach(function(x){x.classList.remove('active')});
b.classList.add('active');
state.bg=b.getAttribute('data-bg');
renderBuilder();
});
});}
var ti=document.getElementById('stickerText');
if(ti){ti.addEventListener('input',function(){state.text=ti.value;renderBuilder()})}
}

function downloadCanvas(canvas,filename){
canvas.toBlob(function(blob){
if(!blob){showToast('Could not save the sticker. Try a different browser.');return}
var url=URL.createObjectURL(blob);
var a=document.createElement('a');
a.href=url;
a.download=filename;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
setTimeout(function(){URL.revokeObjectURL(url)},1000);
},'image/png');
}

function downloadCat(cat){
var c=document.createElement('canvas');
c.width=512;c.height=512;
drawSticker(c,{cat:cat,style:'round',bg:'transparent',text:''});
downloadCanvas(c,'warrior-cats-sticker-'+cat.id+'.png');
showToast('Sticker saved: '+cat.name);
}

function downloadAll(){
CATS.forEach(function(cat,i){
setTimeout(function(){downloadCat(cat)},i*250);
});
showToast('Saving all twelve stickers...');
}

function randomSticker(){
var cat=CATS[Math.floor(Math.random()*CATS.length)];
state.cat=cat;
renderCatPicker();
renderBuilder();
showToast('Random pick: '+cat.name);
}

function surprise(){
var cat=CATS[Math.floor(Math.random()*CATS.length)];
var styles=['round','square','heart','diecut'];
var bgs=['transparent','pastel','dark'];
var quotes=QUOTES.slice();
state.cat=cat;
state.style=styles[Math.floor(Math.random()*styles.length)];
state.bg=bgs[Math.floor(Math.random()*bgs.length)];
state.text=quotes[Math.floor(Math.random()*quotes.length)];
var ti=document.getElementById('stickerText');
if(ti)ti.value=state.text;
document.querySelectorAll('#stylePicker .style-chip').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-style')===state.style)});
document.querySelectorAll('#bgPicker .bg-chip').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-bg')===state.bg)});
renderCatPicker();
renderBuilder();
showToast('Surprise sticker: '+cat.name);
}

function saveBuilder(){
var c=document.getElementById('stickerCanvas');
if(!c)return;
downloadCanvas(c,'warrior-cats-sticker-'+state.cat.id+'-custom.png');
showToast('Custom sticker saved: '+state.cat.name);
}

function copyBuilder(){
var c=document.getElementById('stickerCanvas');
if(!c||!navigator.clipboard||!window.ClipboardItem){
showToast('Copy not supported in this browser. Use Save Sticker instead.');
return;
}
c.toBlob(function(blob){
if(!blob){showToast('Copy failed. Use Save Sticker instead.');return}
try{
navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
showToast('Sticker copied to clipboard.');
}catch(e){
showToast('Copy blocked. Use Save Sticker instead.');
}
},'image/png');
}

function showToast(msg){
var t=document.getElementById('toast');
if(!t)return;
t.textContent=msg;
t.classList.add('show');
clearTimeout(t._to);
t._to=setTimeout(function(){t.classList.remove('show')},2400);
}

function openLightbox(cat){
var lb=document.getElementById('lightbox');
var c=document.getElementById('lightboxCanvas');
var n=document.getElementById('lightboxName');
if(!lb||!c)return;
c.width=800;c.height=800;
drawSticker(c,{cat:cat,style:'round',bg:'transparent',text:''});
if(n)n.textContent=cat.name+' \u00B7 '+(CLAN_NAMES[cat.clan]||cat.clan);
lb.classList.add('show');
lb.setAttribute('aria-hidden','false');
}
function closeLightbox(){
var lb=document.getElementById('lightbox');
if(!lb)return;
lb.classList.remove('show');
lb.setAttribute('aria-hidden','true');
}

function setupShare(){
var pageUrl=encodeURIComponent('https://warriorcatsnamegenerator.net/game/warrior-cats-stickers.html');
var text=encodeURIComponent('Free warrior cats stickers pack \u2014 twelve canon clan cats, custom builder, free PNG download.');
document.querySelectorAll('.share-btn').forEach(function(b){
b.addEventListener('click',function(){
var s=b.getAttribute('data-share');
var url='';
if(s==='twitter')url='https://twitter.com/intent/tweet?text='+text+'&url='+pageUrl;
else if(s==='facebook')url='https://www.facebook.com/sharer/sharer.php?u='+pageUrl;
else if(s==='reddit')url='https://www.reddit.com/submit?title='+text+'&url='+pageUrl;
else if(s==='telegram')url='https://t.me/share/url?url='+pageUrl+'&text='+text;
if(url)window.open(url,'_blank','noopener,noreferrer');
});
});
}

function setupFaq(){
document.querySelectorAll('.faq-toggle').forEach(function(btn){
btn.addEventListener('click',function(){
var ans=document.getElementById(btn.getAttribute('aria-controls'));
var icon=btn.querySelector('.faq-icon');
var open=btn.getAttribute('aria-expanded')==='true';
btn.setAttribute('aria-expanded',open?'false':'true');
if(ans)ans.style.display=open?'none':'block';
if(icon)icon.innerHTML=open?'+':'\u2212';
});
});
}

function init(){
renderGrid();
renderCatPicker();
setupStylePickers();
renderBuilder();
setupShare();
setupFaq();
var da=document.getElementById('downloadAllBtn');
if(da)da.addEventListener('click',downloadAll);
var rb=document.getElementById('randomStickerBtn');
if(rb)rb.addEventListener('click',randomSticker);
var sv=document.getElementById('saveStickerBtn');
if(sv)sv.addEventListener('click',saveBuilder);
var cp=document.getElementById('copyStickerBtn');
if(cp)cp.addEventListener('click',copyBuilder);
var sm=document.getElementById('surpriseStickerBtn');
if(sm)sm.addEventListener('click',surprise);
var lc=document.getElementById('lightboxClose');
if(lc)lc.addEventListener('click',closeLightbox);
var lb=document.getElementById('lightbox');
if(lb)lb.addEventListener('click',function(e){if(e.target===lb)closeLightbox()});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
