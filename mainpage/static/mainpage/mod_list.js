function createContainer(pu_name, data){

  var table = document.createElement('table');
  $(table).addClass('table table-dark');

  var pos_rel = document.createElement('div');
  $(pos_rel).addClass('position-relative');
  $(pos_rel).addClass('table-container');

  var container = document.createElement('div');
  $(container).addClass('container');

  $(container).append('<button type="button" class="selector">Select all</button>');
  $(container).append('<button type="button" class="deletor">Delete selected</button>');

  container.appendChild(table);
  pos_rel.appendChild(container);
  $(pos_rel).attr('id', pu_name);

  document.body.appendChild(pos_rel);

  $(table).append('<thead class="thead-light"><tr></tr></thead>');

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

    td = document.createElement('td')
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "table-checkbox";
    td.appendChild(checkbox);
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
