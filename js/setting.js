window.addEventListener('load', (event) => {
  if(window.localStorage.getItem('block1') == null){
    window.localStorage.setItem('block1','{"name":"赤","to":"1","color":"1"}');
    window.localStorage.setItem('block2','{"name":"青","to":"2","color":"2"}');
    window.localStorage.setItem('block3','{"name":"緑","to":"3","color":"3"}');
    window.localStorage.setItem('block4','{"name":"黄","to":"4","color":"4"}');
  }
  readBlockConfig('block1');
  readBlockConfig('block2');
  readBlockConfig('block3');
  readBlockConfig('block4');

});

function set(){
  writeBlockConfig('block1');
  writeBlockConfig('block2');
  writeBlockConfig('block3');
  writeBlockConfig('block4');
  alert("設定を保存しました");
}

function writeBlockConfig(target){
  var to;
  var color;

  var to_elements = document.querySelectorAll("#" + target + " input[name='" + target + "_to']");
  var color_elements = document.querySelectorAll("#" + target + " input[name='" + target + "_color']");

  to_elements.forEach(element => {
    if(element.checked){
      to = [].slice.call(to_elements).indexOf(element) + 1;
    }
  });

  color_elements.forEach(element => {
    if(element.checked){
      color = [].slice.call(color_elements).indexOf(element) + 1;
    }
  });

  var json = {"name":document.querySelector("#" + target + " input[name='name']").value,"to":to,'color':color};
  window.localStorage.setItem(target,JSON.stringify(json));
}

function readBlockConfig(target){
  var json = JSON.parse(window.localStorage.getItem(target));
  document.querySelector("#" + target + " input[name='name']").value = json.name;
  document.querySelectorAll("#" + target + " input[name='" + target + "_to']")[json.to - 1].checked = true;
  document.querySelectorAll("#" + target + " input[name='" + target + "_color']")[json.color - 1].checked = true;
}