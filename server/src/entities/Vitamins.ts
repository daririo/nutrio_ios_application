import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Vitamins {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "float", default: 0 })
  a!: number;

  @Column({ type: "float", default: 0 })
  e!: number;

  @Column({ type: "float", default: 0 })
  c!: number;

  @Column({ type: "float", default: 0 })
  d!: number;

  @Column({ type: "float", default: 0 })
  b1!: number;

  @Column({ type: "float", default: 0 })
  b6!: number;

  @Column({ type: "float", default: 0 })
  b12!: number;

  @Column({ type: "float", default: 0 })
  omega3!: number;
}