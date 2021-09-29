import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../model/User";
import Admin from "../model/Admin";

export default class UserController {
  static async create(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const adminRepository = getRepository(Admin);

    const { name, nickname, password } = req.body;

    const userExists = await userRepository.findOne({ where: { name } });
    const admin = await adminRepository.findOne({ where: { id: 1 } });

    if (!userExists && !admin) return res.sendStatus(409);

    const user = await userRepository.create({
      name,
      nickname,
      password,
      admin,
    });
    await userRepository.save(user);

    return res.json(user);
  }

  static async index(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { id } = req.params;

    const userExists = await userRepository.findOne({ where: { id } });
    return res.json(userExists);
  }
}
