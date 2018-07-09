function createContainer(pu_name, data){

  var table = document.createElement('table');
  $(table).addClass('responsive-table striped');


  var pos_rel = document.createElement('div');
  $(pos_rel).addClass('position-relative');
  $(pos_rel).addClass('table-container');

  var container = document.createElement('div');
  $(container).addClass('container');
  $(container).addClass('position-relative');

  var nus_cred = 0;
  var pu_cred = 0;
  for (n=0; n<data.length; n++){
    nus_cred += Number(data[n][1]);
    pu_cred += Number(data[n][5]);
  }

  var nusc = nus_cred.toString();
  var puc = pu_cred.toString();

  $(container).append(
    '<div class="pu-header" style="font-weight:bold">' + 
      '<div class="card horizontal teal lighten-2">' +
        '<div class="card-stacked">' + 
          '<div class="card-content">' + 
          '<p>'+ pu_name + '</p>' +
          '<p>' + '<font size="3">' + 'Total NUS MCs: ' + nusc + '</p>' + '</font>' +
          '<p>' + '<font size="3">' + 'Total PU Credits: ' + puc + '</p>' + '</font>' +
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

    var cell = row.insertCell(-1);
    cell.textContent = data[i][0];
    cell.className = "modal-trigger";
    var link = '#modal' + pu_name + data[i][3];
    cell.setAttribute("href", link);
    createModal(link, data[i][0]);

    for (var j=1; j<data[i].length; j++){
      var cell = row.insertCell(-1);
      cell.textContent = data[i][j];
    }
  }

}

function createModal(link, mod_code){
  var modal = document.createElement('div');
  modal.id = link.substring(1);
  modal.className = "modal mod-modal";
  $(modal).append(
    '<div class="modal-content">' +
      '<h4>' +
      '<button class="waves-effect waves-light btn-large btn-flat">' +
      '<a href="https://nusmods.com/modules/' + mod_code +
      '" target="_blank">' + mod_code + '</button>' + '</a>' + '</h4>' +
    '</div>' );
  $('#modals-container').append(modal);
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
    if (a[2] < b[2]){
      return -1;
    }
    else if (a[2] == b[2]){
      if (a[0] <= b[0]){
        return -1;
      }
      else{
        return 1;
      }
    }
    else{
      return 1;
    }
  });

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


function convertTree(prereq){
  var output = [];

  function helper(data){
    if (typeof(data) == "object" && Array.isArray(data) == false){
      output.push(data["name"]);
      if ( !Array.isArray(data["children"])){
        helper(data["children"]);
      }
      else{
        for (var i=0; i<data["children"].length; i++){
          helper(data["children"][i]);
        }
      }
    }
    else if (Array.isArray(data) == true){
      for (var i=0; i<data.length; i++){
        helper(data[i]);
      }
    }
  }

  helper(prereq);

  var final = [];
  var temp = [];
  for (var x=1; x<output.length; x++){
    if (output[x] != "and" && output[x] != "or"){
      temp.push(output[x]);
    }
    else if (output[x] == "or"){
      final.push(temp);
      temp = [];
    }
  }
  final.push(temp);

  return final;
}


$(document).ready(function(){

  $('#download-button').click(function(){
    var data = localStorage.getItem('selected_mappings');
    var arr = JSON.parse(data);
    if (!arr || arr.length == 0){
       M.toast({html: 
        "You have no modules selected. Go back to the previous page to Select some modules.", 
        classes: 'alert'});
       return;
    }

    var compositeCSV = "NUS Code,NUS Credits,PU Name,PU Code,PU Title,PU Credits";
    var pu_name;
    for (var i = 0; i < arr.length; i++) {
      if (!pu_name || pu_name != arr[i][2].replace(";", " ")){
        pu_name = arr[i][2].replace(";", " ");
        compositeCSV += "\n\n" + pu_name;
      }

      compositeCSV += "\n";      
      for (var j = 0; j < arr[i].length; j++){
        var cell = arr[i][j].replace(";", " ");
        compositeCSV += cell + ",";
      }
    }

    var filename = "mappings.csv"
    var content =  "data:text/csv;charset=utf-8," + encodeURIComponent(compositeCSV);
    $(this).attr("href", content).attr("download", filename);

  });


  $('.mod-modal > .modal-content').each(function(){
    var div = $(this);
    var mod_code = $(div.children()[0]).text();
    var link = 'https://api.nusmods.com/2017-2018/reqTree.json';

    var json_data = "";
    var request = $.getJSON(link, function(data) {
      json_data = data;
      var mod_data = json_data[mod_code];
      var prereq, postreq;
      if (mod_data){
        prereq = mod_data['ModmavenTree'];
        postreq = mod_data['LockedModules'];
      }
      else{
        prereq = [];
        postreq = [];
      }

      var postreq_items = ['<ul align="center">'];
      $.each(postreq, function(i, item) {
        postreq_items.push('<li class="tree-entry">' +
          '<button class="waves-effect waves-light btn-small postreq-node">' +
          '<a href="https://nusmods.com/modules/' + postreq[i] + '" target="_blank">'
          + postreq[i] + '</a>' + '</button>' + '</li>');
      });
      postreq_items.push('</ul>');
      $(div).append('<div class="tree-left">' + '<h5 class="flow-text">Unlocks:</h5>'
        + postreq_items.join("") + '</div>');


      var prereq_items = ['<ul align="center">'];
      var converted = convertTree(prereq);
      $.each(converted, function(i, item) {
        prereq_items.push('<li class="tree-entry">');

        var temp = ['<ul align="center">'];
        $.each(converted[i], function(j, item) {
          temp.push('<li class="tree-entry">' +
            '<button class="waves-effect waves-light btn-small prereq-node">' +
            '<a href="https://nusmods.com/modules/' + converted[i][j] + '" target="_blank">'
            + converted[i][j] + '</a>'+ '</button>' + '</li>');

        });
        temp.push('</ul>');
        temp.push('<br>');
        if (converted && i != 0){
          prereq_items.push('<h6>One of</h6>');
        }
        prereq_items.push(temp.join(""));

        prereq_items.push('</li>');
      });
      prereq_items.push('</ul>');

      $(div).append('<div class="tree-right">' + '<h5 class="flow-text">Requires:</h5>' +
        prereq_items.join("") + '</div>');

    });

  });

});
