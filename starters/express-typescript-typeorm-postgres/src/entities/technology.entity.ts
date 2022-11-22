import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'technology' })
export class Technology {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 256,
  })
  name!: string;
}
