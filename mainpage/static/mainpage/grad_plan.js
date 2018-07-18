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
  
}



// Create box methods 
function createBox_Sem(modules, year_sem){
  var table = document.createElement('table');
  $(table).addClass('responsive-table striped round');

  var pos_rel = document.createElement('div');
  $(pos_rel).addClass('position-relative');
  $(pos_rel).addClass('table-container');
  $(pos_rel).addClass('target-sem');
  $(pos_rel).append('<br>');

  var container = document.createElement('div');
  $(container).addClass('container');
  $(container).addClass('position-relative');

  container.appendChild(table);
  pos_rel.appendChild(container);
  $(pos_rel).attr('id', year_sem);

  document.body.appendChild(pos_rel);

  $(container).append('<br>');

  $(table).append('<caption></caption>');

  caption = table.firstChild;

  var th = document.createElement('th');
  var node = document.createTextNode(year_sem);
  th.appendChild(node);
  caption.appendChild(th);

  for (i = 0; i<modules.length; i++){
    var row = table.insertRow(-1)
    var firstcell = row.insertCell(-1);
    firstcell.className = "btn-cell";
    $(firstcell).append(
    '<button class="btn wave-effect wave-light deletor" type="button"><i class="material-icons">delete_forever</i> </button>');
    for (j = 0; j<modules[i].length; j++){
      var cell = row.insertCell(-1);
      cell.className = "cell-sem" + String(j);
      cell.textContent = modules[i][j];
    }
  }
  
}


function createBox_Prefix(modules, prefix){
  var table = document.createElement('table');
  $(table).addClass('responsive-table striped round');

  var pos_rel = document.createElement('div');
  $(pos_rel).addClass('position-relative');
  $(pos_rel).addClass('table-container');
  $(pos_rel).addClass('target-prefix');
  $(pos_rel).append('<br>');

  var container = document.createElement('div');
  $(container).addClass('container');
  $(container).addClass('position-relative');

  container.appendChild(table);
  pos_rel.appendChild(container);
  $(pos_rel).attr('id', prefix);

  document.body.appendChild(pos_rel);

  $(container).append('<br>');

  $(table).append('<caption></caption>');

  caption = table.firstChild;

  var th = document.createElement('th');
  var node = document.createTextNode(prefix);
  th.appendChild(node);
  caption.appendChild(th);

  for (i = 0; i<modules.length; i++){
    var row = table.insertRow(-1)
    var firstcell = row.insertCell(-1);
    firstcell.className = "btn-cell";
    $(firstcell).append(
    '<button class="btn wave-effect wave-light deletor" type="button"><i class="material-icons">delete_forever</i> </button>');
    for (j = 0; j<modules[i].length; j++){
      var cell = row.insertCell(-1);
      cell.className = "cell-pre" + String(j);
      cell.textContent = modules[i][j];
    }
  }
  
}


function showModSem(){
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
    createBox_Sem(sem_mods, curr_sem);
  }

}



function showModPrefix(){
  var str_modules = localStorage.getItem('stored_modules');
  if (str_modules == null || str_modules == 'undefined' || str_modules == "[]"){
    return;
  }
  else{
    var modules = JSON.parse(str_modules);
  }

  var prefixes = [];

  for (i = 0; i<modules.length; i++){
    var mod_code = modules[i][1];
    mod_code = mod_code.split(/[^A-Za-z]/);
    mod_code = mod_code[0];
    prefixes.push(mod_code);
  }

  var un_pre = [];

  for (j = 0; j<prefixes.length; j++){
    var curr = prefixes[j];
    if (un_pre.includes(curr)){
      continue;
    }else{
      un_pre.push(curr)
    }
  }

  un_pre.sort();

  for (count = 0; count<un_pre.length; count++){
    var curr_pre = un_pre[count];
    var pre_mods = [];
    for(k = 0; k<modules.length; k++){
      var pre_now = modules[k][1];
      pre_now = pre_now.split(/[^A-Za-z]/);
      pre_now = pre_now[0];
      if(curr_pre == pre_now){
        var temp = [];
        temp.push(modules[k][0]);
        temp.push(modules[k][1]);
        temp.push(modules[k][2]);
        temp.push(modules[k][3]);
        temp.push(modules[k][4]);
        pre_mods.push(temp);
      }
    }
    createBox_Prefix(pre_mods, curr_pre);
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


// Function to control view by AYSem or Prefix
function showOnlySem(){
  var x = document.getElementsByClassName("target-sem");
  var y = document.getElementsByClassName("target-prefix");
  for (i = 0; i<x.length; i++){
    x[i].style.display = 'inline';
  }
  for (j = 0; j<y.length; j++){
    y[j].style.display = 'none';
  }
}


function showOnlyPrefix(){
  var x = document.getElementsByClassName("target-sem");
  var y = document.getElementsByClassName("target-prefix");
  for (i = 0; i<x.length; i++){
    x[i].style.display = 'none';
  }
  for (j = 0; j<y.length; j++){
    y[j].style.display = 'inline';
  }
}

function deleteMod(id){
  var row = id.parentNode;
  var to_remove = [];
  var caption = id.parentNode.parentNode.parentNode.caption.textContent;
  var indicator = /\d/.test(caption);
  if (indicator == true){
    to_remove.push(caption);
  }
  for (var i=0; i<row.cells.length; i++){
    var target = row.cells[i].textContent;
    to_remove.push(target);
  }
  var str_modules = localStorage.getItem('stored_modules');
  var modules = JSON.parse(str_modules);
  var update = [];
  for (j=0; j<modules.length; j++){
    var curr = modules[j];
    for (k=0; k<curr.length; k++){
      if (curr[k] == to_remove[k]){
        continue;
      }else{
        update.push(curr);
        break;
      }
    }
  }
  var to_save = JSON.stringify(update);
  localStorage.setItem('stored_modules', to_save);
  window.location.reload();
}

//jQuery
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

  $('.deletor').click(function(){
    deleteMod(this);
  });


});