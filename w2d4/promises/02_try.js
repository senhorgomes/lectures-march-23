//Can try and catch an error? Why would we want to do that?

// Attempt this block of a code
// try {
//   setTimeout(()=> {
//     throw new Error("You broke it!");
//   }, 2000)
//   // If an error happens, catch it and move along
// } catch (error) {
//   console.log("Error:",error);
// } finally {
//   console.log("After error");
// }

// setTimeout(()=> {
//   try{
//     throw new Error("You broke it!");
//   } catch (error){
//     console.log("Error:",error);
//   }
// }, 2000)

// setTimeout(()=> {
//   console.log("After the broken setTimeout")
// }, 3000)


// Morning routine
// Toast function -> Toast bread for us
// Coffee function -> makes coffee for us
// Dish washing function -> Washes the dishes for us

const toggleError = false;

const toaster = (time, callback) => {
  setTimeout(()=> {
    try{
      // Random number generator
      // Chance for our toaster to break
      // It will generate a number between 0-1
      if(toggleError){
        throw new Error("Your toaster is broken!");
      }
      console.log("Your toast is ready!");
      callback
    } catch (error) {
      console.log(error);
    }
  }, time)
}

const coffeeMaker = (time, callback) => {
  setTimeout(()=> {
    try{
      // Random number generator
      // Chance for our toaster to break
      // It will generate a number between 0-1
      if(toggleError){
        throw new Error("Your coffee maker is broken!");
      }
      console.log("Your coffee is ready!")
      callback;
    } catch (error) {
      console.log(error);
    }
  }, time)
}

const dishwasher = (time, callback) => {
  setTimeout(()=> {
    try{
      // Random number generator
      // Chance for our toaster to break
      // It will generate a number between 0-1
      if(toggleError){
        throw new Error("Your dishwasher is broken!");
      }
      console.log("Your dishes are clean and ready!");
      callback
    } catch (error) {
      console.log(error);
    }
  }, time)
}
dishwasher(3000, () => 
  toaster(2000, ()=> 
    coffeeMaker(1000, ()=> 
      console.log("Ready to leave for work!")
    )
  )
)

