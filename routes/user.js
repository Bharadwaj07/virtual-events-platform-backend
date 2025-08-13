const express = require('express');
const {registerUserController,loginUserController,updateUserController,deleteUserController} = require('../controller/user')

const router = express.Router()

router.post('/register', registerUserController);

router.post('/login', loginUserController);

router.put('/update',updateUserController);

router.put('/delete',deleteUserController);

module.exports = router;


