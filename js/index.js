const socket = new WebSocket('wss://cloud.achex.ca/kst-denshikousaku');

socket.addEventListener('open', function (event) {
  console.log('open',event)
  // 事前登録などはなく使用時に好きなものを入れられます。
  socket.send('{"auth":"sneder"}');
});

function send(){
  var b1_score = Number(document.getElementById('b1_score').textContent);
  var b1_lv = Number(document.getElementById('b1_lv').value);
  socket.send(JSON.stringify({"to":"receiver", "b1_score":b1_score, "b1_lv":b1_lv}));
}


function block1_click(e){
  var b1_score = Number(document.getElementById('b1_score').textContent);
  const data = e.currentTarget.dataset['index']; // 1が返される
  switch(data){
    case '+100':
      b1_score += 100;
      break;
    case '+10':
      b1_score += 10;
      break;
    case '+1':
      b1_score += 1;
      break;
    case '-100':
      b1_score -= 100;
      break;
    case '-10':
      b1_score -= 10;
      break;
    case '-1':
      b1_score -= 1;
      break;
  }
  if(b1_score > 999) b1_score = 999;
  if(b1_score < 0) b1_score= 0;
  document.getElementById('b1_score').textContent = String(b1_score).padStart(3,'0');
}