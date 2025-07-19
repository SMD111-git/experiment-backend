class  ApiError extends Error {
    constructor(
        statusCode,
        message="something went wrong",
        errors=[],
        stack="") {
            super(message) //this a vraible from parent classs error that this varaible is  sent into the class error which is already having the message handler defined init
            this.statusCode=statusCode  
            this.data=null
            this.message=message
            this.success=false
            this.errors=errors
            if (stack) {
                this.stack=stack
            }else{
                Error.captureStackTrace(this,this.constructor)
            }

        }
}
export{ApiError}