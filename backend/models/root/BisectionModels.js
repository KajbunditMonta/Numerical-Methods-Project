import mongoose from 'mongoose'

const BisectionSchema = new mongoose.Schema({
  fx: String,
  xStart: Number,
  xEnd: Number,
  error: Number
})

export default mongoose.model('Bisection', BisectionSchema)