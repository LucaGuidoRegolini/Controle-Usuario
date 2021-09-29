import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { InvalidArgumentError, UnauthorizedError, InternalError } from "../errors";

import Admin from "../model/Admin";

export default class AdminController {
  static async login(req: Request, res: Response) {
    const repository = getRepository(Admin);

    const { email, password } = req.body;

    const admin = await repository.findOne({
      select: ["password", "id"],
      where: { email },
    });

    if (!admin) throw new InvalidArgumentError("user not found");

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) throw new UnauthorizedError("invalid password");

    if (process.env.SECRET) {
      const token = jwt.sign({ id: admin.id, type: "admin" }, process.env.SECRET, {
        expiresIn: "20d",
      });
      return res.json({ name: admin.name, email: admin.email, token });
    } else throw new InternalError("error in jwt create");
  }

  static async create(req: Request, res: Response) {
    const repository = getRepository(Admin);

    const { name, email, password } = req.body;
    const adminExists = await repository.findOne({ where: { email } });

    if (adminExists) throw new InvalidArgumentError("user exist");

    const admin = await repository.create({ name, email, password });

    await repository.save(admin);

    return res.status(201).json({});
  }

  static async me(req: Request, res: Response) {
    const repository = getRepository(Admin);

    const { id: admin_id } = req.headers;
    const admin = await repository.findOne({ where: { id: admin_id } });

    if (!admin) throw new InvalidArgumentError("user not found");

    return res.status(201).json({ admin });
  }

  static async delete(req: Request, res: Response) {
    const adminRepository = getRepository(Admin);

    const { id: admin_id } = req.headers;

    const admin = await adminRepository.findOne({ where: { id: admin_id } });

    if (admin) {
      await adminRepository.delete({ id: Number(admin_id) });
      return res.status(202).json({});
    } else throw new UnauthorizedError("Unauthorized");
  }
}
