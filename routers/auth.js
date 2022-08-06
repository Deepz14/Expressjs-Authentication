const app = require('express');
const router = app.Router();
const {wrapper} = require('../utils/helperfunction');
const { createUser } = require('../controllers/auth');

router.post('/login', wrapper(createUser));


module.exports = router;