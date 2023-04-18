
var colors = ['danger','primary','success','warning'];

window.addEventListener('load', (event) => {
  console.log(window.localStorage.getItem('block1_name'));
  
  document.getElementById('block1_name').value = window.localStorage.getItem('block1_name');
  document.getElementById('block1_id').value = window.localStorage.getItem('block1_id');
  elements = document.getElementsByName('block1_colors');
  elements.item(colors.indexOf(window.localStorage.getItem('block1_color'))).checked = true;

  document.getElementById('block2_name').value = window.localStorage.getItem('block2_name');
  document.getElementById('block2_id').value = window.localStorage.getItem('block2_id');
  elements = document.getElementsByName('block2_colors');
  elements.item(colors.indexOf(window.localStorage.getItem('block2_color'))).checked = true;

  document.getElementById('block3_name').value = window.localStorage.getItem('block3_name');
  document.getElementById('block3_id').value = window.localStorage.getItem('block3_id');
  elements = document.getElementsByName('block3_colors');
  elements.item(colors.indexOf(window.localStorage.getItem('block3_color'))).checked = true;

  document.getElementById('block4_name').value = window.localStorage.getItem('block4_name');
  document.getElementById('block4_id').value = window.localStorage.getItem('block4_id');
  elements = document.getElementsByName('block4_colors');
  elements.item(colors.indexOf(window.localStorage.getItem('block4_color'))).checked = true;
});

function set(){
  window.localStorage.setItem('block1_name',document.getElementById('block1_name').value);
  window.localStorage.setItem('block1_id',document.getElementById('block1_id').value);
  elements = document.getElementsByName('block1_colors');
  for(var i=0;i<elements.length;i++){
    if(elements.item(i).checked){
      window.localStorage.setItem('block1_color',colors[i]);
    }
  }

  window.localStorage.setItem('block2_name',document.getElementById('block2_name').value);
  window.localStorage.setItem('block2_id',document.getElementById('block2_id').value);
  elements = document.getElementsByName('block2_colors');
  for(var i=0;i<elements.length;i++){
    if(elements.item(i).checked){
      window.localStorage.setItem('block2_color',colors[i]);
    }
  }

  window.localStorage.setItem('block3_name',document.getElementById('block3_name').value);
  window.localStorage.setItem('block3_id',document.getElementById('block3_id').value);
  elements = document.getElementsByName('block3_colors');
  for(var i=0;i<elements.length;i++){
    if(elements.item(i).checked){
      window.localStorage.setItem('block3_color',colors[i]);
    }
  }

  window.localStorage.setItem('block4_name',document.getElementById('block4_name').value);
  window.localStorage.setItem('block4_id',document.getElementById('block4_id').value);
  elements = document.getElementsByName('block4_colors');
  for(var i=0;i<elements.length;i++){
    if(elements.item(i).checked){
      window.localStorage.setItem('block4_color',colors[i]);
    }
  }

  alert("設定を保存しました");
}