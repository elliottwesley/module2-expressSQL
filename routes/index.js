var express = require('express');
var router = express.Router();

var landing = require('../controllers/landing');
var user = require('../controllers/user');

var {isLoggedIn, hasAuth} = require('../middleware/hasAuth.js');

// Login and signup functionality.
router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login', user.login);
router.post('/signup', user.signup);
// Logout functionality.
router.post('/logout', user.logout);
router.get('/logout', user.logout);

// GET home page, landing routes.  First two are for visitors, rest are for administrator.
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);
router.get('/leads', hasAuth, landing.show_leads);
router.get('/lead/:lead_id', hasAuth, landing.show_lead);
router.get('/lead/:lead_id/edit', hasAuth, landing.show_edit_lead);
router.post('/lead/:lead_id/edit', hasAuth, landing.edit_lead);
router.post('/lead/:lead_id/delete', hasAuth, landing.delete_lead);
router.post('/lead/:lead_id/delete-json', hasAuth, landing.delete_lead_json);

module.exports = router;
