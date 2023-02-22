const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter product Description"]
    },
    category:{
        type:String,
        required:[true,"Please Enter product Category"]
    },
    sub_category:{
        type:String
    },
    model:{
        type:String
    },
    details:[
        {
            heading:{
                type:String,
            },
            content:{
                type:String,
            }
        }
    ],
    color:{
        type:String
    },
    package_content:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
               
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    discounted_price:{
        type:Number,
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    discount:{
        type:Number
    },
    stock:{
        type:Number,
        required:[true,"Please Enter product stock"],
        maxLength:[4,"Stock cannot exceed 4 chacters"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    countryoforigin:{
        type:String
    },
    status:{
        type:String
    }

})

module.exports=mongoose.model("product",productSchema)