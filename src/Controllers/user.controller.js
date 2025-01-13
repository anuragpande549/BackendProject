import {asyncHandler} from "../utils/asynceHandler.js";

const registerUser = asyncHandler(async(req, res )=>{
    return res.status(200).json({
        massage:"ok"
    })
})

export default registerUser;