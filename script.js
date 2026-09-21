const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const progress=$("#progress");
addEventListener("scroll",()=>{const h=document.documentElement;progress.style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+"%"});
$("#startBtn").onclick=()=>$("#journey").scrollIntoView({behavior:"smooth"});
$("#topBtn").onclick=()=>scrollTo({top:0,behavior:"smooth"});

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
$$(".reveal").forEach(x=>observer.observe(x));

setInterval(()=>{if(document.hidden)return;const h=document.createElement("span");h.className="float-heart";h.textContent=Math.random()>.35?"♥":"✦";h.style.left=Math.random()*100+"%";h.style.bottom="-30px";h.style.animationDuration=(5+Math.random()*5)+"s";$(".hearts").append(h);setTimeout(()=>h.remove(),10000)},850);

let score=0,time=20,timer,playing=false;
function spawnHeart(){if(!playing)return;const g=$("#heartGame"),h=document.createElement("span");h.className="game-heart";h.textContent="♥";h.style.left=Math.random()*88+"%";h.style.top=Math.random()*78+"%";h.onclick=()=>{score++;$("#score").textContent=score;h.remove();spawnHeart()};g.append(h);setTimeout(()=>h.remove(),850)}
$("#heartStart").onclick=()=>{clearInterval(timer);score=0;time=20;playing=true;$("#score").textContent=0;$("#time").textContent=20;$("#gameMsg").textContent="";$("#heartGame").innerHTML="";for(let i=0;i<4;i++)spawnHeart();timer=setInterval(()=>{time--;$("#time").textContent=time;if(time<=0){clearInterval(timer);playing=false;$("#heartGame").innerHTML='<div class="game-overlay">Time’s up! 💕</div>';$("#gameMsg").textContent=score<10?"Cute! But I think you can catch more hearts ❤️":score<=20?"Okayyy, that's a pretty good score 💕":"Love Level: MAXIMUM ❤️🔥"}},1000)};

const questions=[
["Who says “5 minutes” but somehow arrives much later?",["Kucchu","Puchhu","Both","Nobody"],1],
["What makes this birthday adventure complete?",["Food","Photos","Fun","All three ❤️"],3],
["Which memory is officially too unusual to forget?",["First selfie","Police station birthday","A random Tuesday","None"],1],
["Where is the final cake cutting?",["Z Square","Ganga Barrage","Rama Devi","KDA"],2],
["What are our nicknames?",["Kuchu & Puchu","Kucchu & Puchhu","Kuku & Pupu","K & P"],1]
];
let qi=0,correct=0;
function renderQ(){if(qi>=questions.length){$("#quiz").innerHTML=`<div class="q">Quiz complete! You got <b>${correct}/${questions.length}</b>.</div>`;$("#quizNext").textContent="Play Again";$("#quizMsg").textContent=correct>=4?"You know me pretty well ❤️": "Not bad… but we need another food date for revision 😄";return}const [q,a]=questions[qi];$("#quiz").innerHTML=`<div class="q">${qi+1}. ${q}</div><div class="answers">${a.map((x,i)=>`<button class="answer" data-i="${i}">${x}</button>`).join("")}</div>`;$$(".answer").forEach(b=>b.onclick=()=>{if(+b.dataset.i===questions[qi][2])correct++;qi++;renderQ()})}
$("#quizNext").onclick=()=>{if(qi>=questions.length){qi=0;correct=0;$("#quizMsg").textContent=""}renderQ()};

function showModal(m){m.classList.add("show");m.setAttribute("aria-hidden","false")}
function hideModal(m){m.classList.remove("show");m.setAttribute("aria-hidden","true")}
$$("[data-close]").forEach(b=>b.onclick=()=>hideModal(b.closest(".modal")));
$("#wishBtn").onclick=()=>{showModal($("#wishModal"));$("#confetti").innerHTML="";for(let i=0;i<35;i++){const x=document.createElement("i");x.textContent=["♥","✦","♡","✨"][i%4];x.style.setProperty("--x",(Math.random()*600-300)+"px");x.style.setProperty("--y",(Math.random()*500-250)+"px");$("#confetti").append(x)}};
$$(".open-card").forEach(b=>b.onclick=()=>{$("#messageTitle").textContent=b.dataset.title;$("#messageText").textContent=b.dataset.message;showModal($("#messageModal"))});
$$(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)hideModal(m)}));

let taps=0;$("#secretHeart").onclick=()=>{taps++;$("#secretReveal").textContent=taps<5?`Secret meter: ${taps}/5 ♥`:"Five taps! Now you know there’s definitely something here… 🔐"};
$("#unlock").onclick=()=>{const p=$("#password").value.trim();$("#secretReveal").textContent=p==="22092002"?"SECRET UNLOCKED 🔐❤️\nNo matter how many places we visit, my favourite place will always be wherever I am with you.":"Hmm… that password didn't open it. Try the special one you were given. 💌"};
$("#finalSurprise").onclick=()=>{$("#finalReveal").textContent="🎁 Surprise: This page is your little digital memory box — keep adding real photos, future trips and new inside jokes. One day, you’ll look back and realize the website became a timeline of your story. ❤️";$("#finalSurprise").textContent="Surprise Unlocked ✨";};

const music=$("#music"), musicBtn=$("#musicBtn");
musicBtn.onclick=async()=>{if(!music.src){music.src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_9e5f7c7a0d.mp3?filename=happy-birthday-to-you-10123.mp3"}try{if(music.paused){await music.play();musicBtn.innerHTML="❚❚ <span>Music</span>"}else{music.pause();musicBtn.innerHTML="♫ <span>Music</span>"}}catch(e){alert("Browser blocked playback. Click the Music button again to start it.")}};
