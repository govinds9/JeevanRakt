const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    role:{
        type:String,
        required:[true,"role is required"],
        enum:['admin','organisation','donar','hospital']
    },
    name:{
        type:String,
        required:function(){
            return (this.role==='admin' || this.role==='user')
        }
    },
    organisationName:{
        type:String,
        required:function(){
         return  (this.role==='organisation')
        }
    },
    hospital:{
        type:String,
        required:function(){
            return (this.role==='hospital')
        }
    },
    email:{
        type:String,
        required:[true,"Email required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password required"]
    },
    address:{
        type:String,
        required:[true,"Address is required"]

    },
    website:{
        type:String
    },
    phone:{
        type:String,
        required:[true,"Phone is required"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('users',userSchema);