const app = require('express');
const router = app.Router();
const { 
    createUser,
    login 
} = require('../controllers/auth');

router.post('/signup', createUser);
router.post('/login', login);

module.exports = router;