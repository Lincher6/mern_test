const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
           return res.status(401).json({message: 'Нет авторизации'})
        }

        req.user = await jwt.verify(token, config.get('jwtSecret'))
        return next()

    } catch (e) {
        return res.status(401).json({message: 'Нет авторизации'})
    }
}