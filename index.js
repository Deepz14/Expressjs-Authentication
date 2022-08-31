const app = require('./app');
require('dotenv').config();
const mongoDb = require('./config/db_config');

const PORT = process.env.PORT || 5000;

// CONNECT TO THE DATABASE
mongoDb();

app.listen(PORT, () => console.log(`server started running on the Port: ${PORT}`));