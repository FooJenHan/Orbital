// Create box methods for planner
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

  var inserted = false;
  var boxlst = document.getElementsByClassName("target-sem");
  for (k=0; k<boxlst.length; k++){
    var currbox = boxlst[k];
    var currbox_aysem = $(currbox).attr('data-sort');
    if (year_sem > currbox_aysem){
      continue;
    }
    else{
      var wrap = document.getElementById("bysem")
      wrap.insertBefore(pos_rel, currbox);
      inserted = true;
      break;
    }
  }

  if (inserted == false){
    document.getElementById("bysem").appendChild(pos_rel);
  }

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

  var inserted = false;
  var boxlst = document.getElementsByClassName("target-prefix");
  for (k=0; k<boxlst.length; k++){
    var currbox = boxlst[k];
    var currbox_prefix = $(currbox).attr('data-sort');
    if (prefix > currbox_prefix){
      continue;
    }
    else{
      var wrap = document.getElementById("byprefix")
      wrap.insertBefore(pos_rel, currbox);
      inserted = true;
      break;
    }
  }

  if (inserted == false){
    document.getElementById("byprefix").appendChild(pos_rel);
  }

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
