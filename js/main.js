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
const text = "Write your emotional apology letter here ❤️";

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