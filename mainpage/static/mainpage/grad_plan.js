$(document).ready(function(){
    $('select').formSelect();
});

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
  var code = document.getElementById("mod_code").value;
  var title = document.getElementById("mod_title").value;
  var credits = document.getElementById("mod_mc").value;
  var grade = document.getElementById("mod_grade").value;
  var ay_sem = document.getElementById("sem_taken").value;

  //check localstorage getitem
  //if yes, retrieve the array and push mods in
  //else, create new sem, push mod in (same as if case) 
  

}


