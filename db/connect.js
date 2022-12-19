import mongoose from 'mongoose'

// mongoose.connect return a promise
const connectDB = (url) => {
    return mongoose.connect(url)
}

mongoose.set('strictQuery', false)

export default connectDB