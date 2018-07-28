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

//helper function to sort localstorage
 function CompareSem(a, b) {
   if (a[0] < b[0]) return -1;
   if (a[0] > b[0]) return 1;
   return 0;
 }

function CompareModCode(a, b) {
   if (a[1] < b[1]) return -1;
   if (a[1] > b[1]) return 1;
   return 0;
 }
// end of helper function
function formToListNus(){
  var ay_sem = document.getElementById("sem_taken_nus").value;
  var grade = document.getElementById("grade_nus").value;
  var cat = document.getElementById("category_nus").value;
  var tgt = document.getElementById("nus_all").value;
  var info_array = tgt.split(" ");
  var code = info_array.shift();
  var cred = info_array.pop();
  var credits = cred.charAt(0);
  if (cat == ''){
    var category = "NIL";
  }else{
    var category = cat;
  }
  if (info_array.length == 1){
    var title = info_array[0];
  }else{
    var title = '';
    for (var i=0; i<info_array.length; i++){
      title = title + ' ' + info_array[i];
    }
  }

  var temp = [ay_sem, code, title, credits, grade, category];
  return temp;
}


function saveModuleNus(){
  var temp = formToListNus();
  var stored = localStorage.getItem('stored_modules')

  if (stored == "undefined" || stored == null){
    var holder = [];
    holder.push(temp); 
    var saved = JSON.stringify(holder);
    localStorage.setItem('stored_modules', saved);
  }else{
    var saved_sorted = JSON.parse(stored);
    saved_sorted.push(temp);
    saved_sorted = saved_sorted.sort(CompareModCode);
    saved_sorted = saved_sorted.sort(CompareSem);
    var to_save = JSON.stringify(saved_sorted);
    localStorage.setItem('stored_modules', to_save);
  }
  
}


function saveModuleCustom(){
  var ay_sem = document.getElementById("sem_taken").value;
  var code = document.getElementById("mod_code").value;
  var title = document.getElementById("mod_title").value;
  var credits = document.getElementById("mod_mc").value;
  var grade = document.getElementById("mod_grade").value;
  var cat = document.getElementById("category_custom").value;
  if (cat == ''){
    var category = "NIL";
  }else{
    var category = cat;
  }
  var temp = [ay_sem, code, title, credits, grade, category];
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
  $(table).addClass('responsive-table tblclr round');
  $(table).attr('id', year_sem + 'tbl');

  var pos_rel = document.createElement('div');
  $(pos_rel).addClass('position-relative');
  $(pos_rel).addClass('table-container');
  $(pos_rel).addClass('target-sem');
  $(pos_rel).addClass('sem-div');
  $(pos_rel).append('<br>');

  var container = document.createElement('div');
  $(container).addClass('container');
  $(container).addClass('position-relative');

  container.appendChild(table);
  pos_rel.appendChild(container);
  $(pos_rel).attr('id', year_sem);
  $(pos_rel).attr('data-sort', year_sem);

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
    '<button class="btn wave-effect wave-light deletor_sem del-btn" type="button"><i class="dustbin material-icons">delete_forever</i> </button>');
    for (j = 0; j<modules[i].length; j++){
      var cell = row.insertCell(-1);
      cell.className = "cell-sem" + String(j);
      cell.textContent = modules[i][j];
    }
  }
  
}


function createBox_Prefix(modules, prefix){
  var table = document.createElement('table');
  $(table).addClass('responsive-table tblclr round');
  $(table).attr('id', prefix + 'tbl');

  var pos_rel = document.createElement('div');
  $(pos_rel).addClass('position-relative');
  $(pos_rel).addClass('table-container');
  $(pos_rel).addClass('target-prefix');
  $(pos_rel).addClass('pre-div');
  $(pos_rel).append('<br>');

  var container = document.createElement('div');
  $(container).addClass('container');
  $(container).addClass('position-relative');

  container.appendChild(table);
  pos_rel.appendChild(container);
  $(pos_rel).attr('id', prefix);
  $(pos_rel).attr('data-sort', prefix);

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
    '<button class="btn wave-effect wave-light deletor_prefix del-btn" type="button"><i class="dustbin material-icons">delete_forever</i> </button>');
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
        temp.push(modules[k][5]);
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
        temp.push(modules[k][5]);
        pre_mods.push(temp);
      }
    }
    createBox_Prefix(pre_mods, curr_pre);
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


