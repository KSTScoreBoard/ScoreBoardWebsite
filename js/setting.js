window.addEventListener('load', (event) => {
  if(window.localStorage.getItem('block1') == null){
    window.localStorage.setItem('block1','{"name":"赤","id":"0","color":"0"}');
    window.localStorage.setItem('block2','{"name":"青","id":"1","color":"1"}');
    window.localStorage.setItem('block3','{"name":"緑","id":"2","color":"2"}');
    window.localStorage.setItem('block4','{"name":"黄","id":"3","color":"3"}');
  }
  setBlockData('block1');
  setBlockData('block2');
  setBlockData('block3');
  setBlockData('block4');

});

function set(){
  window.localStorage.setItem('block1',JSON.stringify(getBlockData('block1')));
  window.localStorage.setItem('block2',JSON.stringify(getBlockData('block2')));
  window.localStorage.setItem('block3',JSON.stringify(getBlockData('block3')));
  window.localStorage.setItem('block4',JSON.stringify(getBlockData('block4')));
  alert("設定を保存しました");
}

function getBlockData(target){
  var id;
  var color;

  var id_elements = document.querySelectorAll("#" + target + " input[name='" + target + "_id']");
  var color_elements = document.querySelectorAll("#" + target + " input[name='" + target + "_color']");

  id_elements.forEach(element => {
    if(element.checked){
      id = [].slice.call(id_elements).indexOf(element);
    }
  });

  color_elements.forEach(element => {
    if(element.checked){
      color = [].slice.call(color_elements).indexOf(element);
    }
  });

  var json = {"name":document.querySelector("#" + target + " input[name='name']").value,"id":id,'color':color};
  return json;
}

function setBlockData(target){
  var json = JSON.parse(window.localStorage.getItem(target));
  document.querySelector("#" + target + " input[name='name']").value = json['name'];
  document.querySelectorAll("#" + target + " input[name='" + target + "_id']")[json['id']].checked = true;
  document.querySelectorAll("#" + target + " input[name='" + target + "_color']")[json['color']].checked = true;
}