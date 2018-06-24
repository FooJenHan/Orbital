// Load selected data from localStorage, then dynamically
// fill the table with the data.

function getData(){
	var strData = localStorage.getItem('selected_mappings');
	var data;
	if (strData == null || strData == 'undefined'){
		data = [];
	}
	else{
		data = JSON.parse(strData);
	}

	var table = document.querySelector('table');
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

function DeleteSelected(){
	var table = document.querySelector('table');
  var arr = new Array;

  for (var i=1; i<table.rows.length; i++){
    if (table.rows[i].cells[0].firstChild.checked == false){
      continue;
    }
    var temp = new Array;
    for (var j=1; j<table.rows[i].cells.length; j++){
      temp.push(table.rows[i].cells[j].textContent)
    }

    arr.push(temp);
  }

  var stored = localStorage.getItem('selected_mappings');
  if (stored == "undefined" || stored == null){
  	return; //no data stored, no data to select and delete
  }
  else{
    var stored_arr = JSON.parse(stored);
    var len = stored_arr.length 
    var removed = new Array;
    //arr is the data to be removed
    //stored_arr is all the data that is stored by user

    for (var k=0; k<len; k++){
      if (checkContains(arr, stored_arr[k]) == false){
        removed.push(stored_arr[k]);
      }
    }

    var comb_data = JSON.stringify(removed);
    localStorage.setItem('selected_mappings', comb_data);
    window.location.reload();
  }

}
