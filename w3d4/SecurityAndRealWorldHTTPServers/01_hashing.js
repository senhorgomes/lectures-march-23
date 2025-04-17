// Hashing is a one way process
// Plaintext password -> Hashing Algo -> Random Generated String
// This is to protect commonly used passwords
const bcrypt = require('bcrypt');


const samplePassword = "password";

const salty = bcrypt.genSaltSync(10)

const hashedPassword = bcrypt.hashSync(samplePassword, salty);

console.log(hashedPassword)
const samePasswordOrNot = bcrypt.compareSync("password", hashedPassword);
console.log(samePasswordOrNot)
// Salt is added => Salt is a randomly generated string that is added to the password before hashing

// plaintext password + salt => hashing algo=> random generated string (hash)
