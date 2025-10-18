import express from "express"
import OneModels from "../../models/root/OneModels.js"

const router = express.Router()

router.post('/save', async (req, res) => {

    try {
        const data = new OneModels(req.body)
        await data.save()
        console.log("One-Point Save done!")
    }
    catch (err) {
        console.log("(One-Point) Error save data : ", err)
    }

})

router.get('/history', async (req, res) => {

    try {
        const data = await OneModels.find().sort()
        res.json(data)
        console.log("(One-Point) Get data done!")
    }
    catch (err) {
        console.log("(One-Point) Error get data : ", err)
    }

})

export default router