import express from 'express'
import FalseModels from '../../models/root/FalseModels.js'

const router = express.Router()

router.post('/save', async (req, res) => {

    try {  
        const data = new FalseModels(req.body)
        await data.save()
        console.log("Save success")
        res.json({message : "Save done!"})
    }
    catch (err) {
        console.log("Save Error : ", err)
    }

})

router.get('/history', async (req, res) => {

    try {
        const data = await FalseModels.find().sort()
        res.json(data)
    }
    catch (err) {
        console.log("Save error : ", err)
    }

})

export default router