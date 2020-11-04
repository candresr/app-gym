const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const { authorize, checkRole } = require('../_middleware/authorize')
const userService = require('./user.service');
const Role = require('../_helpers/role');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', [authorize(), checkRole()], getAll);
router.get('/getUserCampus/:idCampus', [authorize(), checkRole()], getUserCampus);
router.get('/current', [authorize(), checkRole()], getCurrent);
router.get('/:id', [authorize(), checkRole()], getById);
router.put('/:id', [authorize(), checkRole()], updateSchema, update);
router.delete('/:id', [authorize(), checkRole()], _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required(),
        idCampus: Joi.number().integer()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {

    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {

    res.json(req.user);
}

function getById(req, res, next) {

    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function getUserCampus(req, res, next) {

    if (req.params.idCampus == "--") {
        getAll(req, res, next);
    } else {
        userService.getUserCampus(req.params.idCampus)
            .then(user => res.json(user))
            .catch(next);
    }
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {

    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {

    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}