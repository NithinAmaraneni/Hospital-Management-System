const bcrypt = require("bcryptjs");

const enteredPassword = "user123";
const storedHash = "$2b$10$KFi6Yx.W5A5QA7gTS8G8w.6/OpJc20AWhm8uJyL5Nfm6Q3Rg9yEiG";

bcrypt.compare(enteredPassword, storedHash).then(console.log);