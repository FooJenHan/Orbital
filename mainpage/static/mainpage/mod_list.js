function createContainer(pu_name, data){

  var table = document.createElement('table');
  $(table).addClass('responsive-table striped');


  var pos_rel = document.createElement('div');
  $(pos_rel).addClass('position-relative');
  $(pos_rel).addClass('table-container');

  var container = document.createElement('div');
  $(container).addClass('container');

  var nus_cred = 0;
  var pu_cred = 0;
  for (n=0; n<data.length; n++){
    nus_cred += Number(data[n][1]);
    pu_cred += Number(data[n][5]);
  }

  var nusc = nus_cred.toString();
  var puc = pu_cred.toString();

  $(container).append(
    '<div class="pu-header">' + 
      '<div class="card horizontal teal lighten-2">' + 
        '<div class="card-stacked">' + 
          '<div class="card-content">' + 
          '<p>'+ pu_name + '</p>' +
          '<p>' + 'Total NUS Credits: ' + nusc + '</p>' + 
          '<p>' + 'Total PU Credits: ' + puc + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' + 
    '</div>');


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
  var nusc = nus_cred.toString();
  var puc = pu_cred.toString();

  $(table).append('<tfoot class="blue lighten-3"></tfoot>');
  tfoot = table.lastChild;

  var summation = ['', 'Total NUS Credits:', nusc, '', '', 'Total PU Credits:',  puc];

  for (var i = 0; i < summation.length; i++) {
    var tr = document.createElement('tr');
    var node = document.createTextNode(summation[i]);
    tr.appendChild(node);
    tfoot.appendChild(tr);
  }
  */

  /*
  var nusc = nus_cred.toString();
  var puc = pu_cred.toString();

  $(table).append('<tfoot class="blue lighten-3"></tfoot>');
  tfoot = table.lastChild;

  var empty = document.createTextNode('');

  for (var p=0; p<data[0].length; p++){
    if (p==0){
      var text1 = document.createTextNode('Total NUS Credits:');
      td.appendChild(text1);
      tfoot.appendChild(td);
    }else if (p==1){
      var text2 = document.createTextNode(nusc);
      td.appendChild(text2);
      tfoot.appendChild(td);
    }else if (p==4){
      var text3 = document.createTextNode('Total PU Credits:');
      td.appendChild(text3);
      tfoot.appendChild(td);
    }else if (p==5){
      var text4 = document.createTextNode(puc);
      td.appendChild(text4);
      tfoot.appendChild(td);
    }else{
      td.appendChild(empty);
      tfoot.appendChild(td);
    }
  }

*/