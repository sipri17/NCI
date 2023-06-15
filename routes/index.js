const router = require('express').Router()
const {User, Ktp} = require('../models')

router.get('/user', async function (req,res){
    try {
        const users = await User.findAll({
            include: {
                model : Ktp
            }
        })
        res.status(200).json(users)
    } catch (error) {
        console.log('error>>>',error);
    }
})

router.post('/user', async function (req,res){
    try {
        const {name,email} = req.body
        const newuser = await User.create({name,email})
        res.status(201).json(newuser)
    } catch (error) {
        console.log('error>>>',error);
    }
})

router.post('/user/:id/ktp', async function (req,res){
    try {
        const {id} = req.params
        const {idNumber} = req.body
        const newKtp = await Ktp.create({idNumber,UserId:id})
        res.status(201).json(newKtp)
    } catch (error) {
        console.log('error>>>',error);
    }
})

router.put('/user/:id', async function (req,res){
    try {
        const {name,email} = req.body
        const {id} = req.params
        const user = await User.findByPk(id)
        const newuser = await user.update({name,email})
        res.status(201).json(newuser)
    } catch (error) {
        console.log('error>>>',error);
    }
})


module.exports = router