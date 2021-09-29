import { NextFunction, Request, Response } from "express";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json(message(error, "Internal server error"));
};

function message(error: Error, message: string) {
  return { message, intance: error.constructor.name, error: error.message };
}

export default errorHandler;
