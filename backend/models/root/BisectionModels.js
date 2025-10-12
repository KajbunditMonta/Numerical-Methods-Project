import mongoose from 'mongoose'

const BisectionSchema = new mongoose.Schema({
  fx: String,
  xStart: Number,
  xEnd: Number,
  error: Number,
  result: Array,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Bisection', BisectionSchema)