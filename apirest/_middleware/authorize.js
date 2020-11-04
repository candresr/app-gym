const jwt = require('express-jwt');
const { secret } = require('../config.json');
const db = require('../_helpers/db');



function authorize() {

    return [

        jwt({ secret, algorithms: ['HS256'] }),

        async(req, res, next) => {
            const user = await db.User.findByPk(req.user.sub);

            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });

            req.user = user.get();
            next();
        }
    ];
}


function checkRole() {

    return [

        jwt({ secret, algorithms: ['HS256'] }),

        async(req, res, next) => {
            const user = await db.User.findByPk(req.user.sub);

            if (user.role !== "admin")
                return res.status(401).json({ message: 'Unauthorized' });

            req.user = user.get();
            next();
        }
    ];
}

module.exports = {
    authorize,
    checkRole
}