function deleteMod_Sem(id){
  var row = id.parentNode.parentNode;
  var row_num = id.parentNode.parentNode.parentNode.rows.length;
  var to_remove = [];
  var caption = id.parentNode.parentNode.parentNode.parentNode.caption.textContent;

  to_remove.push(caption);

  for (var i=1; i<row.cells.length; i++){
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
  
  // deletes the prefix table element
  var prefix = to_remove[1];
  prefix = prefix.split(/[^A-Za-z]/);
  var prefix_id = prefix[0] + 'tbl';
  var pre_tbl = document.getElementById(prefix_id).childNodes[1];
  var pre_rows = pre_tbl.childNodes;
  for (var n=0; n<pre_rows.length; n++){
    var curr_row = pre_rows[n];
    var flag = true;
    for (var m=1; m<curr_row.cells.length; m++){
      if (curr_row.cells[m].textContent == to_remove[m-1]){
        continue;
      }else{
        flag = false;
      }
    }
    if (flag == true){
      if (pre_rows.length == 1){
        var del_div = curr_row.parentNode.parentNode.parentNode.parentNode;
        del_div.parentNode.removeChild(del_div);
      }else{
        curr_row.parentNode.removeChild(curr_row);
      }
    }
  }

  var to_save = JSON.stringify(update);
  localStorage.setItem('stored_modules', to_save);
  if (row_num == 1){
    var table_div = row.parentNode.parentNode.parentNode.parentNode;
    table_div.parentNode.removeChild(table_div);
  }else{
    row.parentNode.removeChild(row);
  }

}


function deleteMod_Prefix(id){
  var row = id.parentNode.parentNode;
  var row_num = id.parentNode.parentNode.parentNode.rows.length;
  var to_remove = [];
  var caption = id.parentNode.parentNode.parentNode.parentNode.caption.textContent;

  for (var i=1; i<row.cells.length; i++){
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

  // deletes the semester table element
  var sem = to_remove[0];
  var sem_id = sem + 'tbl';
  var sem_tbl = document.getElementById(sem_id).childNodes[1];
  var sem_rows = sem_tbl.childNodes;
  for (var n=0; n<sem_rows.length; n++){
    var curr_row = sem_rows[n];
    var flag = true;
    for (var m=1; m<curr_row.cells.length; m++){
      if (curr_row.cells[m].textContent == to_remove[m]){
        continue;
      }else{
        flag = false;
      }
    }
    if (flag == true){
      if (sem_rows.length == 1){
        var del_div = curr_row.parentNode.parentNode.parentNode.parentNode;
        del_div.parentNode.removeChild(del_div);
      }else{
        curr_row.parentNode.removeChild(curr_row);
      }
    }
  }

  var to_save = JSON.stringify(update);
  localStorage.setItem('stored_modules', to_save);
  if (row_num == 1){
    var table_div = row.parentNode.parentNode.parentNode.parentNode;
    table_div.parentNode.removeChild(table_div);
  }else{
    row.parentNode.removeChild(row);
  }

}


function insertNusRow(mod){
  var aysem_id = mod[0] + "tbl";
  var aysem = mod[0];
  try{
    var tbl = document.getElementById(aysem_id);
    var tblrows = tbl.childNodes[1].childNodes;
    alert(tblrows);
    alert(tblrows.length);
    for (i=0; i<tblrows.length; i++){
      var curr = tblrows[i];
      alert(curr.cells[1].textContent < aysem);
      if(curr.cells[1].textContent < aysem){
        var row = tbl.insertRow(i);
        alert(tblrows.length);
        var firstcell = row.insertCell(-1);
        firstcell.className = "btn-cell";
        $(firstcell).append(
        '<button class="btn wave-effect wave-light deletor_sem del-btn" type="button"><i class="dustbin material-icons">delete_forever</i> </button>');
        for (j = 1; j<mod.length; j++){
          var cell = row.insertCell(-1);
          cell.className = "cell-sem" + String(j-1);
          cell.textContent = mod[j];
        }
        break;
      } 
    }
  }
  catch(err) {
    var pre_1 = mod[1];
    pre_1 = pre_1.split(/[^A-Za-z]/);
    var pre = pre_1[0]; 
    var modules_sem = [];
    var modules_pre = [];
    modules_pre.push(mod);
    var sem_mod = mod.slice(1,5);
    modules_sem.push(sem_mod);
    createBox_Sem(modules_sem, aysem);
    createBox_Prefix(modules_pre, pre);
    var x = document.getElementsByClassName("target-sem");
    if(x[0].style.display == 'none'){
      showOnlyPrefix();
    }
    else{
      showOnlySem();
    }
  }
}

function showNusForm(){
  var x = document.getElementsByClassName("nus-form");
  var y = document.getElementsByClassName("custom-form");
  for (i = 0; i<x.length; i++){
    x[i].style.display = 'block';
  }
  for (j = 0; j<y.length; j++){
    y[j].style.display = 'none';
  }
}


function showCustomForm(){
  var x = document.getElementsByClassName("nus-form");
  var y = document.getElementsByClassName("custom-form");
  for (i = 0; i<x.length; i++){
    x[i].style.display = 'none';
  }
  for (j = 0; j<y.length; j++){
    y[j].style.display = 'block';
  }
}


function csvUpload(){

  document.getElementById('upload-target').addEventListener('change', upload, false);

  function browserSupportFileUpload() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      return true;
    }
    return false;
  }

  function upload(evt) {
    if (!browserSupportFileUpload()) {
      alert('We do not support file uploads for your browser.');
      return;
    }

    var data = null;
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
      var csvData = event.target.result;
      try {
        data = $.csv.toArrays(csvData);
      }
      catch(err) {
        M.toast({html: 
        "Are you sure it is a csv file? Please choose a csv file.",
        classes: 'alert-planner'});
        return;
      }
      if (!data || data.length == 0){
        M.toast({html: "There is no data to import!", classes: 'alert-planner'});
        return;
      }
      data.shift();
      var to_add = [];
      var sem;
      for (i=0; i<data.length; i++){
        var curr = data[i];
        if (curr[0].includes('Semester') == true){
          sem = curr[0];
          continue;
        }
        if (curr[0] == ''){
          continue;
        }
        var temp = [];
        temp.push(sem);
        for (j=0; j<curr.length; j++){
          if (curr[j] == ''){
            continue;
          }
          temp.push(curr[j]);
        }
        to_add.push(temp);
      }
      var stored = localStorage.getItem('stored_modules');
      if (stored == "undefined" || stored == null){
        var csv_only = JSON.stringify(to_add);
        localStorage.setItem('stored_modules', csv_only);
      }
      else{
        var stored_arr = JSON.parse(stored);
        for (var k=0; k<to_add.length; k++){
          if (checkContains(stored_arr, to_add[k]) == false){
            stored_arr.push(to_add[k]);
          }
        }
        var comb_data = JSON.stringify(stored_arr);
        localStorage.setItem('stored_modules', comb_data);
      }
      window.location.reload();
    };
  }

}


