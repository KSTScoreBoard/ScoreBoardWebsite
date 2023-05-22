const socket = new WebSocket('wss://cloud.achex.ca');
//メモ　変更を反映させるボタン

window.addEventListener('load', (event) => {
  if(window.localStorage.getItem('block1') == null){
    window.localStorage.setItem('block1','{"name":"赤","to":"1","color":"1"}');
    window.localStorage.setItem('block2','{"name":"青","to":"2","color":"2"}');
    window.localStorage.setItem('block3','{"name":"緑","to":"3","color":"3"}');
    window.localStorage.setItem('block4','{"name":"黄","to":"4","color":"4"}');
    location.reload();
  }else{
    setBlockConfig('block1');
    setBlockConfig('block2');
    setBlockConfig('block3');
    setBlockConfig('block4');
  }
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

function setBlockConfig(target){
  const colors = ['danger','primary','success','warning'];
  var json =  JSON.parse(window.localStorage.getItem(target));
  document.querySelector("#" + target + " div[name='color']").classList.add('bg-' + colors[json.color - 1]);
  document.querySelector("#" + target + " h3[name='name']").textContent = json.name;
}

function send(){
  socket.send(createJSON('block1'));
  socket.send(createJSON('block2'));
  socket.send(createJSON('block3'));
  socket.send(createJSON('block4'));
  alert('送信しました');

}

function createJSON(target){
  var to = JSON.parse(window.localStorage.getItem(target)).to;
  var score = Number(document.querySelector("#" + target + " p[name='score']").textContent);
  var level = Number(document.querySelector("#" + target + " input[name='level']").value);
  var hidden = document.querySelectorAll("#" + target + " input[name='" + target + "_hidden']");
  return JSON.stringify({"to":String(to),"score":score,"level":level,"hidden0":hidden[0].checked,"hidden1":hidden[1].checked,"hidden2":hidden[2].checked});
}

function score_append(element,append){
  var score = Number(document.querySelector('#' + element + " p[name='score']").textContent);
  score += append;
  if(score > 999) score = 999;
  if(score < 0) score = 0;
  document.querySelector('#' + element + " p[name='score']").textContent = String(score).padStart(3,'0');
}