const socket = new WebSocket('wss://cloud.achex.ca/kst-denshikousaku');
let auth = "";

socket.addEventListener('open', function (event) {
  auth = window.prompt("ペアコードを入力してください", "");
  console.log('open',event)
  // 事前登録などはなく使用時に好きなものを入れられます。
  socket.send('{"auth":"sneder"}');
});

socket.addEventListener('message', function (event) {
  console.log('message',event)
  const json = JSON.parse(event.data)
  console.log(json)
  // auth時のレスポンスもmessageで来るので弾いておきます
  if (json.auth == 'OK') {
  return
  }
})

function send(){
  var b1_score = document.getElementById('b1_score').textContent;
  var b1_lv = document.getElementById('b1_lv').value;
  socket.send(JSON.stringify({"to":auth, "b1_score":b1_score, "b1_lv":b1_lv}));
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