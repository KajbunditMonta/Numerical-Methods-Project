import express from 'express'
import NewtonModels from '../../models/root/NewtonModels.js'

const router = express.Router()

router.post('/save', async (req, res) => {

    try {
        const data = new NewtonModels(req.body)
        await data.save()
        console.log("(Newton-Raphson)Save data done! ")
    }
    catch (err) {
        console.log("(Newton-Raphson) Error Save data! ", err)
    }

})

router.get('/history', async (req, res) => {

    try {
        const data = await NewtonModels.find().sort({ createdAt: -1 })
        res.json(data)
        console.log("(Newton-Raphson) Get data done! ")
    }
    catch (err) {
        console.log("(Newton-Raphson) Error get data! ", err)
    }

})

export default router