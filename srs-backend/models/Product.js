const productSchema =
new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

},
{
    timestamps:true
});
