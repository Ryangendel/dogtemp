const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 2,
        maxLength:10
    }, 
    caretaker:{
        type:String,
        required:true,
    },
    adopted:{
        type: Boolean
    }
})

const Dog = mongoose.model("gooddogs", DogSchema)

module.exports = Dog