import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({default: 'male'})
  gender!: string;

  @Column("int")
  age!: number;

  @Column("float")
  height!: number;

  @Column("float")
  weight!: number;
}