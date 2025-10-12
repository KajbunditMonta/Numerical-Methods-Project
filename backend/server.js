import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import bisectionRoute from './routes/root/bisectionRoute.js'

const app = express()
app.use(cors())
app.use(express.json())

const uri = 'mongodb+srv://kajbundit:WannaBeYours@cluster0.cuxua2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Mongo Error:', err))

app.get('/', (req, res) => {
  res.send('Backend Bisection Running!')
});

app.use('/api/bisection', bisectionRoute)

app.listen(3001, () => console.log('Server started on port 3001'))
