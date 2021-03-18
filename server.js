const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
const app = require('./app');
require('./util/database');

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Listening to the port = ${port} ...`)
});
