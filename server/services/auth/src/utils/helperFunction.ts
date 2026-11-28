

// //success response 
// const successResponse = <T>(status: number, success: boolean, message: string, data?: T) => {
//     return {
//         status,
//         success,
//         data,
//         message
//     }
// }

// //error response
// const errorResponse = (status: number, success: boolean, message: string) => {
//     return {
//         status,
//         success,
//         message
//     }
// }

// export {
//     successResponse,
//     errorResponse
// }


import { Response } from "express";

const successResponse = <T>(res: Response, status: number, success: boolean, message: string, data?: T) => {
  return res.status(status).json({
    status,
    success,
    data,
    message,
  });
};

const errorResponse = (res: Response, status: number, success: boolean, message: string) => {
  return res.status(status).json({
    status,
    success,
    message,
  });
};

export { successResponse, errorResponse };