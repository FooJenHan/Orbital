function selectAll() {
  var text = document.getElementById('select-all').innerText;
  var cond = (text == "Select all")
  var table = document.querySelector('table');
  var checkboxes =  document.querySelectorAll("input.table-checkbox")

  for (i = 0; i < checkboxes.length; i++){
    if (cond && table.rows[i+1].style.display == ""){
      checkboxes[i].checked = true;
    }
    else if (!cond && table.rows[i+1].style.display == ""){
      checkboxes[i].checked = false;
    }
    else{
      continue;
    }
  }
  if (cond){
    document.getElementById('select-all').innerText = 'Unselect all';
  }
  else{
    document.getElementById('select-all').innerText = 'Select all';
  }

}


// Helper functions

// Function to compare equality of 2 arrays by their elements
function compareArr(arr1, arr2){
  for (var i=0; i<arr1.length; i++){
    if (arr1[i] != arr2[i]){
      return false;
    }
  }
  return true;
}

// Function to check if the nested 2D array already contains 
// the array to be added
function checkContains(matrix, arr){
  for (var i=0; i<matrix.length; i++){
    if (compareArr(matrix[i], arr) == true){
      return true;
    }
  }
  return false;
}
