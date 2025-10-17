import mongoose from "mongoose"

const GraphicalSchema = new mongoose.Schema({
    fx : String,
    Xstart : Number,
    Xend : Number,
    Plus_step : Number
})

export default mongoose.model('Graphical',GraphicalSchema)