import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Persona } from "./Persona";
import { Nutrition } from "./Nutrition";

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  goal!: string;

  @OneToOne(() => Persona)
  @JoinColumn({ name: "persona_id" })
  persona!: Persona;

  @OneToOne(() => Nutrition)
  @JoinColumn({ name: "nutrition_id" })
  nutrition!: Nutrition;
}