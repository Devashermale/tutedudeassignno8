const express = require('express')
const router = express.Router()
const {gettodo,idgettodo,posttodo,puttodo,deletetodo} = require('../controller/controller.js');
router.get('/',gettodo);
router.get('/todo/:id',idgettodo);
router.post('/todo',posttodo)
router.put('/todo/:id',puttodo)
router.delete('/todo/:id',deletetodo);

module.exports = router;