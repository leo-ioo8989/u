function goTo(page){
  location.href = page;
}

/* ===== GLOBAL BGM ===== */
const bgm = document.getElementById("bgm");

if(bgm){
  const t = localStorage.getItem("bgm-time");
  if(t) bgm.currentTime = parseFloat(t);
  bgm.volume = 0.5;

  bgm.play().catch(()=>{});

  setInterval(()=>{
    localStorage.setItem("bgm-time", bgm.currentTime);
  },1000);
}

function toggleMusic(){
  if(!bgm) return;
  bgm.paused ? bgm.play() : bgm.pause();
}

/* ===== LETTER TYPING ===== */
const typed = document.getElementById("typedText");
const text = "Sun na I know that I am not perfect I get jealous too easily, sometimes I can't express how I feel, I can't give you my 100% all the time , i apologize for everything , i overthinks a lot , I am quiet when I am upset , i constantly need reassurance, But I am trying my best to keep you happy.Full try.but I don't know how I will explain this to you but I am working on myself let's hope that one day I will be capable of doing things which currently I can't...But at the end I love you the most ye dekh khudse likha hai chat gpt se polish karayi hai kyonki tu ye padhte padhte bhi meri grammer na sudhare dekh me overthink bahut karta hu sorry dekh jaise parso tune call nahi uthayi mera pagal man kuch bhi soch raha thaaa kuch bhi soch letaaa me sorry uske liye ab tune call cut kar diya mujhe lag raha tu gussa hai isliye ye chota sa mota sa source code bana diyaaa love you yawr I don't want tp lose you i geneuinely loves you a lot me clingy hu me nakhre dikhata me bhondhu hu mujhe samajh nahi aata kya bolna hai kya nahi meri galti hai i know but i dont know how to express myself sorry yawr uske liye kyoki m dara kahi kuch aisa na boldu jo tujhe hurt kar jaye ya jo tujhe buri lage me nahi chahta aisa hoo so please sorry and i love you yawr  .❤️";

if(typed){
  let i = 0;
  const t = setInterval(()=>{
    if(i < text.length){
      typed.textContent += text[i++];
    } else clearInterval(t);
  },40);
}

/* ===== SPRITE FLOW ===== */
const sprite = document.getElementById("sprite");
const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const video = document.getElementById("sadVideo");

if(sprite){
  sprite.addEventListener("animationend", ()=>{
    if(sprite.classList.contains("sprite-before")){
      dialogue.innerText = "Will you forgive me? 🥺";
      dialogue.classList.remove("hidden");

      choices.innerHTML = `
        <button onclick="forgiveYes()">Haa ji haaa ❤️</button>
        <button onclick="forgiveNo()">Nahi 😢</button>
      `;
      choices.classList.remove("hidden");
    }
  });
}

/* YES → hug sprite → gift page */
function forgiveYes(){
  sprite.classList.remove("sprite-before");
  sprite.classList.add("sprite-after");

  dialogue.classList.add("hidden");
  choices.classList.add("hidden");

  sprite.addEventListener("animationend", ()=>{
    goTo("gift.html");
  }, { once:true });
}

/* NO → sad video → final page */
function forgiveNo(){
  video.classList.remove("hidden");
  video.muted = false;
  video.volume = 1;
  video.play();

  dialogue.classList.add("hidden");
  choices.classList.add("hidden");

  video.onended = ()=> goTo("final.html");
}

/* ===== GIFT COUNTDOWN ===== */
function startCountdown(){
  const c = document.getElementById("countdown");
  const v = document.getElementById("giftVideo");

  c.classList.remove("hidden");

  let n = 3;
  c.innerText = n;

  const timer = setInterval(()=>{
    n--;
    c.innerText = n;

    if(n === 0){
      clearInterval(timer);

      c.classList.add("hidden");
      v.classList.remove("hidden");

      v.muted = false;
      v.volume = 1;
      v.play();

      v.onended = ()=>{
        document.getElementById("continueBtn").classList.remove("hidden");
      };
    }
  },1000);
}