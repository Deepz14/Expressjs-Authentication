const app = require('./app');
require('dotenv').config();


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started running on the Port: ${PORT}`));