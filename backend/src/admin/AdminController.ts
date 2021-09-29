import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { InvalidArgumentError, UnauthorizedError, InternalError } from "../errors";

import Admin from "../model/Admin";

export default class AdminController {
  static async create(req: Request, res: Response) {
    const repository = getRepository(Admin);

    const { name, email, password } = req.body;
    const adminExists = await repository.findOne({ where: { email } });

    if (adminExists) throw new InvalidArgumentError("usuario existente");

    const admin = await repository.create({ name, email, password });

    await repository.save(admin);

    return res.status(201).json({});
  }

  static async login(req: Request, res: Response) {
    const repository = getRepository(Admin);

    const { email, password } = req.body;

    const admin = await repository.findOne({ select: ["password"], where: { email } });

    if (!admin) throw new InvalidArgumentError("usuario inexistente");

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) throw new UnauthorizedError("senha invalida");

    if (process.env.SECRET) {
      const token = jwt.sign({ id: admin.id }, process.env.SECRET, { expiresIn: "20d" });
      return res.json({ name: admin.name, email: admin.email, token });
    } else throw new InternalError("Error in jwt create");
  }
}
