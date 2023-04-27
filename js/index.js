const socket = new WebSocket('wss://cloud.achex.ca');
//メモ　変更を反映させるボタン

window.addEventListener('load', (event) => {
  document.querySelector('#block1 #name').textContent = "赤";
/*

  if(window.localStorage.getItem('block1_color') == null){
    window.localStorage.setItem('block1_name','赤');
    window.localStorage.setItem('block1_color','danger');
    window.localStorage.setItem('block1_id','1');

    window.localStorage.setItem('block2_name','青');
    window.localStorage.setItem('block2_color','primary');
    window.localStorage.setItem('block2_id','2');

    window.localStorage.setItem('block3_name','緑');
    window.localStorage.setItem('block3_color','success');
    window.localStorage.setItem('block3_id','3');

    window.localStorage.setItem('block4_name','黄');
    window.localStorage.setItem('block4_color','warning');
    window.localStorage.setItem('block4_id','4');
    location.reload();
  }else{
    document.getElementById('block1_color').classList.add('bg-' + window.localStorage.getItem('block1_color'));
    document.getElementById('block1_name').textContent = window.localStorage.getItem('block1_name');
  
    document.getElementById('block2_color').classList.add('bg-' + window.localStorage.getItem('block2_color'));
    document.getElementById('block2_name').textContent = window.localStorage.getItem('block2_name');
  
    document.getElementById('block3_color').classList.add('bg-' + window.localStorage.getItem('block3_color'));
    document.getElementById('block3_name').textContent = window.localStorage.getItem('block3_name');
  
    document.getElementById('block4_color').classList.add('bg-' + window.localStorage.getItem('block4_color'));
    document.getElementById('block4_name').textContent = window.localStorage.getItem('block4_name');
  }
  */
  
});

socket.addEventListener('open', function (event) {
  console.log('open',event)
  // 事前登録などはなく使用時に好きなものを入れられます。
  socket.send('{"auth":"sender"}');
  socket.send('{"joinHub":"KST"}');

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
  var score = Number(document.querySelector('#' + element + " #score").textContent);
  score += append;
  if(score > 999) score = 999;
  if(score < 0) score = 0;
  document.querySelector('#' + element + " #score").textContent = String(score).padStart(3,'0');
}