const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
// const authorize = require('../_middleware/authorize')
const { authorize, checkRole } = require('../_middleware/authorize')
const role = require('../_middleware/authorize')
const campusService = require('./campus.service');
const Role = require('../_helpers/role');


router.get('/', [authorize(), checkRole()], getAll);
router.get('/getAllCities', [authorize(), checkRole()], getAllCities);
router.post('/create', [authorize(), checkRole()], registerSchema, create);
router.delete('/delete/:id', [authorize(), checkRole()], _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        idCity: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {

    campusService.create(req.body)
        .then(() => res.json({ message: 'Creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {

    campusService.getAll()
        .then(campuses => res.json(campuses))
        .catch(next);
}

function getAllCities(req, res, next) {

    campusService.getAllCities()
        .then(campuses => res.json(campuses))
        .catch(next);
}

function _delete(req, res, next) {

    const currentUser = req.user;

    if (currentUser.role != Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    campusService.delete(req.params.id)
        .then(() => res.json({ message: 'Campus deleted successfully' }))
        .catch(next);
}