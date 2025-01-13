import mongoose ,{Schema,Model} from "mongoose";
import bcrypt from "bcrypt"
import { JsonWebTokenError } from "jsonwebtoken";

const userSchema = new Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true,
        index:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true,
    },
    fullname:{
        type: String,
        required:true,
        lowerCase:true,
        trim:true,
        index:true
    },
    avatar:{
        type: String,//clouinary url true
        required:true
    },
    coverImage:{
        type:String
    },
    watchHistory:[
        {
            trype:Schema.Types.ObjectId,
            ref: "Videos"
        }
    ],
    password:{
        type:String,
        required:[true,"password is requried"]
    },
    refreshTocken:{
        type:true,
        required:true
    }

},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function(){
    return Jwt.sign(
        {
            _id: this.id,
            email:this.email,
            username:this.username,
            fullName:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genrateRefreshToken = function(){
    return Jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genrateRefreshToken = function(){}
 
export const User = Model("User",userSchema);