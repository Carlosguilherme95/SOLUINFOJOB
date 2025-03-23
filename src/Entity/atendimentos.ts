import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../Entity/user";
@Entity()
export class Atendimentos {
  @PrimaryGeneratedColumn()
  id_atendimento!: number;

  @Column()
  posto!: string;

  @Column()
  conteudo_atendimento!: string;

  @CreateDateColumn()
  data_atendimento!: Date;

  @CreateDateColumn()
  data_atualiz_atend!: Date;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user: User) => user.atendimentos)
  @JoinColumn({ name: "userId" })
  user!: User;
}
