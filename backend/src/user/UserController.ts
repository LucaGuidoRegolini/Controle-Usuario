import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../model/User";

export default class UserController {
  static async create(req: Request, res: Response) {
    const repository = getRepository(User);
    const { name, nickname, password } = req.body;
    const userExists = await repository.findOne({ where: { name } });

    if (userExists) return res.sendStatus(409);

    const user = await repository.create({ name, nickname, password });
    await repository.save(user);

    return res.json(user);
  }
}
