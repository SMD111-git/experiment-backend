class Respone {
    constructor(statusCode,data,message="sucess") {
        this.statusCode=statusCode;
        this.data=data;
        this.message=message;
        this.succes=statusCode<400;//Sets the success flag to:true if the status code is less than 400 false otherwise
    }
}


//this a api wrapper 