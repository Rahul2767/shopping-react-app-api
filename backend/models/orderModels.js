import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    orderedBy: {
        type: String,
        required: true
    },
    productQuantity: {
        type: String,
        required: true
    }
}, { timestamps: true })

const order = mongoose.model('order', orderSchema)

export default order 