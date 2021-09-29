import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index";

function authentication(
  bearerToken: string | undefined,
  type: string
): string | undefined {
  let id: string | undefined;

  if (bearerToken && process.env.SECRET) {
    const token = bearerToken.split(" ")[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) id = undefined;

      if (decoded) {
        if (decoded.type != type) id = undefined;
        else id = decoded.id.toString();
      }
    });
  } else id = undefined;

  return id;
}

export default {
  adminAuthent(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    const id = authentication(bearerToken, "admin");

    if (id) {
      req.headers.id = id;
      next();
    } else throw new UnauthorizedError("Invalid token");
  },

  userAuthent(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    const id = authentication(bearerToken, "user");

    if (id) {
      req.headers.id = id;
      next();
    } else throw new UnauthorizedError("Invalid token");
  },
};
