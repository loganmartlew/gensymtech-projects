const bcrypt = require('bcrypt');

const pass = process.argv[2];
console.log(bcrypt.hashSync(pass, 10));
