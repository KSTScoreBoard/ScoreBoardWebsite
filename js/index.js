const socket = new WebSocket('wss://cloud.achex.ca/kst-denshikousaku');
const ble = new BlueJelly();
//メモ　変更を反映させるボタン

window.onload = function () {
  //UUIDの設定
  ble.setUUID("b1_score", "686a7d86-7cc6-4983-a906-391e2fb5e6e6", "1c798918-cf8c-11ed-afa1-0242ac120002");
  ble.setUUID("b1_level", "686a7d86-7cc6-4983-a906-391e2fb5e6e6", "21a4f6d0-cf9a-11ed-afa1-0242ac120002");
  ble.setUUID("b1_enable", "686a7d86-7cc6-4983-a906-391e2fb5e6e6", "84a073e6-d0c0-11ed-afa1-0242ac120002");

  document.getElementById("b1_connect").addEventListener('click',() => {ble.requestDevice('686a7d86-7cc6-4983-a906-391e2fb5e6e6');});
}

ble.onScan = function (deviceName) {
  document.getElementById('b1_connect').className = "btn btn-lg bg-success m-2 text-light";
  document.getElementById('b1_connect').textContent = "接続済み";
}


function b1_score(append){
  var score = Number(document.getElementById("b1_score").textContent);
  score += append;
  if(score > 999) score = 999;
  if(score < 0) score = 0;
  document.getElementById('b1_score').textContent = String(score).padStart(3,'0');

  if(ble.bluetoothDevice != null){
    const view = new DataView(new ArrayBuffer(2));
    view.setInt16(0,Number(document.getElementById("b1_score").textContent),true);  
    ble.write('b1_score', new Uint8Array(view.buffer));
  }
}

function b1_level(element){
  if(ble.bluetoothDevice != null){
    ble.write('b1_level', new Uint8Array([element.value]));
  }
}