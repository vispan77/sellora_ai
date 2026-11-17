

//success response 
const successResponse = <T>(status: number, success: boolean, message: string, data?: T) => {
    return {
        status,
        success,
        data,
        message
    }
}

//error response
const errorResponse = (status: number, success: boolean, message: string) => {
    return {
        status,
        success,
        message
    }
}

export {
    successResponse,
    errorResponse
}