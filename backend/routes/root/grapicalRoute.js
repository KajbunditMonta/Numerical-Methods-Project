import express from 'express'
import GraphicalModels from '../../models/root/GraphicalModels.js'

const router = express.Router()

router.post('/save', async (req, res) => {

    try {
        const data = new GraphicalModels(req.body)
        await data.save()
        console.log('save success!')
        res.json({message : 'Save done!'})
    }
    catch (err) {
        console.log('error save', err)
        res.json({message : 'Error save data', error : err.message})
    }

})

router.get('/history', async (req, res) => {

    try {
        const data = await GraphicalModels.find().sort()
        res.json(data)
    }
    catch (err) {
        console.log('error get history', err)
        res.json({message : 'error get data', error : err.message})
    }

})

export default router