import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    availableStatus: {
        type: Boolean,
        required: true,
    },
    sellerName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    review: {
        type: String,
    },
    additionalInformation: {
        type: String,
    }
},
{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;