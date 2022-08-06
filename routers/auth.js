const app = require('express');
const router = app.Router();
const { createUser } = require('../controllers/auth');

router.post('/login', createUser);


module.exports = router;