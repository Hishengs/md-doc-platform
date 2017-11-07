const Heysoo = require('heysoo');
const app = new Heysoo();

app.start();

console.log('>>> listening at ', app.config.port);