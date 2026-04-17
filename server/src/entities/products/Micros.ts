import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Micros {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "float", default: 0 })
  iron?: number;

  @Column({ type: "float", default: 0 })
  zinc?: number;

  @Column({ type: "float", default: 0 })
  magnesium?: number;

  @Column({ type: "float", default: 0 })
  calcium?: number;

  @Column({ type: "float", default: 0 })
  phosphor?: number;

  @Column({ type: "float", default: 0 })
  seelen?: number;
}