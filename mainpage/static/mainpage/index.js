function saveSelected(){
  var table = document.querySelector('table');
  var arr = new Array;

  for (var i=1; i<table.rows.length; i++){
    if (table.rows[i].cells[0].firstElementChild.checked == false){
      continue;
    }
    var temp = new Array;
    for (var j=1; j<table.rows[i].cells.length; j++){
      temp.push(table.rows[i].cells[j].textContent)
    }

    arr.push(temp);
  }

  var stored = localStorage.getItem('selected_mappings');
  if (stored == "undefined" || stored == null){
    var data = JSON.stringify(arr);
    localStorage.setItem('selected_mappings', data);
  }
  else{
    var stored_arr = JSON.parse(stored);
    var len = arr.length 

    for (var k=0; k<len; k++){
      if (checkContains(stored_arr, arr[k]) == false){
        stored_arr.push(arr[k]);
      }
    }
    
  stored_arr.sort(function(a,b){
    if (a[2] <= b[2]){
      return -1;
    }
    else{
      return 1;
    }
  })

    var comb_data = JSON.stringify(stored_arr);
    localStorage.setItem('selected_mappings', comb_data);
  }
  if (arr.length == 0){
    M.toast({html: "You have not selected any modules", 
      classes: 'alert'});
  }
  else{
    M.toast({html: "Your selected modules have been saved",
      classes: 'alert'});
  }
}

function selectAll() {
  var text = document.getElementById('select-all').innerHTML.trim();
  var cond = (text == 'Select all<i class="material-icons right">select_all</i>');
  var table = document.querySelector('table');
  var checkboxes =  document.querySelectorAll("input.filled-in")
  var selected = false;

  for (i = 0; i < checkboxes.length; i++){
    if (cond && table.rows[i+1].classList.contains('hidden') == ""){
      checkboxes[i].checked = true;
      selected = true;
    }
    else if (!cond && table.rows[i+1].classList.contains('hidden') == ""){
      checkboxes[i].checked = false;
    }
    else{
      continue;
    }
  }
  if (cond && selected){
    document.getElementById('select-all').innerHTML 
      = 'Unselect all<i class="material-icons right">clear</i>';
  }
  else{
    document.getElementById('select-all').innerHTML 
      = 'Select all<i class="material-icons right">select_all</i>';
  }

}

$(document).ready(function() {

  $('select[name="pu_name"]').select2({
    placeholder: 'Select Partner Universities here.',
    allowClear: true
  });

  $('select[name="pu_prefix"]').select2({
    placeholder: 'Select module prefixes here.',
    allowClear: true
  });

  $($('.select2-selection')[1]).attr('id', 'prefix-pillbox')

});