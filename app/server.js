const Core = require('./lib/core');

let postObject = Core.getPostObject();
let userObject = Core.getUserObject();
console.log(postObject);
console.log(userObject);
console.log(Core.encryptMD5('testing'));