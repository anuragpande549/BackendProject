// const asyncHandler = (fun) => async(req, res, next) =>{
//     try{
//         await fun(req, res,next)
//     }catch(error){
//         res.status(err.code || 500).json({
//             success:false,
//             massage:err.code
//         })
//     }
// }
const asyncHandler = (fun) =>{
    (req, res, next) =>{
        Promise.resolve(fun(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler}