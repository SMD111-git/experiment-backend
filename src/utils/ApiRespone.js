class ApiRespone {
    constructor(statusCode,data,message="sucess") {
        this.statusCode=statusCode;
        this.data=data;
        this.message=message;
        this.success=statusCode<400;//Sets the success flag to:true if the status code is less than 400 false otherwise
    }
}
export {ApiRespone}

//this a api wrapper 