import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Settings } from "./Settings";

@Entity()
export class Nutrition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category!: string;

  @Column()
  name!: string;

  @Column({ default: false })
  is_selected!: boolean;

  @ManyToOne(() => Settings, (settings) => settings.nutrition, {
    onDelete: "CASCADE",
  })
  settings!: Settings;
}