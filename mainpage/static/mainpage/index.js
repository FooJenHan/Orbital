function selectAll() {
  var text = document.getElementById('select-all').innerText;
  var cond = (text == "Select all")
  var checkboxes =  document.querySelectorAll("input.table-checkbox")

  for (i = 0; i < checkboxes.length; i++){
    if (cond){
      checkboxes[i].checked = true;
    }
    else{
      checkboxes[i].checked = false;
    }
  }
  if (cond){
    document.getElementById('select-all').innerText = 'Unselect all';
  }
  else{
    document.getElementById('select-all').innerText = 'Select all';
  }

}