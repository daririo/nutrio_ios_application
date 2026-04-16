import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}