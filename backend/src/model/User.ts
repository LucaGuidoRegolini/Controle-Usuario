import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import Admin from "../model/Admin";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  nickname!: string;

  @Column({ select: false })
  password!: string;

  @ManyToOne((type) => Admin, (users) => User, { eager: true, onDelete: "CASCADE" })
  admin!: Admin;
}

export default User;
