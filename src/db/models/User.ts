import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';

import { Picture } from './Picture';

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

  @OneToMany(type => Picture, picture => picture.galleryUser)
  pictures: Picture[];
}
