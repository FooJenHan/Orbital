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

$(document).ready(function(){

  $('#download-button').click(function(){
    var data = localStorage.getItem('selected_mappings');
    var arr = JSON.parse(data);
    if (arr.length == 0){
       M.toast({html: 
        "You have no modules selected. Go back to the previous page to Select some modules.", 
        classes: 'alert'});
       return;
    }

    var compositeCSV = "NUS Code,NUS Credits,PU Name,PU Code,PU Title,PU Credits";
    var pu_name;
    for (var i = 0; i < arr.length; i++) {
      if (!pu_name || pu_name != arr[i][2]){
        pu_name = arr[i][2];
        compositeCSV += "\n\n" + pu_name;
      }

      compositeCSV += "\n";      
      for (var j = 0; j < arr[j].length; j++){
        var cell = arr[i][j].replace(";", " ")
        compositeCSV += cell + ",";
      }
    }

    var filename = "mappings.csv"
    var content =  "data:text/csv;charset=utf-8," + encodeURIComponent(compositeCSV);
    $(this).attr("href", content).attr("download", filename);

  });

});
