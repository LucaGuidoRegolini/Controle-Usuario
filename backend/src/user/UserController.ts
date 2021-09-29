import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import jwt from "jsonwebtoken";

import { UnauthorizedError, InvalidArgumentError, InternalError } from "../errors";

import User from "../model/User";
import Admin from "../model/Admin";

export default class UserController {
  static async login(req: Request, res: Response) {
    const repository = getRepository(User);

    const { name, password } = req.body;

    const user = await repository.findOne({
      select: ["password", "id", "name"],
      where: { name },
    });

    if (!user) throw new InvalidArgumentError("user not found");

    const isValidPassword = password == user.password;
    if (!isValidPassword) throw new UnauthorizedError("invalid password");

    if (process.env.SECRET) {
      const token = jwt.sign({ id: user.id, type: "user" }, process.env.SECRET, {
        expiresIn: "20d",
      });
      return res.json({ name: user.name, token });
    } else throw new InternalError("error in jwt create");
  }

  static async me(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const { id: user_id } = req.headers;

    const user = await userRepository.findOne({ where: { id: user_id } });

    if (!user) throw new UnauthorizedError("user not found");

    return res.json(user);
  }

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
      await userRepository.delete({ id: Number(id) });
      return res.status(202).json({});
    } else throw new UnauthorizedError("Unauthorized");
  }
}
