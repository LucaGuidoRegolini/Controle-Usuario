import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}

export default User;
