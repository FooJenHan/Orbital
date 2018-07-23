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