document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const door = document.getElementById('garageDoor');
  const car = document.querySelector('.intro-car');
  const bar = document.getElementById('progressBar');
  const percent = document.getElementById('progressText');
  const track = document.getElementById('progressTrack');
  const copy = document.getElementById('loadingCopy');
  const start = document.getElementById('startEngine');
  const skip = document.getElementById('skipIntro');
  const year = document.getElementById('year');
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (year) year.textContent = new Date().getFullYear();
  let progress = 0, step = 0, timer = null, entered = false;
  const steps = [[8,'CHECKING GARAGE SYSTEM...'],[24,'OPENING GARAGE DOOR...'],[52,'STARTING THE ENGINE...'],[78,'READY TO ROLL...'],[100,'GARAGE READY.']];
  function setProgress(value) {
    progress = value;
    if (bar) bar.style.width = value + '%';
    if (percent) percent.textContent = value + '%';
    if (track) track.setAttribute('aria-valuenow', String(value));
  }
  function finishLoading() {
    if (timer) clearInterval(timer);
    setProgress(100);
    if (copy) copy.textContent = 'GARAGE READY.';
    if (door) door.classList.add('open');
    if (car) car.classList.add('drive');
    if (start) start.disabled = false;
  }
  function enterSite() {
    if (entered) return;
    entered = true;
    if (timer) clearInterval(timer);
    if (car) car.classList.add('exit');
    if (copy) copy.textContent = "WELCOME TO SYAHLA'S GARAGE";
    document.body.classList.add('custom-cursor');
    window.setTimeout(() => { if (intro) intro.classList.add('hidden'); }, 650);
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finishLoading();
  else timer = window.setInterval(() => {
    setProgress(Math.min(100, progress + 2));
    while (step < steps.length && progress >= steps[step][0]) {
      if (copy) copy.textContent = steps[step][1];
      if (progress >= 24 && door) door.classList.add('open');
      if (progress >= 52 && car) car.classList.add('drive');
      step++;
    }
    if (progress >= 100) finishLoading();
  }, 75);
  if (start) start.addEventListener('click', enterSite);
  if (skip) skip.addEventListener('click', enterSite);
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
});
