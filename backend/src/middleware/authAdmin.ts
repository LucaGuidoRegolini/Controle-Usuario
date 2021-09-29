import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index";

export default {
  jwtAuthent(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;

    if (bearerToken && process.env.SECRET) {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) throw new UnauthorizedError("Invalid token");
        if (decoded) req.headers.id = decoded.id;
        next();
      });
    } else throw new UnauthorizedError("Invalid token!!");
  },
};
