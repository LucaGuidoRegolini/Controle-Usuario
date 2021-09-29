import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";

import { UnauthorizedError } from "../errors";

import User from "../model/User";
import Admin from "../model/Admin";

export default class UserController {
  static async index(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const adminRepository = getRepository(Admin);

    const { id } = req.params;
    const { id: admin_id } = req.headers;

    const admin = await adminRepository.findOne({ where: { id: admin_id } });
    const user = await userRepository.findOne({ where: { id, admin } });

    if (!user) throw new UnauthorizedError("user not found");

    return res.json(user);
  }

  static async list(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const adminRepository = getRepository(Admin);

    const { id: admin_id } = req.headers;
    const { name = "", limit, skip = 0 } = req.query;

    const admin = await adminRepository.findOne({
      where: { id: admin_id },
    });

    let users;
    if (limit) {
      users = await userRepository.findAndCount({
        where: { admin, name: Like(`%${name}%`) },
        take: Number(limit),
        skip: Number(skip),
      });
    } else {
      users = await userRepository.findAndCount({
        where: { admin, name: Like(`%${name}%`) },
      });
    }

    if (!users) throw new UnauthorizedError("users not found");

    return res.json(users);
  }

  static async create(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const adminRepository = getRepository(Admin);

    const { name, nickname, password } = req.body;
    const { id: admin_id } = req.headers;

    const userExists = await userRepository.findOne({ where: { name } });
    const admin = await adminRepository.findOne({ where: { id: admin_id } });

    if (userExists && !admin) throw new UnauthorizedError("Unauthorized");

    const user = await userRepository.create({
      name,
      nickname,
      password,
      admin,
    });

    await userRepository.save(user);

    return res.json(user);
  }

  static async update(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const adminRepository = getRepository(Admin);

    const { nickname, password } = req.body;
    const { id } = req.params;
    const { id: admin_id } = req.headers;

    const admin = await adminRepository.findOne({ where: { id: admin_id } });
    const user = await userRepository.findOne({ where: { id, admin } });

    if (user) {
      await userRepository.save({
        id: user.id,
        nickname,
        password,
      });
      return res.status(202).json({});
    } else throw new UnauthorizedError("Unauthorized");
  }

  static async delete(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const adminRepository = getRepository(Admin);

    const { id } = req.params;
    const { id: admin_id } = req.headers;

    const admin = await adminRepository.findOne({ where: { id: admin_id } });
    const user = await userRepository.findOne({ where: { id, admin } });

    if (user) {
      const resp = await userRepository.delete({ id: Number(id) });
      return res.status(202).json({});
    } else throw new UnauthorizedError("Unauthorized");
  }
}
