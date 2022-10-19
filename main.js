'use strict'
 {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
      btn.textContent = ('000' + (Number(btn.textContent) + 1)).slice(-3);
 })
}