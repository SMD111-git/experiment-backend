const asyncHandler=(requesthandelr)=>{
    return (req,res,next)=>{
        Promise.resolve(requesthandelr(req,res,next)).catch((err)=> next(err))
    }
}
export {asyncHandler}
//wapper of promises.
//
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }