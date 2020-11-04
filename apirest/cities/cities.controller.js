const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const { authorize, checkRole } = require('../_middleware/authorize')
const role = require('../_middleware/authorize')
const citiesService = require('./cities.service');
const Role = require('../_helpers/role');

router.get('/', [authorize(), checkRole()], getAll);
router.post('/create', authorize(), registerSchema, create);
router.delete('/delete/:id', authorize(), _delete);

module.exports = router;


function registerSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {

    if (req.user.role != Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    citiesService.create(req.body)
        .then(() => res.json({ message: 'Creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {

    citiesService.getAll()
        .then(cities => res.json(cities))
        .catch(next);
}

function _delete(req, res, next) {

    const currentUser = req.user;

    if (currentUser.role != Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    citiesService.delete(req.params.id)
        .then(() => res.json({ message: 'City deleted successfully' }))
        .catch(next);
}