import { Model,Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    videoFile:{
        type:String,//cloudinary url
        requried:true
    },
    thumbnail:{
        type:String,//cloudinary url
        requried:true
    },
    title:{
        type:String,
        requried:true
    },
    description:{
        type:String,
        requried:true
    },
    duration:{
        type:Number,//cloudinary url
        requried:true
    },
    views:{
        type:Number,
        defult:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate)

export const Videos = Model("Videos", videoSchema);