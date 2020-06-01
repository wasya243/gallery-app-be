import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

// user table is reserved, so I had to rename it
@Entity()
export class GalleryUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Index({ unique: true })
  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;
}
