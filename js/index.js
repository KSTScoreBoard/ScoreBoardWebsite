const socket = new WebSocket('wss://cloud.achex.ca');
//メモ　変更を反映させるボタン

window.addEventListener('load', (event) => {
  document.getElementById('block1_color').classList.add('bg-' + window.localStorage.getItem('block1_color'));
  document.getElementById('block1_name').textContent = window.localStorage.getItem('block1_name');

  document.getElementById('block2_color').classList.add('bg-' + window.localStorage.getItem('block2_color'));
  document.getElementById('block2_name').textContent = window.localStorage.getItem('block2_name');

  document.getElementById('block3_color').classList.add('bg-' + window.localStorage.getItem('block3_color'));
  document.getElementById('block3_name').textContent = window.localStorage.getItem('block3_name');

  document.getElementById('block4_color').classList.add('bg-' + window.localStorage.getItem('block4_color'));
  document.getElementById('block4_name').textContent = window.localStorage.getItem('block4_name');
});

socket.addEventListener('open', function (event) {
  console.log('open',event)
  // 事前登録などはなく使用時に好きなものを入れられます。
  socket.send('{"auth":"sender"}');
});

socket.addEventListener('message', function (event) {
  console.log('message',event)
  const json = JSON.parse(event.data)
  // auth時のレスポンスもmessageで来るので弾いておきます
  if (json.auth == 'OK') {
  return
  }
})

function send(){
  var score = Number(document.getElementById('b1_score').textContent);
  var level = Number(document.getElementById('b1_level').value);
  var hidden0 = document.getElementById('btncheck1').checked;
  var hidden1 = document.getElementById('btncheck2').checked;
  var hidden2 = document.getElementById('btncheck3').checked;
  socket.send(JSON.stringify({"to":"block1","score":score,"level":level,"hidden0":hidden0,"hidden1":hidden1,"hidden2":hidden2}));
}

function score_append(element,append){
  var score = Number(document.getElementById(element).textContent);
  score += append;
  if(score > 999) score = 999;
  if(score < 0) score = 0;
  document.getElementById(element).textContent = String(score).padStart(3,'0');
}