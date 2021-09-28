import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity("admins")
export class Admins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { unique: true })
  uuid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
  @Column({ select: false })
  passwordResetToken: string;
  @Column({ select: false })
  passwordResetExpires: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hasPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
