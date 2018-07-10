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

  pos_rel.appendChild(container);
  $(pos_rel).attr('id', year_sem);

  document.body.appendChild(pos_rel);

  $(table).append('<thead class="grey darken-3"></thead>');

  thead = table.firstChild;

  var th = document.createElement('th');
  var node = document.createTextNode(year_sem);
  th.appendChild(node);
  thead.appendChild(th);

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
  for (j = 0; j<unique_sem.length; j++){
    var curr_sem = unique_sem[j];
    var sem_mods = [];
    for (k = 0; k<modules.length; k++){
      if (modules[k][0]==curr_sem){
        var temp = [];
        temp.push(modules[k][1]);
        temp.push(modules[k][2]);
        temp.push(modules[k][3]);
        temp.push(modules[k][4]);
      }
      sem_mods.push(temp);
    }
    createBox(sem_mods, curr_sem);
  }

}



$(document).ready(function(){
    $('select').formSelect();

    $("select[required]").css({
      display: "inline",
      height: 0,
      padding: 0,
      width: 0
    });
});
