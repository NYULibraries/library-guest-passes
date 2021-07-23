const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))
router.get('/healthcheck', (req, res) => res.send('{"healthy":true}'))

router.post('/users', controllers.updateOrCreateUser)

module.exports = router
