import mongoose from "mongoose"

const OneSchema = new mongoose.Schema({
    fx : String,
    xi : Number,
    error : Number
})

export default mongoose.model('One-point',OneSchema)