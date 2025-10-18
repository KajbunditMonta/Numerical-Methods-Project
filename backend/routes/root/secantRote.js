import express from 'express'
import SecantModels from '../../models/root/SecantModels.js'

const router = express.Router()

router.post('/save', async (req, res) => {

    try{
        const data = new SecantModels(req.body)
        await data.save()
        console.log("(Secant) Save data done! ")
    }
    catch (err) {
        console.log("(Secant) Error save data! ", err)
    }

})

router.get('/history', async (req, res) => {
    
    try {
        const data = await SecantModels.find().sort()
        res.json(data)
        console.log("(Secant) Get data done!")
    }
    catch (err) {
        console.log("(Secant) Error get data! ", err)
    }

})

export default router