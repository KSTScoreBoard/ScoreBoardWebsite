function block1_click(e){
  var block1_score = document.getElementById('block1_score');
  var num = Number(block1_score.textContent);
  const data = e.currentTarget.dataset['index']; // 1が返される
  switch(data){
    case '+100':
      num += 100;
      break;
    case '+10':
      num += 10;
      break;
    case '+1':
      num += 1;
      break;
    case '-100':
      num -= 100;
      break;
    case '-10':
      num -= 10;
      break;
    case '-1':
      num -= 1;
      break;
  }
  if(num > 999) num = 999;
  if(num < 0) num= 0;
  block1_score.textContent = String(num).padStart(3,'0');
}
