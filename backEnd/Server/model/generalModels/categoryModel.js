import mongoose from 'mongoose'


const schema = mongoose.Schema({
    // Array of Objects/Strings 
    // value is Category string and Number 
    categories: [
        {
            type: String,
            unique: true
        },

    ],

})


const categoryModel = mongoose.model("categoryModel", schema)

export default categoryModel
