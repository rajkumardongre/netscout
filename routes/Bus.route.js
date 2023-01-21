const { Router } = require('express');
const router = Router();
const busController = require('../controllers/Bus.controller');

router.post('/add', busController.addBus);
router.post('/ticket/add/:id', busController.addTicket);
router.get('/status', busController.getcurrentStatus);
router.get('/conductor', busController.showBus);

module.exports = router;
