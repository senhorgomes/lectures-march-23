//Whats a promise?

// I'll bake for cookies for everyone -> Pending
// I either bake the cookies for the class -> Keeping the promise
// I lied, and no cookies for everyone -> I broke my promise

// Javascript Promises work the exact same way
// Promise is either resolved
// Promise is either rejected

// new Promise ((resolve, reject)=> {
//   if(error){
//     reject("The code broke!");
//   }
//     resolve("The code didn't break!");
// })

// const toggleError = false;

// Promises actually have three states -> Pending, Resolved, Rejected
const toasterPromise = (time, toggleError) => {
  return new Promise ((resolve, reject)=> {
    setTimeout(()=> {
        if(toggleError){
          reject("Error your toaster broke");
          return;
        }
        // reject("Error your toaster broke");
        resolve(`Your toast is ready! Timer: ${time}`);
    }, time)
  })
}

// The .then will only capture a resolve if it happens, and each .then relies on the previous one

toasterPromise(2000, false) //This will fail
// Implicit return
.then((message)=> console.log(message))
// If we add the curly brackets, we also need to add a return statement
.then(()=> {

  return toasterPromise(1000, false)
}) // The resolve, or the output will be message2
.then((message2)=>console.log(message2))
.then(()=> console.log("Insert another message here!"))
.catch((error)=> console.log(error)) //Does it belong to a single Promise?
.finally(()=> console.log("After all is said and done"))