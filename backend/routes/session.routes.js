const express = require('express');
const router = express.Router();
const  {getSessions,createSession}  = require('../controllers/sessionController');

const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, createSession);


router.get('/', authMiddleware, getSessions);
// router.put('/:id', authMiddleware, updateSession);
// router.delete('/:id', authMiddleware, deleteSession);

module.exports = router;
