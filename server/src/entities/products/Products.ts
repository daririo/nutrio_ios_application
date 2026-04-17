import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { Macros } from './Macros';
import { Micros } from './Micros';
import { Vitamins } from './Vitamins';

@Entity()
export class Product {
  @PrimaryColumn({ type: 'bigint'})
  id!: number;

  @Column()
  name!: string;

  @Column()
  image_url!: string;

  @OneToOne(() => Macros, { cascade: true})
  @JoinColumn({ name: 'macros_id' })
  macros!: Macros;

  @OneToOne(() => Micros, { cascade: true})
  @JoinColumn({ name: 'micros_id' })
  micros!: Micros;

  @OneToOne(() => Vitamins, { cascade: true})
  @JoinColumn({ name: 'vitamins_id' })
  vitamins!: Vitamins;
}
