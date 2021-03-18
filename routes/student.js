const express = require('express');

const authController = require('../controller/authController');
const studentController = require('../controller/studentController');


const router = express.Router();
router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router
    .route('/')
    .get(authController.protect, studentController.getAllStudents)
    
router
    .route('/:id')
    .get(authController.protect, studentController.getStudent)
    .patch(authController.protect , studentController.updateStudent)
    .delete(authController.protect, authController.restrictTo('teacher'), studentController.deleteStudent)



module.exports = router;