const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const router = new Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/File')

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be more than 5 and less than 16 charachters').isLength({min: 5, max: 16})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({messgae: 'Incorrect request', errors})
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})
        
        if(candidate) {
            return res.status(400).json({message: `User with email ${email} already exists`}) 
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const user = new User({email, password: hashedPassword})
        await user.save()
        await fileService.createDir(req, new File({user: user.id, name: ''}))
        return res.json({message: 'User was created'})
    } catch (e) {
       console.log(e)
       res.send({message: "Server error"})
    }
})

router.post('/login',
    async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        const isValidPass = bcrypt.compareSync(password, user.password)
        if(!isValidPass) {
            return res.status(404).json({message: "Invalid password"})
        }
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "10h"})
        return res.json({
            token,
            id: user.id,
            email: user.email,
            diskSpace: user.diskSpace,
            usedSpace: user.usedSpace,
            avatar: user.Avatar
        })
    } catch (e) {
       console.log(e)
       res.send({message: "Server error"})
    }
})
 
router.get('/auth', authMiddleware,
    async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

module.exports = router