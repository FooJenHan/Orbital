//helper function: grade --> CAP point for module
function gradeValue(letter){
  if (letter=='A+' || letter=='A'){
    return '5'
  }else if (letter=='A-'){
    return '4.5'
  }else if (letter=='B+'){
    return '4'
  }else if (letter=='B'){
    return '3.5'
  }else if (letter=='B-'){
    return '3'
  }else if (letter=='C+'){
    return '2.5'
  }else if (letter=='C'){
    return '2'
  }else if (letter=='D+'){
    return '1.5'
  }else if (letter=='D'){
    return '1'
  }else if (letter=='F'){
    return '0'
  }else{
    return 'NA'
  }
}

function saveModule(){
  var ay_sem = document.getElementById("sem_taken").value;
  var code = document.getElementById("mod_code").value;
  var title = document.getElementById("mod_title").value;
  var credits = document.getElementById("mod_mc").value;
  var grade = document.getElementById("mod_grade").value;

  var temp = [ay_sem, code, title, credits, grade];
  var stored = localStorage.getItem('stored_modules')

  if (stored == "undefined" || stored == null){
    var holder = [];
    holder.push(temp); 
    var saved = JSON.stringify(holder);
    localStorage.setItem('stored_modules', saved);
  }else{
    var saved_sorted = JSON.parse(stored);
    saved_sorted.push(temp);
    var to_save = JSON.stringify(saved_sorted);
    localStorage.setItem('stored_modules', to_save);
  }
  // sanity check
  alert(localStorage.getItem('stored_modules'));
}



// Create box methods for sorting by AY SEM
function createBox(modules, year_sem){
  var table = document.createElement('table');
  $(table).addClass('responsive-table striped round');

  var pos_rel = document.createElement('div');
  $(pos_rel).addClass('position-relative');
  $(pos_rel).addClass('table-container');

  var container = document.createElement('div');
  $(container).addClass('container');
  $(container).addClass('position-relative');

  $(container).append('<br>');

  container.appendChild(table);
  pos_rel.appendChild(container);
  $(pos_rel).attr('id', year_sem);

  document.body.appendChild(pos_rel);

  $(table).append('<caption></caption>');

  caption = table.firstChild;

  var th = document.createElement('th');
  var node = document.createTextNode(year_sem);
  th.appendChild(node);
  caption.appendChild(th);

  for (i = 0; i<modules.length; i++){
    var row = table.insertRow(-1)
    for (j = 0; j<modules[i].length; j++){
      var cell = row.insertCell(-1);
      cell.textContent = modules[i][j];
    }
  }
  
}





function showModules(){
  var str_modules = localStorage.getItem('stored_modules');
  if (str_modules == null || str_modules == 'undefined' || str_modules == "[]"){
    return;
  }
  else{
    var modules = JSON.parse(str_modules);
  }
  
  var unique_sem = [];
  for (i = 0; i<modules.length; i++){
    var curr = modules[i][0]
    if (unique_sem.includes(curr)){
      continue;
    }else{
      unique_sem.push(curr);
    }
  }

  unique_sem.sort();

  for (count = 0; count<unique_sem.length; count++){
    var curr_sem = unique_sem[count];
    var sem_mods = [];
    for (k = 0; k<modules.length; k++){
      if (modules[k][0]==curr_sem){
        var temp = [];
        temp.push(modules[k][1]);
        temp.push(modules[k][2]);
        temp.push(modules[k][3]);
        temp.push(modules[k][4]);
        sem_mods.push(temp);
      }
    }
    createBox(sem_mods, curr_sem);
  }

}


// Make sure all form fields are filled, submit disabled otherwise
function validate() {
  var inputsWithValues = 0;
  
  // get all input fields except for type='submit'
  var myInputs = $("input:not([type='submit'])");

  myInputs.each(function(e) {
    // if it has a value, increment the counter
    if ($(this).val()) {
      inputsWithValues += 1;
    }
  });

  if (inputsWithValues == myInputs.length) {
    $("input[type=submit]").prop("disabled", false);
  } else {
    $("input[type=submit]").prop("disabled", true);
  }
}


$(document).ready(function(){
  $('select').formSelect();

  $('.tabs').tabs();

  $("select[required]").css({
    display: "inline",
    height: 0,
    padding: 0,
    width: 0
  });

  validate();
  $('input').on('keyup', validate);

});

