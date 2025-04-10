//What are callbacks?
// Functions passed into higher order functions as arguements

// the function timesTwo is a callback function?
const timesTwo = function(number){
  return number * 2;
}

const displaysOutput = function(callback){
  const result = callback;
  console.log("This is the result:", result);
}

displaysOutput(timesTwo(5))

unrelated;
// Callback?
console.log(timesTwo(2));
// step 1: cut the cake
// step 2: insert filling -> Any error cakes should be put aside
// step 3: add foundation
// step 4: package nicely

