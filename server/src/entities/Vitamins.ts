import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Vitamins {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("float")
  a!: number;

  @Column("float")
  e!: number;

  @Column("float")
  c!: number;

  @Column("float")
  d!: number;

  @Column("float")
  b1!: number;

  @Column("float")
  b6!: number;

  @Column("float")
  b12!: number;

  @Column("float")
  omega3!: number;
}