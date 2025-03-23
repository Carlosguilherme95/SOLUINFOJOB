import bcrypt from "bcryptjs";
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Atendimentos } from "../Entity/atendimentos";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user!: string;

  @Column({ nullable: false })
  password!: string;

  @OneToMany(() => Atendimentos, (atendimento) => atendimento.user)
  atendimentos!: Atendimentos[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
