function saveSelected(){
  var table = document.querySelector('table');
  var arr = new Array;

  for (var i=1; i<table.rows.length; i++){
    if (table.rows[i].cells[0].firstElementChild.checked == false){
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
    var data = JSON.stringify(arr);
    localStorage.setItem('selected_mappings', data);
  }
  else{
    var stored_arr = JSON.parse(stored);
    var len = arr.length 

    for (var k=0; k<len; k++){
      if (checkContains(stored_arr, arr[k]) == false){
        stored_arr.push(arr[k]);
      }
    }
    
    stored_arr.sort(function(a,b){
      if (a[2] <= b[2]){
        return -1;
      }
      else{
        return 1;
      }
    })

    var comb_data = JSON.stringify(stored_arr);
    localStorage.setItem('selected_mappings', comb_data);
  }
  if (arr.length == 0){
    M.toast({html: "You have not selected any modules", 
      classes: 'alert'});
  }
  else{
    M.toast({html: "Your selected modules have been saved",
      classes: 'alert'});
  }
}

function selectAll() {
  var text = document.getElementById('select-all').innerHTML.trim();
  var cond = (text == 'Select all<i class="material-icons right">select_all</i>');
  var table = document.querySelector('table');
  var checkboxes =  document.querySelectorAll("input.filled-in")
  var selected = false;

  for (i = 0; i < checkboxes.length; i++){
    if (cond && (table.rows[i+1].style['display'] == '' ||
      table.rows[i+1].style['display'] == 'table')){
      checkboxes[i].checked = true;
      selected = true;
    }
    else if (!cond && (table.rows[i+1].style['display'] == '' ||
      table.rows[i+1].style['display'] == 'table')){
      checkboxes[i].checked = false;
    }
    else {
      continue;
    }
  }
  if (cond && selected){
    document.getElementById('select-all').innerHTML 
      = 'Unselect all<i class="material-icons right">clear</i>';
  }
  else{
    document.getElementById('select-all').innerHTML 
      = 'Select all<i class="material-icons right">select_all</i>';
  }
}

function pagination(){
  $('#nav').remove();
  $('#maintable').after('<div id="nav"><ul class="pagination"></div>');
  var rowsShown = 6;
  var rowsTotal = $('#maintable tbody tr').length;
  var numPages = rowsTotal/rowsShown;

  $('#nav ul').append(
    '<li><a id="left-arrow" href="#!"><i class="material-icons">chevron_left</i></a></li>');
  for(i = 0;i < numPages;i++) {
      var pageNum = i + 1;
      $('#nav ul').append(
        '<li><a class="pages" href="#" rel="'+ i +'">' + pageNum +  '</a></li>');
  }
  $('#nav ul').append(
    '<li><a id="right-arrow"  href="#!"><i class="material-icons">chevron_right</i></a></li>');

  $('#maintable tbody tr').hide();
  $('#maintable tbody tr').slice(0, rowsShown).show();
  if (rowsTotal != 0) {
    $('#nav li:nth-child(2) a').addClass('active');
  }

  $('#nav li .pages').bind('click', function(){
    $('#nav li .pages').removeClass('active');
    $(this).addClass('active');
    var currPage = $(this).attr('rel');
    var startItem = currPage * rowsShown;
    var endItem = startItem + rowsShown;
    $('#maintable tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
    css('display','table').animate({opacity:1}, 300);
  });
}

$(document).ready(function() {

  $('select[name="pu_name"]').select2({
    placeholder: 'Select Partner Universities here.',
    allowClear: true
  });

  $('select[name="pu_prefix"]').select2({
    placeholder: 'Select module prefixes here.',
    allowClear: true
  });

  $($('.select2-selection')[1]).attr('id', 'prefix-pillbox')

  new Tablesort(document.getElementsByClassName('responsive-table')[0]);

  $('.tooltipped').tooltip({
   html: "Saves selected mappings to <i>Selected</i>"
  });

  Intercooler.ready(function(elt){
    pagination();

    $('#right-arrow').click(function(){
      var curr = $('#nav li .active');
      if (curr.parent().next().children(':first-child').attr('id')
        != "right-arrow"){
        curr.parent().next().children(':first-child').click();
      }
    });

    $('#left-arrow').click(function(){
      var curr = $('#nav li .active');
      if (curr.parent().prev().children(':first-child').attr('id')
        != "left-arrow"){
        curr.parent().prev().children(':first-child').click();
      }
    });

  });

});
