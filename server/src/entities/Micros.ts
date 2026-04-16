import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Micros {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("float")
  iron!: number;

  @Column("float")
  zinc!: number;

  @Column("float")
  magnesium!: number;

  @Column("float")
  calcium!: number;

  @Column("float")
  phosphor!: number;

  @Column("float")
  seelen!: number;
}