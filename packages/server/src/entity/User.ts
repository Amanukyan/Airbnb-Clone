import * as bcrypt from 'bcryptjs';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Listing } from './Listing';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 100, nullable: true })
  firstName: string;

  @Column('varchar', { length: 100, nullable: true })
  lastName: string;

  @Column('text') password: string;

  @Column('text', { nullable: true })
  pictureUrl: string;

  @Column('varchar', { nullable: true })
  phoneNumber: string;

  @Column('boolean', { default: false })
  confirmed: boolean;

  @Column('boolean', { default: false })
  forgotPasswordLocked: boolean;

  @OneToMany(() => Listing, (listing) => listing.user)
  listings: Listing[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
