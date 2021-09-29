import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  hasPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}

export default Admin;
