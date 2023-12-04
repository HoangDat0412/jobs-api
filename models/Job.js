const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'please provide position'],
        maxlength:100
    },
    status : {
        type:String,
        enum:['interview','declined',"pending"],
        default:'pending'
    },
    createBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide user id']
    }
},{timestamps:true})

module.exports = mongoose.model("Job",JobSchema)