function boxSelectAll(id){
  var elements = document.getElementById(id).firstChild.childNodes;
  var button = elements[2];
  var table = elements[4];
  var text = button.innerHTML.trim();
  var cond = (text == 'Select all<i class="material-icons right">select_all</i>');
  var selected = false;

  for (var i=0; i<table.rows.length; i++){
    var check = table.rows[i].cells[0].firstChild.checked;
    if (cond && check == false){
      table.rows[i].cells[0].firstChild.checked = true;
      selected = true;
    }
    else if (!cond && check == true){
      table.rows[i].cells[0].firstChild.checked = false;
    }
    else{
      continue;
    }
  }

  if (cond && selected){
    button.innerHTML = 'Unselect all<i class="material-icons right">clear</i>';
  }
  else{
    button.innerHTML = 'Select all<i class="material-icons right">select_all</i>';
  }

}

function boxDeleteSelected(id){
  var elements = document.getElementById(id).firstChild.childNodes;
  var button = elements[3];
  var table = elements[4];
  var arr = new Array;

  for (var i=1; i<table.rows.length; i++){
    if (table.rows[i].cells[0].firstChild.checked == false){
      continue;
    }
    var temp = new Array;
    for (var j=1; j<table.rows[i].cells.length-1; j++){
      temp.push(table.rows[i].cells[j].textContent)
    }

    arr.push(temp);
  }

  var stored = localStorage.getItem('selected_mappings');
  if (stored == "undefined" || stored == null){
    return; //no data stored, no data to select and delete
  }
  else{
    var stored_arr = JSON.parse(stored);
    var len = stored_arr.length 
    var removed = new Array;
    //arr is the data to be removed
    //stored_arr is all the data that is stored by user

    for (var k=0; k<len; k++){
      if (checkContains(arr, stored_arr[k]) == false){
        removed.push(stored_arr[k]);
      }
    }

    var comb_data = JSON.stringify(removed);
    localStorage.setItem('selected_mappings', comb_data);
    if (arr.length == 0){
      M.toast({html: "You have not selected any modules from " + id + " to delete.", 
        classes: 'alert-modlist'});      
    }        
    else{
      window.location.reload();
    }
  }
}

function copyPUCode(element){
  var pu_code = element.parentNode.parentNode.childNodes[4].textContent;
  var textArea = document.createElement("textarea");
  textArea.value = pu_code;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  M.toast({html: "Copied!", classes: 'alert-copy'});
}

$(document).ready(function(){

  $('.selector').click(function(){
    var id = $(this).parent().parent().attr('id');
    boxSelectAll(id);
  });

  $('.deletor').click(function(){
    var id = $(this).parent().parent().attr('id');
    boxDeleteSelected(id);
  });

  $('.pu-code-btn').click(function(){
    copyPUCode($(this).get(0));
  });

});