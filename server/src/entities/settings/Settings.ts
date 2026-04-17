import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Persona } from './Persona';
import { Nutrition } from './Nutrition';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  goal!: string;

  @OneToOne(() => Persona, { cascade: true })
  @JoinColumn({ name: 'persona_id' })
  persona!: Persona;

  @OneToMany(() => Nutrition, (nutrition) => nutrition.settings, {
    cascade: true,
  })
  nutrition!: Nutrition[];
}
