(function(){
  var prefixes=["Bramble","Fern","Clover","Soot","Lion","Tiger","Dapple","Frost","Amber","Mist","Holly","Raven","Storm","Thistle","Willow","Ember","Hawk","Dusk","Poppy","Sorrel","Birch","Cedar","Ash","Rowan","Flint","Moss","Otter","Reed","Shade","Seed","Lichen","Pine","Quail","Ripple","Snake","Spider","Swift","Trout","Vole","Wasp","Yarrow","Cricket","Hazel","Maple","Rain","Sky","Slate","Wren"];
  var suffixes=["fur","claw","heart","foot","tail","stripe","leap","shadow","whisker","flower","pool","fern","breeze","song","pelt","mask","shine","nose","ear","flight","feather","storm","blaze","brook","dawn","moon","petal","cloud","spirit","thorn","wing","fang","tuft","ripple","splash","leaf","branch","spring"];
  var roleSuffixes={Kit:["kit"],Apprentice:["paw"],Warrior:["claw","heart","stripe","leap","shadow","whisker","flower","breeze","song","pelt","shine","flight","feather","storm","blaze","dawn","petal","cloud","thorn","wing","fang","leaf","branch"],Medicine:["pool","fern","mask","nose","ear","brook","moon","splash","ripple","tuft","berry","root","dew","mist","whisper","dream","gaze","breath","light","herb","petal","shade","stream"],Queen:["flower","petal","light","dawn","breeze","leaf","berry","honey","sun","moon","cloud","drop","dew","seed","fern","moss","blossom","bloom","heart","spirit","shine","nest"],Elder:["tail","pelt","fur","coat","whisker","tooth","eye","gaze","breath","step","rest","shade","dust","stone","bark","moss","cloud","frost","snow","ember","dusk","fall"],Leader:["star"],Loner:[]};

  var furPalette=[{hex:"#C49A6C",name:"sandy brown"},{hex:"#8B5A2B",name:"warm chestnut"},{hex:"#A5673F",name:"russet"},{hex:"#D48C54",name:"golden amber"},{hex:"#B87333",name:"copper"},{hex:"#6F4A2E",name:"deep umber"},{hex:"#AC8E68",name:"fawn"},{hex:"#E3B87C",name:"pale honey"},{hex:"#5D4A2C",name:"rich earth"},{hex:"#AA7C4A",name:"tawny"},{hex:"#CC9966",name:"light bronze"},{hex:"#9C6B3E",name:"bark"},{hex:"#7C5C3A",name:"muddy brown"},{hex:"#3B2A1F",name:"dark shadow"},{hex:"#808080",name:"slate gray"},{hex:"#2E2E2E",name:"charcoal black"},{hex:"#F5F5F5",name:"snow white"},{hex:"#E5942B",name:"fiery ginger"},{hex:"#DAB07A",name:"soft cream"},{hex:"#A06A3B",name:"cinnamon"}];
  var eyePalette=[{hex:"#C9B45B",name:"golden amber"},{hex:"#6A9C78",name:"deep moss green"},{hex:"#4B7BA0",name:"icy blue"},{hex:"#D49B3B",name:"bright sun"},{hex:"#B87333",name:"copper"},{hex:"#5F8B6F",name:"forest green"},{hex:"#E6B422",name:"yellow blaze"},{hex:"#7F6E48",name:"hazel"},{hex:"#7A9C6E",name:"pale jade"}];

  var state={clan:"ThunderClan",role:"Warrior",prefix:"Bramble",suffix:"claw",fur:"#8B5A2B",eyes:"#C9B45B",pattern:"striped",traits:[]};

  function pick(a){return a[Math.floor(Math.random()*a.length)]}
  function cap(s){return s?s[0].toUpperCase()+s.slice(1):s}
  function suffixForRole(role){
    if(role==="Loner"){return ""}
    var key=role==="Medicine Cat"?"Medicine":role;
    var pool=roleSuffixes[key]||suffixes;
    if(role==="Leader"){return "star"}
    return pick(pool);
  }
  function buildName(){
    var pre=cap((document.getElementById("prefixInput").value||state.prefix).trim());
    var suf=(document.getElementById("suffixInput").value||state.suffix).trim().toLowerCase();
    return pre+suf;
  }
  function roleKey(){
    if(state.role==="Medicine Cat")return "medicine";
    if(state.role==="Kit")return "kit";
    if(state.role==="Apprentice")return "apprentice";
    if(state.role==="Warrior")return "warrior";
    if(state.role==="Queen")return "queen";
    if(state.role==="Elder")return "elder";
    if(state.role==="Leader")return "leader";
    return "loner";
  }
  function shadeColor(c,p){
    var R=parseInt(c.substring(1,3),16),G=parseInt(c.substring(3,5),16),B=parseInt(c.substring(5,7),16);
    R=Math.min(255,Math.max(0,R+R*p/100));
    G=Math.min(255,Math.max(0,G+G*p/100));
    B=Math.min(255,Math.max(0,B+B*p/100));
    return "rgb("+Math.floor(R)+","+Math.floor(G)+","+Math.floor(B)+")";
  }

  function drawCat(){
    var canvas=document.getElementById("catCanvas");
    if(!canvas)return;
    var ctx=canvas.getContext("2d");
    var w=240,h=240;
    var s=w/280;
    var fur=state.fur,eyes=state.eyes,pat=state.pattern;
    var rk=roleKey();
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle="#FDF8F0";ctx.fillRect(0,0,w,h);

    var headR=85,headY=150,eyeW=14,eyeH=18,pupilR=4,earH1=53,earH2=48;
    if(rk==="apprentice"){headR=78;headY=145;eyeW=16;eyeH=21;pupilR=5;earH1=45;earH2=40;}
    if(rk==="elder"){headR=82;headY=155;eyeW=12;eyeH=15;pupilR=3;earH1=48;earH2=43;}
    if(rk==="kit"){headR=70;headY=140;eyeW=17;eyeH=23;pupilR=6;earH1=40;earH2=35;}
    if(rk==="leader"){headR=90;headY=152;eyeW=15;eyeH=19;pupilR=5;earH1=58;earH2=53;}
    if(rk==="loner"){headR=87;headY=151;eyeW=13;eyeH=17;pupilR=3;earH1=55;earH2=50;}
    if(rk==="queen"){headR=83;headY=149;eyeW=14;eyeH=19;pupilR=4;earH1=51;earH2=46;}

    ctx.beginPath();ctx.moveTo(70*s,headY-82*s);ctx.lineTo(45*s,(headY-82*s)-earH1*s);ctx.lineTo(100*s,(headY-82*s)-earH1*s+30*s);ctx.fillStyle=fur;ctx.fill();
    ctx.beginPath();ctx.moveTo(210*s,headY-82*s);ctx.lineTo(235*s,(headY-82*s)-earH1*s);ctx.lineTo(180*s,(headY-82*s)-earH1*s+30*s);ctx.fill();
    ctx.beginPath();ctx.moveTo(72*s,headY-84*s);ctx.lineTo(55*s,(headY-84*s)-earH2*s);ctx.lineTo(95*s,(headY-84*s)-earH2*s+20*s);ctx.fillStyle=shadeColor(fur,-25);ctx.fill();
    ctx.beginPath();ctx.moveTo(208*s,headY-84*s);ctx.lineTo(225*s,(headY-84*s)-earH2*s);ctx.lineTo(185*s,(headY-84*s)-earH2*s+20*s);ctx.fill();

    if(rk==="elder"){
      ctx.beginPath();ctx.moveTo(68*s,headY-80*s);ctx.lineTo(50*s,(headY-80*s)-40*s);ctx.fillStyle="#b0b0b0";ctx.globalAlpha=0.3;ctx.fill();ctx.globalAlpha=1;
      ctx.beginPath();ctx.moveTo(212*s,headY-80*s);ctx.lineTo(230*s,(headY-80*s)-40*s);ctx.fill();
    }

    ctx.beginPath();ctx.arc(140*s,headY*s,headR*s,0,Math.PI*2);ctx.fillStyle=fur;ctx.fill();
    ctx.strokeStyle=shadeColor(fur,-15);ctx.lineWidth=1.5;ctx.stroke();

    if(rk==="warrior"){
      ctx.beginPath();ctx.arc(140*s,headY*s,headR*s*0.92,0,Math.PI*2);ctx.fillStyle=shadeColor(fur,8);ctx.globalAlpha=0.15;ctx.fill();ctx.globalAlpha=1;
    }

    ctx.fillStyle=shadeColor(fur,-10);
    ctx.beginPath();ctx.ellipse(70*s,170*s,18*s,24*s,-0.2,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(210*s,170*s,18*s,24*s,0.2,0,Math.PI*2);ctx.fill();

    var eyeY=headY-15;
    ctx.beginPath();ctx.ellipse(105*s,eyeY*s,eyeW*s,eyeH*s,0,0,Math.PI*2);ctx.fillStyle="#FEF7E6";ctx.fill();
    ctx.beginPath();ctx.ellipse(175*s,eyeY*s,eyeW*s,eyeH*s,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(105*s,eyeY*s,(eyeW-5)*s,(eyeH-6)*s,0,0,Math.PI*2);ctx.fillStyle=eyes;ctx.fill();
    ctx.beginPath();ctx.ellipse(175*s,eyeY*s,(eyeW-5)*s,(eyeH-6)*s,0,0,Math.PI*2);ctx.fillStyle=eyes;ctx.fill();
    ctx.fillStyle="#111";
    ctx.beginPath();ctx.arc(105*s,eyeY*s,pupilR*s,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(175*s,eyeY*s,pupilR*s,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#fff";
    ctx.beginPath();ctx.arc((105-5)*s,(eyeY-5)*s,2*s,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc((175-5)*s,(eyeY-5)*s,2*s,0,Math.PI*2);ctx.fill();

    if(rk==="warrior"){
      ctx.beginPath();ctx.moveTo(88*s,(eyeY-10)*s);ctx.lineTo(120*s,(eyeY-6)*s);ctx.strokeStyle=shadeColor(fur,-40);ctx.lineWidth=2.5*s;ctx.stroke();
      ctx.beginPath();ctx.moveTo(192*s,(eyeY-10)*s);ctx.lineTo(160*s,(eyeY-6)*s);ctx.stroke();
      ctx.strokeStyle="#8B4513";ctx.lineWidth=2*s;
      ctx.beginPath();ctx.moveTo(93*s,(eyeY-2)*s);ctx.lineTo(115*s,eyeY*s);ctx.stroke();
    }
    if(rk==="medicine"){
      ctx.beginPath();ctx.arc(140*s,(eyeY-12)*s,4*s,0,Math.PI*2);ctx.fillStyle="#E6B422";ctx.globalAlpha=0.6;ctx.fill();ctx.globalAlpha=1;
      ctx.beginPath();ctx.moveTo(137*s,(eyeY-16)*s);ctx.lineTo(140*s,(eyeY-22)*s);ctx.lineTo(143*s,(eyeY-16)*s);ctx.fillStyle="#E6B422";ctx.globalAlpha=0.5;ctx.fill();ctx.globalAlpha=1;
    }
    if(rk==="apprentice"){
      ctx.beginPath();ctx.arc(105*s,eyeY*s,(pupilR+2)*s,0,Math.PI*2);ctx.fillStyle="#fff";ctx.globalAlpha=0.3;ctx.fill();ctx.globalAlpha=1;
      ctx.beginPath();ctx.arc(175*s,eyeY*s,(pupilR+2)*s,0,Math.PI*2);ctx.fill();
    }
    if(rk==="elder"){
      ctx.fillStyle="#C0C0C0";ctx.globalAlpha=0.35;
      ctx.beginPath();ctx.ellipse(140*s,(eyeY+30)*s,35*s,20*s,0,0,Math.PI*2);ctx.fill();
      ctx.globalAlpha=1;
    }
    if(rk==="kit"){
      ctx.fillStyle="#FFE4B5";ctx.globalAlpha=0.3;
      ctx.beginPath();ctx.arc(120*s,(eyeY+25)*s,8*s,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(160*s,(eyeY+25)*s,8*s,0,Math.PI*2);ctx.fill();
      ctx.globalAlpha=1;
      ctx.beginPath();ctx.arc(140*s,(eyeY+5)*s,7*s,0,Math.PI*2);ctx.fillStyle="#FFB6C1";ctx.globalAlpha=0.4;ctx.fill();
      ctx.globalAlpha=1;
    }
    if(rk==="leader"){
      ctx.beginPath();ctx.arc(140*s,(eyeY-20)*s,6*s,0,Math.PI*2);ctx.fillStyle="#FFD700";ctx.globalAlpha=0.7;ctx.fill();
      ctx.globalAlpha=1;
      ctx.strokeStyle="#DAA520";ctx.lineWidth=2*s;
      ctx.beginPath();ctx.arc(140*s,(eyeY-20)*s,10*s,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle=shadeColor(fur,-20);
      ctx.beginPath();ctx.moveTo(130*s,(headY-90)*s);ctx.lineTo(140*s,(headY-100)*s);ctx.lineTo(150*s,(headY-90)*s);ctx.fill();
    }
    if(rk==="loner"){
      ctx.strokeStyle="#5A5A5A";ctx.lineWidth=1.5*s;
      ctx.beginPath();ctx.moveTo(110*s,(eyeY+5)*s);ctx.lineTo(95*s,(eyeY+12)*s);ctx.stroke();
      ctx.beginPath();ctx.moveTo(170*s,(eyeY+3)*s);ctx.lineTo(185*s,(eyeY+10)*s);ctx.stroke();
      ctx.fillStyle=shadeColor(fur,-35);
      ctx.beginPath();ctx.ellipse(115*s,(headY+20)*s,8*s,6*s,0,0,Math.PI*2);ctx.fill();
    }
    if(rk==="queen"){
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
      var seed=state.fur.charCodeAt(1)+state.eyes.charCodeAt(2);
      for(var i=0;i<18;i++){
        var sx=(80+((seed*i*37)%120))*s,sy=(100+((seed*i*53)%100))*s;
        var dx=sx-140*s,dy=sy-headY*s;
        if(Math.sqrt(dx*dx+dy*dy)<(headR-10)*s&&sy>100*s){
          ctx.beginPath();ctx.arc(sx,sy,(3+((i*7)%4))*s,0,Math.PI*2);ctx.fillStyle=shadeColor(fur,-35);ctx.fill();
        }
      }
    }else{
      ctx.beginPath();ctx.ellipse(140*s,headY*s-2,62*s,70*s,0,0,Math.PI*2);ctx.fillStyle=shadeColor(fur,-12);ctx.globalAlpha=0.25;ctx.fill();ctx.globalAlpha=1;
    }

    ctx.globalAlpha=0.2;ctx.fillStyle="#b5725c";
    ctx.beginPath();ctx.arc(85*s,168*s,8*s,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(195*s,168*s,8*s,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;

    if(rk==="medicine"){
      ctx.fillStyle="#4a7c3f";
      ctx.beginPath();ctx.ellipse(232*s,(headY-82*s-5)*s,6*s,10*s,0.3,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle="#3a6c2f";ctx.lineWidth=1*s;
      ctx.beginPath();ctx.moveTo(232*s,(headY-82*s-15)*s);ctx.lineTo(232*s,(headY-82*s+5)*s);ctx.stroke();
    }
  }

  function furName(){var f=furPalette.find(function(x){return x.hex===state.fur});return f?f.name:"earthy brown"}
  function eyeName(){var e=eyePalette.find(function(x){return x.hex===state.eyes});return e?e.name:"amber"}
  function patternDesc(){return state.pattern==="striped"?"dark tabby stripes":(state.pattern==="spotted"?"small scattered spots":"smooth solid coat")}
  function roleLabel(){
    if(state.role==="Kit")return "a tiny kit";
    if(state.role==="Apprentice")return "an apprentice";
    if(state.role==="Warrior")return "a warrior";
    if(state.role==="Medicine Cat")return "a medicine cat";
    if(state.role==="Queen")return "a gentle queen";
    if(state.role==="Elder")return "an elder";
    if(state.role==="Leader")return "a noble leader";
    return "a loner";
  }
  function updatePreview(){
    var name=buildName();
    document.getElementById("catNameDisplay").textContent=name;
    document.getElementById("catClanDisplay").textContent="of "+state.clan;
    var badge=document.getElementById("roleBadge");
    badge.className="cat-role-badge "+roleKey();
    badge.textContent=state.role;
    var desc=name+" is "+roleLabel()+" with "+furName()+" fur, "+eyeName()+" eyes, and a "+patternDesc()+".";
    document.getElementById("catDescription").textContent=desc;
    var canvas=document.getElementById("catCanvas");
    canvas.setAttribute("aria-label",desc);
    var traitBox=document.getElementById("traitList");
    traitBox.innerHTML="";
    state.traits.forEach(function(t){
      var span=document.createElement("span");
      span.className="trait-tag";
      span.textContent=t;
      traitBox.appendChild(span);
    });
    drawCat();
  }

  function buildSwatches(){
    var furRow=document.getElementById("furSwatches");
    furPalette.forEach(function(f){
      var b=document.createElement("button");
      b.type="button";
      b.className="swatch"+(f.hex===state.fur?" active":"");
      b.style.background=f.hex;
      b.title=f.name;
      b.setAttribute("aria-label","Fur color "+f.name);
      b.addEventListener("click",function(){state.fur=f.hex;document.querySelectorAll("#furSwatches .swatch").forEach(function(x){x.classList.remove("active")});b.classList.add("active");updatePreview()});
      furRow.appendChild(b);
    });
    var eyeRow=document.getElementById("eyeSwatches");
    eyePalette.forEach(function(e){
      var b=document.createElement("button");
      b.type="button";
      b.className="swatch"+(e.hex===state.eyes?" active":"");
      b.style.background=e.hex;
      b.title=e.name;
      b.setAttribute("aria-label","Eye color "+e.name);
      b.addEventListener("click",function(){state.eyes=e.hex;document.querySelectorAll("#eyeSwatches .swatch").forEach(function(x){x.classList.remove("active")});b.classList.add("active");updatePreview()});
      eyeRow.appendChild(b);
    });
  }

  document.querySelectorAll("#clanOptions .option-chip").forEach(function(btn){
    btn.addEventListener("click",function(){
      document.querySelectorAll("#clanOptions .option-chip").forEach(function(x){x.classList.remove("active")});
      btn.classList.add("active");
      state.clan=btn.dataset.clan;
      updatePreview();
    });
  });
  document.querySelectorAll("#roleOptions .option-chip").forEach(function(btn){
    btn.addEventListener("click",function(){
      document.querySelectorAll("#roleOptions .option-chip").forEach(function(x){x.classList.remove("active")});
      btn.classList.add("active");
      state.role=btn.dataset.role;
      if(state.role==="Loner"){state.suffix="";document.getElementById("suffixInput").value="";}
      else if(state.role==="Leader"){state.suffix="star";document.getElementById("suffixInput").value="star";}
      else if(state.role==="Kit"){state.suffix="kit";document.getElementById("suffixInput").value="kit";}
      else if(state.role==="Apprentice"){state.suffix="paw";document.getElementById("suffixInput").value="paw";}
      else{
        var s=suffixForRole(state.role);
        state.suffix=s;
        document.getElementById("suffixInput").value=s;
      }
      updatePreview();
    });
  });
  document.querySelectorAll("#patternOptions .option-chip").forEach(function(btn){
    btn.addEventListener("click",function(){
      document.querySelectorAll("#patternOptions .option-chip").forEach(function(x){x.classList.remove("active")});
      btn.classList.add("active");
      state.pattern=btn.dataset.pattern;
      updatePreview();
    });
  });
  document.querySelectorAll("#traitOptions .option-chip").forEach(function(btn){
    btn.addEventListener("click",function(){
      var t=btn.dataset.trait;
      var idx=state.traits.indexOf(t);
      if(idx>=0){state.traits.splice(idx,1);btn.classList.remove("active");}
      else{if(state.traits.length<3){state.traits.push(t);btn.classList.add("active");}}
      updatePreview();
    });
  });
  document.getElementById("prefixInput").addEventListener("input",function(){state.prefix=this.value;updatePreview()});
  document.getElementById("suffixInput").addEventListener("input",function(){state.suffix=this.value;updatePreview()});
  document.getElementById("prefixDice").addEventListener("click",function(){
    var p=pick(prefixes);
    document.getElementById("prefixInput").value=p;
    state.prefix=p;
    updatePreview();
  });
  document.getElementById("suffixDice").addEventListener("click",function(){
    var s=state.role==="Loner"?"":suffixForRole(state.role);
    document.getElementById("suffixInput").value=s;
    state.suffix=s;
    updatePreview();
  });

  function showToast(msg){
    var t=document.getElementById("toast");
    t.textContent=msg;
    t.classList.add("show");
    setTimeout(function(){t.classList.remove("show")},1800);
  }

  document.getElementById("randomizeBtn").addEventListener("click",function(){
    state.clan=pick(["ThunderClan","RiverClan","ShadowClan","WindClan","SkyClan"]);
    document.querySelectorAll("#clanOptions .option-chip").forEach(function(x){x.classList.toggle("active",x.dataset.clan===state.clan)});
    var rolePool=["Kit","Apprentice","Warrior","Warrior","Warrior","Medicine Cat","Queen","Elder","Leader","Loner"];
    state.role=pick(rolePool);
    document.querySelectorAll("#roleOptions .option-chip").forEach(function(x){x.classList.toggle("active",x.dataset.role===state.role)});
    state.prefix=pick(prefixes);
    state.suffix=state.role==="Loner"?"":suffixForRole(state.role);
    document.getElementById("prefixInput").value=state.prefix;
    document.getElementById("suffixInput").value=state.suffix;
    state.fur=pick(furPalette).hex;
    state.eyes=pick(eyePalette).hex;
    state.pattern=pick(["solid","striped","spotted"]);
    document.querySelectorAll("#furSwatches .swatch").forEach(function(x){x.classList.remove("active")});
    document.querySelectorAll("#furSwatches .swatch").forEach(function(x){if(x.title===furName())x.classList.add("active")});
    document.querySelectorAll("#eyeSwatches .swatch").forEach(function(x){x.classList.remove("active")});
    document.querySelectorAll("#eyeSwatches .swatch").forEach(function(x){if(x.title===eyeName())x.classList.add("active")});
    document.querySelectorAll("#patternOptions .option-chip").forEach(function(x){x.classList.toggle("active",x.dataset.pattern===state.pattern)});
    state.traits=[];
    var allTraits=["Brave","Loyal","Cunning","Gentle","Fierce","Curious","Quiet","Playful","Stubborn","Wise","Hot-headed","Patient"];
    var chosen=[];while(chosen.length<3){var c=pick(allTraits);if(chosen.indexOf(c)<0)chosen.push(c)}
    state.traits=chosen;
    document.querySelectorAll("#traitOptions .option-chip").forEach(function(x){x.classList.toggle("active",chosen.indexOf(x.dataset.trait)>=0)});
    updatePreview();
  });

  document.getElementById("resetBtn").addEventListener("click",function(){
    state={clan:"ThunderClan",role:"Warrior",prefix:"Bramble",suffix:"claw",fur:"#8B5A2B",eyes:"#C9B45B",pattern:"striped",traits:[]};
    document.getElementById("prefixInput").value=state.prefix;
    document.getElementById("suffixInput").value=state.suffix;
    document.querySelectorAll("#clanOptions .option-chip").forEach(function(x){x.classList.toggle("active",x.dataset.clan===state.clan)});
    document.querySelectorAll("#roleOptions .option-chip").forEach(function(x){x.classList.toggle("active",x.dataset.role===state.role)});
    document.querySelectorAll("#patternOptions .option-chip").forEach(function(x){x.classList.toggle("active",x.dataset.pattern===state.pattern)});
    document.querySelectorAll("#traitOptions .option-chip").forEach(function(x){x.classList.remove("active")});
    document.querySelectorAll("#furSwatches .swatch").forEach(function(x){x.classList.remove("active")});
    document.querySelectorAll("#furSwatches .swatch").forEach(function(x){if(x.title===furName())x.classList.add("active")});
    document.querySelectorAll("#eyeSwatches .swatch").forEach(function(x){x.classList.remove("active")});
    document.querySelectorAll("#eyeSwatches .swatch").forEach(function(x){if(x.title===eyeName())x.classList.add("active")});
    updatePreview();
    showToast("Cat reset to default");
  });

  document.getElementById("downloadBtn").addEventListener("click",function(){
    drawCat();
    var w=480,h=620;
    var out=document.createElement("canvas");
    out.width=w;out.height=h;
    var c=out.getContext("2d");
    c.fillStyle="#fffef7";c.fillRect(0,0,w,h);
    c.fillStyle="#2c3e2f";c.fillRect(0,0,w,72);
    c.fillStyle="#e6b422";c.fillRect(0,72,w,4);
    c.fillStyle="#f7d98c";c.font="700 24px 'Segoe UI',Arial,sans-serif";c.textAlign="center";
    c.fillText("Warrior Cats Character Card",w/2,38);
    c.fillStyle="#e6b422";c.font="500 13px 'Segoe UI',Arial,sans-serif";
    c.fillText("warriorcatsnamegenerator.net/game/warrior-cats-create-a-cat.html",w/2,58);
    c.fillStyle="#2c241a";c.font="800 30px 'Segoe UI',Arial,sans-serif";
    var nm=buildName();
    c.fillText(nm,w/2,120);
    c.font="600 14px 'Segoe UI',Arial,sans-serif";c.fillStyle="#5a3e2b";
    c.fillText(state.role+" of "+state.clan,w/2,144);
    var src=document.getElementById("catCanvas");
    c.drawImage(src,120,165,240,240);
    c.strokeStyle="#e6b422";c.lineWidth=3;
    c.strokeRect(120,165,240,240);
    c.fillStyle="#2c241a";c.font="600 14px 'Segoe UI',Arial,sans-serif";c.textAlign="left";
    c.fillText("Fur: "+furName(),30,440);
    c.fillText("Eyes: "+eyeName(),30,464);
    c.fillText("Pattern: "+state.pattern,30,488);
    c.fillText("Traits: "+(state.traits.length?state.traits.join(", "):"none yet"),30,512);
    c.fillStyle="#8b7355";c.font="italic 12px 'Segoe UI',Arial,sans-serif";
    var desc=nm+" is "+roleLabel()+" with "+furName()+" fur, "+eyeName()+" eyes, and a "+patternDesc()+".";
    c.fillText(desc,30,544);
    c.fillStyle="#c97e5a";c.font="500 11px 'Segoe UI',Arial,sans-serif";
    c.textAlign="center";
    c.fillText("Built with the Create a Cat game",w/2,598);
    var filename=(nm||"warrior-cat")+".png";
    function triggerDownload(dataUrl,fn){
      console.log("[Download] filename:",fn);
      console.log("[Download] dataUrl length:",dataUrl?dataUrl.length:0);
      console.log("[Download] dataUrl head:",dataUrl?dataUrl.substring(0,60):"(empty)");
      console.log("[Download] dataUrl tail:",dataUrl?dataUrl.substring(dataUrl.length-40):"(empty)");
      var link=document.createElement("a");
      link.href=dataUrl;
      link.download=fn;
      document.body.appendChild(link);
      link.click();
      setTimeout(function(){
        if(link.parentNode)link.parentNode.removeChild(link);
      },1000);
      showToast("Character card saved!");
    }
    var dataUrl=null;
    try{dataUrl=out.toDataURL("image/png");}catch(err){console.error("[Download] toDataURL threw:",err);}
    if(dataUrl&&dataUrl.length>200){
      triggerDownload(dataUrl,filename);
    }else if(typeof out.toBlob==="function"){
      console.warn("[Download] toDataURL returned short/empty, trying toBlob path");
      out.toBlob(function(blob){
        console.log("[Download] toBlob result:",blob?("blob size="+blob.size+", type="+blob.type):"null");
        if(!blob){showToast("Save failed - try a different browser");return}
        var reader=new FileReader();
        reader.onload=function(){if(reader.result){triggerDownload(reader.result,filename);}else{showToast("Save failed - file read error");}};
        reader.onerror=function(){showToast("Save failed - file read error");};
        reader.readAsDataURL(blob);
      },"image/png");
    }else{
      console.error("[Download] neither toDataURL nor toBlob produced a usable result");
      showToast("Save failed - browser does not support this");
    }
  });

  var pageUrl=(document.querySelector('link[rel="canonical"]')||{}).href||location.href;
  function shareText(){
    var nm=buildName();
    return "I just made "+nm+", a "+state.role+" of "+state.clan+", in the Warrior Cats Create a Cat game. Build yours: "+pageUrl;
  }
  function fallbackCopy(text){
    var ta=document.createElement("textarea");
    ta.value=text;ta.setAttribute("readonly","");
    ta.style.position="fixed";ta.style.left="-9999px";ta.style.top="0";
    document.body.appendChild(ta);ta.select();
    try{document.execCommand("copy");showToast("Copied to clipboard!");}
    catch(e){showToast("Copy failed - try selecting manually");}
    document.body.removeChild(ta);
  }
  function openShare(url){
    var win=window.open(url,"_blank","width=580,height=600,noopener,noreferrer");
    if(!win)showToast("Popup blocked - allow popups to share");
  }
  document.querySelectorAll(".share-btn").forEach(function(btn){
    btn.addEventListener("click",function(){
      var action=btn.getAttribute("data-share");
      var text=shareText();
      if(action==="copy-text"){
        if(navigator.clipboard&&navigator.clipboard.writeText){
          navigator.clipboard.writeText(text).then(function(){showToast("Text copied - paste it anywhere!");})
            .catch(function(){fallbackCopy(text);});
        }else{fallbackCopy(text);}
      }else if(action==="copy-image"){
        drawCat();
        var cc=document.getElementById("catCanvas");
        if(!cc||typeof cc.toBlob!=="function"){showToast("Your browser does not support this");return;}
        cc.toBlob(function(blob){
          if(!blob){showToast("Copy failed");return;}
          if(navigator.clipboard&&window.ClipboardItem){
            try{
              navigator.clipboard.write([new ClipboardItem({"image/png":blob})])
                .then(function(){showToast("Cat image copied - paste in chat!");})
                .catch(function(){showToast("Image copy blocked - try Chrome or Edge");});
            }catch(e){showToast("Image copy blocked - try Chrome or Edge");}
          }else{showToast("Your browser does not support copying images");}
        },"image/png");
      }else if(action==="twitter"){
        openShare("https://twitter.com/intent/tweet?text="+encodeURIComponent(text));
      }else if(action==="reddit"){
        openShare("https://www.reddit.com/submit?url="+encodeURIComponent(pageUrl)+"&title="+encodeURIComponent(state.clan+" "+state.role+" - Warrior Cats Create a Cat"));
      }else if(action==="tumblr"){
        openShare("https://www.tumblr.com/widgets/share/tool?canonicalUrl="+encodeURIComponent(pageUrl)+"&title="+encodeURIComponent(text));
      }else if(action==="facebook"){
        openShare("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(pageUrl));
      }
    });
  });

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

  buildSwatches();
  updatePreview();
})();
