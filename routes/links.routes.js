const Router = require('express')
const Link = require('../models/Link')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const shortId = require('shortid')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseURL')
        const {from} = req.body
        const code = shortId.generate()
        const existing = await Link.findOne({from})
        if (existing) {
            return res.json({link: existing})
        }
        const to = baseUrl + '/to/' + code
        const link = new Link({from, to, code, owner: req.user.userId})
        await link.save()
        return res.status(201).json({link})


    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так " + e})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте позже"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id)
        res.json(links)
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте позже"})
    }
})

module.exports = router