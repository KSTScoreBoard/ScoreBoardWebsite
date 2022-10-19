'use strict'
 {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
      btn.textContent = Number(btn.textContent) + 1;
 })
}