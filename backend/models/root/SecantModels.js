import mongoose from 'mongoose'

const SecantSchema = new mongoose.Schema({
    fx : String,
    x0 : Number,
    x1 : Number,
    error : Number
})

export default mongoose.model('Secant',SecantSchema)