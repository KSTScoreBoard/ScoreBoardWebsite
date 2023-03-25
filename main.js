let port;

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

async function onConnectButtonClick() {
  try {
      port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });

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

async function sendSerial() {
  var score1 = document.getElementById("block1_score").textContent;
  var brightness1 = document.getElementById("block1_brightness").value;

  var payload = [":","01",score1.substring(0,1).padStart(2,'0'),
                          score1.substring(1,2).padStart(2,'0'),
                          score1.substring(2,3).padStart(2,'0'),
                          brightness1.padStart(2,'0'),"00","X"];

  console.log(payload.join(','));

  const encoder = new TextEncoder();
  const writer = port.writable.getWriter();
  await writer.write(encoder.encode(payload.join('') + "\n"));
  writer.releaseLock();
}
