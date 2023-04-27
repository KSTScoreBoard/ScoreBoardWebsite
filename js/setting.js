
var colors = ['danger','primary','success','warning'];

window.addEventListener('load', (event) => {
  if(window.localStorage.getItem('block1') == null){
    window.localStorage.setItem('block1','{"name":"赤","id":"block1_radio1","color":"block1_red"}');
    window.localStorage.setItem('block2','{"name":"青","id":"block2_radio2","color":"block2_blue"}');
    window.localStorage.setItem('block3','{"name":"緑","id":"block3_radio3","color":"block3_green"}');
    window.localStorage.setItem('block4','{"name":"黄","id":"block4_radio4","color":"block4_yellow"}');
  }
  setBlockData('block1');
  setBlockData('block2');
  setBlockData('block3');
  setBlockData('block4');
});

function set(){
  console.log(document.querySelector("#" + target + " input[name='" + target + "_id']:checked").dataset.x);
  window.localStorage.setItem('block1',JSON.stringify(getBlockData('block1')));
  window.localStorage.setItem('block2',JSON.stringify(getBlockData('block2')));
  window.localStorage.setItem('block3',JSON.stringify(getBlockData('block3')));
  window.localStorage.setItem('block4',JSON.stringify(getBlockData('block4')));
  alert("設定を保存しました");
}

function getBlockData(target){
  var json = {"name":document.querySelector("#" + target + " input[name='name']").value,
              "id":document.querySelector("#" + target + " input[name='" + target + "_id']:checked").id,
              'color':document.querySelector("#" + target + " input[name='" + target + "_color']:checked").id};
  return json;
}

function setBlockData(target){
  var json = JSON.parse(window.localStorage.getItem(target));
  document.querySelector("#" + target + " input[name='name']").value = json['name'];
  document.getElementById(json['id']).checked = true;
  document.getElementById(json['color']).checked = true;
}