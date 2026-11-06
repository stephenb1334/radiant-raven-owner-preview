'use strict';
(()=>{
 const scene=document.querySelector('.atmosphere'),toggle=document.querySelector('#motion-toggle'),video=document.querySelector('#hero-video');
 if(!scene||!toggle)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let paused=reduced.matches,pending=false;
 try{const saved=localStorage.getItem('rr-hero-paused');if(saved!==null&&!reduced.matches)paused=saved==='true';}catch{}
 const label=video?'video':'sky';
 function syncVideo(){if(!video)return;video.muted=true;if(paused||reduced.matches||document.hidden)video.pause();else video.play().catch(()=>{paused=true;paint();});}
 function paint(){scene.classList.toggle('motion-paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.disabled=reduced.matches;toggle.textContent=reduced.matches?'Motion off · device preference':paused?'Play '+label+' ▷':'Pause '+label+' Ⅱ';scene.style.setProperty('--sky-shift','0px');}
 function update(){pending=false;if(paused||reduced.matches)return;const rect=scene.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const offset=Math.max(-32,Math.min(32,-rect.top*.035));scene.style.setProperty('--sky-shift',offset.toFixed(2)+'px');}
 function scroll(){if(!pending&&!paused&&!reduced.matches){pending=true;requestAnimationFrame(update);}}
 toggle.addEventListener('click',()=>{paused=!paused;paint();syncVideo();try{localStorage.setItem('rr-hero-paused',String(paused));}catch{}scroll();});
 reduced.addEventListener('change',()=>{if(reduced.matches)paused=true;paint();syncVideo();scroll();});
 window.addEventListener('scroll',scroll,{passive:true});
 document.addEventListener('visibilitychange',()=>{scene.classList.toggle('tab-hidden',document.hidden);syncVideo();});
 if(video){video.addEventListener('loadeddata',syncVideo);video.addEventListener('error',()=>{paused=true;paint();toggle.disabled=true;toggle.textContent='Video unavailable';});}
 paint();syncVideo();scroll();
})();
