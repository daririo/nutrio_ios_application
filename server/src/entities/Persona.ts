import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  gender!: string;

  @Column("int")
  age!: number;

  @Column("float")
  height!: number;

  @Column("float")
  weight!: number;
}