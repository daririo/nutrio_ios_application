import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Macros {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("float")
  kcal!: number;

  @Column("float")
  fat!: number;

  @Column("float")
  protein!: number;

  @Column("float")
  sugar!: number;

  @Column("float")
  fiber!: number;
}