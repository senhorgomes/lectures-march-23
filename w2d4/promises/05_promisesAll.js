//All the promises?
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

// toasterPromise(2000, false)
// .then((message)=> console.log(message))
// .then(()=> toasterPromise(1000, false)) 
// .then((message2)=>console.log(message2))
// .then(()=> toasterPromise(1000, false)) 
// .then((message2)=>console.log(message2))
// .catch((error)=> console.log(error))
// .finally(()=> console.log("After all is said and done"))

// The promise.all will take in an array of promises
// And it will return an array of all of the resolves
// All or nothing-> Every promise should return a resolve, if it doesn't the Promise.all fails
Promise.all([toasterPromise(2000, false), toasterPromise(1000, false), toasterPromise(3000, true)])
.then((array)=> {
  array.forEach((message)=> console.log(message))
})
.catch((error)=> console.log(error))