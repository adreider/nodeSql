const express = require('express')
const UserController = require('./controllers/UserController')
const userController = require('./controllers/UserController')
const AddressController = require('./controllers/AddressController')
const TechController = require('./controllers/TechController')
const ReportController = require('./controllers/ReportController')
const authController = require('./controllers/AuthController')

const routes = express.Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.get('/users/:user_id/addresses', AddressController.index)
routes.post('/users/:user_id/addresses', AddressController.store)

routes.get('/users/:user_id/techs', TechController.index)
routes.post('/users/:user_id/techs', TechController.store)
routes.delete('/users/:user_id/techs', TechController.delete)

routes.get('/report', ReportController.show)


// Auth
routes.post('/auth/login', authController.login);
routes.post('/auth/forgotPassword', authController.forgotPassword);
routes.post('/auth/authenticateCode', authController.authenticateCode);
routes.post('/auth/:id/changePassword', authController.changePassword);
routes.post('/auth/resetPassword', authController.resetPassword);
routes.post('/auth/authenticateToken', authController.authenticateToken);

// User
// routes.get('/users', userController.findAll);
// routes.get('/users/:id', userController.findById);
routes.post('/users/new', userController.create);
// routes.put('/users/:id', userController.update);
// routes.delete('/users/:id', userController.delete);
// routes.post('/users/:id/avatar', userController.avatar);

module.exports = routes
