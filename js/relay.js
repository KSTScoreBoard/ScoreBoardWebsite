const socket = new WebSocket('wss://cloud.achex.ca/kst-denshikousaku');
let port;
let auth;

window.onload = function(){
  auth = Math.floor(Math.random() * 9999).toString().padStart(4,"0");
  document.getElementById('auth').textContent = '認証コード:' + auth;
}

socket.addEventListener('open', function (event) {
    console.log('open',event)
    socket.send(JSON.stringify({"auth":auth}));
    onConnectButtonClick();
});

socket.addEventListener('message', function (event) {
    console.log('message',event)
    const json = JSON.parse(event.data)
    console.log(json)
    // auth時のレスポンスもmessageで来るので弾いておきます
    if (json.auth == 'OK') {
    return
    }
    console.log(json.b1_score);
    console.log(json.b1_lv);

    document.getElementById('b1_score').textContent = json.b1_score;
    document.getElementById('b1_lv').value = json.b1_lv;

    sendSerial(json);
})

async function onConnectButtonClick() {
  console.log("A");
  try {
      port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
      document.getElementById('connectButton').textContent = '接続済み';

      while (port.readable) {
          const reader = port.readable.getReader();

          try {
              while (true) {
                  const { value, done } = await reader.read();
                  if (done) {
                      addSerial("Canceled\n");
                      break;
                  }
                  const inputValue = new TextDecoder().decode(value);
                  addSerial(inputValue);
              }
          } catch (error) {
              addSerial("Error: Read" + error + "\n");
          } finally {
              reader.releaseLock();
          }
      }
  } catch (error) {
      addSerial("Error: Open" + error + "\n");
  }
}

function addSerial(msg) {
  console.log(msg);
}

async function sendSerial(json) {
  const payload = new Uint8Array(new ArrayBuffer(9));
  const header = new Uint8Array([0xA5,0x5A,0x80,0x04]);
  const data = new Uint8Array([0x01,json.b1_score>>8,json.b1_score,json.b1_lv]);
  const checkSum = new Uint8Array([cal_checkSum(data)]);
  payload.set(header,0);
  payload.set(data,header.length);
  payload.set(checkSum,header.length + data.length);

  try{
    const writer = port.writable.getWriter();
    await writer.write(payload);
    writer.releaseLock();
  }catch{

  }
}

function cal_checkSum(array){
  var checkSum = 0;
  array.forEach(element => {
    checkSum = checkSum ^ element;
  });
  return checkSum;
}