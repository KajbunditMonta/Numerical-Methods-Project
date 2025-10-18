import mongoose from 'mongoose'

const NewtonSchema = new mongoose.Schema({
    fx : String,
    xi : Number,
    error : Number
})

export default mongoose.model('Newton-Raphson', NewtonSchema)