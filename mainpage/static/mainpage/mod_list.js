function createContainer(pu_name, data){

  var table = document.createElement('table');
  $(table).addClass('responsive-table striped');


  var pos_rel = document.createElement('div');
  $(pos_rel).addClass('position-relative');
  $(pos_rel).addClass('table-container');

  var container = document.createElement('div');
  $(container).addClass('container');

  $(container).append('<p class="pu-header">' + pu_name + '</p>');
  $(container).append('<br>');
  $(container).append(
    '<button class="btn wave-effect wave-light selector" type="button">Select all<i class="material-icons right">select_all</i> </button>');
  $(container).append(
    '<button class="btn wave-effect wave-light deletor" type="button">Delete selected<i class="material-icons right">delete_forever</i> </button>');

  container.appendChild(table);
  pos_rel.appendChild(container);
  $(pos_rel).attr('id', pu_name);

  document.body.appendChild(pos_rel);

  $(table).append('<thead class="grey darken-3"></thead>');

  thead = table.firstChild;

  var arr = ['Select', 'NUS Code', 'NUS Credits', 'PU Name', 'PU Code',
    'PU Title',  'PU Credits'];
  for (var i = 0; i < arr.length; i++) {
    var th = document.createElement('th');
    var node = document.createTextNode(arr[i]);
    th.appendChild(node);
    thead.appendChild(th);
  }

  for (var i=0; i<data.length; i++){
    var row = table.insertRow(-1)
    row.className = "modlist-row"

    td = document.createElement('td')
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "filled-in";
    var box_id = pu_name + String(i);
    checkbox.setAttribute('id', box_id)
    td.appendChild(checkbox);

    label = document.createElement('label');
    label.htmlFor = box_id;
    td.appendChild(label);
    
    row.appendChild(td);

    for (var j=0; j<data[i].length; j++){
      var cell = row.insertCell(-1);
      cell.textContent = data[i][j];
    }
  }

  var lastrow = table.insertRow(-1)
  lastrow.className = "sumcredit-row"

  td = document.createElement('td')
    
  lastrow.appendChild(td);

  var nus_cred = 0;
  var pu_cred = 0;
  for (n=0; n<data.length; n++){
    nus_cred += Number(data[n][1]);
    pu_cred += Number(data[n][5]);
  }

  for (var q=0; q<data[0].length; q++){
    var lastcell = lastrow.insertCell(-1);
    if (q==0){
      lastcell.textContent = "Total NUS Credits:";
    }else if (q==1){
      lastcell.textContent = nus_cred.toString();
    }else if (q==4){
      lastcell.textContent = "Total PU Credits:";
    }else if (q==5){
      lastcell.textContent = pu_cred.toString();
    }
  }
  
}



function getData(){
  var strData = localStorage.getItem('selected_mappings');
  var data;
  if (strData == null || strData == 'undefined' || strData == "[]"){
    return;
  }
  else{
    data = JSON.parse(strData);
  }

  data.sort(function(a,b){
    if (a[2] <= b[2]){
      return -1;
    }
    else{
      return 1;
    }
  })


  var id = data[0][2];
  var curr = [];
  for (var x=0; x<data.length; x++){
    if (data[x][2] == id){
      curr.push(data[x]);
    }
    else{
      createContainer(id, curr);
      curr = [];
      curr.push(data[x]);
      id = data[x][2];
    }
  }
  createContainer(id, curr);

}






  /*
  var nus_cred = 0;
  var pu_cred = 0;

  for (n=0; n<data.length; n++){
    nus_cred += parseInt(data[n][1]);
    pu_cred += parseInt(data[n][5]);
  }

  var nusc = nus_cred.toString();
  var nus_cell = row.insertCell(1);
  nus_cell.textContent = nusc;
  
  var puc = pu_cred.toString();
  var pu_cell = row.insertCell(5);
  pu_cell.textContent = puc;
  */