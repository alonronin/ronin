var models = require('./models');

var err = new Error();
err.errors = [1,2,3];
console.log(err.errors);