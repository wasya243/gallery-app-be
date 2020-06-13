import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { GalleryUser } from './User';

// TODO: add link to actual picture
@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  description: string;

  @Column({ length: 50 })
  title: string;

  @ManyToOne(type => GalleryUser, galleryUser => galleryUser.pictures)
  galleryUser: GalleryUser;
}