//jQuery
$(document).ready(function(){

  $('.tabs').tabs();

  $('select').formSelect();

  $("select[required]").css({
    display: "inline-block",
    height: 0,
    padding: 0,
    width: 0
  });

  $('#nus_all').on("select2:open", function () {
    $(".select2-search__field").attr("type","text")
  });
  
  validate();
  $('input').on('keyup', validate);

  $("body").on("click", ".deletor_sem", function(){
    deleteMod_Sem(this);
  });

  $("body").on("click", ".deletor_prefix", function(){
    deleteMod_Prefix(this);
  });

  var initialise_s2;
  var ct_only = [];

  $.getJSON('https://api.nusmods.com/2018-2019/moduleInformation.json', function(nusmods){
    var info = [];
    for (i=0; i<nusmods.length; i++){
      var temp = [];
      var curr = nusmods[i];
      var ct_combined = curr["ModuleCode"] + ' ' + curr["ModuleTitle"] + ' ' + curr["ModuleCredit"] + 'MCs';
      var mc = curr["ModuleCredit"];
      temp.push(ct_combined);
      temp.push(mc);
      info.push(temp);
    }
    for (j=0; j<info.length; j++){
      var ct = info[j][0];
      ct_only.push(ct);
    }

    initialise_s2 = $('#nus_all').select2({
                      placeholder: "Search NUS modules by module code or module title",
                      data: ct_only,
                      allowClear: true,
                      });

  });
 

  $('#download-planner').click(function(){
    var data = localStorage.getItem('stored_modules');
    var arr = JSON.parse(data);
    if (!arr || arr.length == 0){
       M.toast({html: 
        "No modules added. Add some modules and try again.",
        classes: 'alert-download'});
        return;
    }else{
      var csvPlanner = "Module Code,Module Title,MCs,Grade,Category";
      csvPlanner += "\n\n";
      var aysem = [];
      for (i=0; i<arr.length; i++){
        var curr = arr[i][0];
        if (aysem.includes(curr)){
          continue;
        }else{
          aysem.push(curr);
        }
      }
      for (j=0; j<aysem.length; j++){
        csvPlanner += aysem[j] + '\n';
        for (k=0; k<arr.length; k++){
          if (arr[k][0] == aysem[j]){
            for (n=1; n<arr[k].length; n++){
              csvPlanner += arr[k][n] + ',';
            }
            csvPlanner += '\n';
          }
        }
        csvPlanner += '\n';
      }
      var content = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvPlanner);
      $(this).attr("href", content).attr("download", "planner.csv"); 
    }

  });

  $('#upload-planner').click();

  $('#upload-planner').click(function(){
    $('#upload-target').click();
  });

  csvUpload();

  $('#modnus').submit(function(e){
    e.preventDefault();
    saveModuleNus();
    var modlst = formToListNus();
    var stored = localStorage.getItem('stored_modules');
    var test = JSON.parse(stored);
    alert(test);
    // function to delete dynamically here
    insertNusRow(modlst);
    document.getElementById("modnus").reset();
    // reset select2 here - find method to do so later
    // insert materialise toast for mod added
  });

});