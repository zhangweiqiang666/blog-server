const { Router } = require('express');
const getComment = require('./getComment');
const saveComment = require('./saveComment');
const deleteComment = require('./deleteComment');
const router = Router();
// const filter = { password: 0, _v: 0 };
module.exports = router;
router.get('/list', getComment);
router.post('/save', saveComment);
router.post('/delete', deleteComment);
