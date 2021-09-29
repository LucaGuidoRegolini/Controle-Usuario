import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";

import User from "../model/User";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @OneToMany((type) => User, (admin) => Admin, { cascade: true })
  users!: User[];

  @BeforeInsert()
  @BeforeUpdate()
  hasPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}

export default Admin;
