import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import bisectionRoute from './routes/root/bisectionRoute.js'
import graphicalRoute from './routes/root/grapicalRoute.js'
import falseRoute from './routes/root/falseRoute.js'
import oneRoute from './routes/root/oneRoute.js'

const app = express()
app.use(cors())
app.use(express.json())

const uri = 'mongodb+srv://kajbundit:WannaBeYours@cluster0.cuxua2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Mongo Error:', err))

app.get('/', (req, res) => {
  res.send('Backend Running!')
});

app.use('/api/bisection', bisectionRoute)
app.use('/api/graphical', graphicalRoute)
app.use('/api/false', falseRoute)
app.use('/api/one-point', oneRoute)

app.listen(3001, () => console.log('Server started on port 3001'))
