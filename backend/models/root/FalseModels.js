import mongoose from "mongoose"

const FalseSchema = new mongoose.Schema({
    fx : String,
    xstart : Number,
    xend : Number,
    error : Number
})

export default mongoose.model('False', FalseSchema)