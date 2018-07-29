// Helper functions

// Function to compare equality of 2 arrays by their elements
function compareArr(arr1, arr2){
  for (var i=0; i<arr1.length; i++){
    if (arr1[i] != arr2[i]){
      return false;
    }
  }
  return true;
}

// Function to check if the nested 2D array already contains 
// the array to be added
function checkContains(matrix, arr){
  for (var i=0; i<matrix.length; i++){
    if (compareArr(matrix[i], arr) == true){
      return true;
    }
  }
  return false;
}

// Function to help sort the nested 2D Arrays
function schoolNUSCodeSort(a,b){
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
}

//helper function to sort localstorage for planner
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

// Grade to points
function gradeToPoints(grade){
  if (grade == "A+" || grade == "A"){
    return 5;
  }else if (grade == "A-"){
    return 4.5;
  }else if (grade == "B+"){
    return 4;
  }else if (grade == "B"){
    return 3.5;
  }else if (grade == "B-"){
    return 3;
  }else if (grade == "B"){
    return 3;
  }else if (grade == "C+"){
    return 2.5;
  }else if (grade == "C"){
    return 2;
  }else if (grade == "D+"){
    return 1.5;
  }else if (grade == "D"){
    return 1;
  }else if (grade == "F"){
    return 0;
  }else if (grade == "S" || grade == "U"){
    return "NONE";
  }
}

// function to calculate CAP
function totalMc(){
  var stored = localStorage.getItem('stored_modules');
  var modlst = JSON.parse(stored);
  var total = 0;
  for (i=0; i<modlst.length; i++){
    if (modlst[i][4] == "F" || modlst[i][4] == "U"){
      continue;
    }
    var mcs = modlst[i][3];
    var curr = mcs.substring(0, mcs.length-3);
    var num_mc = Number(curr);
    total = total + num_mc; 
  }
  var result = total.toString();
  return result;
}

function calCap(){
  var stored = localStorage.getItem('stored_modules');
  var modlst = JSON.parse(stored);
  var points = 0;
  var mc = 0;
  for (i=0; i<modlst.length; i++){
    var curr = modlst[i];
    var cp = gradeToPoints(curr[4]);
    var un_mc = curr[3];
    var st_mc = un_mc.substring(0, un_mc.length-3);
    var cmc = Number(st_mc);
    if (curr[4] == "S" || curr[4] == "U"){
      continue;
    }
    points = points + (cp*cmc);
    mc = mc + cmc;
  }
  var inter = points/mc;
  var raw = Math.round((inter * 1000)/1000);
  var result = raw.toString();
  if (isNaN(result)){
    return "NIL"
  }
  else{
    return result;
  }
}
